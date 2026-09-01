import type { DifficultyKey } from '@/lib/sudoku';
import type { FaqItem } from '@/lib/seo';

export interface DifficultyContent {
  slug: DifficultyKey;
  /** Sentence-case name used in prose. */
  name: string;
  h1: string;
  title: string;
  description: string;
  clueRange: string;
  /** Rough solve time for a comfortable solver at this level. */
  typicalTime: string;
  /** Short line under the H1. */
  lede: string;
  /** 2–3 paragraphs of page-specific copy. */
  body: string[];
  goodFor: string[];
  faqs: FaqItem[];
}

export const DIFFICULTY_CONTENT: Record<DifficultyKey, DifficultyContent> = {
  easy: {
    slug: 'easy',
    name: 'Easy',
    h1: 'Printable easy sudoku puzzles you can download as a PDF',
    title: 'Printable Sudoku Easy — Free PDF With Answers | Grid Press',
    description:
      'Print easy sudoku puzzles with 38–45 starting clues. Choose how many you want, 1 to 6 per page, A4 or Letter, and download a free PDF with answers.',
    clueRange: '38–45 clues',
    typicalTime: '5–10 minutes',
    lede: 'Generous clue counts, no guessing, and a solving path that opens up the moment you start scanning.',
    body: [
      'An easy sudoku is not a watered-down puzzle — it is a puzzle where the next move is always findable. Every grid on this page starts with between 38 and 45 clues, which is enough that scanning rows, columns and boxes for the one place a digit can go will carry you from the first cell to the last. You should never have to sit and stare, and you should certainly never have to guess.',
      'That makes this the right level for someone learning the puzzle, for a child working alongside an adult, and for anyone who wants sudoku as a fifteen-minute wind-down rather than a project. It is also the level most people should print for a group, because an easy grid keeps a room of mixed abilities moving at roughly the same pace instead of leaving half of them stuck on page one.',
      'The grids are still real sudoku, generated the same way as the expert ones: a complete solution is built first, then clues are removed one at a time, and each removal is kept only if a solver confirms the puzzle still has exactly one answer. Easier does not mean sloppier. It means more of the answer is already on the page when you sit down.',
    ],
    goodFor: [
      'Learning the puzzle for the first time',
      'Solving with a child or a beginner',
      'A short break rather than a long sitting',
      'Printing a mixed-ability set for a group or classroom',
    ],
    faqs: [
      {
        question: 'How many clues does an easy sudoku have?',
        answer:
          'Between 38 and 45 of the 81 cells are filled in when you start. The exact number varies puzzle to puzzle and is printed under each grid, so you can see at a glance how much help you were given.',
      },
      {
        question: 'How long does an easy sudoku take to solve?',
        answer:
          'Most people finish one in five to ten minutes. If you are new to sudoku expect longer for the first few, and expect that to drop quickly once scanning for single candidates becomes automatic.',
      },
      {
        question: 'Are easy puzzles good for children?',
        answer:
          'They are the right starting point. A child who can count to nine can solve one, because every step is a matter of noticing where a digit cannot go rather than reasoning several moves ahead. Print four or six per page so a full sheet lasts an afternoon.',
      },
      {
        question: 'Do I still need to guess on an easy puzzle?',
        answer:
          'Never. Every puzzle here has exactly one solution and can be reached by logic alone. If you find yourself guessing on an easy grid, there is a deduction available somewhere on the board that has not been spotted yet.',
      },
    ],
  },
  medium: {
    slug: 'medium',
    name: 'Medium',
    h1: 'Printable medium sudoku puzzles — free PDF with answer key',
    title: 'Printable Sudoku Medium — Free Puzzle PDFs | Grid Press',
    description:
      'Medium printable sudoku with 30–37 clues: a real fight, still solvable by clean logic. Generate a free PDF in A4 or US Letter, answers included.',
    clueRange: '30–37 clues',
    typicalTime: '10–20 minutes',
    lede: 'The everyday sudoku — the level a newspaper prints on a Wednesday.',
    body: [
      'Medium is where sudoku stops being a scanning exercise and starts being a puzzle. With 30 to 37 clues on the board, you will clear the obvious cells in the first minute or two and then hit a wall that simple scanning cannot get through. Getting past it means writing candidates into the empty cells and looking for pairs — two cells in a box that can only hold a 4 or a 7, which locks that 4 and that 7 out of every other cell in the box.',
      'That single technique is what separates a medium solver from an easy one, and it is why this is the level worth practising at. Hard and expert puzzles ask for more techniques on top, but they ask for this one constantly. Solve twenty medium grids and pencilling in candidates stops feeling like bookkeeping and starts feeling like the puzzle itself.',
      'This is also the safest level to print in bulk. A medium grid takes ten to twenty minutes, which is about the length of a coffee break, a commute leg or a waiting room. Six of them on two sheets of paper will see out a long afternoon without ever tipping into the kind of stuck that makes people put the pencil down.',
    ],
    goodFor: [
      'Regular solvers who want a puzzle, not a warm-up',
      'Practising candidate marking and naked pairs',
      'Commutes, breaks and waiting rooms',
      'Printing a batch that will not be finished in one sitting',
    ],
    faqs: [
      {
        question: 'How many clues does a medium sudoku have?',
        answer:
          'Between 30 and 37. That is roughly six to eight fewer than an easy puzzle, which sounds small but changes the solving experience completely — you will need to track candidates rather than solve cell by cell.',
      },
      {
        question: 'What is the difference between easy and medium sudoku?',
        answer:
          'An easy puzzle can be solved by scanning alone: look at a digit, find the one cell in a box where it fits, write it in. A medium puzzle will stall that approach partway through and ask you to note down the possible digits for each empty cell and reason about them.',
      },
      {
        question: 'Do I need to write candidate numbers in the cells?',
        answer:
          'Most people do, at least for the second half of the grid. If you would rather not, print one or two puzzles per page — the larger cells leave room for small pencil marks in the corners without the grid turning into a mess.',
      },
      {
        question: 'Is medium a good level for a beginner?',
        answer:
          'It is a good level to move up to, not to start at. If you can finish an easy puzzle without getting stuck, you are ready. If you are still hunting for the first move on an easy grid, spend another week there — medium will teach you less than it frustrates you.',
      },
    ],
  },
  hard: {
    slug: 'hard',
    name: 'Hard',
    h1: 'Printable hard sudoku puzzles — free PDF, answers included',
    title: 'Printable Sudoku Hard — Free Difficult PDFs | Grid Press',
    description:
      'Hard printable sudoku with just 25–29 clues, for solvers who want a real fight. Free PDF download, 1 to 6 puzzles per page, full answer key optional.',
    clueRange: '25–29 clues',
    typicalTime: '20–40 minutes',
    lede: 'Sparse grids that will not open up until you start reasoning about where digits cannot go.',
    body: [
      'A hard sudoku hands you 25 to 29 clues and expects you to do the rest. Scanning gets you a handful of cells; after that the grid goes quiet, and it stays quiet until you fill in candidates and start working with the relationships between them. Pointing pairs, box-line reduction and hidden pairs all earn their keep here — techniques that feel like overkill on a medium puzzle and feel like the only way forward on this one.',
      'The difference is not that hard puzzles have more difficult logic in them. It is that they have less redundancy. On an easy grid there are usually three different routes to the next cell, so you find one without trying. On a hard grid there is often exactly one deduction available on the whole board, and finding it means looking systematically instead of hopefully. That is the skill this level trains.',
      'Expect twenty to forty minutes, expect to put it down and come back, and expect to be wrong occasionally — a hard grid punishes a careless entry twenty moves later, which is when you discover it. Print with the answer key so you can check your finished grid rather than wondering, and print one or two per page: you will want the room to write.',
    ],
    goodFor: [
      'Experienced solvers who find medium puzzles too quick',
      'Learning pointing pairs and box-line reduction',
      'A long sitting, or a puzzle left out on the table for a few days',
      'Anyone who wants to be genuinely stuck for a while',
    ],
    faqs: [
      {
        question: 'How many clues does a hard sudoku have?',
        answer:
          'Between 25 and 29. Each puzzle prints its own clue count under the grid, so you can see exactly how sparse the one in front of you is.',
      },
      {
        question: 'What techniques do I need for hard sudoku?',
        answer:
          'Candidate marking is essential, and beyond that you will lean on naked and hidden pairs, pointing pairs and box-line reduction. Our solving techniques guide walks through each of them with worked examples.',
      },
      {
        question: 'Do hard puzzles ever require guessing?',
        answer:
          'No. Every puzzle here has exactly one solution and every one can be solved by logic. Guessing on a hard grid is usually a sign that a deduction has been missed, and it is a bad trade — a wrong guess on a sparse grid can take twenty minutes to unpick.',
      },
      {
        question: 'Should I print hard puzzles one per page?',
        answer:
          'One or two per page is the sensible choice. Hard puzzles need candidate marks in nearly every empty cell, and a six-per-page grid does not leave enough room to write them legibly.',
      },
    ],
  },
  expert: {
    slug: 'expert',
    name: 'Expert',
    h1: 'Printable expert sudoku puzzles — the hardest free PDF grids',
    title: 'Printable Sudoku Expert — Hardest Free PDFs | Grid Press',
    description:
      'Expert printable sudoku pared down to 20–24 clues — the hardest grids this generator makes. Free PDF, answer key included, A4 or US Letter.',
    clueRange: '20–24 clues',
    typicalTime: '40 minutes to over an hour',
    lede: 'Stripped to the bone — around a quarter of the grid filled in, and a single solution waiting at the end of it.',
    body: [
      'Expert puzzles carry 20 to 24 clues, which is close to the floor for a sudoku that still has one answer. The theoretical minimum is 17, and puzzles at that count are rare enough to be catalogued individually; at 20 to 24 the generator can reliably produce grids that are brutally sparse and still perfectly sound. What that means in practice is that the first ten minutes may yield nothing at all beyond a fully pencilled board.',
      'From there it is chains and eliminations. X-wings, unique rectangles, forcing chains — the techniques that only pay off when there is nothing simpler left to try. Many solvers work these puzzles over several sittings, and there is no shame in that. An expert grid is not a test of speed; it is a test of whether you can keep a board consistent in your head, and on paper, for an hour.',
      'Two warnings worth taking seriously. First, print one per page — you will need every millimetre for candidate marks, and a cramped grid will lose you the puzzle to a misread digit rather than to the logic. Second, print the answer key. On a puzzle this sparse, a single wrong entry early on can survive for forty moves before the contradiction surfaces, and being able to check a finished grid is the difference between satisfaction and an evening wasted.',
    ],
    goodFor: [
      'Solvers who finish hard puzzles without getting stuck',
      'Practising X-wings, chains and advanced eliminations',
      'A puzzle to work at over several sittings',
      'Anyone who wants the hardest grid this generator can make',
    ],
    faqs: [
      {
        question: 'How many clues does an expert sudoku have?',
        answer:
          'Between 20 and 24. For comparison, an easy puzzle starts with 38 to 45 — so an expert grid asks you to work out nearly three quarters of the board from a quarter of it.',
      },
      {
        question: 'What is the minimum number of clues a sudoku can have?',
        answer:
          'Seventeen. It was proved in 2012 that no valid sudoku with a unique solution can have sixteen or fewer clues. Our expert range sits a little above that floor because puzzles at 17 clues are extremely rare and cannot be produced reliably on demand.',
      },
      {
        question: 'Are expert puzzles still solvable without guessing?',
        answer:
          'Yes. Every puzzle here is verified to have exactly one solution, and a unique solution is always reachable by logic. It may take advanced techniques and a lot of patience, but there is a deduction available at every stage.',
      },
      {
        question: 'Why do expert puzzles take longer to generate?',
        answer:
          'Because each clue removal is tested. To get down to 22 clues the generator has to try removing far more cells than it keeps removed, running the solver every time to check the puzzle still has one answer. A batch of expert puzzles does more work per puzzle than a batch of easy ones.',
      },
    ],
  },
};

export const DIFFICULTY_ORDER: DifficultyKey[] = ['easy', 'medium', 'hard', 'expert'];
