import Link from 'next/link';
import { ArticleLayout } from '@/components/article-layout';
import { guideBySlug } from '@/content/guides';
import { pageMetadata } from '@/lib/seo';

const guide = guideBySlug('how-to-print-sudoku-puzzles')!;

export const metadata = pageMetadata({
  title: guide.title,
  description: guide.description,
  path: `/guides/${guide.slug}`,
});

export default function HowToPrintSudoku() {
  return (
    <ArticleLayout guide={guide}>
      <p>
        A printed sudoku is a better solving experience than a screen — you can see every pencil
        mark at once, scribble freely, and leave it on the kitchen table for a week. But a badly
        printed one is worse than either: grids too small to annotate, box borders you cannot pick
        out from the cell lines, or a page clipped at the edge. Most of that comes down to four
        settings.
      </p>

      <h2>Match the page size to your paper, before you generate</h2>
      <p>
        A4 is 210 × 297 mm; US Letter is 216 × 279 mm. Letter is wider and shorter. It is a small
        difference, but printing an A4 layout onto Letter paper means the printer either scales
        everything down or crops the bottom, and in both cases you lose grid size for no reason.
      </p>
      <p>
        Pick the right one in the generator rather than fixing it in the print dialog. Grid Press
        lays the page out at your chosen size with 16 mm margins on all four sides, which sits
        comfortably inside the non-printable edge of every home and office printer we know of, so
        nothing needs adjusting afterwards.
      </p>

      <h2>Print at 100%, not &ldquo;fit to page&rdquo;</h2>
      <p>
        This is the single most common cause of a disappointing print. &ldquo;Fit to page&rdquo;,
        &ldquo;shrink oversized pages&rdquo; and &ldquo;scale to fit&rdquo; all exist to rescue
        documents whose margins are too tight. The PDF from here does not need rescuing, and the
        setting simply shrinks the grid by a few percent — enough to notice when you are writing
        three candidate digits into a corner.
      </p>
      <p>
        In most print dialogs the option you want is <strong>Actual size</strong> or{' '}
        <strong>100%</strong>, and it is worth checking every time: some drivers reset to fit-to-page
        on their own.
      </p>

      <h2>Choose puzzles per page for how you solve</h2>
      <p>
        The layout decides your grid size, and grid size decides whether the puzzle is comfortable.
        On A4 with standard margins, one puzzle per page gives roughly a 17 cm grid, two gives about
        12 cm, four about 8 cm and six about 6.5 cm.
      </p>
      <p>
        If you solve without candidate marks, six per page is fine and saves a lot of paper. If you
        pencil in candidates — which anything above medium will require — you need cells of about 12
        mm to write three small digits legibly, and that means two per page. For{' '}
        <Link href="/printable-sudoku/expert">expert grids</Link>, where nearly every empty cell ends
        up marked, one per page is not extravagant.
      </p>
      <p>
        A reasonable default: easy and medium at{' '}
        <Link href="/printable-sudoku-4-per-page">four per page</Link>, hard at two, expert at one.
      </p>

      <h2>Keep the answer key separate</h2>
      <p>
        If you are printing for anyone other than yourself, the placement of the answers matters.
        Grid Press puts the whole answer key in its own section after the puzzles, never on the same
        sheet as the puzzle it solves, so you can hand out the front half and keep the back. Each
        solution carries the same six-digit ID as its puzzle, so the pages can be split up and still
        matched later.
      </p>
      <p>
        If you would rather not have the answers at all, untick the option before generating — or
        just print the first half of the document, since the key always comes last. There is more on
        how it works on the{' '}
        <Link href="/printable-sudoku-with-answers">printable sudoku with answers</Link> page.
      </p>

      <h2>Paper and ink</h2>
      <p>
        Ordinary 80 gsm copier paper is fine and is what most people will use. If you write hard
        with a pencil or plan to erase a lot, 90 to 100 gsm holds up noticeably better — erasing on
        thin paper leaves a grey smear that makes candidate marks hard to read.
      </p>
      <p>
        Print in black and white, in draft or economy mode. The grids are pure line work with no
        shading, so draft quality costs you nothing visually and roughly halves your ink use. Do not
        use a colour or photo setting; it is slower and the result is identical.
      </p>
      <p>
        One more thing worth doing on a printer you have not used for this before: print a single
        page first and look at it. Check the box borders read as heavier than the cell lines, check
        the digits are crisp, and check nothing is clipped. Then send the other nineteen pages.
      </p>

      <h2>Printing for a group</h2>
      <p>
        For a classroom, a care home or a long journey, generate one batch rather than several. A
        run of 24 puzzles at four per page is six sheets, or three double-sided, plus the same again
        for the key. Mixed difficulty is worth considering here — the generator&rsquo;s{' '}
        <strong>mixed</strong> setting draws a random level for each puzzle in the run, which keeps a
        room of different abilities moving at roughly the same pace instead of leaving half of them
        stalled.
      </p>
      <p>
        Because the puzzles are generated fresh each time rather than pulled from a fixed library,
        two people printing on the same day will not get the same grids — so you can run off a
        second set for a second group without anyone recognising it.{' '}
        <Link href="/">Set your run</Link> and print it.
      </p>
    </ArticleLayout>
  );
}
