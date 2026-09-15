/**
 * UI chrome strings — everything that is not page-specific prose. Page
 * headings, FAQ text and long-form content live in `src/content/**` instead,
 * translated alongside the data they belong to.
 *
 * `EN` is the baseline; every other locale must have exactly the same shape,
 * which the `Record<Locale, Dictionary>` on `DICTIONARIES` enforces at
 * compile time — a missing key in `de`/`fr`/`es` fails the build rather than
 * silently falling back to English.
 */

import type { DifficultyKey } from '@/lib/sudoku';
import type { CodeError } from '@/lib/puzzle-code';
import type { Locale } from './config';

export interface Dictionary {
  skipToContent: string;
  nav: {
    ariaLabel: string;
    generator: string;
    byDifficulty: string;
    withAnswers: string;
    answerLookup: string;
    guides: string;
  };
  languageSwitcher: {
    ariaLabel: string;
  };
  footer: {
    ariaLabel: string;
    printableSudoku: {
      heading: string;
      generator: string;
      allLevels: string;
      withAnswers: string;
      fourPerPage: string;
      answerLookup: string;
    };
    byDifficulty: { heading: string };
    guides: {
      heading: string;
      all: string;
      howToSolve: string;
      techniques: string;
      howToPrint: string;
    };
    site: {
      heading: string;
      about: string;
      privacy: string;
    };
    tagline: string;
    copyright: (year: number) => string;
  };
  /** Short, single-word difficulty labels, used on buttons and captions. */
  difficultyLabel: Record<DifficultyKey, string>;
  breadcrumbHome: string;
  breadcrumbAriaLabel: string;
  difficultyCards: {
    titlePrefix: (name: string) => string;
    typicalSolve: (time: string) => string;
  };
  generator: {
    headingDefault: string;
    subheadingDefault: string;
    countLabel: string;
    countHint: string;
    difficultyLegend: string;
    hintNone: string;
    hintSingle: (level: string) => string;
    hintMixed: (levels: string) => string;
    /** Joins level names for the mixed hint: "easy, medium + hard". */
    joinLevels: (levels: string[]) => string;
    allLevels: string;
    perPageLabel: string;
    perPageOption: (n: number) => string;
    pageSizeLabel: string;
    pageSizeA4: string;
    pageSizeLetter: string;
    includeAnswers: string;
    generateButton: string;
    generateButtonBusy: string;
    progressAriaLabel: string;
    statusSettingFirst: (total: number) => string;
    statusSetting: (done: number, total: number, code: string, difficulty: string, clueCount: number) => string;
    statusLayout: string;
    statusComplete: (n: number) => string;
    statusError: string;
    resultPuzzlesSet: string;
    resultPages: string;
    resultPagesValue: (total: number, puzzlePages: number, solutionPages: number) => string;
    resultDifficulty: string;
    resultAnswers: string;
    resultAnswersIncluded: string;
    resultAnswersNotIncluded: string;
    download: string;
    startNewRun: string;
    liveSampleNote: string;
    previewPuzzleOf: (done: number, total: number) => string;
    previewPuzzleOneOfRun: string;
    proofCopy: string;
    noscript: string;
  };
  previewSheet: {
    brandLabel: string;
    stampSuffix: string;
    sampleAriaLabel: (difficulty: string, clueCount: number) => string;
    difficultyCaption: (difficulty: string, clueCount: number) => string;
  };
  lookup: {
    messages: Record<CodeError, string>;
    genericError: string;
    codeLabel: string;
    submitIdle: string;
    submitBusy: string;
    hintPrefix: (codeLength: number) => string;
    hintSuffix: string;
    noscript: string;
    resultHeading: (code: string, difficulty: string, clueCount: number) => string;
    resultIntro: string;
    puzzleStatus: string;
    solutionStatus: string;
    puzzleCaption: (difficulty: string, clueCount: number) => string;
    solutionCaption: (code: string) => string;
    puzzleAriaLabel: (code: string) => string;
    solutionAriaLabel: (code: string) => string;
  };
  notFound: {
    pageTitle: string;
    eyebrow: string;
    h1: string;
    lede: string;
    tryThese: string;
    generatorLink: string;
    byDifficultyLink: string;
    withAnswersLink: string;
    guidesLink: string;
    status: string;
  };
  article: {
    practiceHeading: string;
    practiceBody: string;
    generateLink: string;
    browseLevelsLink: string;
    dateLocale: string;
  };
  difficultyPage: {
    goodFor: string;
    clues: string;
    typicalSolve: string;
    solutions: string;
    exactlyOne: string;
  };
  pdf: {
    puzzlesHeader: string;
    answerKeyHeader: string;
    solutionPrefix: string;
    difficultyPrefix: string;
    cluesSuffix: string;
  };
}

