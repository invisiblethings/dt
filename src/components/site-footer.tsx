import Link from 'next/link';

const COLUMNS: { heading: string; links: { href: string; label: string }[] }[] = [
  {
    heading: 'Printable sudoku',
    links: [
      { href: '/', label: 'Free printable sudoku generator' },
      { href: '/printable-sudoku', label: 'All difficulty levels' },
      { href: '/printable-sudoku-with-answers', label: 'Printable sudoku with answers' },
      { href: '/printable-sudoku-4-per-page', label: '4 per page sudoku printable' },
      { href: '/sudoku-answers', label: 'Sudoku answer lookup' },
    ],
  },
  {
    heading: 'By difficulty',
    links: [
      { href: '/printable-sudoku/easy', label: 'Printable sudoku — easy' },
      { href: '/printable-sudoku/medium', label: 'Printable sudoku — medium' },
      { href: '/printable-sudoku/hard', label: 'Printable sudoku — hard' },
      { href: '/printable-sudoku/expert', label: 'Printable sudoku — expert' },
    ],
  },
  {
    heading: 'Guides',
    links: [
      { href: '/guides', label: 'All guides' },
      { href: '/guides/how-to-solve-sudoku', label: 'How to solve sudoku' },
      { href: '/guides/sudoku-solving-techniques', label: 'Solving techniques' },
      { href: '/guides/how-to-print-sudoku-puzzles', label: 'How to print sudoku' },
    ],
  },
  {
    heading: 'This site',
    links: [
      { href: '/about', label: 'About' },
      { href: '/privacy', label: 'Privacy' },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-line bg-paper-deep/40">
      <div className="mx-auto max-w-shell px-6 py-12">
        <nav aria-label="Footer">
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
          <p className="m-0">
            PRINTABLE SUDOKU — puzzle sheets generated in your browser. No account, no
            watermark, no cost.
          </p>
          <p className="m-0">© {new Date().getFullYear()} Printable Sudoku</p>
        </div>
      </div>
    </footer>
  );
}
