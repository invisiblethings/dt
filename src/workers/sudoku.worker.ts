/// <reference lib="webworker" />

/**
 * Puzzle work, moved off the main thread so a 60-puzzle run never blocks the
 * UI and an answer lookup never freezes the page while it rebuilds a grid.
 */

import { buildRunPlan, lookupPuzzle, newPuzzle } from '@/lib/generate';
import type { DifficultyKey, Puzzle } from '@/lib/sudoku';
import type { CodeError } from '@/lib/puzzle-code';

export type WorkerRequest =
  | { type: 'generate'; count: number; difficulties: DifficultyKey[] }
  | { type: 'lookup'; code: string };

export type WorkerResponse =
  | { type: 'progress'; done: number; total: number; puzzle: Puzzle }
  | { type: 'done'; puzzles: Puzzle[] }
  | { type: 'found'; puzzle: Puzzle }
  | { type: 'notFound'; reason: CodeError }
  | { type: 'error'; message: string };

const ctx = self as unknown as DedicatedWorkerGlobalScope;

ctx.addEventListener('message', (event: MessageEvent<WorkerRequest>) => {
  const data = event.data;
  if (!data) return;

  try {
    if (data.type === 'generate') {
      const total = Math.max(1, Math.min(60, Math.floor(data.count)));
      const plan = buildRunPlan(total, data.difficulties);
      const puzzles: Puzzle[] = [];
      for (let i = 0; i < total; i++) {
        const puzzle = newPuzzle(plan[i]);
        puzzles.push(puzzle);
        ctx.postMessage({ type: 'progress', done: i + 1, total, puzzle } satisfies WorkerResponse);
      }
      ctx.postMessage({ type: 'done', puzzles } satisfies WorkerResponse);
      return;
    }

    if (data.type === 'lookup') {
      const result = lookupPuzzle(data.code);
      ctx.postMessage(
        ('error' in result
          ? { type: 'notFound', reason: result.error }
          : { type: 'found', puzzle: result.puzzle }) satisfies WorkerResponse,
      );
    }
  } catch (err) {
    ctx.postMessage({
      type: 'error',
      message: err instanceof Error ? err.message : 'Something went wrong.',
    } satisfies WorkerResponse);
  }
});