const en: Dictionary = {
  skipToContent: 'Skip to main content',
  nav: {
    ariaLabel: 'Primary',
    generator: 'Generator',
    byDifficulty: 'By difficulty',
    withAnswers: 'With answers',
    answerLookup: 'Answer lookup',
    guides: 'Guides',
  },
  languageSwitcher: { ariaLabel: 'Language' },
  footer: {
    ariaLabel: 'Footer',
    printableSudoku: {
      heading: 'Printable sudoku',
      generator: 'Free printable sudoku generator',
      allLevels: 'All difficulty levels',
      withAnswers: 'Printable sudoku with answers',
      fourPerPage: '4 per page sudoku printable',
      answerLookup: 'Sudoku answer lookup',
    },
    byDifficulty: { heading: 'By difficulty' },
    guides: {
      heading: 'Guides',
      all: 'All guides',
      howToSolve: 'How to solve sudoku',
      techniques: 'Solving techniques',
      howToPrint: 'How to print sudoku',
    },
    site: { heading: 'This site', about: 'About', privacy: 'Privacy' },
    tagline: 'PRINTABLE SUDOKU — puzzle sheets generated in your browser. No account, no watermark, no cost.',
    copyright: (year) => `© ${year} Printable Sudoku`,
  },
  difficultyLabel: { easy: 'easy', medium: 'medium', hard: 'hard', expert: 'expert' },
  breadcrumbHome: 'Home',
  breadcrumbAriaLabel: 'Breadcrumb',
  difficultyCards: {
    titlePrefix: (name) => `Printable sudoku — ${name}`,
    typicalSolve: (time) => `typical solve: ${time}`,
  },
  generator: {
    headingDefault: 'Set the run',
    subheadingDefault: 'configure the batch before printing',
    countLabel: 'Number of puzzles',
    countHint: '1–60 · each puzzle is solver-checked for a single solution before it goes in',
    difficultyLegend: 'Difficulty',
    hintNone: 'pick at least one level',
    hintSingle: (level) => `every puzzle will be ${level}`,
    hintMixed: (levels) => `mixed run · ${levels}, split evenly and ordered easiest first`,
    joinLevels: (levels) =>
      levels.length <= 1 ? (levels[0] ?? '') : `${levels.slice(0, -1).join(', ')} + ${levels[levels.length - 1]}`,
    allLevels: 'all levels',
    perPageLabel: 'Puzzles per page',
    perPageOption: (n) => `${n} per page`,
    pageSizeLabel: 'Page size',
    pageSizeA4: 'A4 (210 × 297 mm)',
    pageSizeLetter: 'US Letter (8.5 × 11 in)',
    includeAnswers: 'Include answers',
    generateButton: 'Generate PDF',
    generateButtonBusy: 'Setting the run…',
    progressAriaLabel: 'Puzzle generation progress',
    statusSettingFirst: (total) => `Setting puzzle 1 of ${total}…`,
    statusSetting: (done, total, code, difficulty, clueCount) =>
      `Setting puzzle ${done} of ${total} · #${code} · ${difficulty} · ${clueCount} clues`,
    statusLayout: 'Laying out the PDF…',
    statusComplete: (n) => `Run complete — ${n} puzzles ready to download.`,
    statusError: 'Something went wrong while setting the run.',
    resultPuzzlesSet: 'Puzzles set',
    resultPages: 'Pages',
    resultPagesValue: (total, puzzlePages, solutionPages) =>
      `${total} (${puzzlePages} puzzle, ${solutionPages} key)`,
    resultDifficulty: 'Difficulty',
    resultAnswers: 'Answers',
    resultAnswersIncluded: 'included',
    resultAnswersNotIncluded: 'not included',
    download: 'Download PDF',
    startNewRun: 'start a new run',
    liveSampleNote: 'This is a live sample puzzle — it updates to your own puzzles once the run finishes.',
    previewPuzzleOf: (done, total) => `puzzle ${done} of ${total}`,
    previewPuzzleOneOfRun: 'puzzle 1 of your run',
    proofCopy: 'proof copy',
    noscript:
      'The PDF is built in your browser, so this generator needs JavaScript switched on. Everything else on the page — the puzzle above, the guides, the FAQs — works without it.',
  },
  previewSheet: {
    brandLabel: 'printable sudoku',
    stampSuffix: 'run',
    sampleAriaLabel: (difficulty, clueCount) => `Sample ${difficulty} sudoku puzzle grid with ${clueCount} starting clues`,
    difficultyCaption: (difficulty, clueCount) => `difficulty: ${difficulty} · ${clueCount} clues`,
  },
  lookup: {
    messages: {
      empty: 'Enter the code printed under your puzzle.',
      length: 'A puzzle code is 6 characters — check you have all of it.',
      charset: 'That code has a character we do not use. Codes never contain I, L, O or U.',
      checksum:
        'That is not a code we could have printed — most likely one character has been read wrong. Worth another look at the sheet.',
    },
    genericError: 'Something went wrong looking that up.',
    codeLabel: 'Puzzle code',
    submitIdle: 'Show the solution',
    submitBusy: 'Working it out…',
    hintPrefix: (n) => `The ${n}-character code printed under the grid, like `,
    hintSuffix: '. Case does not matter.',
    noscript: 'Solutions are worked out in your browser, so this lookup needs JavaScript switched on.',
    resultHeading: (code, difficulty, clueCount) => `Puzzle #${code} — ${difficulty}, ${clueCount} clues`,
    resultIntro:
      'The grid on the left is the puzzle as it was printed; on the right is its solution, the only one it has. Give the left-hand grid a glance against your sheet before you trust the answer — if it is not your puzzle, a character in the code was read wrong.',
    puzzleStatus: 'the puzzle',
    solutionStatus: 'the solution',
    puzzleCaption: (difficulty, clueCount) => `difficulty: ${difficulty} · ${clueCount} clues`,
    solutionCaption: (code) => `solution to #${code}`,
    puzzleAriaLabel: (code) => `The original puzzle grid for #${code}`,
    solutionAriaLabel: (code) => `The completed solution grid for puzzle #${code}`,
  },
  notFound: {
    pageTitle: 'Page Not Found — Printable Sudoku',
    eyebrow: 'error 404',
    h1: 'That page never made it to the press',
    lede: 'The address you followed does not match anything here — most likely a mistyped URL or a link to a page that has since moved. Nothing is broken on your end.',
    tryThese: 'Try one of these',
    generatorLink: 'Free printable sudoku generator',
    byDifficultyLink: 'Printable sudoku by difficulty',
    withAnswersLink: 'Printable sudoku with answers',
    guidesLink: 'Sudoku guides',
    status: 'misprint',
  },
  article: {
    practiceHeading: 'Put it into practice',
    practiceBody:
      'Print a set of puzzles at the level you are working on and try it on paper — it sticks faster than reading about it does.',
    generateLink: 'Generate a free PDF',
    browseLevelsLink: 'Browse difficulty levels',
    dateLocale: 'en-GB',
  },
  difficultyPage: {
    goodFor: 'Good for',
    clues: 'Clues',
    typicalSolve: 'Typical solve',
    solutions: 'Solutions',
    exactlyOne: 'exactly one',
  },
  pdf: {
    puzzlesHeader: 'puzzles',
    answerKeyHeader: 'answer key',
    solutionPrefix: 'Solution',
    difficultyPrefix: 'Difficulty',
    cluesSuffix: 'clues',
  },
};

