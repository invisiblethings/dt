/// <reference lib="webworker" />

/**
 * Batch puzzle generation, moved off the main thread so a 60-puzzle run never
 * blocks the UI. Progress is streamed back one puzzle at a time.
 */

import { makePuzzle, randomId, resolveDifficulty } from '@/lib/sudoku';
import type { DifficultyChoice, Puzzle } from '@/lib/sudoku';

export interface WorkerRequest {
  type: 'generate';
  count: number;
  difficulty: DifficultyChoice;
}

export type WorkerResponse =
  | { type: 'progress'; done: number; total: number; puzzle: Puzzle }
  | { type: 'done'; puzzles: Puzzle[] }
  | { type: 'error'; message: string };

const ctx = self as unknown as DedicatedWorkerGlobalScope;

ctx.addEventListener('message', (event: MessageEvent<WorkerRequest>) => {
  const data = event.data;
  if (!data || data.type !== 'generate') return;

  try {
    const total = Math.max(1, Math.min(60, Math.floor(data.count)));
    const puzzles: Puzzle[] = [];
    for (let i = 0; i < total; i++) {
      const puzzle = makePuzzle(resolveDifficulty(data.difficulty), randomId());
      puzzles.push(puzzle);
      ctx.postMessage({ type: 'progress', done: i + 1, total, puzzle } satisfies WorkerResponse);
    }
    ctx.postMessage({ type: 'done', puzzles } satisfies WorkerResponse);
  } catch (err) {
    ctx.postMessage({
      type: 'error',
      message: err instanceof Error ? err.message : 'Puzzle generation failed.',
    } satisfies WorkerResponse);
  }
});
