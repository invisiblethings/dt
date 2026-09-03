import Link from 'next/link';
import { ArticleLayout } from '@/components/article-layout';
import { guideBySlug } from '@/content/guides';
import { pageMetadata } from '@/lib/seo';

const guide = guideBySlug('sudoku-solving-techniques')!;

export const metadata = pageMetadata({
  title: guide.title,
  description: guide.description,
  path: `/guides/${guide.slug}`,
});

export default function SudokuSolvingTechniques() {
  return (
    <ArticleLayout guide={guide}>
      <p>
        Scanning gets you through easy sudoku and most of the way through medium. Past that it runs
        out, and the grid goes quiet. What follows is not harder logic — it is the same logic
        applied to candidate marks instead of to digits. These are the techniques that unstick a
        stalled board, roughly in the order you should reach for them.
      </p>
      <p>
        All of them assume you have pencilled candidates into the empty cells. If you have not, do
        that first; none of what follows is visible without it. And if candidate marking itself is
        new, start with{' '}
        <Link href="/guides/how-to-solve-sudoku">how to solve sudoku</Link> and come back.
      </p>

      <h2>1. Naked pairs, triples and quads</h2>
      <p>
        A <strong>naked pair</strong> is two cells in the same region — a row, a column or a box —
        that hold exactly the same two candidates. If two cells in row 4 both read {'{'}2, 8{'}'},
        then one of them is the 2 and the other is the 8. Which is which does not matter. What
        matters is that between them they have used up row 4&rsquo;s 2 and its 8, so every other
        cell in row 4 can have 2 and 8 struck out.
      </p>
      <p>
        The same idea scales. Three cells sharing exactly three candidates between them form a
        naked triple, and four cells sharing four form a quad. The cells do not each need all the
        candidates — {'{'}2,8{'}'}, {'{'}2,5{'}'} and {'{'}5,8{'}'} across three cells is a valid
        triple on 2, 5 and 8, because those three digits are locked into those three cells. Triples
        are worth hunting for; quads are rare enough that you will usually find something else
        first.
      </p>

      <h2>2. Hidden pairs</h2>
      <p>
        A hidden pair is the same situation wearing a disguise. Here, two digits can only appear in
        two cells of a region — but those cells carry other candidates too, so the pair is not
        obvious. If in one box the 4 and the 9 both appear only in cells A and B, then A and B must
        be the 4 and the 9 in some order, and every other candidate in A and B can be deleted.
      </p>
      <p>
        Hidden pairs are the technique most solvers under-use, because a naked pair announces
        itself visually and a hidden one does not. The way to find them is to work digit by digit
        through a region, noting which cells each digit could occupy, rather than reading the cells.
        Two digits with the same two-cell footprint is your pair.
      </p>

      <h2>3. Pointing pairs and box-line reduction</h2>
      <p>
        These two work on the interaction between a box and the rows or columns crossing it, and
        together they are the workhorses of{' '}
        <Link href="/printable-sudoku/hard">hard sudoku</Link>.
      </p>
      <p>
        A <strong>pointing pair</strong> works outward from the box. If, inside one box, every
        possible position for the 6 lies in the same row, then the 6 for that box is somewhere in
        that row — you do not know where, but you know it is in there. Which means the 6 cannot be
        anywhere else in that row outside the box. Strike it out of those cells.
      </p>
      <p>
        <strong>Box-line reduction</strong> is the same argument in reverse. If every possible
        position for the 6 in a given row lies inside a single box, then that box&rsquo;s 6 is in
        that row, and the 6 can be struck from the box&rsquo;s other six cells.
      </p>
      <p>
        Both are easy to apply once you are looking for them, and both tend to produce a cascade —
        the eliminations they generate usually create a naked single or a hidden single within a
        move or two.
      </p>

      <h2>4. The X-wing</h2>
      <p>
        The X-wing is the first technique that spans the whole board, and it is the point where
        most solvers feel sudoku becomes a different game.
      </p>
      <p>
        Find a digit — say 7 — that in two different rows can only go in two cells each. Now check
        the columns: if in both rows those two cells sit in the same pair of columns, you have an
        X-wing. The four cells form a rectangle. Whichever way the 7s fall, they occupy one cell
        from each row and one from each column, taking a diagonal of that rectangle. Either way,
        both of those columns have their 7 accounted for inside the rectangle, so the 7 can be
        eliminated from every other cell in both columns.
      </p>
      <p>
        The same works with the roles swapped: two columns with only two positions each, aligned on
        the same two rows, eliminates from those rows. An X-wing rarely solves a cell directly.
        What it does is remove candidates that were blocking a simpler technique.
      </p>

      <h2>5. Swordfish and beyond</h2>
      <p>
        A swordfish is an X-wing widened to three rows and three columns: a digit confined to at
        most three cells in each of three rows, all falling within the same three columns,
        eliminates that digit from the rest of those columns. It is genuinely useful on{' '}
        <Link href="/printable-sudoku/expert">expert grids</Link> and genuinely hard to spot without
        a systematic sweep.
      </p>
      <p>
        Beyond that lie XY-wings, unique rectangles and forcing chains. They are worth learning if
        you enjoy the hunt, but they come with diminishing returns: most expert puzzles yield to
        candidate marking, pairs, pointing pairs and an X-wing applied patiently. Reaching for a
        forcing chain is usually a sign that something simpler was missed.
      </p>

      <h2>A working order</h2>
      <p>When a grid stalls, run down this list rather than staring:</p>
      <ol>
        <li>Re-scan for naked and hidden singles — you have probably created some since your last pass.</li>
        <li>Sweep every region for naked pairs and triples.</li>
        <li>Go digit by digit through each region looking for hidden pairs.</li>
        <li>Check every box for pointing pairs, then every row and column for box-line reduction.</li>
        <li>Only then start hunting for an X-wing.</li>
      </ol>
      <p>
        Each step feeds the ones above it, so after any successful elimination, go back to the top.
        The board you are looking at is not the board you were looking at a move ago.
      </p>

      <h2>Practise on paper</h2>
      <p>
        These techniques are far easier to learn on a printed grid than on a screen, because you can
        see every candidate mark at once and annotate freely. Print a batch of{' '}
        <Link href="/printable-sudoku/hard">hard</Link> puzzles one or two per page so there is room
        to write, and keep the{' '}
        <Link href="/printable-sudoku-with-answers">answer key</Link> to check yourself when you
        finish. Every puzzle from{' '}
        <Link href="/">the generator</Link> is verified to have exactly one solution, so if a
        technique leads you into a contradiction, the fault is in the pencil marks and not in the
        puzzle.
      </p>
    </ArticleLayout>
  );
}