const de: Dictionary = {
  skipToContent: 'Zum Inhalt springen',
  nav: {
    ariaLabel: 'Hauptnavigation',
    generator: 'Generator',
    byDifficulty: 'Nach Schwierigkeit',
    withAnswers: 'Mit Lösungen',
    answerLookup: 'Lösung nachschlagen',
    guides: 'Anleitungen',
  },
  languageSwitcher: { ariaLabel: 'Sprache' },
  footer: {
    ariaLabel: 'Footer',
    printableSudoku: {
      heading: 'Sudoku zum Ausdrucken',
      generator: 'Kostenloser Sudoku-Generator zum Ausdrucken',
      allLevels: 'Alle Schwierigkeitsgrade',
      withAnswers: 'Sudoku zum Ausdrucken mit Lösungen',
      fourPerPage: '4 Sudokus pro Seite ausdrucken',
      answerLookup: 'Sudoku-Lösung nachschlagen',
    },
    byDifficulty: { heading: 'Nach Schwierigkeit' },
    guides: {
      heading: 'Anleitungen',
      all: 'Alle Anleitungen',
      howToSolve: 'Sudoku lösen für Einsteiger',
      techniques: 'Lösungstechniken',
      howToPrint: 'Sudoku richtig ausdrucken',
    },
    site: { heading: 'Diese Website', about: 'Über uns', privacy: 'Datenschutz' },
    tagline: 'PRINTABLE SUDOKU — Rätselblätter, die direkt in deinem Browser erstellt werden. Kein Konto, kein Wasserzeichen, keine Kosten.',
    copyright: (year) => `© ${year} Printable Sudoku`,
  },
  difficultyLabel: { easy: 'einfach', medium: 'mittel', hard: 'schwer', expert: 'experte' },
  breadcrumbHome: 'Start',
  breadcrumbAriaLabel: 'Brotkrümelnavigation',
  difficultyCards: {
    titlePrefix: (name) => `Sudoku zum Ausdrucken — ${name}`,
    typicalSolve: (time) => `typische Lösungszeit: ${time}`,
  },
  generator: {
    headingDefault: 'Auflage festlegen',
    subheadingDefault: 'Stelle die Rätsel vor dem Drucken zusammen',
    countLabel: 'Anzahl der Rätsel',
    countHint: '1–60 · jedes Rätsel wird vor der Aufnahme auf eine eindeutige Lösung geprüft',
    difficultyLegend: 'Schwierigkeit',
    hintNone: 'mindestens eine Stufe auswählen',
    hintSingle: (level) => `jedes Rätsel hat die Stufe ${level}`,
    hintMixed: (levels) => `gemischte Auflage · ${levels}, gleichmäßig verteilt und vom leichtesten zum schwersten sortiert`,
    joinLevels: (levels) =>
      levels.length <= 1 ? (levels[0] ?? '') : `${levels.slice(0, -1).join(', ')} + ${levels[levels.length - 1]}`,
    allLevels: 'alle Stufen',
    perPageLabel: 'Rätsel pro Seite',
    perPageOption: (n) => `${n} pro Seite`,
    pageSizeLabel: 'Seitenformat',
    pageSizeA4: 'A4 (210 × 297 mm)',
    pageSizeLetter: 'US Letter (8,5 × 11 Zoll)',
    includeAnswers: 'Lösungen einschließen',
    generateButton: 'PDF erstellen',
    generateButtonBusy: 'Auflage wird gesetzt…',
    progressAriaLabel: 'Fortschritt der Rätselerstellung',
    statusSettingFirst: (total) => `Rätsel 1 von ${total} wird gesetzt…`,
    statusSetting: (done, total, code, difficulty, clueCount) =>
      `Rätsel ${done} von ${total} wird gesetzt · #${code} · ${difficulty} · ${clueCount} Hinweise`,
    statusLayout: 'PDF wird gesetzt…',
    statusComplete: (n) => `Auflage fertig — ${n} Rätsel bereit zum Herunterladen.`,
    statusError: 'Beim Zusammenstellen der Auflage ist etwas schiefgelaufen.',
    resultPuzzlesSet: 'Rätsel gesetzt',
    resultPages: 'Seiten',
    resultPagesValue: (total, puzzlePages, solutionPages) =>
      `${total} (${puzzlePages} Rätsel, ${solutionPages} Lösung)`,
    resultDifficulty: 'Schwierigkeit',
    resultAnswers: 'Lösungen',
    resultAnswersIncluded: 'enthalten',
    resultAnswersNotIncluded: 'nicht enthalten',
    download: 'PDF herunterladen',
    startNewRun: 'neue Auflage starten',
    liveSampleNote: 'Dies ist ein Beispielrätsel — es wird durch deine eigenen Rätsel ersetzt, sobald die Auflage fertig ist.',
    previewPuzzleOf: (done, total) => `Rätsel ${done} von ${total}`,
    previewPuzzleOneOfRun: 'Rätsel 1 deiner Auflage',
    proofCopy: 'Andruck',
    noscript:
      'Das PDF wird in deinem Browser erstellt, daher braucht dieser Generator JavaScript. Alles andere auf der Seite — das Rätsel oben, die Anleitungen, die FAQ — funktioniert auch ohne.',
  },
  previewSheet: {
    brandLabel: 'printable sudoku',
    stampSuffix: 'auflage',
    sampleAriaLabel: (difficulty, clueCount) => `Beispiel-Sudoku der Stufe ${difficulty} mit ${clueCount} vorgegebenen Zahlen`,
    difficultyCaption: (difficulty, clueCount) => `Schwierigkeit: ${difficulty} · ${clueCount} Hinweise`,
  },
  lookup: {
    messages: {
      empty: 'Gib den Code ein, der unter deinem Rätsel steht.',
      length: 'Ein Rätselcode hat 6 Zeichen — prüfe, ob du ihn vollständig eingegeben hast.',
      charset: 'Dieser Code enthält ein Zeichen, das wir nicht verwenden. Codes enthalten nie I, L, O oder U.',
      checksum:
        'Diesen Code hätten wir nicht ausgegeben — wahrscheinlich wurde ein Zeichen falsch gelesen. Ein zweiter Blick auf das Blatt lohnt sich.',
    },
    genericError: 'Bei der Suche ist etwas schiefgelaufen.',
    codeLabel: 'Rätselcode',
    submitIdle: 'Lösung anzeigen',
    submitBusy: 'Wird berechnet…',
    hintPrefix: (n) => `Der ${n}-stellige Code, der unter dem Rätsel steht, zum Beispiel `,
    hintSuffix: '. Groß- und Kleinschreibung spielt keine Rolle.',
    noscript: 'Lösungen werden in deinem Browser berechnet, daher braucht diese Suche JavaScript.',
    resultHeading: (code, difficulty, clueCount) => `Rätsel #${code} — ${difficulty}, ${clueCount} Hinweise`,
    resultIntro:
      'Links siehst du das Rätsel, so wie es gedruckt wurde; rechts die Lösung — die einzige, die es gibt. Wirf einen Blick auf das linke Rätsel und vergleiche es mit deinem Blatt, bevor du der Lösung traust — stimmt es nicht überein, wurde vermutlich ein Zeichen im Code falsch gelesen.',
    puzzleStatus: 'das Rätsel',
    solutionStatus: 'die Lösung',
    puzzleCaption: (difficulty, clueCount) => `Schwierigkeit: ${difficulty} · ${clueCount} Hinweise`,
    solutionCaption: (code) => `Lösung zu #${code}`,
    puzzleAriaLabel: (code) => `Das originale Rätselraster für #${code}`,
    solutionAriaLabel: (code) => `Das vollständige Lösungsraster für Rätsel #${code}`,
  },
  notFound: {
    pageTitle: 'Seite nicht gefunden — Printable Sudoku',
    eyebrow: 'Fehler 404',
    h1: 'Diese Seite hat es nie in den Druck geschafft',
    lede: 'Die aufgerufene Adresse stimmt mit nichts hier überein — vermutlich eine falsch eingegebene URL oder ein Link auf eine inzwischen verschobene Seite. Bei dir ist nichts kaputt.',
    tryThese: 'Versuch es hiermit',
    generatorLink: 'Kostenloser Sudoku-Generator zum Ausdrucken',
    byDifficultyLink: 'Sudoku zum Ausdrucken nach Schwierigkeit',
    withAnswersLink: 'Sudoku zum Ausdrucken mit Lösungen',
    guidesLink: 'Sudoku-Anleitungen',
    status: 'Fehldruck',
  },
  article: {
    practiceHeading: 'In der Praxis üben',
    practiceBody:
      'Drucke ein paar Rätsel auf deiner aktuellen Stufe aus und probiere sie auf Papier — das bleibt besser hängen als bloßes Lesen.',
    generateLink: 'Kostenloses PDF erstellen',
    browseLevelsLink: 'Schwierigkeitsgrade durchsehen',
    dateLocale: 'de-DE',
  },
  difficultyPage: {
    goodFor: 'Gut geeignet für',
    clues: 'Hinweise',
    typicalSolve: 'Typische Lösungszeit',
    solutions: 'Lösungen',
    exactlyOne: 'genau eine',
  },
  pdf: {
    puzzlesHeader: 'rätsel',
    answerKeyHeader: 'lösungen',
    solutionPrefix: 'Lösung',
    difficultyPrefix: 'Schwierigkeit',
    cluesSuffix: 'Hinweise',
  },
};

