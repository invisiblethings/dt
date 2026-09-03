'use client';

import { useEffect, useRef, useState } from 'react';
import { PreviewSheet } from './preview-sheet';
import { usePuzzleWorker } from './use-puzzle-worker';
import { CODE_LENGTH, normalisePuzzleCode } from '@/lib/puzzle-code';
import type { CodeError } from '@/lib/puzzle-code';
import type { Puzzle } from '@/lib/sudoku';

const MESSAGES: Record<CodeError, string> = {
  empty: 'Enter the code printed under your puzzle.',
  length: `A puzzle code is ${CODE_LENGTH} characters — check you have all of it.`,
  charset: 'That code has a character we do not use. Codes never contain I, L, O or U.',
  checksum:
    'That is not a code we could have printed — most likely one character has been read wrong. Worth another look at the sheet.',
};

export function AnswerLookup({ sample }: { sample: Puzzle }) {
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [found, setFound] = useState<Puzzle | null>(null);
  const { lookup } = usePuzzleWorker();
  const resultRef = useRef<HTMLDivElement | null>(null);

  async function resolve(raw: string) {
    const code = normalisePuzzleCode(raw);
    setBusy(true);
    setError(null);
    try {
      const outcome = await lookup(code);
      if ('error' in outcome) {
        setFound(null);
        setError(MESSAGES[outcome.error]);
      } else {
        setFound(outcome.puzzle);
        window.setTimeout(
          () => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }),
          0,
        );
      }
    } catch (err) {
      setFound(null);
      setError(err instanceof Error ? err.message : 'Something went wrong looking that up.');
    } finally {
      setBusy(false);
    }
  }

  /*
   * Allow /sudoku-answers?code=XXXXXX so a code can be linked or bookmarked.
   * Read straight off location rather than through useSearchParams, which would
   * force this page out of the static export and into client-side rendering.
   */
  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get('code');
    if (fromUrl) {
      setInput(normalisePuzzleCode(fromUrl));
      void resolve(fromUrl);
    }
    // Only on first paint; later lookups come from the form.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          void resolve(input);
        }}
        className="press-card p-[26px]"
      >
        <label htmlFor="puzzle-code" className="mb-1.5 block text-[12.5px] font-semibold tracking-[0.3px]">
          Puzzle code
        </label>
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            id="puzzle-code"
            value={input}
            onChange={(e) => setInput(e.target.value.toUpperCase())}
            placeholder={sample.code}
            autoCapitalize="characters"
            autoCorrect="off"
            spellCheck={false}
            maxLength={12}
            aria-describedby="puzzle-code-hint"
            aria-invalid={error ? true : undefined}
            className="w-full rounded-sm border border-rule bg-white px-3 py-2.5 font-mono text-[18px] uppercase tracking-[3px] text-ink sm:w-[13ch]"
          />
          <button
            type="submit"
            disabled={busy}
            className="rounded-sm bg-stamp px-5 py-2.5 font-display text-[14px] font-bold tracking-[0.4px] text-white transition-colors hover:bg-stamp-dark disabled:cursor-default disabled:bg-[#B8AF9C]"
          >
            {busy ? 'Working it out…' : 'Show the solution'}
          </button>
        </div>
        <p id="puzzle-code-hint" className="mt-2 font-mono text-[10.5px] leading-relaxed text-ink-soft">
          The {CODE_LENGTH}-character code printed under the grid, like{' '}
          <span className="text-ink">#{sample.code}</span>. Case does not matter.
        </p>

        <div aria-live="polite">
          {error && (
            <p className="mt-3 rounded-sm border border-stamp/40 bg-stamp/5 px-3 py-2.5 text-[13.5px] leading-relaxed text-stamp-dark">
              {error}
            </p>
          )}
        </div>

        <noscript>
          <p className="mt-4 rounded-sm border border-rule bg-white p-3 font-mono text-[11px] leading-relaxed text-ink-soft">
            Solutions are worked out in your browser, so this lookup needs JavaScript switched on.
          </p>
        </noscript>
      </form>

      {found && (
        <div ref={resultRef} className="mt-10">
          <h2 className="m-0 font-display text-[20px] font-bold">
            Puzzle #{found.code} — {found.difficulty}, {found.clueCount} clues
          </h2>
          <p className="mb-6 mt-2 max-w-prose text-[14.5px] leading-relaxed text-ink-soft">
            The grid on the left is the puzzle as it was printed; on the right is its solution, the
            only one it has. Give the left-hand grid a glance against your sheet before you trust
            the answer — if it is not your puzzle, a character in the code was read wrong.
          </p>
          <div className="flex flex-wrap justify-center gap-8 shelf:justify-start">
            <PreviewSheet
              cells={found.clues}
              code={found.code}
              difficulty={found.difficulty}
              clueCount={found.clueCount}
              caption={`difficulty: ${found.difficulty} · ${found.clueCount} clues`}
              label={`The original puzzle grid for #${found.code}`}
              status="the puzzle"
            />
            <PreviewSheet
              cells={found.solution}
              code={found.code}
              difficulty={found.difficulty}
              clueCount={found.clueCount}
              caption={`solution to #${found.code}`}
              label={`The completed solution grid for puzzle #${found.code}`}
              status="the solution"
            />
          </div>
        </div>
      )}
    </div>
  );
}
