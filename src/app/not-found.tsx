import Link from 'next/link';
import { Shell } from '@/components/shell';
import { PreviewSheet } from '@/components/preview-sheet';
import { SAMPLE_PUZZLES } from '@/lib/samples';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Page Not Found — Printable Sudoku',
  description: 'That page is not on the press. Here is the way back to the printable sudoku generator.',
  path: '/404',
  noIndex: true,
});

const LINKS = [
  { href: '/', label: 'Free printable sudoku generator' },
  { href: '/printable-sudoku', label: 'Printable sudoku by difficulty' },
  { href: '/printable-sudoku-with-answers', label: 'Printable sudoku with answers' },
  { href: '/guides', label: 'Sudoku guides' },
];

export default function NotFound() {
  return (
    <Shell className="py-14">
      <div className="grid items-start gap-12 shelf:grid-cols-[minmax(0,1fr)_360px]">
        <div className="max-w-prose">
          <p className="m-0 font-mono text-[11.5px] uppercase tracking-[1px] text-stamp">
            error 404
          </p>
          <h1 className="mb-0 mt-3 font-display text-[clamp(28px,4.6vw,40px)] font-bold leading-[1.15]">
            That page never made it to the press
          </h1>
          <p className="mt-4 text-[17px] leading-relaxed text-ink-soft">
            The address you followed does not match anything here — most likely a mistyped URL or a
            link to a page that has since moved. Nothing is broken on your end.
          </p>

          <h2 className="mb-3 mt-10 font-display text-[18px] font-bold">Try one of these</h2>
          <ul className="list-none space-y-2.5 p-0">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[15px] font-medium text-stamp underline underline-offset-2 hover:text-stamp-dark"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex justify-center">
          <PreviewSheet
            cells={SAMPLE_PUZZLES.easy.clues}
            code={SAMPLE_PUZZLES.easy.code}
            difficulty="easy"
            clueCount={SAMPLE_PUZZLES.easy.clueCount}
            status="misprint"
          />
        </div>
      </div>
    </Shell>
  );
}
