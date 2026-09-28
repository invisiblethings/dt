import type { Locale } from '@/i18n/config';

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

const en: GuideMeta[] = [
  {
    slug: 'how-to-solve-sudoku',
    title: 'How to Solve Sudoku: A Beginner’s Guide',
    h1: 'How to solve sudoku: a beginner’s guide',
    description:
      'Learn the one rule of sudoku and the habits that carry you through an easy grid without guessing. Written for solving on paper.',
    summary:
      'The one rule of sudoku, and a method for finishing an easy grid without guessing.',
    published: '2026-01-14',
    updated: '2026-01-14',
    readingTime: '6 min read',
  },
  {
    slug: 'sudoku-solving-techniques',
    title: 'Sudoku Solving Techniques: From Naked Pairs to X-Wings',
    h1: 'Sudoku solving techniques for hard and expert grids',
    description:
      'The techniques that get you past a stalled grid: candidate marking, naked and hidden pairs, pointing pairs, box-line reduction and the X-wing.',
    summary:
      'Techniques for when scanning runs out: candidate marking, naked and hidden pairs, pointing pairs, box-line reduction and the X-wing.',
    published: '2026-01-21',
    updated: '2026-01-21',
    readingTime: '8 min read',
  },
  {
    slug: 'how-to-print-sudoku-puzzles',
    title: 'How to Print Sudoku Puzzles That Look Right',
    h1: 'How to print sudoku puzzles that look right',
    description:
      'Paper size, scaling and puzzles per page decide whether a printed grid leaves you room to write. This guide gives the settings to use and the paper to buy.',
    summary:
      'Scaling, margins, layout and paper: the settings for a grid you can read and write on.',
    published: '2026-02-04',
    updated: '2026-02-04',
    readingTime: '5 min read',
  },
];

const de: GuideMeta[] = [
  {
    slug: 'how-to-solve-sudoku',
    title: 'Sudoku lösen: eine Anleitung für Einsteiger',
    h1: 'Sudoku lösen: eine Anleitung für Einsteiger',
    description:
      'Lerne die eine Regel des Sudoku und die Gewohnheiten, mit denen du ein einfaches Raster ohne Raten löst. Geschrieben für das Lösen auf Papier.',
    summary:
      'Die eine Regel des Sudoku und eine Methode, mit der du ein einfaches Raster ohne Raten löst.',
    published: '2026-01-14',
    updated: '2026-01-14',
    readingTime: '6 Min. Lesezeit',
  },
  {
    slug: 'sudoku-solving-techniques',
    title: 'Sudoku-Lösungstechniken: von offenen Paaren bis zu X-Wings',
    h1: 'Sudoku-Lösungstechniken für schwere und Experten-Raster',
    description:
      'Die Techniken, mit denen du über ein festgefahrenes Raster hinauskommst: Kandidaten-Notation, offene und versteckte Paare, zeigende Paare, Block-Zeilen-Reduktion und der X-Wing.',
    summary:
      'Techniken für den Moment, in dem Absuchen nicht mehr reicht: Kandidaten-Notation, offene und versteckte Paare, zeigende Paare, Block-Zeilen-Reduktion und der X-Wing.',
    published: '2026-01-21',
    updated: '2026-01-21',
    readingTime: '8 Min. Lesezeit',
  },
  {
    slug: 'how-to-print-sudoku-puzzles',
    title: 'Sudoku richtig ausdrucken',
    h1: 'Sudoku richtig ausdrucken',
    description:
      'Papierformat, Skalierung und Rätsel pro Seite entscheiden, ob dir ein gedrucktes Raster Platz zum Schreiben lässt. Diese Anleitung nennt die richtigen Einstellungen und das passende Papier.',
    summary:
      'Skalierung, Ränder, Layout und Papier: die Einstellungen für ein Raster, das du gut lesen und beschriften kannst.',
    published: '2026-02-04',
    updated: '2026-02-04',
    readingTime: '5 Min. Lesezeit',
  },
];

