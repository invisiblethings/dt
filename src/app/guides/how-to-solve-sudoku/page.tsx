import Link from 'next/link';
import { ArticleLayout } from '@/components/article-layout';
import { guideBySlug } from '@/content/guides';
import { pageMetadata } from '@/lib/seo';

const guide = guideBySlug('how-to-solve-sudoku')!;

export const metadata = pageMetadata({
  title: guide.title,
  description: guide.description,
  path: `/guides/${guide.slug}`,
});

export default function HowToSolveSudoku() {
  return (
    <ArticleLayout guide={guide}>
      <p>
        Sudoku has one rule, and everything else follows from it: each of the nine rows, each of
        the nine columns, and each of the nine 3×3 boxes must contain the digits 1 to 9 exactly
        once. That is the whole game. There is no arithmetic — the digits could be nine different
        colours and nothing would change — and there is never a need to guess. If a puzzle is
        properly made, every cell can be worked out from what is already on the board.
      </p>
      <p>
        What stops most beginners is not the rule but the first move. Staring at a grid with fifty
        empty cells, it is not obvious where to start looking. So here is a method that works from
        the first puzzle you pick up.
      </p>

      <h2>Start where the grid is crowded</h2>
      <p>
        Do not start at the top-left corner. Start at whichever row, column or box already has the
        most digits in it. A box with seven of its nine cells filled has only two digits missing,
        and there is a decent chance those two can only go one way round. That is a free cell, and
        free cells are how a grid opens up.
      </p>
      <p>
        Scan the board for the densest region and work outward from it. Every cell you fill in
        makes its row, its column and its box that little bit more constrained, which is why a
        sudoku speeds up as it goes: the first ten cells are the slow ones.
      </p>

      <h2>The first technique: scanning for a single spot</h2>
      <p>
        Pick a digit — 1 is as good as any. Now find a 3×3 box that does not contain a 1 yet. Look
        at the three rows that pass through that box. If a 1 already appears somewhere in one of
        those rows, then no cell of that row inside your box can hold the 1. Rule it out. Do the
        same for the three columns.
      </p>
      <p>
        Often you will eliminate every cell in the box but one. That last cell must be the 1, and
        you can write it in with certainty. This is called cross-hatching, and on an easy puzzle it
        will carry you a long way — sometimes all the way to the end.
      </p>
      <p>
        Work through the digits one at a time, 1 through 9, then start again at 1. Each pass fills
        in cells that make the next pass more productive. Two or three complete passes will finish
        most{' '}
        <Link href="/printable-sudoku/easy">easy printable sudoku</Link> grids.
      </p>

      <h2>The second technique: the last cell standing</h2>
      <p>
        The reverse view is just as useful. Instead of asking &ldquo;where can this digit go?&rdquo;,
        pick an empty cell and ask &ldquo;what could go here?&rdquo; Look along its row, down its
        column, and around its box, and cross off every digit you see. If exactly one digit
        survives, that is your answer.
      </p>
      <p>
        Beginners tend to favour one of these two views and forget the other. They complement each
        other: cross-hatching finds cells that are forced by a digit&rsquo;s position, while this
        one finds cells that are forced by everything around them. When one stalls, switch to the
        other before you conclude you are stuck.
      </p>

      <h2>When scanning runs out: pencil marks</h2>
      <p>
        On a{' '}
        <Link href="/printable-sudoku/medium">medium puzzle</Link> you will reach a point where
        neither view yields a cell. That is not a wall, it is a signal to change tools. Go through
        the empty cells and write the possible digits for each one in small figures in the corner —
        candidates, in sudoku terms. It is tedious the first time and it feels like giving up. It
        is not: it is the technique the harder half of the puzzle is built around.
      </p>
      <p>
        With candidates on the board, patterns appear that you cannot see otherwise. The most
        common is the <strong>naked pair</strong>: two cells in the same row, column or box that
        both hold exactly the same two candidates — say 3 and 7. You do not know which is which,
        but you know that between them they use up both the 3 and the 7 for that region. Every
        other cell in that region can have 3 and 7 crossed off. That elimination usually cascades
        into a solved cell somewhere nearby.
      </p>
      <p>
        Its mirror image is the <strong>hidden single</strong>: a candidate that appears in only one
        cell of a region, even though that cell has several other candidates. If the 4 can only go
        in one cell of a box, it goes there — regardless of what else that cell might have held.
        Hidden singles are easy to miss precisely because the cell looks undecided.
      </p>

      <h2>Habits that prevent wasted evenings</h2>
      <ul>
        <li>
          <strong>Use a pencil.</strong> Not for lack of confidence — for the candidate marks. A pen
          turns a grid into a mess the moment you eliminate something.
        </li>
        <li>
          <strong>Never guess.</strong> If a puzzle has a single solution, and every puzzle from
          this site does, there is always a logical next move. A guess that turns out wrong will not
          announce itself for another twenty cells, and unpicking it is worse than being stuck.
        </li>
        <li>
          <strong>Update your candidates as you go.</strong> The most common cause of a contradiction
          is a stale pencil mark that should have been crossed off three moves ago.
        </li>
        <li>
          <strong>Put it down.</strong> Coming back to a grid after ten minutes away is startlingly
          effective. You stop seeing the pattern you were convinced was there and start seeing the
          board.
        </li>
      </ul>

      <h2>How to practise</h2>
      <p>
        Solve easy puzzles until you stop needing candidate marks to finish one. Then move to
        medium and stay there until pencilling in a whole grid feels routine rather than laborious.
        Only then is{' '}
        <Link href="/printable-sudoku/hard">hard</Link> worth your time — attempted too early it
        teaches frustration rather than technique.
      </p>
      <p>
        Paper beats a screen for this. On a printed grid you can see all your candidate marks at
        once, scribble, cross out, and come back to it tomorrow.{' '}
        <Link href="/">Print a set of puzzles</Link> at the level you are working on — two per page
        leaves plenty of room for pencil marks — and turn the answer key on so you can check a
        finished grid instead of wondering about it.
      </p>
      <p>
        When easy stops being a challenge, the{' '}
        <Link href="/guides/sudoku-solving-techniques">solving techniques guide</Link> picks up from
        here with pointing pairs, box-line reduction and the X-wing.
      </p>
    </ArticleLayout>
  );
}
