export interface GuideMeta {
  slug: string;
  title: string;
  h1: string;
  description: string;
  /** Shown on the guides index. */
  summary: string;
  published: string;
  updated: string;
  readingTime: string;
}

export const GUIDES: GuideMeta[] = [
  {
    slug: 'how-to-solve-sudoku',
    title: 'How to Solve Sudoku — A Beginner’s Guide',
    h1: 'How to solve sudoku: a beginner’s guide',
    description:
      'One rule, one first move, and the habits that get you through an easy grid without guessing. A practical starting guide for anyone holding a printed sudoku.',
    summary:
      'The single rule, where to make your first move, and how to work a whole easy grid without ever guessing.',
    published: '2026-01-14',
    updated: '2026-01-14',
    readingTime: '6 min read',
  },
  {
    slug: 'sudoku-solving-techniques',
    title: 'Sudoku Solving Techniques — From Naked Pairs to X-Wings',
    h1: 'Sudoku solving techniques for hard and expert grids',
    description:
      'The techniques that get you past a stalled grid: candidate marking, naked and hidden pairs, pointing pairs, box-line reduction and the X-wing.',
    summary:
      'What to do when scanning runs out: candidate marking, naked and hidden pairs, pointing pairs, box-line reduction and the X-wing.',
    published: '2026-01-21',
    updated: '2026-01-21',
    readingTime: '8 min read',
  },
  {
    slug: 'how-to-print-sudoku-puzzles',
    title: 'How to Print Sudoku Puzzles That Look Right',
    h1: 'How to print sudoku puzzles that look right',
    description:
      'Paper size, scaling, puzzles per page, ink and paper choices — the practical settings that decide whether a printed sudoku is a pleasure or a squint.',
    summary:
      'Scaling, margins, layout and paper: the settings that decide whether your printed grid is a pleasure or a squint.',
    published: '2026-02-04',
    updated: '2026-02-04',
    readingTime: '5 min read',
  },
];

export function guideBySlug(slug: string): GuideMeta | undefined {
  return GUIDES.find((g) => g.slug === slug);
}
