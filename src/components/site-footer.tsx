import Link from 'next/link';
import { DIFFICULTY_ORDER } from '@/content/difficulty';
import { localizedPath, type Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/dictionary';

export function SiteFooter({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const L = (path: string) => localizedPath(locale, path);
  const d = dict.footer;

  const COLUMNS: { heading: string; links: { href: string; label: string }[] }[] = [
    {
      heading: d.printableSudoku.heading,
      links: [
        { href: L('/'), label: d.printableSudoku.generator },
        { href: L('/printable-sudoku'), label: d.printableSudoku.allLevels },
        { href: L('/printable-sudoku-with-answers'), label: d.printableSudoku.withAnswers },
        { href: L('/printable-sudoku-4-per-page'), label: d.printableSudoku.fourPerPage },
        { href: L('/sudoku-answers'), label: d.printableSudoku.answerLookup },
      ],
    },
    {
      heading: d.byDifficulty.heading,
      links: DIFFICULTY_ORDER.map((level) => ({
        href: L(`/printable-sudoku/${level}`),
        label: `${d.printableSudoku.heading} — ${dict.difficultyLabel[level]}`,
      })),
    },
    {
      heading: d.guides.heading,
      links: [
        { href: L('/guides'), label: d.guides.all },
        { href: L('/guides/how-to-solve-sudoku'), label: d.guides.howToSolve },
        { href: L('/guides/sudoku-solving-techniques'), label: d.guides.techniques },
        { href: L('/guides/how-to-print-sudoku-puzzles'), label: d.guides.howToPrint },
      ],
    },
    {
      heading: d.site.heading,
      links: [
        { href: L('/about'), label: d.site.about },
        { href: L('/privacy'), label: d.site.privacy },
      ],
    },
  ];

  return (
    <footer className="mt-20 border-t border-line bg-paper-deep/40">
      <div className="mx-auto max-w-shell px-6 py-12">
        <nav aria-label={d.ariaLabel}>
          <div className="grid gap-8 sm:grid-cols-2 shelf:grid-cols-4">
            {COLUMNS.map((col) => (
              <div key={col.heading}>
                <h2 className="mb-3 font-display text-[13px] font-bold uppercase tracking-[0.8px] text-ink">
                  {col.heading}
                </h2>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-[13.5px] text-ink-soft no-underline hover:text-stamp hover:underline"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </nav>

        <div className="mt-10 flex flex-col gap-2 border-t border-line pt-6 font-mono text-[11.5px] text-ink-soft shelf:flex-row shelf:items-center shelf:justify-between">
          <p className="m-0">{d.tagline}</p>
          <p className="m-0">{d.copyright(new Date().getFullYear())}</p>
        </div>
      </div>
    </footer>
  );
}
