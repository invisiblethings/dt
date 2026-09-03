/**
 * Sudoku engine — ported from the original single-file prototype, then made
 * deterministic.
 *
 * Generation is a randomised backtracking fill for a complete grid, followed by
 * a removal loop that only keeps a clue removed when the puzzle still solves to
 * exactly one solution. Uniqueness is verified by a bitmask solver with an MRV
 * (minimum remaining values) heuristic, capped at two solutions.
 *
 * DETERMINISM — please read before changing anything below.
 *
 * A puzzle is a pure function of (difficulty, seed). That is what lets someone
 * type the code printed under a grid into /sudoku-answers weeks later and get
 * the same puzzle back, with no database and nothing ever leaving the browser.
 * Two rules follow:
 *
 *   1. Nothing here may use Math.random(), the clock, or anything else that
 *      varies between machines. All randomness comes from the seeded PRNG.
 *   2. Changing the order of PRNG calls, the fill order, or the removal loop
 *      changes what every existing code resolves to. Codes already printed on
 *      paper would silently start returning a different grid. Treat this file
 *      as a published format, not as ordinary code.
 *
 * This module is pure and DOM-free so it runs on the server (for the baked-in
 * sample grids) and inside a Web Worker (for batch generation and lookups).
 */

export type DifficultyKey = 'easy' | 'medium' | 'hard' | 'expert';

export interface Puzzle {
  /** Short code printed under the grid, e.g. "K7M2A9". */
  code: string;
  /** The seed the puzzle was generated from. */
  seed: number;
  difficulty: DifficultyKey;
  /** 81 cells, row-major. 0 = empty. */
  clues: number[];
  /** 81 cells, row-major. The unique solution. */
  solution: number[];
  clueCount: number;
}

export const DIFF_RANGES: Record<DifficultyKey, [number, number]> = {
  easy: [38, 45],
  medium: [30, 37],
  hard: [25, 29],
  expert: [20, 24],
};

/** Easiest to hardest. The order is relied on when a run mixes levels. */
export const DIFFICULTY_KEYS: DifficultyKey[] = ['easy', 'medium', 'hard', 'expert'];

export type Rng = () => number;

/**
 * mulberry32 — small, fast, and identical on every engine because it is all
 * integer arithmetic plus one division.
 */
export function makeRng(seed: number): Rng {
  let a = seed >>> 0;
  return function rng() {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle<T>(arr: T[], rng: Rng): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function boxOf(r: number, c: number): number {
  return Math.floor(r / 3) * 3 + Math.floor(c / 3);
}

/** Randomised backtracking fill producing a complete, valid 9x9 grid. */
export function generateSolved(rng: Rng): number[] {
  const cells = new Array<number>(81).fill(0);
  const rows = new Array<number>(9).fill(0);
  const cols = new Array<number>(9).fill(0);
  const boxes = new Array<number>(9).fill(0);

  function fill(pos: number): boolean {
    if (pos === 81) return true;
    const r = Math.floor(pos / 9);
    const c = pos % 9;
    const b = boxOf(r, c);
    const used = rows[r] | cols[c] | boxes[b];
    const nums = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9], rng);
    for (const n of nums) {
      const bit = 1 << (n - 1);
      if (used & bit) continue;
      cells[pos] = n;
      rows[r] |= bit;
      cols[c] |= bit;
      boxes[b] |= bit;
      if (fill(pos + 1)) return true;
      cells[pos] = 0;
      rows[r] &= ~bit;
      cols[c] &= ~bit;
      boxes[b] &= ~bit;
    }
    return false;
  }

  fill(0);
  return cells;
}

/**
 * Count solutions of a grid, stopping once `cap` solutions have been found.
 * Uses bitmask candidate sets plus an MRV heuristic to pick the next cell.
 */
export function countSolutions(grid: number[], cap: number): number {
  const cells = grid.slice();
  const rows = new Array<number>(9).fill(0);
  const cols = new Array<number>(9).fill(0);
  const boxes = new Array<number>(9).fill(0);

  for (let i = 0; i < 81; i++) {
    if (cells[i] !== 0) {
      const r = Math.floor(i / 9);
      const c = i % 9;
      const b = boxOf(r, c);
      rows[r] |= 1 << (cells[i] - 1);
      cols[c] |= 1 << (cells[i] - 1);
      boxes[b] |= 1 << (cells[i] - 1);
    }
  }

  let count = 0;

  function backtrack(): void {
    if (count >= cap) return;
    let best = -1;
    let bestCount = 10;
    for (let i = 0; i < 81; i++) {
      if (cells[i] === 0) {
        const r = Math.floor(i / 9);
        const c = i % 9;
        const b = boxOf(r, c);
        const used = rows[r] | cols[c] | boxes[b];
        let cands = 0;
        for (let n = 1; n <= 9; n++) {
          if (!(used & (1 << (n - 1)))) cands++;
        }
        if (cands < bestCount) {
          bestCount = cands;
          best = i;
          if (cands === 0) break;
        }
      }
    }
    if (best === -1) {
      count++;
      return;
    }
    if (bestCount === 0) return;
    const r = Math.floor(best / 9);
    const c = best % 9;
    const b = boxOf(r, c);
    const used = rows[r] | cols[c] | boxes[b];
    for (let n = 1; n <= 9; n++) {
      const bit = 1 << (n - 1);
      if (used & bit) continue;
      cells[best] = n;
      rows[r] |= bit;
      cols[c] |= bit;
      boxes[b] |= bit;
      backtrack();
      cells[best] = 0;
      rows[r] &= ~bit;
      cols[c] &= ~bit;
      boxes[b] &= ~bit;
      if (count >= cap) return;
    }
  }

  backtrack();
  return count;
}

/**
 * Build the puzzle for a given difficulty and seed. A clue is only removed when
 * the remaining grid still has exactly one solution, so every puzzle returned
 * here is solver-verified as unique.
 *
 * The prototype bailed out of the removal loop on a wall clock budget. That has
 * been dropped: it made the result depend on how fast the machine was, and
 * measurement showed the full loop costs about 1ms for an easy puzzle and 9ms
 * for an expert one, so there was nothing to protect against.
 */
export function buildPuzzle(diffKey: DifficultyKey, seed: number, code: string): Puzzle {
  const rng = makeRng(seed);
  const solution = generateSolved(rng);
  const clues = solution.slice();
  const [lo, hi] = DIFF_RANGES[diffKey];
  const target = lo + Math.floor(rng() * (hi - lo + 1));
  const positions = shuffle([...Array(81).keys()], rng);
  let clueCount = 81;

  for (const pos of positions) {
    if (clueCount <= target) break;
    const backup = clues[pos];
    if (backup === 0) continue;
    clues[pos] = 0;
    if (countSolutions(clues, 2) === 1) {
      clueCount--;
    } else {
      clues[pos] = backup;
    }
  }

  return { code, seed, difficulty: diffKey, clues, solution, clueCount };
}