const fr: Dictionary = {
  skipToContent: 'Aller au contenu principal',
  nav: {
    ariaLabel: 'Navigation principale',
    generator: 'Générateur',
    byDifficulty: 'Par difficulté',
    withAnswers: 'Avec solutions',
    answerLookup: 'Retrouver une solution',
    guides: 'Guides',
  },
  languageSwitcher: { ariaLabel: 'Langue' },
  footer: {
    ariaLabel: 'Pied de page',
    printableSudoku: {
      heading: 'Sudoku à imprimer',
      generator: 'Générateur gratuit de sudoku à imprimer',
      allLevels: 'Tous les niveaux de difficulté',
      withAnswers: 'Sudoku à imprimer avec solutions',
      fourPerPage: '4 sudokus par page à imprimer',
      answerLookup: 'Retrouver une solution de sudoku',
    },
    byDifficulty: { heading: 'Par difficulté' },
    guides: {
      heading: 'Guides',
      all: 'Tous les guides',
      howToSolve: 'Comment résoudre un sudoku',
      techniques: 'Techniques de résolution',
      howToPrint: 'Bien imprimer son sudoku',
    },
    site: { heading: 'Ce site', about: 'À propos', privacy: 'Confidentialité' },
    tagline: 'PRINTABLE SUDOKU — des grilles générées directement dans votre navigateur. Sans compte, sans filigrane, sans frais.',
    copyright: (year) => `© ${year} Printable Sudoku`,
  },
  difficultyLabel: { easy: 'facile', medium: 'moyen', hard: 'difficile', expert: 'expert' },
  breadcrumbHome: 'Accueil',
  breadcrumbAriaLabel: 'Fil d’Ariane',
  difficultyCards: {
    titlePrefix: (name) => `Sudoku à imprimer — ${name}`,
    typicalSolve: (time) => `temps de résolution habituel : ${time}`,
  },
  generator: {
    headingDefault: 'Composer le tirage',
    subheadingDefault: 'réglez le lot avant impression',
    countLabel: 'Nombre de grilles',
    countHint: '1 à 60 · chaque grille est vérifiée par le solveur pour n’avoir qu’une seule solution avant d’être ajoutée',
    difficultyLegend: 'Difficulté',
    hintNone: 'choisissez au moins un niveau',
    hintSingle: (level) => `toutes les grilles seront de niveau ${level}`,
    hintMixed: (levels) => `tirage mixte · ${levels}, répartis équitablement et classés du plus facile au plus difficile`,
    joinLevels: (levels) =>
      levels.length <= 1 ? (levels[0] ?? '') : `${levels.slice(0, -1).join(', ')} + ${levels[levels.length - 1]}`,
    allLevels: 'tous les niveaux',
    perPageLabel: 'Grilles par page',
    perPageOption: (n) => `${n} par page`,
    pageSizeLabel: 'Format de page',
    pageSizeA4: 'A4 (210 × 297 mm)',
    pageSizeLetter: 'US Letter (8,5 × 11 po)',
    includeAnswers: 'Inclure les solutions',
    generateButton: 'Générer le PDF',
    generateButtonBusy: 'Composition du tirage…',
    progressAriaLabel: 'Progression de la génération des grilles',
    statusSettingFirst: (total) => `Composition de la grille 1 sur ${total}…`,
    statusSetting: (done, total, code, difficulty, clueCount) =>
      `Composition de la grille ${done} sur ${total} · #${code} · ${difficulty} · ${clueCount} indices`,
    statusLayout: 'Mise en page du PDF…',
    statusComplete: (n) => `Tirage terminé — ${n} grilles prêtes à télécharger.`,
    statusError: 'Une erreur est survenue pendant la composition du tirage.',
    resultPuzzlesSet: 'Grilles composées',
    resultPages: 'Pages',
    resultPagesValue: (total, puzzlePages, solutionPages) =>
      `${total} (${puzzlePages} grilles, ${solutionPages} solutions)`,
    resultDifficulty: 'Difficulté',
    resultAnswers: 'Solutions',
    resultAnswersIncluded: 'incluses',
    resultAnswersNotIncluded: 'non incluses',
    download: 'Télécharger le PDF',
    startNewRun: 'composer un nouveau tirage',
    liveSampleNote: 'Ceci est une grille d’exemple — elle sera remplacée par vos propres grilles une fois le tirage terminé.',
    previewPuzzleOf: (done, total) => `grille ${done} sur ${total}`,
    previewPuzzleOneOfRun: 'grille 1 de votre tirage',
    proofCopy: 'épreuve',
    noscript:
      'Le PDF est généré dans votre navigateur : ce générateur a donc besoin de JavaScript. Le reste de la page — la grille ci-dessus, les guides, la FAQ — fonctionne sans.',
  },
  previewSheet: {
    brandLabel: 'printable sudoku',
    stampSuffix: 'tirage',
    sampleAriaLabel: (difficulty, clueCount) => `Exemple de grille de sudoku ${difficulty} avec ${clueCount} indices de départ`,
    difficultyCaption: (difficulty, clueCount) => `difficulté : ${difficulty} · ${clueCount} indices`,
  },
  lookup: {
    messages: {
      empty: 'Saisissez le code imprimé sous votre grille.',
      length: 'Un code de grille comporte 6 caractères — vérifiez que vous l’avez saisi en entier.',
      charset: 'Ce code contient un caractère que nous n’utilisons pas. Les codes ne contiennent jamais I, L, O ni U.',
      checksum:
        'Ce code n’a pas pu être imprimé par nos soins — un caractère a probablement été mal lu. Un second coup d’œil à la feuille ne fera pas de mal.',
    },
    genericError: 'Une erreur est survenue pendant la recherche.',
    codeLabel: 'Code de la grille',
    submitIdle: 'Afficher la solution',
    submitBusy: 'Calcul en cours…',
    hintPrefix: (n) => `Le code à ${n} caractères imprimé sous la grille, par exemple `,
    hintSuffix: '. La casse n’a pas d’importance.',
    noscript: 'Les solutions sont calculées dans votre navigateur : cette recherche a donc besoin de JavaScript.',
    resultHeading: (code, difficulty, clueCount) => `Grille #${code} — ${difficulty}, ${clueCount} indices`,
    resultIntro:
      'La grille de gauche est celle qui a été imprimée ; à droite, sa solution — la seule qu’elle possède. Comparez la grille de gauche à votre feuille avant de faire confiance à la solution : si ce n’est pas votre grille, un caractère du code a été mal lu.',
    puzzleStatus: 'la grille',
    solutionStatus: 'la solution',
    puzzleCaption: (difficulty, clueCount) => `difficulté : ${difficulty} · ${clueCount} indices`,
    solutionCaption: (code) => `solution de #${code}`,
    puzzleAriaLabel: (code) => `La grille originale du sudoku #${code}`,
    solutionAriaLabel: (code) => `La grille de solution complète du sudoku #${code}`,
  },
  notFound: {
    pageTitle: 'Page introuvable — Printable Sudoku',
    eyebrow: 'erreur 404',
    h1: 'Cette page n’a jamais vu l’impression',
    lede: 'L’adresse suivie ne correspond à rien ici — probablement une URL mal saisie ou un lien vers une page qui a depuis changé d’adresse. Rien n’est cassé de votre côté.',
    tryThese: 'Essayez plutôt ceci',
    generatorLink: 'Générateur gratuit de sudoku à imprimer',
    byDifficultyLink: 'Sudoku à imprimer par difficulté',
    withAnswersLink: 'Sudoku à imprimer avec solutions',
    guidesLink: 'Guides sudoku',
    status: 'mal imprimé',
  },
  article: {
    practiceHeading: 'Passez à la pratique',
    practiceBody:
      'Imprimez quelques grilles au niveau où vous en êtes et essayez-les sur papier — cela reste bien mieux en tête que la seule lecture.',
    generateLink: 'Générer un PDF gratuit',
    browseLevelsLink: 'Parcourir les niveaux de difficulté',
    dateLocale: 'fr-FR',
  },
  difficultyPage: {
    goodFor: 'Idéal pour',
    clues: 'Indices',
    typicalSolve: 'Temps de résolution habituel',
    solutions: 'Solutions',
    exactlyOne: 'exactement une',
  },
  pdf: {
    puzzlesHeader: 'grilles',
    answerKeyHeader: 'solutions',
    solutionPrefix: 'Solution',
    difficultyPrefix: 'Difficulté',
    cluesSuffix: 'indices',
  },
};

