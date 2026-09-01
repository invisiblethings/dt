import Link from 'next/link';
import { Generator } from '@/components/generator';
import { Faq } from '@/components/faq';
import { JsonLd } from '@/components/json-ld';
import { Shell } from '@/components/shell';
import { PageHero } from '@/components/page-hero';
import { DifficultyCards } from '@/components/difficulty-cards';
import { SAMPLE_PUZZLES } from '@/lib/samples';
import { HOME_FAQS } from '@/content/faqs';
import { faqPageSchema, pageMetadata, webApplicationSchema } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Free Printable Sudoku — Download Puzzle PDFs | Grid Press',
  description:
    'Make your own free printable sudoku. Pick a difficulty, choose 1 to 6 puzzles per page in A4 or US Letter, and download a print-ready PDF with answers.',
  path: '/',
});

const STEPS = [
  {
    n: '01',
    title: 'Set the run',
    body: 'Choose how many puzzles you want, how hard they should be, and how many should sit on each page. Pick A4 or US Letter to match your printer, and decide whether you want the answer key.',
  },
  {
    n: '02',
    title: 'Pull the proof',
    body: 'Press Generate. Puzzles are built one at a time on a background thread, each one checked by a solver for a single solution before it is accepted. The preview sheet shows them as they come off the press.',
  },
  {
    n: '03',
    title: 'Print it',
    body: 'Download the PDF and print it. Margins are set well inside the printable area, the 3×3 boxes are drawn with heavy rules so the grid reads clearly, and every page is numbered.',
  },
];

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={[
          webApplicationSchema({
            name: 'Grid Press printable sudoku generator',
            description:
              'A free browser-based tool that generates printable sudoku puzzles and downloads them as a PDF with an optional answer key.',
            path: '/',
          }),
          faqPageSchema(HOME_FAQS),
        ]}
      />

      <Shell className="py-10 shelf:py-14">
        <PageHero
          h1="Free printable sudoku puzzles, ready to download as a PDF"
          lede="Set the difficulty, choose how many puzzles go on a page, and pull a print-ready sheet. No account, no watermark, no cost — and every grid is checked for a single solution before it reaches your printer."
        />

        <div className="mt-10">
          <Generator sample={SAMPLE_PUZZLES.medium} />
        </div>

        <section aria-labelledby="what-heading" className="mt-20 max-w-prose">
          <h2 id="what-heading" className="m-0 font-display text-[24px] font-bold">
            A sudoku printable you actually control
          </h2>
          <div className="prose-press mt-4">
            <p>
              Most free printable sudoku is a fixed PDF someone made once: forty puzzles, one
              layout, whatever difficulty they felt like that day. Grid Press builds the sheet when
              you ask for it. If you want eleven hard puzzles, four to a page, on US Letter, with
              the answers at the back, that is what comes out — and if you want a different eleven
              five minutes later, press the button again.
            </p>
            <p>
              The puzzles are generated fresh each time rather than pulled from a library, so you
              are not going to print the same grid twice or find the same puzzle someone else in
              the room is holding. All of it happens in your browser: the generator, the solver
              that verifies each puzzle, and the PDF itself. Nothing is uploaded, nothing is
              stored, and no account stands between you and the download.
            </p>
            <p>
              What you get is a clean printed page. Heavy rules on the 3×3 box borders so the grid
              reads at a glance, the puzzle ID, difficulty and clue count printed under every grid,
              page numbers in the footer, and an answer key laid out in the same order as the
              puzzles when you want one.
            </p>
          </div>
        </section>

        <section aria-labelledby="how-heading" className="mt-16">
          <h2 id="how-heading" className="m-0 font-display text-[24px] font-bold">
            How it works
          </h2>
          <ol className="mt-6 grid list-none gap-4 p-0 shelf:grid-cols-3">
            {STEPS.map((step) => (
              <li key={step.n} className="press-card p-5">
                <p className="m-0 font-mono text-[11px] tracking-[1px] text-stamp">{step.n}</p>
                <h3 className="mb-2 mt-2 font-display text-[16px] font-bold">{step.title}</h3>
                <p className="m-0 text-[14px] leading-relaxed text-ink-soft">{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="unique-heading" className="mt-16 max-w-prose">
          <h2 id="unique-heading" className="m-0 font-display text-[24px] font-bold">
            Why every puzzle has exactly one answer
          </h2>
          <div className="prose-press mt-4">
            <p>
              A sudoku with two valid solutions is not a sudoku — it is a grid where at some point
              you have to pick, and picking is not solving. Plenty of free generators skip this
              check because it is the expensive part. Grid Press does not.
            </p>
            <p>
              Each puzzle starts life as a complete, valid 9×9 grid built by randomised
              backtracking. Clues are then removed one at a time in random order, and after every
              removal a bitmask solver runs over the remaining grid and counts solutions, stopping
              as soon as it finds a second one. If there is a second solution, the clue goes
              straight back in. Only removals that leave the puzzle uniquely solvable are kept.
            </p>
            <p>
              That is why an expert batch takes a moment longer than an easy one: fewer clues means
              far more solver passes. It also means the clue count printed under each grid is a
              real measurement of that specific puzzle, not a difficulty label someone assigned by
              feel.
            </p>
          </div>
        </section>

        <section aria-labelledby="levels-heading" className="mt-16">
          <h2 id="levels-heading" className="m-0 font-display text-[24px] font-bold">
            Printable sudoku by difficulty
          </h2>
          <p className="mb-6 mt-3 max-w-prose text-[15.5px] leading-relaxed text-ink-soft">
            Each level has its own page with the generator already set, so you can go straight to
            the puzzles you want.
          </p>
          <DifficultyCards />

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Link
              href="/printable-sudoku-with-answers"
              className="press-card group block p-5 no-underline transition-colors hover:border-stamp/60"
            >
              <span className="font-display text-[17px] font-bold text-ink group-hover:text-stamp">
                Printable sudoku with answers
              </span>
              <span className="mt-2 block text-[14px] leading-relaxed text-ink-soft">
                Puzzles and a full solution key in one PDF, with the answers kept on their own
                pages at the back.
              </span>
            </Link>
            <Link
              href="/printable-sudoku-4-per-page"
              className="press-card group block p-5 no-underline transition-colors hover:border-stamp/60"
            >
              <span className="font-display text-[17px] font-bold text-ink group-hover:text-stamp">
                4 per page sudoku printable
              </span>
              <span className="mt-2 block text-[14px] leading-relaxed text-ink-soft">
                Four grids to a sheet — the paper-saving layout for travel packs and classroom
                sets.
              </span>
            </Link>
          </div>
        </section>

        <Faq items={HOME_FAQS} heading="Questions people ask before they print" />

        <section aria-labelledby="guides-heading" className="mt-16 max-w-prose">
          <h2 id="guides-heading" className="m-0 font-display text-[24px] font-bold">
            New to sudoku?
          </h2>
          <p className="mt-3 text-[15.5px] leading-relaxed text-ink-soft">
            If you have a printed sheet in front of you and no idea where to start, read{' '}
            <Link href="/guides/how-to-solve-sudoku" className="font-medium text-stamp underline underline-offset-2">
              how to solve sudoku
            </Link>{' '}
            first — it covers the one rule, the first move and the habits that get you through an
            easy grid. When easy puzzles stop being a challenge,{' '}
            <Link
              href="/guides/sudoku-solving-techniques"
              className="font-medium text-stamp underline underline-offset-2"
            >
              the solving techniques guide
            </Link>{' '}
            picks up where it leaves off.
          </p>
        </section>
      </Shell>
    </>
  );
}
