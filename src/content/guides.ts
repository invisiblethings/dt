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

const de: GuideMeta[] = [
  {
    slug: 'how-to-solve-sudoku',
    title: 'Sudoku lösen — eine Anleitung für Einsteiger',
    h1: 'Sudoku lösen: eine Anleitung für Einsteiger',
    description:
      'Eine Regel, ein erster Zug und die Gewohnheiten, mit denen du ein einfaches Raster löst, ohne zu raten. Eine praktische Einstiegsanleitung für alle mit einem gedruckten Sudoku in der Hand.',
    summary:
      'Die eine Regel, wo du deinen ersten Zug machst, und wie du ein ganzes einfaches Raster löst, ohne je zu raten.',
    published: '2026-01-14',
    updated: '2026-01-14',
    readingTime: '6 Min. Lesezeit',
  },
  {
    slug: 'sudoku-solving-techniques',
    title: 'Sudoku-Lösungstechniken — von offenen Paaren bis zu X-Wings',
    h1: 'Sudoku-Lösungstechniken für schwere und Experten-Raster',
    description:
      'Die Techniken, mit denen du über ein festgefahrenes Raster hinauskommst: Kandidaten-Notation, offene und versteckte Paare, zeigende Paare, Block-Zeilen-Reduktion und der X-Wing.',
    summary:
      'Was tun, wenn das bloße Absuchen nicht mehr reicht: Kandidaten-Notation, offene und versteckte Paare, zeigende Paare, Block-Zeilen-Reduktion und der X-Wing.',
    published: '2026-01-21',
    updated: '2026-01-21',
    readingTime: '8 Min. Lesezeit',
  },
  {
    slug: 'how-to-print-sudoku-puzzles',
    title: 'Sudoku richtig ausdrucken',
    h1: 'Sudoku richtig ausdrucken',
    description:
      'Papierformat, Skalierung, Rätsel pro Seite, Tinte und Papierwahl — die praktischen Einstellungen, die entscheiden, ob ein gedrucktes Sudoku angenehm zu lösen ist oder zur Augenprobe wird.',
    summary:
      'Skalierung, Ränder, Layout und Papier: die Einstellungen, die entscheiden, ob dein gedrucktes Raster ein Vergnügen ist oder eine Zumutung.',
    published: '2026-02-04',
    updated: '2026-02-04',
    readingTime: '5 Min. Lesezeit',
  },
];

const fr: GuideMeta[] = [
  {
    slug: 'how-to-solve-sudoku',
    title: 'Comment résoudre un sudoku — guide du débutant',
    h1: 'Comment résoudre un sudoku : guide du débutant',
    description:
      'Une seule règle, un premier coup, et les habitudes qui vous font traverser une grille facile sans jamais deviner. Un guide de démarrage pratique pour quiconque tient un sudoku imprimé entre les mains.',
    summary:
      'La règle unique, où jouer votre premier coup, et comment venir à bout d’une grille facile entière sans jamais deviner.',
    published: '2026-01-14',
    updated: '2026-01-14',
    readingTime: '6 min de lecture',
  },
  {
    slug: 'sudoku-solving-techniques',
    title: 'Techniques de résolution du sudoku — des paires nues aux X-wings',
    h1: 'Techniques de résolution pour les grilles difficiles et expert',
    description:
      'Les techniques qui vous font franchir une grille bloquée : notation des candidats, paires nues et cachées, paires pointantes, réduction bloc-ligne et le X-wing.',
    summary:
      'Que faire quand le simple balayage ne suffit plus : notation des candidats, paires nues et cachées, paires pointantes, réduction bloc-ligne et le X-wing.',
    published: '2026-01-21',
    updated: '2026-01-21',
    readingTime: '8 min de lecture',
  },
  {
    slug: 'how-to-print-sudoku-puzzles',
    title: 'Comment bien imprimer ses grilles de sudoku',
    h1: 'Comment bien imprimer ses grilles de sudoku',
    description:
      'Format de papier, mise à l’échelle, grilles par page, choix de l’encre et du papier — les réglages pratiques qui déterminent si un sudoku imprimé est un plaisir ou un supplice pour les yeux.',
    summary:
      'Mise à l’échelle, marges, mise en page et papier : les réglages qui déterminent si votre grille imprimée est un plaisir ou un supplice pour les yeux.',
    published: '2026-02-04',
    updated: '2026-02-04',
    readingTime: '5 min de lecture',
  },
];

const es: GuideMeta[] = [
  {
    slug: 'how-to-solve-sudoku',
    title: 'Cómo resolver un sudoku — guía para principiantes',
    h1: 'Cómo resolver un sudoku: guía para principiantes',
    description:
      'Una regla, un primer movimiento y los hábitos que te permiten resolver una cuadrícula fácil sin adivinar. Una guía práctica para empezar, para cualquiera que tenga un sudoku impreso en las manos.',
    summary:
      'La única regla, dónde hacer tu primer movimiento y cómo resolver toda una cuadrícula fácil sin adivinar nunca.',
    published: '2026-01-14',
    updated: '2026-01-14',
    readingTime: '6 min de lectura',
  },
  {
    slug: 'sudoku-solving-techniques',
    title: 'Técnicas de resolución de sudoku — de las parejas simples a los X-wing',
    h1: 'Técnicas de resolución de sudoku para cuadrículas difíciles y expertas',
    description:
      'Las técnicas que te sacan de una cuadrícula estancada: anotación de candidatos, parejas simples y ocultas, parejas apuntadoras, reducción caja-línea y el X-wing.',
    summary:
      'Qué hacer cuando repasar la cuadrícula ya no basta: anotación de candidatos, parejas simples y ocultas, parejas apuntadoras, reducción caja-línea y el X-wing.',
    published: '2026-01-21',
    updated: '2026-01-21',
    readingTime: '8 min de lectura',
  },
  {
    slug: 'how-to-print-sudoku-puzzles',
    title: 'Cómo imprimir sudokus que se vean bien',
    h1: 'Cómo imprimir sudokus que se vean bien',
    description:
      'Tamaño de papel, escala, sudokus por página, tinta y elección del papel — los ajustes prácticos que deciden si un sudoku impreso es un placer o un esfuerzo para la vista.',
    summary:
      'Escala, márgenes, diseño y papel: los ajustes que deciden si tu cuadrícula impresa es un placer o un esfuerzo para la vista.',
    published: '2026-02-04',
    updated: '2026-02-04',
    readingTime: '5 min de lectura',
  },
];

export const GUIDES_BY_LOCALE: Record<Locale, GuideMeta[]> = { en, de, fr, es };

export function guideBySlug(locale: Locale, slug: string): GuideMeta | undefined {
  return GUIDES_BY_LOCALE[locale].find((g) => g.slug === slug);
}
