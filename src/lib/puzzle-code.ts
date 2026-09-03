/**
 * The short code printed under every grid, e.g. "K7M2A9".
 *
 * A puzzle is a pure function of (difficulty, seed), so the code only has to
 * carry those two things — the solution is recomputed from them on demand.
 * That is what makes /sudoku-answers work with no database and without any
 * puzzle ever leaving the browser it was made in.
 *
 * Six characters of Crockford base32 = 30 bits, laid out as:
 *
 *     seed (22 bits) | difficulty (2 bits) | checksum (6 bits)
 *
 * The checksum is what stops a mistyped code from quietly resolving to a
 * different, perfectly valid puzzle — the worst failure this page could have,
 * because the answer would look plausible and be wrong. Six bits rejects about
 * 98.4% of wrong entries; the remaining 1.6% are caught by the eye, because the
 * lookup page shows the puzzle grid next to the solution and it will not be the
 * grid on the reader's sheet.
 *
 * Spending six bits leaves 4.2 million seeds per difficulty, so two people
 * landing on the same puzzle stays vanishingly unlikely.
 *
 * Crockford's alphabet omits I, L, O and U, so there is no 1/I or 0/O ambiguity
 * when reading a code off a printed sheet.
 */

import { DIFFICULTY_KEYS, type DifficultyKey } from './sudoku';

const ALPHABET = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';
export const CODE_LENGTH = 6;
const SEED_BITS = 22;
const CHECK_BITS = 6;
const CHECK_MASK = (1 << CHECK_BITS) - 1;
const CHECK_SPACE = 1 << CHECK_BITS;
export const MAX_SEED = 2 ** SEED_BITS; // 4,194,304 puzzles per difficulty

function checksum(payload: number): number {
  let h = payload >>> 0;
  h = Math.imul(h ^ (h >>> 15), 0x2c1b3c6d);
  h ^= h >>> 12;
  h = Math.imul(h, 0x297a2d39);
  h ^= h >>> 15;
  return h & CHECK_MASK;
}

export function encodePuzzleCode(difficulty: DifficultyKey, seed: number): string {
  const diffIndex = DIFFICULTY_KEYS.indexOf(difficulty);
  const payload = ((seed % MAX_SEED) * 4 + diffIndex) >>> 0;
  const value = payload * CHECK_SPACE + checksum(payload);

  let out = '';
  let rest = value;
  for (let i = 0; i < CODE_LENGTH; i++) {
    out = ALPHABET[rest % 32] + out;
    rest = Math.floor(rest / 32);
  }
  return out;
}

/**
 * Tidy up what someone actually typed: case, the leading #, spaces and dashes,
 * and the letters Crockford treats as digits.
 */
export function normalisePuzzleCode(input: string): string {
  return input
    .toUpperCase()
    .replace(/[IL]/g, '1')
    .replace(/O/g, '0')
    .replace(/[^0-9A-Z]/g, '');
}

export type CodeError = 'empty' | 'length' | 'charset' | 'checksum';

export function decodePuzzleCode(
  input: string,
): { difficulty: DifficultyKey; seed: number; code: string } | { error: CodeError } {
  const code = normalisePuzzleCode(input);
  if (!code) return { error: 'empty' };
  if (code.length !== CODE_LENGTH) return { error: 'length' };

  let value = 0;
  for (const ch of code) {
    const digit = ALPHABET.indexOf(ch);
    if (digit < 0) return { error: 'charset' };
    value = value * 32 + digit;
  }

  const payload = Math.floor(value / CHECK_SPACE);
  if (checksum(payload) !== value % CHECK_SPACE) return { error: 'checksum' };

  return {
    difficulty: DIFFICULTY_KEYS[payload % 4],
    seed: Math.floor(payload / 4),
    code,
  };
}

/** A fresh seed for a newly generated puzzle. */
export function randomSeed(): number {
  return Math.floor(Math.random() * MAX_SEED);
}
