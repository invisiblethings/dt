import Link from 'next/link';
import { JsonLd } from '@/components/json-ld';
import { Shell } from '@/components/shell';
import { PageHero } from '@/components/page-hero';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { GUIDES } from '@/content/guides';
import { breadcrumbSchema, pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Sudoku Guides — Solve Better, Print Better | Grid Press',
  description:
    'Practical sudoku guides: how to solve your first grid, the techniques that get you past a stall, and how to print puzzles that are pleasant to work on.',
  path: '/guides',
});

const trail = [
  { name: 'Home', path: '/' },
  { name: 'Guides', path: '/guides' },
];

export default function GuidesIndex() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />

      <Shell className="py-10 shelf:py-14">
        <Breadcrumbs trail={trail} />

        <PageHero
          h1="Sudoku guides"
          lede="Three short guides — one to get you solving, one for when the grid stops giving anything up, and one about the unglamorous business of getting a good print."
        />

        <div className="prose-press mt-6 max-w-prose">
          <p>
            Sudoku is unusual among puzzles in that almost nobody is taught it. You pick up a grid
            somewhere, work out the rule in about a minute, and then either find your own way
            through or decide it is not for you. Plenty of people who would enjoy it stop at that
            second step, not because the puzzle is too hard but because nobody ever showed them the
            first move.
          </p>
          <p>
            These guides are written to close that gap and then keep going. The first assumes no
            knowledge at all. The second assumes you can finish a medium grid and want to know what
            to do when a hard one goes quiet. The third has nothing to do with solving and
            everything to do with the printer, which turns out to matter more than most people
            expect.
          </p>
        </div>

        <ul className="mt-10 list-none space-y-4 p-0">
          {GUIDES.map((g) => (
            <li key={g.slug}>
              <Link
                href={`/guides/${g.slug}`}
                className="press-card group block p-6 no-underline transition-colors hover:border-stamp/60"
              >
                <span className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <span className="font-display text-[19px] font-bold text-ink group-hover:text-stamp">
                    {g.h1}
                  </span>
                  <span className="font-mono text-[11px] text-ink-soft">{g.readingTime}</span>
                </span>
                <span className="mt-2 block max-w-prose text-[14.5px] leading-relaxed text-ink-soft">
                  {g.summary}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <section aria-labelledby="print-heading" className="mt-16 max-w-prose">
          <h2 id="print-heading" className="m-0 font-display text-[24px] font-bold">
            Reading is not solving
          </h2>
          <div className="prose-press mt-4">
            <p>
              None of this sticks until you do it on paper. Pick the level you are working at —{' '}
              <Link href="/printable-sudoku/easy">easy</Link>,{' '}
              <Link href="/printable-sudoku/medium">medium</Link>,{' '}
              <Link href="/printable-sudoku/hard">hard</Link> or{' '}
              <Link href="/printable-sudoku/expert">expert</Link> — print a handful with the answer
              key, and work them with a pencil. Ten grids will teach you more than any of these
              pages will.
            </p>
          </div>
        </section>
      </Shell>
    </>
  );
}