const fr: GuideMeta[] = [
  {
    slug: 'how-to-solve-sudoku',
    title: 'Comment résoudre un sudoku : guide du débutant',
    h1: 'Comment résoudre un sudoku : guide du débutant',
    description:
      'Apprenez l’unique règle du sudoku et les habitudes qui vous mènent au bout d’une grille facile sans deviner. Écrit pour résoudre sur papier.',
    summary:
      'L’unique règle du sudoku, et une méthode pour finir une grille facile sans deviner.',
    published: '2026-01-14',
    updated: '2026-01-14',
    readingTime: '6 min de lecture',
  },
  {
    slug: 'sudoku-solving-techniques',
    title: 'Techniques de résolution du sudoku : des paires nues aux X-wings',
    h1: 'Techniques de résolution pour les grilles difficiles et expert',
    description:
      'Les techniques qui vous font franchir une grille bloquée : notation des candidats, paires nues et cachées, paires pointantes, réduction bloc-ligne et le X-wing.',
    summary:
      'Les techniques à employer quand le balayage ne suffit plus : notation des candidats, paires nues et cachées, paires pointantes, réduction bloc-ligne et le X-wing.',
    published: '2026-01-21',
    updated: '2026-01-21',
    readingTime: '8 min de lecture',
  },
  {
    slug: 'how-to-print-sudoku-puzzles',
    title: 'Comment bien imprimer ses grilles de sudoku',
    h1: 'Comment bien imprimer ses grilles de sudoku',
    description:
      'Le format de papier, la mise à l’échelle et le nombre de grilles par page déterminent la place qu’il vous reste pour écrire. Ce guide donne les bons réglages et le papier à choisir.',
    summary:
      'Mise à l’échelle, marges, mise en page et papier : les réglages pour une grille facile à lire et à annoter.',
    published: '2026-02-04',
    updated: '2026-02-04',
    readingTime: '5 min de lecture',
  },
];

const es: GuideMeta[] = [
  {
    slug: 'how-to-solve-sudoku',
    title: 'Cómo resolver un sudoku: guía para principiantes',
    h1: 'Cómo resolver un sudoku: guía para principiantes',
    description:
      'Aprende la única regla del sudoku y los hábitos que te llevan al final de una cuadrícula fácil sin adivinar. Pensada para resolver en papel.',
    summary:
      'La única regla del sudoku y un método para terminar una cuadrícula fácil sin adivinar.',
    published: '2026-01-14',
    updated: '2026-01-14',
    readingTime: '6 min de lectura',
  },
  {
    slug: 'sudoku-solving-techniques',
    title: 'Técnicas de resolución de sudoku: de las parejas simples a los X-wing',
    h1: 'Técnicas de resolución de sudoku para cuadrículas difíciles y expertas',
    description:
      'Las técnicas que te sacan de una cuadrícula estancada: anotación de candidatos, parejas simples y ocultas, parejas apuntadoras, reducción caja-línea y el X-wing.',
    summary:
      'Técnicas para cuando repasar la cuadrícula ya no basta: anotación de candidatos, parejas simples y ocultas, parejas apuntadoras, reducción caja-línea y el X-wing.',
    published: '2026-01-21',
    updated: '2026-01-21',
    readingTime: '8 min de lectura',
  },
  {
    slug: 'how-to-print-sudoku-puzzles',
    title: 'Cómo imprimir sudokus que se vean bien',
    h1: 'Cómo imprimir sudokus que se vean bien',
    description:
      'El tamaño de papel, la escala y los sudokus por página deciden cuánto sitio te queda para escribir. Esta guía da los ajustes correctos y el papel que conviene usar.',
    summary:
      'Escala, márgenes, diseño y papel: los ajustes para una cuadrícula fácil de leer y de anotar.',
    published: '2026-02-04',
    updated: '2026-02-04',
    readingTime: '5 min de lectura',
  },
];

export const GUIDES_BY_LOCALE: Record<Locale, GuideMeta[]> = { en, de, fr, es };

export function guideBySlug(locale: Locale, slug: string): GuideMeta | undefined {
  return GUIDES_BY_LOCALE[locale].find((g) => g.slug === slug);
}
