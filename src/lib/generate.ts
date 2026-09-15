/**
 * Ties the engine to the code format: making new puzzles, planning a mixed run,
 * and resolving a printed code back into the puzzle it names.
 */

import { DIFFICULTY_KEYS, buildPuzzle, type DifficultyKey, type Puzzle } from './sudoku';
import { decodePuzzleCode, encodePuzzleCode, randomSeed, type CodeError } from './puzzle-code';

export function newPuzzle(difficulty: DifficultyKey): Puzzle {
  const seed = randomSeed();
  return buildPuzzle(difficulty, seed, encodePuzzleCode(difficulty, seed));
}

/**
 * Decide which difficulty each puzzle in a run should be.
 *
 * Levels are dealt out round-robin so the split is as even as the count allows
 * — asking for ten puzzles across easy and medium gives five of each, not a
 * random seven and three — then ordered easiest first, which is how you want a
 * printed pack to read.
 */
export function buildRunPlan(count: number, difficulties: DifficultyKey[]): DifficultyKey[] {
  const chosen = DIFFICULTY_KEYS.filter((d) => difficulties.includes(d));
  const pool = chosen.length ? chosen : ['medium' as DifficultyKey];
  const plan: DifficultyKey[] = [];
  for (let i = 0; i < count; i++) plan.push(pool[i % pool.length]);
  return plan.sort((a, b) => DIFFICULTY_KEYS.indexOf(a) - DIFFICULTY_KEYS.indexOf(b));
}

export type LookupResult = { puzzle: Puzzle } | { error: CodeError };

/** Rebuild the puzzle a printed code refers to. */
export function lookupPuzzle(input: string): LookupResult {
  const decoded = decodePuzzleCode(input);
  if ('error' in decoded) return decoded;
  return { puzzle: buildPuzzle(decoded.difficulty, decoded.seed, decoded.code) };
}
