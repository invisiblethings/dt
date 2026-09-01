import type { DifficultyKey } from '@/lib/sudoku';

interface PreviewSheetProps {
  cells: number[];
  id: number;
  difficulty: DifficultyKey;
  clueCount: number;
  /** Small caption in the bottom-right of the sheet. */
  status?: string;
  /** Replaces the default "difficulty - clues" line in the bottom-left. */
  caption?: string;
  /** Overrides the grid's accessible description. */
  label?: string;
}

/**
 * The tilted proof sheet from the prototype: a 9x9 grid with heavy 3x3 rules
 * and a rubber-stamp difficulty badge. Rendered on the server so the puzzle is
 * in the HTML on first paint.
 */
export function PreviewSheet({
  cells,
  id,
  difficulty,
  clueCount,
  status,
  caption,
  label,
}: PreviewSheetProps) {
  return (
    // The rubber stamp hangs 26px past the sheet's top-right corner, so the
    // wrapper reserves room for it — without this the page scrolls sideways
    // wherever the sheet sits flush against the edge of the shell.
    <div className="w-full max-w-[420px] px-7">
      <div className="relative -rotate-[1.1deg] rounded-sm bg-white p-[30px_28px_26px] shadow-sheet">
        <p
          className="absolute -right-[26px] -top-[26px] m-0 flex h-[74px] w-[74px] rotate-[11deg] items-center justify-center rounded-full border-[2.5px] border-dashed border-stamp-green bg-white/85 text-center font-mono text-[10px] font-medium uppercase leading-tight tracking-[0.5px] text-stamp-green"
          aria-hidden="true"
        >
          {difficulty}
          <br />
          run
        </p>

        <div className="mb-3.5 flex items-baseline justify-between pr-9 font-mono text-[10.5px] tracking-[0.3px] text-ink-soft">
          <span>#{id}</span>
          <span>grid press</span>
        </div>

        <div
          role="img"
          aria-label={
            label ?? `Sample ${difficulty} sudoku puzzle grid with ${clueCount} starting clues`
          }
          className="grid aspect-square w-full grid-cols-9 grid-rows-9 border-2 border-ink"
        >
          {cells.map((value, i) => {
            const row = Math.floor(i / 9);
            const col = i % 9;
            const heavyRight = (col + 1) % 3 === 0 && col !== 8;
            const heavyBottom = (row + 1) % 3 === 0 && row !== 8;
            return (
              <span
                key={i}
                aria-hidden="true"
                className={[
                  'flex items-center justify-center font-mono text-[clamp(11px,2.6vw,15px)] text-ink',
                  heavyRight ? 'border-r-2 border-r-ink' : 'border-r border-r-rule',
                  heavyBottom ? 'border-b-2 border-b-ink' : 'border-b border-b-rule',
                ].join(' ')}
              >
                {value === 0 ? '' : value}
              </span>
            );
          })}
        </div>

        <div className="mt-3.5 flex justify-between font-mono text-[10.5px] text-ink-soft">
          <span>{caption ?? `difficulty: ${difficulty} · ${clueCount} clues`}</span>
          <span>{status ?? 'proof copy'}</span>
        </div>
      </div>
    </div>
  );
}
