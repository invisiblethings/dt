'use client';

import { useEffect, useRef, useState } from 'react';
import { PreviewSheet } from './preview-sheet';
import { usePuzzleWorker } from './use-puzzle-worker';
import type { DifficultyKey, Puzzle } from '@/lib/sudoku';
import { DIFFICULTY_KEYS } from '@/lib/sudoku';
import type { PageSize, PerPage } from '@/lib/pdf';

/** Reads "easy", "easy + medium", "easy, medium + hard". */
function describeDifficulties(levels: DifficultyKey[]): string {
  if (levels.length === 0) return 'none selected';
  if (levels.length === DIFFICULTY_KEYS.length) return 'all levels';
  if (levels.length === 1) return levels[0];
  return `${levels.slice(0, -1).join(', ')} + ${levels[levels.length - 1]}`;
}

const PER_PAGE_OPTIONS: PerPage[] = [1, 2, 4, 6];

export interface GeneratorProps {
  /** Sample rendered on the server so the sheet is real HTML on first paint. */
  sample: Puzzle;
  defaultDifficulties?: DifficultyKey[];
  defaultCount?: number;
  defaultPerPage?: PerPage;
  defaultPageSize?: PageSize;
  defaultIncludeSolutions?: boolean;
  /** Overrides the card heading so landing pages can phrase it their own way. */
  heading?: string;
  subheading?: string;
}

type Phase = 'idle' | 'generating' | 'laying-out' | 'ready' | 'error';

