/**
 * Sudoku engine — ported from the original single-file prototype.
 *
 * Generation is a randomized backtracking fill for a complete grid, followed by
 * a removal loop that only keeps a clue removed when the puzzle still solves to
 * exactly one solution. Uniqueness is verified by a bitmask solver with an MRV
 * (minimum remaining values) heuristic, capped at two solutions.
 *
 * This module is pure and DOM-free so it can run on the server (for static
 * sample grids) and inside a Web Worker (for batch generation).
 */

export type DifficultyKey = 'easy' | 'medium' | 'hard' | 'expert';
export type DifficultyChoice = DifficultyKey | 'mixed';

export interface Puzzle {
  id: number;
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

export const DIFFICULTY_KEYS: DifficultyKey[] = ['easy', 'medium', 'hard', 'expert'];

function shuffle<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function boxOf(r: number, c: number): number {
  return Math.floor(r / 3) * 3 + Math.floor(c / 3);
}

/** Randomized backtracking fill producing a complete, valid 9x9 grid. */
export function generateSolved(): number[] {
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
    const nums = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
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

function now(): number {
  return typeof performance !== 'undefined' ? performance.now() : Date.now();
}

/**
 * Build one puzzle at the requested difficulty. A clue is only removed when the
 * remaining grid still has exactly one solution, so every puzzle returned here
 * is solver-verified as unique.
 */
export function makePuzzle(diffKey: DifficultyKey, idNum: number): Puzzle {
  const solution = generateSolved();
  const clues = solution.slice();
  const [lo, hi] = DIFF_RANGES[diffKey];
  const target = lo + Math.floor(Math.random() * (hi - lo + 1));
  const positions = shuffle([...Array(81).keys()]);
  let clueCount = 81;
  const start = now();
  const budget = diffKey === 'expert' ? 1400 : 550;

  for (const pos of positions) {
    if (clueCount <= target) break;
    if (now() - start > budget) break;
    const backup = clues[pos];
    if (backup === 0) continue;
    clues[pos] = 0;
    const solCount = countSolutions(clues, 2);
    if (solCount === 1) {
      clueCount--;
    } else {
      clues[pos] = backup;
    }
  }

  return { id: idNum, difficulty: diffKey, clues, solution, clueCount };
}

export function randomId(): number {
  return Math.floor(100000 + Math.random() * 900000);
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function resolveDifficulty(choice: DifficultyChoice): DifficultyKey {
  return choice === 'mixed' ? pick(DIFFICULTY_KEYS) : choice;
}

/** Generate a batch, yielding to the host between puzzles via `onProgress`. */
export async function generateSet(
  n: number,
  choice: DifficultyChoice,
  onProgress: (done: number, total: number, puzzle: Puzzle) => void,
): Promise<Puzzle[]> {
  const puzzles: Puzzle[] = [];
  for (let i = 0; i < n; i++) {
    const d = resolveDifficulty(choice);
    const p = makePuzzle(d, randomId());
    puzzles.push(p);
    onProgress(i + 1, n, p);
    await new Promise((r) => setTimeout(r, 0));
  }
  return puzzles;
}
