import Link from 'next/link';
import { AnswerLookup } from '@/components/answer-lookup';
import { Faq } from '@/components/faq';
import { JsonLd } from '@/components/json-ld';
import { Shell } from '@/components/shell';
import { PageHero } from '@/components/page-hero';
import { SAMPLE_PUZZLES } from '@/lib/samples';
import { LOOKUP_FAQS } from '@/content/faqs';
import { faqPageSchema, pageMetadata, webApplicationSchema } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Sudoku Answers — Look Up the Solution to Any Puzzle',
  description:
    'Lost the answer key? Type the code printed under any puzzle from this site and get its solution back instantly — no account, no sign-up, and nothing leaves your browser.',
  path: '/sudoku-answers',
});

export default function SudokuAnswersPage() {
  return (
    <>
      <JsonLd
        data={[
          webApplicationSchema({
            name: 'Sudoku answer lookup',
            description:
              'Rebuilds the solution to any puzzle generated on this site from the short code printed under its grid.',
            path: '/sudoku-answers',
          }),
          faqPageSchema(LOOKUP_FAQS),
        ]}
      />

      <Shell className="py-10 shelf:py-14">
        <PageHero
          eyebrow="solution lookup"
          h1="Sudoku answers — look up the solution to any puzzle"
          lede="Stuck on a grid, or checking a finished one? Type the code printed under the puzzle and its solution comes straight back. No answer key needed, and no account."
        />

        <div className="mt-10 max-w-[760px]">
          <AnswerLookup sample={SAMPLE_PUZZLES.medium} />
        </div>

        <section aria-labelledby="how-heading" className="mt-20 max-w-prose">
          <h2 id="how-heading" className="m-0 font-display text-[24px] font-bold">
            How a six-character code knows the answer
          </h2>
          <div className="prose-press mt-4">
            <p>
              This is the part that usually raises an eyebrow, because there is no database here and
              your puzzle was never uploaded anywhere. The trick is that the code is not a reference
              to a stored puzzle. It <em>is</em> the puzzle, in compressed form.
            </p>
            <p>
              Generating a sudoku involves a lot of shuffling: which digits go where in the first
              complete grid, and which order the clues are taken out in. All of that shuffling is
              driven by a single starting number. Fix that number and the whole process runs the
              same way every time, down to the last cell. So the code carries two things — which
              difficulty was asked for, and that starting number — and from those the generator
              rebuilds your exact puzzle, and therefore its exact solution, on the spot.
            </p>
            <p>
              Two useful consequences. There is nothing to expire: a sheet you print today will
              still look up in ten years, because the answer is recomputed rather than retrieved.
              And there is nothing to leak: the lookup runs in your browser like everything else on
              this site, so no one, including us, learns which puzzles you have been working on.
            </p>
            <p>
              The codes are deliberately awkward to mistype. They never use the letters I, L, O or
              U, so there is no confusing them with 1 and 0, and each code carries a small check
              built into it. Get a character wrong and you are told the code is wrong — rather than
              being handed a different puzzle&rsquo;s answer and left to wonder why nothing lines up.
            </p>
          </div>
        </section>

        <section aria-labelledby="where-heading" className="mt-16 max-w-prose">
          <h2 id="where-heading" className="m-0 font-display text-[24px] font-bold">
            Where to find the code
          </h2>
          <div className="prose-press mt-4">
            <p>
              Look directly beneath the grid. Each puzzle prints its code on the left — a hash
              followed by six characters — with the difficulty and clue count on the right. On a
              sheet with four or six puzzles to a page, every grid has its own, so you can look up
              one puzzle without spoiling the rest of the page.
            </p>
            <p>
              If you would rather have the answers on paper from the start, the generator can print
              them for you: see{' '}
              <Link href="/printable-sudoku-with-answers">printable sudoku with answers</Link>,
              which puts a full key at the back of the PDF. This page is the fallback for when you
              did not print one, or no longer have it to hand.
            </p>
          </div>
        </section>

        <Faq items={LOOKUP_FAQS} heading="Looking up answers — questions" />

        <section aria-labelledby="next-heading" className="mt-16 max-w-prose">
          <h2 id="next-heading" className="m-0 font-display text-[24px] font-bold">
            Need more puzzles?
          </h2>
          <p className="mt-3 text-[15.5px] leading-relaxed text-ink-soft">
            The{' '}
            <Link href="/" className="font-medium text-stamp underline underline-offset-2">
              free printable sudoku generator
            </Link>{' '}
            will make you a fresh set at any difficulty, and you can now mix levels in one run. If
            you are checking a grid because you got stuck rather than because you finished,{' '}
            <Link
              href="/guides/sudoku-solving-techniques"
              className="font-medium text-stamp underline underline-offset-2"
            >
              the solving techniques guide
            </Link>{' '}
            may get you moving again without giving the whole thing away.
          </p>
        </section>
      </Shell>
    </>
  );
}
