'use client';

import { useEffect, useRef, useState } from 'react';
import { PreviewSheet } from './preview-sheet';
import { usePuzzleWorker } from './use-puzzle-worker';
import { getDictionary } from '@/i18n/dictionary';
import type { Locale } from '@/i18n/config';
import { CODE_LENGTH, normalisePuzzleCode } from '@/lib/puzzle-code';
import type { Puzzle } from '@/lib/sudoku';

export function AnswerLookup({ sample, locale }: { sample: Puzzle; locale: Locale }) {
  const dict = getDictionary(locale);
  const t = dict.lookup;
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
        setError(t.messages[outcome.error]);
      } else {
        setFound(outcome.puzzle);
        window.setTimeout(
          () => resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }),
          0,
        );
      }
    } catch (err) {
      setFound(null);
      setError(err instanceof Error ? err.message : t.genericError);
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
          {t.codeLabel}
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
            {busy ? t.submitBusy : t.submitIdle}
          </button>
        </div>
        <p id="puzzle-code-hint" className="mt-2 font-mono text-[10.5px] leading-relaxed text-ink-soft">
          {t.hintPrefix(CODE_LENGTH)}
          <span className="text-ink">#{sample.code}</span>
          {t.hintSuffix}
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
            {t.noscript}
          </p>
        </noscript>
      </form>

      {found && (
        <div ref={resultRef} className="mt-10">
          <h2 className="m-0 font-display text-[20px] font-bold">
            {t.resultHeading(found.code, dict.difficultyLabel[found.difficulty], found.clueCount)}
          </h2>
          <p className="mb-6 mt-2 max-w-prose text-[14.5px] leading-relaxed text-ink-soft">{t.resultIntro}</p>
          <div className="flex flex-wrap justify-center gap-8 shelf:justify-start">
            <PreviewSheet
              cells={found.clues}
              code={found.code}
              difficulty={found.difficulty}
              clueCount={found.clueCount}
              locale={locale}
              caption={t.puzzleCaption(dict.difficultyLabel[found.difficulty], found.clueCount)}
              label={t.puzzleAriaLabel(found.code)}
              status={t.puzzleStatus}
            />
            <PreviewSheet
              cells={found.solution}
              code={found.code}
              difficulty={found.difficulty}
              clueCount={found.clueCount}
              locale={locale}
              caption={t.solutionCaption(found.code)}
              label={t.solutionAriaLabel(found.code)}
              status={t.solutionStatus}
            />
          </div>
        </div>
      )}
    </div>
  );
}
