/**
 * Regenerates src/lib/samples.ts — one pre-generated puzzle per difficulty.
 *
 * The samples are baked into the bundle so every generator page ships a real,
 * crawlable puzzle grid in its server-rendered HTML. Because generation is
 * deterministic, the codes printed on these samples are genuine: paste one into
 * /sudoku-answers and the same grid comes back. Run with `npm run samples`.
 */
import { writeFileSync, mkdtempSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { tmpdir } from 'node:os';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

/*
 * Compile the engine to plain JS first. Node's type stripping cannot follow
 * TypeScript's extensionless imports, and these modules import each other.
 */
const out = mkdtempSync(join(tmpdir(), 'sudoku-samples-'));
process.on('exit', () => rmSync(out, { recursive: true, force: true }));
execFileSync(
  'npx',
  ['tsc', 'src/lib/sudoku.ts', 'src/lib/puzzle-code.ts', '--outDir', out,
   '--module', 'commonjs', '--target', 'ES2020', '--skipLibCheck'],
  { cwd: root, stdio: 'inherit' },
);
writeFileSync(join(out, 'package.json'), '{"type":"commonjs"}');

const load = createRequire(join(out, 'noop.cjs'));
const { buildPuzzle, DIFFICULTY_KEYS, DIFF_RANGES } = load('./sudoku.js');
const { encodePuzzleCode, randomSeed } = load('./puzzle-code.js');

/** Take the sparsest of a few attempts so the sample lands inside its clue range. */
function bestPuzzle(diff) {
  let best = null;
  for (let i = 0; i < 8; i++) {
    const seed = randomSeed();
    const p = buildPuzzle(diff, seed, encodePuzzleCode(diff, seed));
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
  console.log(`${d}: #${p.code} (seed ${p.seed}), ${p.clueCount} clues`);
  return `  ${d}: {
    code: '${p.code}',
    seed: ${p.seed},
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
 * in \`sudoku.ts\`, so each is solver-verified to have exactly one solution —
 * and because generation is deterministic, each code below really does resolve
 * back to this grid on /sudoku-answers.
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
