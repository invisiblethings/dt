'use client';

import { useCallback, useEffect, useRef } from 'react';
import type { DifficultyKey, Puzzle } from '@/lib/sudoku';
import type { CodeError } from '@/lib/puzzle-code';
import type { WorkerRequest, WorkerResponse } from '@/workers/sudoku.worker';

export type LookupOutcome = { puzzle: Puzzle } | { error: CodeError };

/**
 * Lazy access to the puzzle worker, shared by the generator and the answer
 * lookup.
 *
 * The worker bundle is only fetched on the first call, which keeps the engine
 * out of the initial page bundle. Where workers are unavailable the same code
 * is imported directly instead — still lazily, just on the main thread.
 */
export function usePuzzleWorker() {
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    return () => {
      workerRef.current?.terminate();
      workerRef.current = null;
    };
  }, []);

  const send = useCallback(
    <T,>(
      request: WorkerRequest,
      onMessage: (msg: WorkerResponse, settle: (value: T) => void, fail: (e: Error) => void) => void,
      fallback: () => Promise<T>,
    ) =>
      new Promise<T>((resolve, reject) => {
        if (typeof Worker === 'undefined') {
          fallback().then(resolve, reject);
          return;
        }

        try {
          workerRef.current ??= new Worker(new URL('../workers/sudoku.worker.ts', import.meta.url));
        } catch {
          fallback().then(resolve, reject);
          return;
        }

        const worker = workerRef.current;
        const cleanup = () => {
          worker.removeEventListener('message', handle);
          worker.removeEventListener('error', handleError);
        };
        const settle = (value: T) => {
          cleanup();
          resolve(value);
        };
        const fail = (err: Error) => {
          cleanup();
          reject(err);
        };
        function handle(event: MessageEvent<WorkerResponse>) {
          if (event.data.type === 'error') fail(new Error(event.data.message));
          else onMessage(event.data, settle, fail);
        }
        function handleError() {
          fail(new Error('The puzzle engine could not start.'));
        }

        worker.addEventListener('message', handle);
        worker.addEventListener('error', handleError);
        worker.postMessage(request);
      }),
    [],
  );

  const generate = useCallback(
    (
      count: number,
      difficulties: DifficultyKey[],
      onProgress: (done: number, total: number, puzzle: Puzzle) => void,
    ) =>
      send<Puzzle[]>(
        { type: 'generate', count, difficulties },
        (msg, settle) => {
          if (msg.type === 'progress') onProgress(msg.done, msg.total, msg.puzzle);
          else if (msg.type === 'done') settle(msg.puzzles);
        },
        async () => {
          const { buildRunPlan, newPuzzle } = await import('@/lib/generate');
          const plan = buildRunPlan(count, difficulties);
          const puzzles: Puzzle[] = [];
          for (let i = 0; i < count; i++) {
            const puzzle = newPuzzle(plan[i]);
            puzzles.push(puzzle);
            onProgress(i + 1, count, puzzle);
            await new Promise((r) => setTimeout(r, 0));
          }
          return puzzles;
        },
      ),
    [send],
  );

  const lookup = useCallback(
    (code: string) =>
      send<LookupOutcome>(
        { type: 'lookup', code },
        (msg, settle) => {
          if (msg.type === 'found') settle({ puzzle: msg.puzzle });
          else if (msg.type === 'notFound') settle({ error: msg.reason });
        },
        async () => (await import('@/lib/generate')).lookupPuzzle(code),
      ),
    [send],
  );

  return { generate, lookup };
}