export function Generator({
  sample,
  defaultDifficulties = ['medium'],
  defaultCount = 6,
  defaultPerPage = 2,
  defaultPageSize = 'a4',
  defaultIncludeSolutions = true,
  heading = 'Set the run',
  subheading = 'configure the batch before printing',
}: GeneratorProps) {
  const [count, setCount] = useState(String(defaultCount));
  const [difficulties, setDifficulties] = useState<DifficultyKey[]>(defaultDifficulties);
  const [perPage, setPerPage] = useState<PerPage>(defaultPerPage);
  const [pageSize, setPageSize] = useState<PageSize>(defaultPageSize);
  const [includeSolutions, setIncludeSolutions] = useState(defaultIncludeSolutions);

  const [phase, setPhase] = useState<Phase>('idle');
  const [progress, setProgress] = useState({ done: 0, total: 0 });
  const [statusLine, setStatusLine] = useState('');
  const [preview, setPreview] = useState<Puzzle>(sample);
  const [previewStatus, setPreviewStatus] = useState('proof copy');
  const [result, setResult] = useState<{
    puzzles: number;
    puzzlePages: number;
    solutionPages: number;
    difficulties: DifficultyKey[];
    includeSolutions: boolean;
    href: string;
    filename: string;
  } | null>(null);

  const urlRef = useRef<string | null>(null);
  const { generate } = usePuzzleWorker();

  useEffect(() => {
    return () => {
      if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    };
  }, []);

  const busy = phase === 'generating' || phase === 'laying-out';

  /** Levels are a multi-select; the last one cannot be turned off. */
  function toggleDifficulty(level: DifficultyKey) {
    setDifficulties((current) => {
      if (current.includes(level)) {
        const next = current.filter((d) => d !== level);
        return next.length ? next : current;
      }
      return DIFFICULTY_KEYS.filter((d) => d === level || current.includes(d));
    });
  }

  async function handleGenerate() {
    const parsed = Number.parseInt(count, 10);
    const n = Number.isNaN(parsed) ? 1 : Math.min(60, Math.max(1, parsed));
    setCount(String(n));

    if (urlRef.current) {
      URL.revokeObjectURL(urlRef.current);
      urlRef.current = null;
    }
    setResult(null);
    setPhase('generating');
    setProgress({ done: 0, total: n });
    setStatusLine(`Setting puzzle 1 of ${n}…`);

    try {
      const puzzles = await generate(n, difficulties, (done, total, puzzle) => {
        setProgress({ done, total });
        setStatusLine(
          `Setting puzzle ${done} of ${total} · #${puzzle.code} · ${puzzle.difficulty} · ${puzzle.clueCount} clues`,
        );
        setPreview(puzzle);
        setPreviewStatus(`puzzle ${done} of ${total}`);
      });

      setPhase('laying-out');
      setStatusLine('Laying out the PDF…');

      const [{ buildPdfBlob, pageCounts }] = await Promise.all([import('@/lib/pdf')]);
      const blob = await buildPdfBlob(puzzles, { perPage, pageSize, includeSolutions });
      const href = URL.createObjectURL(blob);
      urlRef.current = href;

      const { puzzlePages, solutionPages } = pageCounts(puzzles.length, perPage, includeSolutions);

      setResult({
        puzzles: puzzles.length,
        puzzlePages,
        solutionPages,
        difficulties,
        includeSolutions,
        href,
        filename: `printable-sudoku-${difficulties.join('-')}-${puzzles.length}.pdf`,
      });
      setPreview(puzzles[0]);
      setPreviewStatus('puzzle 1 of your run');
      setPhase('ready');
      setStatusLine(`Run complete — ${puzzles.length} puzzles ready to download.`);
    } catch (err) {
      setPhase('error');
      setStatusLine(
        err instanceof Error ? err.message : 'Something went wrong while setting the run.',
      );
    }
  }

  function handleReset() {
    if (urlRef.current) {
      URL.revokeObjectURL(urlRef.current);
      urlRef.current = null;
    }
    setResult(null);
    setPhase('idle');
    setStatusLine('');
    setPreview(sample);
    setPreviewStatus('proof copy');
  }

  const pct = progress.total ? Math.round((progress.done / progress.total) * 100) : 0;

  return (
    <div className="grid items-start gap-8 shelf:grid-cols-[360px_1fr]">
      <section className="press-card p-[26px_26px_28px]" aria-labelledby="generator-heading">
        <h2 id="generator-heading" className="m-0 font-display text-[16px] font-bold">
          {heading}
        </h2>
        <p className="mb-6 mt-1 font-mono text-[11.5px] text-ink-soft">{subheading}</p>

        <div className="mb-[18px]">
          <label htmlFor="gp-count" className="mb-1.5 block text-[12.5px] font-semibold tracking-[0.3px]">
            Number of puzzles
          </label>
          <input
            id="gp-count"
            type="number"
            min={1}
            max={60}
            inputMode="numeric"
            value={count}
            onChange={(e) => setCount(e.target.value)}
            className="w-full rounded-sm border border-rule bg-white px-2.5 py-2 font-mono text-[13.5px] text-ink"
          />
          <p className="mt-1.5 font-mono text-[10.5px] text-ink-soft">
            1–60 · each puzzle is solver-checked for a single solution before it goes in
          </p>
        </div>

        <fieldset className="mb-[18px] border-0 p-0">
          <legend className="mb-1.5 block p-0 text-[12.5px] font-semibold tracking-[0.3px]">
            Difficulty
          </legend>
          <div className="flex overflow-hidden rounded-sm border border-rule">
            {DIFFICULTY_KEYS.map((level) => {
              const on = difficulties.includes(level);
              return (
                <button
                  key={level}
                  type="button"
                  onClick={() => toggleDifficulty(level)}
                  aria-pressed={on}
                  className={[
                    'flex-1 border-r border-rule px-1 py-2 font-mono text-[12px] last:border-r-0',
                    on ? 'bg-ink text-white' : 'bg-white text-ink-soft hover:bg-paper-deep/40',
                  ].join(' ')}
                >
                  {level}
                </button>
              );
            })}
          </div>
          <p className="mt-1.5 font-mono text-[10.5px] text-ink-soft">
            {difficulties.length === 0
              ? 'pick at least one level'
              : difficulties.length === 1
                ? `every puzzle will be ${difficulties[0]}`
                : `mixed run · ${describeDifficulties(difficulties)}, split evenly and ordered easiest first`}
          </p>
        </fieldset>

        <div className="mb-[18px]">
          <label htmlFor="gp-per-page" className="mb-1.5 block text-[12.5px] font-semibold tracking-[0.3px]">
            Puzzles per page
          </label>
          <select
            id="gp-per-page"
            value={perPage}
            onChange={(e) => setPerPage(Number(e.target.value) as PerPage)}
            className="w-full rounded-sm border border-rule bg-white px-2.5 py-2 font-mono text-[13.5px] text-ink"
          >
            {PER_PAGE_OPTIONS.map((n) => (
              <option key={n} value={n}>
                {n} per page
              </option>
            ))}
          </select>
        </div>

        <div className="mb-[18px]">
          <label htmlFor="gp-page-size" className="mb-1.5 block text-[12.5px] font-semibold tracking-[0.3px]">
            Page size
          </label>
          <select
            id="gp-page-size"
            value={pageSize}
            onChange={(e) => setPageSize(e.target.value as PageSize)}
            className="w-full rounded-sm border border-rule bg-white px-2.5 py-2 font-mono text-[13.5px] text-ink"
          >
            <option value="a4">A4 (210 × 297 mm)</option>
            <option value="letter">US Letter (8.5 × 11 in)</option>
          </select>
        </div>

        <div className="mb-[18px]">
          <label className="flex cursor-pointer select-none items-center gap-2.5">
            <input
              type="checkbox"
              checked={includeSolutions}
              onChange={(e) => setIncludeSolutions(e.target.checked)}
              className="h-4 w-4 accent-stamp"
            />
            <span className="text-[13px]">Include an answer key</span>
          </label>
        </div>

        <button
          type="button"
          onClick={handleGenerate}
          disabled={busy}
          className="mt-1.5 w-full rounded-sm bg-stamp px-4 py-3.5 font-display text-[14.5px] font-bold tracking-[0.4px] text-white transition-colors hover:bg-stamp-dark disabled:cursor-default disabled:bg-[#B8AF9C]"
        >
          {busy ? 'Setting the run…' : 'Generate PDF'}
        </button>

        <div className="mt-3.5" aria-live="polite" aria-atomic="true">
          {busy && (
            <div
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={pct}
              aria-label="Puzzle generation progress"
              className="h-1.5 overflow-hidden rounded-full bg-paper-deep"
            >
              <div
                className="h-full bg-stamp transition-[width] duration-150"
                style={{ width: `${pct}%` }}
              />
            </div>
          )}
          {statusLine && (
            <p
              className={[
                'mt-2 font-mono text-[11px]',
                phase === 'error' ? 'text-stamp' : 'text-ink-soft',
              ].join(' ')}
            >
              {statusLine}
            </p>
          )}
        </div>

        <noscript>
          <p className="mt-4 rounded-sm border border-rule bg-white p-3 font-mono text-[11px] leading-relaxed text-ink-soft">
            The PDF is built in your browser, so this generator needs JavaScript switched on.
            Everything else on the page — the puzzle above, the guides, the FAQs — works without
            it.
          </p>
        </noscript>
      </section>

      <div className="flex flex-col items-center pt-1.5">
        <PreviewSheet
          cells={preview.clues}
          code={preview.code}
          difficulty={preview.difficulty as DifficultyKey}
          clueCount={preview.clueCount}
          status={previewStatus}
        />

        {result ? (
          <div className="mt-7 w-full max-w-[420px]">
            <dl className="m-0">
              <ResultRow label="Puzzles set" value={String(result.puzzles)} />
              <ResultRow
                label="Pages"
                value={`${result.puzzlePages + result.solutionPages} (${result.puzzlePages} puzzle, ${result.solutionPages} key)`}
              />
              <ResultRow label="Difficulty" value={describeDifficulties(result.difficulties)} />
              <ResultRow
                label="Answer key"
                value={result.includeSolutions ? 'included' : 'not included'}
              />
            </dl>
            <a
              href={result.href}
              download={result.filename}
              className="mt-4 block rounded-sm bg-ink px-4 py-3 text-center font-display text-[14px] font-bold tracking-[0.3px] text-white no-underline hover:bg-black"
            >
              Download PDF
            </a>
            <button
              type="button"
              onClick={handleReset}
              className="mt-3 w-full text-center font-mono text-[11.5px] text-ink-soft underline"
            >
              start a new run
            </button>
          </div>
        ) : (
          <p className="mt-4 max-w-[420px] text-center font-mono text-[11px] leading-relaxed text-ink-soft">
            This is a live sample puzzle — it updates to your own puzzles once the run finishes.
          </p>
        )}
      </div>
    </div>
  );
}

function ResultRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-dashed border-rule py-1.5 font-mono text-[12.5px] text-ink-soft last:border-b-0">
      <dt>{label}</dt>
      <dd className="m-0 font-semibold text-ink">{value}</dd>
    </div>
  );
}
