/**
 * Regenerates src/lib/samples.ts — one pre-generated puzzle per difficulty.
 *
 * The samples are baked into the bundle so every generator page ships a real,
 * crawlable puzzle grid in its server-rendered HTML. Run with `npm run samples`.
 */
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const { makePuzzle, randomId, DIFFICULTY_KEYS, DIFF_RANGES } = await import('../src/lib/sudoku.ts');

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

/** Take the sparsest of a few attempts so the sample lands inside its clue range. */
function bestPuzzle(diff) {
  let best = null;
  for (let i = 0; i < 8; i++) {
    const p = makePuzzle(diff, randomId());
    if (!best || p.clueCount < best.clueCount) best = p;
    if (best.clueCount <= DIFF_RANGES[diff][1]) break;
  }
  return best;
}

const rows = (cells) =>
  Array.from({ length: 9 }, (_, r) => '      ' + cells.slice(r * 9, r * 9 + 9).join(', ') + ',').join(
    '\n',
  );

const body = DIFFICULTY_KEYS.map((d) => {
  const p = bestPuzzle(d);
  console.log(`${d}: #${p.id}, ${p.clueCount} clues`);
  return `  ${d}: {
    id: ${p.id},
    difficulty: '${d}',
    clueCount: ${p.clueCount},
    clues: [
${rows(p.clues)}
    ],
    solution: [
${rows(p.solution)}
    ],
  },`;
}).join('\n');

const file = `/**
 * Pre-generated sample puzzles, one per difficulty.
 *
 * Baked in so the preview sheet is real, crawlable HTML on first paint rather
 * than something the client has to compute. Each puzzle came out of the engine
 * in \`sudoku.ts\`, so each is solver-verified to have exactly one solution.
 *
 * Regenerate with: npm run samples
 */

import type { DifficultyKey, Puzzle } from './sudoku';

export const SAMPLE_PUZZLES: Record<DifficultyKey, Puzzle> = {
${body}
};
`;

writeFileSync(join(root, 'src/lib/samples.ts'), file);
console.log('wrote src/lib/samples.ts');