const es: Dictionary = {
  skipToContent: 'Ir al contenido principal',
  nav: {
    ariaLabel: 'Navegación principal',
    generator: 'Generador',
    byDifficulty: 'Por dificultad',
    withAnswers: 'Con soluciones',
    answerLookup: 'Buscar solución',
    guides: 'Guías',
  },
  languageSwitcher: { ariaLabel: 'Idioma' },
  footer: {
    ariaLabel: 'Pie de página',
    printableSudoku: {
      heading: 'Sudoku para imprimir',
      generator: 'Generador gratuito de sudoku para imprimir',
      allLevels: 'Todos los niveles de dificultad',
      withAnswers: 'Sudoku para imprimir con soluciones',
      fourPerPage: '4 sudokus por página para imprimir',
      answerLookup: 'Buscar la solución de un sudoku',
    },
    byDifficulty: { heading: 'Por dificultad' },
    guides: {
      heading: 'Guías',
      all: 'Todas las guías',
      howToSolve: 'Cómo resolver un sudoku',
      techniques: 'Técnicas de resolución',
      howToPrint: 'Cómo imprimir bien un sudoku',
    },
    site: { heading: 'Este sitio', about: 'Acerca de', privacy: 'Privacidad' },
    tagline: 'PRINTABLE SUDOKU — hojas de sudoku generadas directamente en tu navegador. Sin cuenta, sin marca de agua, sin coste.',
    copyright: (year) => `© ${year} Printable Sudoku`,
  },
  difficultyLabel: { easy: 'fácil', medium: 'medio', hard: 'difícil', expert: 'experto' },
  breadcrumbHome: 'Inicio',
  breadcrumbAriaLabel: 'Migas de pan',
  difficultyCards: {
    titlePrefix: (name) => `Sudoku para imprimir — ${name}`,
    typicalSolve: (time) => `tiempo habitual: ${time}`,
  },
  generator: {
    headingDefault: 'Preparar la tirada',
    subheadingDefault: 'configura el lote antes de imprimir',
    countLabel: 'Número de sudokus',
    countHint: '1–60 · cada sudoku se comprueba con el solucionador para tener una única solución antes de añadirlo',
    difficultyLegend: 'Dificultad',
    hintNone: 'elige al menos un nivel',
    hintSingle: (level) => `todos los sudokus serán de nivel ${level}`,
    hintMixed: (levels) => `tirada mixta · ${levels}, repartidos de forma equitativa y ordenados de más fácil a más difícil`,
    joinLevels: (levels) =>
      levels.length <= 1 ? (levels[0] ?? '') : `${levels.slice(0, -1).join(', ')} + ${levels[levels.length - 1]}`,
    allLevels: 'todos los niveles',
    perPageLabel: 'Sudokus por página',
    perPageOption: (n) => `${n} por página`,
    pageSizeLabel: 'Tamaño de página',
    pageSizeA4: 'A4 (210 × 297 mm)',
    pageSizeLetter: 'US Letter (8,5 × 11 pulg.)',
    includeAnswers: 'Incluir soluciones',
    generateButton: 'Generar PDF',
    generateButtonBusy: 'Preparando la tirada…',
    progressAriaLabel: 'Progreso de la generación de sudokus',
    statusSettingFirst: (total) => `Preparando el sudoku 1 de ${total}…`,
    statusSetting: (done, total, code, difficulty, clueCount) =>
      `Preparando el sudoku ${done} de ${total} · #${code} · ${difficulty} · ${clueCount} pistas`,
    statusLayout: 'Maquetando el PDF…',
    statusComplete: (n) => `Tirada lista — ${n} sudokus listos para descargar.`,
    statusError: 'Algo ha fallado al preparar la tirada.',
    resultPuzzlesSet: 'Sudokus preparados',
    resultPages: 'Páginas',
    resultPagesValue: (total, puzzlePages, solutionPages) =>
      `${total} (${puzzlePages} de sudokus, ${solutionPages} de soluciones)`,
    resultDifficulty: 'Dificultad',
    resultAnswers: 'Soluciones',
    resultAnswersIncluded: 'incluidas',
    resultAnswersNotIncluded: 'no incluidas',
    download: 'Descargar PDF',
    startNewRun: 'preparar una nueva tirada',
    liveSampleNote: 'Este es un sudoku de muestra — se sustituirá por tus propios sudokus en cuanto termine la tirada.',
    previewPuzzleOf: (done, total) => `sudoku ${done} de ${total}`,
    previewPuzzleOneOfRun: 'sudoku 1 de tu tirada',
    proofCopy: 'prueba de imprenta',
    noscript:
      'El PDF se genera en tu navegador, así que este generador necesita JavaScript activado. El resto de la página — el sudoku de arriba, las guías, las preguntas frecuentes — funciona sin él.',
  },
  previewSheet: {
    brandLabel: 'printable sudoku',
    stampSuffix: 'tirada',
    sampleAriaLabel: (difficulty, clueCount) => `Sudoku de muestra de nivel ${difficulty} con ${clueCount} pistas iniciales`,
    difficultyCaption: (difficulty, clueCount) => `dificultad: ${difficulty} · ${clueCount} pistas`,
  },
  lookup: {
    messages: {
      empty: 'Escribe el código impreso bajo tu sudoku.',
      length: 'Un código de sudoku tiene 6 caracteres — comprueba que lo has escrito entero.',
      charset: 'Ese código tiene un carácter que no usamos. Los códigos nunca contienen I, L, O ni U.',
      checksum:
        'Ese no es un código que hayamos podido generar — lo más probable es que se haya leído mal un carácter. Merece la pena revisar la hoja otra vez.',
    },
    genericError: 'Algo ha fallado al buscar ese código.',
    codeLabel: 'Código del sudoku',
    submitIdle: 'Mostrar la solución',
    submitBusy: 'Calculando…',
    hintPrefix: (n) => `El código de ${n} caracteres impreso bajo el sudoku, por ejemplo `,
    hintSuffix: '. Da igual si usas mayúsculas o minúsculas.',
    noscript: 'Las soluciones se calculan en tu navegador, así que esta búsqueda necesita JavaScript activado.',
    resultHeading: (code, difficulty, clueCount) => `Sudoku #${code} — ${difficulty}, ${clueCount} pistas`,
    resultIntro:
      'La cuadrícula de la izquierda es el sudoku tal como se imprimió; a la derecha está su solución, la única que tiene. Echa un vistazo a la cuadrícula de la izquierda y compárala con tu hoja antes de fiarte de la solución — si no es tu sudoku, es que se leyó mal algún carácter del código.',
    puzzleStatus: 'el sudoku',
    solutionStatus: 'la solución',
    puzzleCaption: (difficulty, clueCount) => `dificultad: ${difficulty} · ${clueCount} pistas`,
    solutionCaption: (code) => `solución de #${code}`,
    puzzleAriaLabel: (code) => `La cuadrícula original del sudoku #${code}`,
    solutionAriaLabel: (code) => `La cuadrícula de solución completa del sudoku #${code}`,
  },
  notFound: {
    pageTitle: 'Página no encontrada — Printable Sudoku',
    eyebrow: 'error 404',
    h1: 'Esta página nunca llegó a imprimirse',
    lede: 'La dirección a la que has llegado no corresponde a nada de aquí — lo más probable es una URL mal escrita o un enlace a una página que ya se ha movido. No se ha roto nada por tu parte.',
    tryThese: 'Prueba con esto',
    generatorLink: 'Generador gratuito de sudoku para imprimir',
    byDifficultyLink: 'Sudoku para imprimir por dificultad',
    withAnswersLink: 'Sudoku para imprimir con soluciones',
    guidesLink: 'Guías de sudoku',
    status: 'mal impreso',
  },
  article: {
    practiceHeading: 'Ponlo en práctica',
    practiceBody:
      'Imprime unos cuantos sudokus del nivel en el que estás trabajando y pruébalos en papel — se te queda mejor que solo leer sobre ello.',
    generateLink: 'Generar un PDF gratis',
    browseLevelsLink: 'Ver los niveles de dificultad',
    dateLocale: 'es-ES',
  },
  difficultyPage: {
    goodFor: 'Bueno para',
    clues: 'Pistas',
    typicalSolve: 'Tiempo habitual',
    solutions: 'Soluciones',
    exactlyOne: 'exactamente una',
  },
  pdf: {
    puzzlesHeader: 'sudokus',
    answerKeyHeader: 'soluciones',
    solutionPrefix: 'Solución',
    difficultyPrefix: 'Dificultad',
    cluesSuffix: 'pistas',
  },
};

export const DICTIONARIES: Record<Locale, Dictionary> = { en, de, fr, es };

export function getDictionary(locale: Locale): Dictionary {
  return DICTIONARIES[locale];
}
