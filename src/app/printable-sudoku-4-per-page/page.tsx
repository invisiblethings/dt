import Link from 'next/link';
import { Generator } from '@/components/generator';
import { Faq } from '@/components/faq';
import { JsonLd } from '@/components/json-ld';
import { Shell } from '@/components/shell';
import { PageHero } from '@/components/page-hero';
import { DifficultyCards } from '@/components/difficulty-cards';
import { SAMPLE_PUZZLES } from '@/lib/samples';
import { PER_PAGE_FAQS } from '@/content/faqs';
import { faqPageSchema, pageMetadata, webApplicationSchema } from '@/lib/seo';

export const metadata = pageMetadata({
  title: '4 Per Page Sudoku Printable — Free PDF, 4 to a Sheet',
  description:
    'Print four sudoku puzzles per page and cut your paper use in half. Free PDF in A4 or US Letter, any difficulty, with a matching four-up answer key.',
  path: '/printable-sudoku-4-per-page',
});

const LAYOUTS = [
  { n: '1', shape: 'one full-page grid', grid: '~17 cm square', use: 'Expert puzzles, large print, anyone writing lots of candidates.' },
  { n: '2', shape: 'two stacked grids', grid: '~12 cm square', use: 'The everyday default. Room for pencil marks, still economical.' },
  { n: '4', shape: 'two columns of two', grid: '~8 cm square', use: 'Travel packs, classroom sets, easy and medium batches.' },
  { n: '6', shape: 'two columns of three', grid: '~6.5 cm square', use: 'Maximum puzzles per sheet. Best for easy grids.' },
];

export default function FourPerPagePage() {
  return (
    <>
      <JsonLd
        data={[
          webApplicationSchema({
            name: '4 per page sudoku printable — PDF generator',
            description:
              'Generate printable sudoku laid out four puzzles to a page and download it as a PDF.',
            path: '/printable-sudoku-4-per-page',
          }),
          faqPageSchema(PER_PAGE_FAQS),
        ]}
      />

      <Shell className="py-10 shelf:py-14">
        <PageHero
          eyebrow="four grids to a sheet"
          h1="4 per page sudoku printable — four puzzles on every sheet"
          lede="The paper-saving layout. Four grids in two columns of two, each around 8 cm square, with the answer key laid out four-up to match."
        />

        <div className="mt-10">
          <Generator
            sample={SAMPLE_PUZZLES.easy}
            defaultPerPage={4}
            defaultCount={12}
            heading="Set a four-up run"
            subheading="layout is already set to 4 per page"
          />
        </div>

        <section aria-labelledby="layouts-heading" className="mt-20">
          <h2 id="layouts-heading" className="m-0 font-display text-[24px] font-bold">
            What each layout gives you
          </h2>
          <p className="mb-6 mt-3 max-w-prose text-[15.5px] leading-relaxed text-ink-soft">
            Grid sizes below are for A4 with the standard 16 mm margins; US Letter is a couple of
            millimetres wider and slightly shorter, so the numbers land within a millimetre or two
            of these.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-left">
              <caption className="sr-only">
                Sudoku grid size and recommended use for each puzzles-per-page layout
              </caption>
              <thead>
                <tr className="border-b border-line font-mono text-[11px] uppercase tracking-[0.6px] text-ink-soft">
                  <th scope="col" className="py-2.5 pr-4 font-medium">Per page</th>
                  <th scope="col" className="py-2.5 pr-4 font-medium">Arrangement</th>
                  <th scope="col" className="py-2.5 pr-4 font-medium">Grid size</th>
                  <th scope="col" className="py-2.5 font-medium">Best for</th>
                </tr>
              </thead>
              <tbody>
                {LAYOUTS.map((row) => (
                  <tr key={row.n} className="border-b border-line/70 align-top">
                    <th scope="row" className="py-3 pr-4 font-mono text-[14px] font-medium text-ink">
                      {row.n}
                    </th>
                    <td className="py-3 pr-4 text-[14px] text-ink-soft">{row.shape}</td>
                    <td className="py-3 pr-4 font-mono text-[13px] text-ink-soft">{row.grid}</td>
                    <td className="py-3 text-[14px] text-ink-soft">{row.use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section aria-labelledby="why-heading" className="mt-16 max-w-prose">
          <h2 id="why-heading" className="m-0 font-display text-[24px] font-bold">
            When four per page is the right call
          </h2>
          <div className="prose-press mt-4">
            <p>
              Four-up is the layout for volume. A run of forty puzzles is ten sheets instead of
              twenty, or five if your printer does both sides, and at roughly 9 mm a cell the
              grids are still the size of a newspaper sudoku — comfortably solvable with a pencil.
              For a school set, a care-home activity folder or a stack to take on holiday, this is
              usually the layout you want.
            </p>
            <p>
              Where it stops being the right call is on hard and expert grids. Those need candidate
              marks in nearly every empty cell, and 9 mm does not leave room for three small digits
              in a corner. If you are printing at those levels, drop to two per page and accept the
              extra paper — a puzzle lost to a misread pencil mark costs more than a sheet.
            </p>
            <p>
              One practical note: print at 100%, not &ldquo;fit to page&rdquo;. The PDF already has
              generous margins, and letting the printer scale it down shrinks the cells for no
              benefit. There is more on this in the guide to{' '}
              <Link href="/guides/how-to-print-sudoku-puzzles">printing sudoku that looks right</Link>.
            </p>
          </div>
        </section>

        <Faq items={PER_PAGE_FAQS} heading="Four per page — questions" />

        <section aria-labelledby="levels-heading" className="mt-16">
          <h2 id="levels-heading" className="m-0 font-display text-[24px] font-bold">
            Choose a difficulty for your four-up set
          </h2>
          <div className="mt-6">
            <DifficultyCards />
          </div>
          <p className="mt-6 text-[15px] text-ink-soft">
            Or go to the{' '}
            <Link href="/" className="font-medium text-stamp underline underline-offset-2">
              main printable sudoku generator
            </Link>{' '}
            to change every setting at once.
          </p>
        </section>
      </Shell>
    </>
  );
}
