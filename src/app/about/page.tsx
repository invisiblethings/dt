import Link from 'next/link';
import { Shell } from '@/components/shell';
import { PageHero } from '@/components/page-hero';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'About — Free Printable Sudoku, Made in Your Browser',
  description:
    'What this site is, how the puzzles are generated and verified, and why the whole thing runs in your browser with no account and no cost.',
  path: '/about',
});

export default function AboutPage() {
  return (
    <Shell className="py-10 shelf:py-14">
      <PageHero
        h1="About Printable Sudoku"
        lede="A puzzle generator built the way a small print shop would do it: set the run, pull a proof, print it."
      />

      <div className="prose-press mt-8 max-w-prose">
        <h2>What this is</h2>
        <p>
          This site makes printable sudoku PDFs to order. You choose how many puzzles, how hard,
          how many to a page and what size paper; it builds the puzzles and the document while you
          wait. It exists because most free printable sudoku on the web is a fixed PDF somebody
          made once — forty puzzles, one layout, take it or leave it — and that is rarely the sheet
          you actually wanted.
        </p>

        <h2>How the puzzles are made</h2>
        <p>
          Each puzzle starts as a complete, valid 9×9 grid produced by randomised backtracking.
          Clues are then removed one at a time in random order. After each removal a solver runs
          over what is left and counts solutions, stopping as soon as it finds a second one. If
          there are two, the clue is put back; only removals that leave the puzzle uniquely
          solvable are kept.
        </p>
        <p>
          The solver uses bitmask candidate sets and picks the most constrained cell first, which
          is what makes running it after every single removal fast enough to be practical. This
          check is the expensive part of generation and it is the part plenty of free generators
          skip. We do not, because a sudoku with two answers is not a sudoku — it is a grid where
          at some point you have to pick.
        </p>
        <p>
          Difficulty is defined by clue count:{' '}
          <Link href="/printable-sudoku/easy">easy</Link> 38–45,{' '}
          <Link href="/printable-sudoku/medium">medium</Link> 30–37,{' '}
          <Link href="/printable-sudoku/hard">hard</Link> 25–29 and{' '}
          <Link href="/printable-sudoku/expert">expert</Link> 20–24. The count for each individual
          puzzle is printed under its grid, so the label is backed by a number you can check.
        </p>

        <h2>Everything runs in your browser</h2>
        <p>
          There is no server involved in making your puzzles. The generator, the solver that
          verifies them and the code that lays out the PDF all run as JavaScript on your own
          machine — generation on a background thread so the page stays responsive during a large
          batch. Nothing about your run is uploaded, which is why the download is instant and why
          nothing you generate is ever stored anywhere. The{' '}
          <Link href="/privacy">privacy page</Link> spells out exactly what that means.
        </p>

        <h2>What it costs</h2>
        <p>
          Nothing. There is no account, no email capture, no trial, no watermark and no paid tier
          holding back the good puzzles. Print them for your class, your family, your care home or
          your newsletter — the grids are machine-generated and we make no ownership claim over
          what you produce.
        </p>

        <h2>Where it goes next</h2>
        <p>
          The obvious additions are more grid sizes, large-print layouts and puzzle variants. If
          you have printed a few sets and something about the sheets got in your way, that is the
          useful kind of feedback — the layout decisions here were made by printing a lot of pages
          and adjusting, and they will keep being made that way.
        </p>
      </div>

      <p className="mt-10 text-[15px] text-ink-soft">
        <Link href="/" className="font-medium text-stamp underline underline-offset-2">
          Back to the printable sudoku generator
        </Link>
      </p>
    </Shell>
  );
}
