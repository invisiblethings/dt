import Link from 'next/link';
import { JsonLd } from '@/components/json-ld';
import { Shell } from '@/components/shell';
import { PageHero } from '@/components/page-hero';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { PreviewSheet } from '@/components/preview-sheet';
import { SAMPLE_PUZZLES } from '@/lib/samples';
import { DIFFICULTY_CONTENT, DIFFICULTY_ORDER } from '@/content/difficulty';
import { breadcrumbSchema, pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Sudoku Puzzles Printable — Every Difficulty, Free PDF',
  description:
    'All four printable sudoku levels in one place, from 45-clue easy grids to 20-clue expert ones. Pick a level and download a free PDF with answers.',
  path: '/printable-sudoku',
});

const trail = [
  { name: 'Home', path: '/' },
  { name: 'Printable sudoku', path: '/printable-sudoku' },
];

export default function PrintableSudokuHub() {
  return (
    <>
      <JsonLd data={breadcrumbSchema(trail)} />

      <Shell className="py-10 shelf:py-14">
        <Breadcrumbs trail={trail} />

        <div className="grid items-start gap-10 shelf:grid-cols-[minmax(0,1fr)_360px]">
          <div>
            <PageHero
              h1="Sudoku puzzles printable at four difficulty levels"
              lede="The same generator and the same one-solution guarantee at every level — what changes is how much of the grid is filled in when you sit down. Pick the level that suits you and the generator opens with it already set."
            />

            <div className="prose-press mt-6 max-w-prose">
              <p>
                Difficulty in sudoku comes down to one number: how many of the 81 cells are given
                to you at the start. An easy puzzle hands you 38 to 45 and can be solved by
                scanning alone. An expert puzzle hands you 20 to 24 and will not give up a single
                cell until the whole board is pencilled in. The four levels below are the same
                puzzles pared back by different amounts.
              </p>
              <p>
                Every level is free, every level can be printed one, two, four or six to a page on
                A4 or US Letter, and every level can carry a full answer key. If you are not sure
                where to start, medium is the level a newspaper prints midweek and the one most
                people settle at.
              </p>
            </div>
          </div>

          <div className="flex justify-center pt-2">
            <PreviewSheet
              cells={SAMPLE_PUZZLES.hard.clues}
              id={SAMPLE_PUZZLES.hard.id}
              difficulty="hard"
              clueCount={SAMPLE_PUZZLES.hard.clueCount}
              status="sample sheet"
            />
          </div>
        </div>

        <section aria-labelledby="levels-heading" className="mt-16">
          <h2 id="levels-heading" className="m-0 font-display text-[24px] font-bold">
            Choose a level
          </h2>
          <ul className="mt-6 list-none space-y-4 p-0">
            {DIFFICULTY_ORDER.map((key) => {
              const d = DIFFICULTY_CONTENT[key];
              return (
                <li key={key}>
                  <Link
                    href={`/printable-sudoku/${key}`}
                    className="press-card group block p-6 no-underline transition-colors hover:border-stamp/60"
                  >
                    <span className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <span className="font-display text-[19px] font-bold text-ink group-hover:text-stamp">
                        Printable sudoku — {d.name.toLowerCase()}
                      </span>
                      <span className="font-mono text-[11px] text-ink-soft">
                        {d.clueRange} · {d.typicalTime}
                      </span>
                    </span>
                    <span className="mt-2 block max-w-prose text-[14.5px] leading-relaxed text-ink-soft">
                      {d.body[0].split('. ').slice(0, 2).join('. ')}.
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        <section aria-labelledby="other-heading" className="mt-16 max-w-prose">
          <h2 id="other-heading" className="m-0 font-display text-[24px] font-bold">
            Other ways to print
          </h2>
          <div className="prose-press mt-4">
            <p>
              If what you need is the solutions as well as the puzzles, the{' '}
              <Link href="/printable-sudoku-with-answers">printable sudoku with answers</Link> page
              starts with the answer key switched on and explains how the key is laid out. If you
              are printing for a group and want to spend less paper,{' '}
              <Link href="/printable-sudoku-4-per-page">4 per page sudoku printable</Link> covers
              the denser layouts and what size the grids actually come out.
            </p>
            <p>
              And if you want to mix levels in a single batch — a warm-up easy grid, a couple of
              mediums, one hard one at the back — the{' '}
              <Link href="/">main generator</Link> has a mixed setting that draws a random
              difficulty for each puzzle in the run.
            </p>
          </div>
        </section>
      </Shell>
    </>
  );
}
