import Link from 'next/link';
import { DIFFICULTY_CONTENT, DIFFICULTY_ORDER } from '@/content/difficulty';
import type { DifficultyKey } from '@/lib/sudoku';

/** Internal-linking block used on the homepage, the hub and each difficulty page. */
export function DifficultyCards({ exclude }: { exclude?: DifficultyKey }) {
  return (
    <ul className="grid list-none gap-4 p-0 sm:grid-cols-2">
      {DIFFICULTY_ORDER.filter((key) => key !== exclude).map((key) => {
        const d = DIFFICULTY_CONTENT[key];
        return (
          <li key={key}>
            <Link
              href={`/printable-sudoku/${key}`}
              className="press-card group block h-full p-5 no-underline transition-colors hover:border-stamp/60"
            >
              <span className="flex items-baseline justify-between gap-3">
                <span className="font-display text-[17px] font-bold text-ink group-hover:text-stamp">
                  Printable sudoku — {d.name.toLowerCase()}
                </span>
                <span className="whitespace-nowrap font-mono text-[10.5px] text-ink-soft">
                  {d.clueRange}
                </span>
              </span>
              <span className="mt-2 block text-[14px] leading-relaxed text-ink-soft">{d.lede}</span>
              <span className="mt-3 block font-mono text-[11px] text-ink-soft">
                typical solve: {d.typicalTime}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
