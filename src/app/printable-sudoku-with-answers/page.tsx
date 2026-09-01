import Link from 'next/link';
import { Generator } from '@/components/generator';
import { Faq } from '@/components/faq';
import { JsonLd } from '@/components/json-ld';
import { Shell } from '@/components/shell';
import { PageHero } from '@/components/page-hero';
import { PreviewSheet } from '@/components/preview-sheet';
import { DifficultyCards } from '@/components/difficulty-cards';
import { SAMPLE_PUZZLES } from '@/lib/samples';
import { ANSWERS_FAQS } from '@/content/faqs';
import { faqPageSchema, pageMetadata, webApplicationSchema } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Printable Sudoku With Answers — Free PDF and Key',
  description:
    'Print sudoku puzzles with the solutions included. The answer key sits on its own pages at the back of the PDF, matched to each puzzle by ID. Free, no sign-up.',
  path: '/printable-sudoku-with-answers',
});

export default function WithAnswersPage() {
  return (
    <>
      <JsonLd
        data={[
          webApplicationSchema({
            name: 'Printable sudoku with answers — PDF generator',
            description:
              'Generate printable sudoku puzzles with a matching answer key and download both as a single PDF.',
            path: '/printable-sudoku-with-answers',
          }),
          faqPageSchema(ANSWERS_FAQS),
        ]}
      />

      <Shell className="py-10 shelf:py-14">
        <PageHero
          eyebrow="answer key switched on"
          h1="Printable sudoku with answers — puzzles and full solutions in one PDF"
          lede="Every run can carry its own answer key: the puzzles first, then a matching solution section at the back, each grid labelled with the same ID as the puzzle it solves."
        />

        <div className="mt-10">
          <Generator
            sample={SAMPLE_PUZZLES.medium}
            defaultIncludeSolutions
            heading="Set a run with answers"
            subheading="the answer key is on — untick it any time"
          />
        </div>

        <div className="mt-20 grid items-start gap-10 shelf:grid-cols-[minmax(0,1fr)_340px]">
          <section aria-labelledby="key-heading" className="max-w-prose">
            <h2 id="key-heading" className="m-0 font-display text-[24px] font-bold">
              How the answer key is laid out
            </h2>
            <div className="prose-press mt-4">
              <p>
                The solutions never share a page with the puzzles. Your PDF runs the puzzle pages
                first — however many that takes at your chosen layout — and then starts a fresh
                section headed <em>answer key</em>. That matters if you are handing sheets out:
                print the document, keep the back half, and nobody is looking at the answer to the
                grid in front of them.
              </p>
              <p>
                Matching a solution to its puzzle is done by ID. Each puzzle prints a six-digit
                number under its grid, along with its difficulty and how many clues it started
                with. The corresponding solution prints the same number followed by the word
                &ldquo;solution&rdquo;. Shuffle the pages, split them between two rooms, come back
                to them a month later — the IDs still line up.
              </p>
              <p>
                The key uses the same layout as the puzzles. Two puzzles per page means two
                solutions per page; six means six. So if you want solution grids large enough to
                check quickly, set the layout to one or two per page and the key follows.
              </p>
            </div>
          </section>

          <div className="flex justify-center pt-2">
            <PreviewSheet
              cells={SAMPLE_PUZZLES.medium.solution}
              id={SAMPLE_PUZZLES.medium.id}
              difficulty="medium"
              clueCount={SAMPLE_PUZZLES.medium.clueCount}
              caption={`solution to #${SAMPLE_PUZZLES.medium.id}`}
              label="The completed solution grid for the sample medium sudoku puzzle"
              status="answer key"
            />
          </div>
        </div>

        <section aria-labelledby="trust-heading" className="mt-16 max-w-prose">
          <h2 id="trust-heading" className="m-0 font-display text-[24px] font-bold">
            Why the printed answer is the right one
          </h2>
          <div className="prose-press mt-4">
            <p>
              The solution is not reverse-engineered from the puzzle after the fact. It is the
              other way round: the generator builds a complete, valid grid first, and the puzzle is
              what is left after clues are taken out of it. The answer key you print is that
              original grid.
            </p>
            <p>
              The reason there is no second valid answer is the removal rule. After each clue is
              removed, a solver counts how many solutions the remaining grid has, stopping at two.
              If it finds two, the clue goes back. So the puzzle you print can only be completed
              one way, and that way is the key at the back of your PDF.
            </p>
          </div>
        </section>

        <Faq items={ANSWERS_FAQS} heading="Sudoku with answers — questions" />

        <section aria-labelledby="levels-heading" className="mt-16">
          <h2 id="levels-heading" className="m-0 font-display text-[24px] font-bold">
            Pick a difficulty for your answer-key set
          </h2>
          <p className="mb-6 mt-3 max-w-prose text-[15.5px] leading-relaxed text-ink-soft">
            The answer key works the same at every level, but it earns its place most on the hard
            and expert grids — where a single wrong entry can hide for forty moves.
          </p>
          <DifficultyCards />
          <p className="mt-6 text-[15px] text-ink-soft">
            Back to the{' '}
            <Link href="/" className="font-medium text-stamp underline underline-offset-2">
              free printable sudoku generator
            </Link>{' '}
            or browse{' '}
            <Link
              href="/printable-sudoku"
              className="font-medium text-stamp underline underline-offset-2"
            >
              all printable sudoku levels
            </Link>
            .
          </p>
        </section>
      </Shell>
    </>
  );
}
