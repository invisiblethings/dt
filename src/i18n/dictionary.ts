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
    tagline: 'PRINTABLE SUDOKU builds puzzle sheets in your browser, free and without an account.',
    copyright: (year) => `© ${year} Printable Sudoku`,
  },
  difficultyLabel: { easy: 'easy', medium: 'medium', hard: 'hard', expert: 'expert' },
  breadcrumbHome: 'Home',
  breadcrumbAriaLabel: 'Breadcrumb',
  difficultyCards: {
    titlePrefix: (name) => `${name} printable sudoku`,
    typicalSolve: (time) => `typical solve: ${time}`,
  },
  generator: {
    headingDefault: 'Set the run',
    subheadingDefault: 'configure the batch before printing',
    countLabel: 'Number of puzzles',
    countHint: '1–60 · the solver checks each puzzle for a single solution before adding it',
    difficultyLegend: 'Difficulty',
    hintNone: 'pick at least one level',
    hintSingle: (level) => `all puzzles ${level}`,
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
    statusComplete: (n) => `Run complete: ${n} puzzles ready to download.`,
    statusError: 'Setting the run failed. Try again.',
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
    liveSampleNote: 'This sample switches to your own puzzles when the run finishes.',
    previewPuzzleOf: (done, total) => `puzzle ${done} of ${total}`,
    previewPuzzleOneOfRun: 'puzzle 1 of your run',
    proofCopy: 'proof copy',
    noscript:
      'Your browser builds the PDF, so the generator needs JavaScript. The rest of the page, including the sample puzzle and the FAQs, works without it.',
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
      length: 'Puzzle codes have 6 characters. Check you typed all of them.',
      charset: 'That code has a character we do not use. Codes never contain I, L, O or U.',
      checksum:
        'We could not have printed that code. You probably misread one character, so check the sheet again.',
    },
    genericError: 'The lookup failed. Try again.',
    codeLabel: 'Puzzle code',
    submitIdle: 'Show the solution',
    submitBusy: 'Working it out…',
    hintPrefix: (n) => `The ${n}-character code printed under the grid, like `,
    hintSuffix: '. Case does not matter.',
    noscript: 'Your browser works out the solution, so the lookup needs JavaScript.',
    resultHeading: (code, difficulty, clueCount) => `Puzzle #${code}: ${difficulty}, ${clueCount} clues`,
    resultIntro:
      'On the left is the puzzle as printed, and on the right its one solution. Compare the left grid with your sheet before you trust the answer. If the two differ, you misread a character in the code.',
    puzzleStatus: 'the puzzle',
    solutionStatus: 'the solution',
    puzzleCaption: (difficulty, clueCount) => `difficulty: ${difficulty} · ${clueCount} clues`,
    solutionCaption: (code) => `solution to #${code}`,
    puzzleAriaLabel: (code) => `The original puzzle grid for #${code}`,
    solutionAriaLabel: (code) => `The completed solution grid for puzzle #${code}`,
  },
  notFound: {
    pageTitle: 'Page Not Found | Printable Sudoku',
    eyebrow: 'error 404',
    h1: 'We could not find that page',
    lede: 'The address you followed does not match any page on this site. You may have mistyped the URL, or followed a link to a page we have moved.',
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
      'Print a few puzzles at your level and try the technique on paper. You will remember it faster than you would from reading.',
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
    tagline: 'PRINTABLE SUDOKU erstellt Rätselblätter in deinem Browser, kostenlos und ohne Konto.',
    copyright: (year) => `© ${year} Printable Sudoku`,
  },
  difficultyLabel: { easy: 'einfach', medium: 'mittel', hard: 'schwer', expert: 'experte' },
  breadcrumbHome: 'Start',
  breadcrumbAriaLabel: 'Brotkrümelnavigation',
  difficultyCards: {
    titlePrefix: (name) => `Sudoku zum Ausdrucken: ${name}`,
    typicalSolve: (time) => `typische Lösungszeit: ${time}`,
  },
  generator: {
    headingDefault: 'Auflage festlegen',
    subheadingDefault: 'Stelle die Rätsel vor dem Drucken zusammen',
    countLabel: 'Anzahl der Rätsel',
    countHint: '1–60 · der Lösungsalgorithmus prüft jedes Rätsel auf eine eindeutige Lösung, bevor er es aufnimmt',
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
    statusComplete: (n) => `Auflage fertig: ${n} Rätsel bereit zum Herunterladen.`,
    statusError: 'Die Auflage ist fehlgeschlagen. Versuch es noch einmal.',
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
    liveSampleNote: 'Dieses Beispiel wechselt zu deinen eigenen Rätseln, sobald die Auflage fertig ist.',
    previewPuzzleOf: (done, total) => `Rätsel ${done} von ${total}`,
    previewPuzzleOneOfRun: 'Rätsel 1 deiner Auflage',
    proofCopy: 'Andruck',
    noscript:
      'Dein Browser erstellt das PDF, daher braucht der Generator JavaScript. Der Rest der Seite, etwa das Beispielrätsel und die FAQ, funktioniert auch ohne.',
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
      length: 'Rätselcodes haben 6 Zeichen. Prüfe, ob du alle eingegeben hast.',
      charset: 'Dieser Code enthält ein Zeichen, das wir nicht verwenden. Codes enthalten nie I, L, O oder U.',
      checksum:
        'Diesen Code können wir nicht gedruckt haben. Vermutlich hast du ein Zeichen falsch gelesen, also sieh noch einmal auf das Blatt.',
    },
    genericError: 'Die Suche ist fehlgeschlagen. Versuch es noch einmal.',
    codeLabel: 'Rätselcode',
    submitIdle: 'Lösung anzeigen',
    submitBusy: 'Wird berechnet…',
    hintPrefix: (n) => `Der ${n}-stellige Code, der unter dem Rätsel steht, zum Beispiel `,
    hintSuffix: '. Groß- und Kleinschreibung spielt keine Rolle.',
    noscript: 'Dein Browser berechnet die Lösung, daher braucht die Suche JavaScript.',
    resultHeading: (code, difficulty, clueCount) => `Rätsel #${code}: ${difficulty}, ${clueCount} Hinweise`,
    resultIntro:
      'Links steht das Rätsel, wie es gedruckt wurde, rechts seine einzige Lösung. Vergleiche das linke Raster mit deinem Blatt, bevor du der Lösung traust. Weichen die beiden ab, hast du ein Zeichen im Code falsch gelesen.',
    puzzleStatus: 'das Rätsel',
    solutionStatus: 'die Lösung',
    puzzleCaption: (difficulty, clueCount) => `Schwierigkeit: ${difficulty} · ${clueCount} Hinweise`,
    solutionCaption: (code) => `Lösung zu #${code}`,
    puzzleAriaLabel: (code) => `Das originale Rätselraster für #${code}`,
    solutionAriaLabel: (code) => `Das vollständige Lösungsraster für Rätsel #${code}`,
  },
  notFound: {
    pageTitle: 'Seite nicht gefunden | Printable Sudoku',
    eyebrow: 'Fehler 404',
    h1: 'Wir konnten diese Seite nicht finden',
    lede: 'Die aufgerufene Adresse passt zu keiner Seite dieser Website. Vielleicht hast du dich bei der URL vertippt oder bist einem Link auf eine Seite gefolgt, die wir verschoben haben.',
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
      'Drucke ein paar Rätsel auf deiner Stufe aus und probiere die Technik auf Papier. So merkst du sie dir schneller als beim Lesen.',
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
    tagline: 'PRINTABLE SUDOKU compose des grilles dans votre navigateur, sans frais et sans compte.',
    copyright: (year) => `© ${year} Printable Sudoku`,
  },
  difficultyLabel: { easy: 'facile', medium: 'moyen', hard: 'difficile', expert: 'expert' },
  breadcrumbHome: 'Accueil',
  breadcrumbAriaLabel: 'Fil d’Ariane',
  difficultyCards: {
    titlePrefix: (name) => `Sudoku à imprimer : ${name}`,
    typicalSolve: (time) => `temps de résolution habituel : ${time}`,
  },
  generator: {
    headingDefault: 'Composer le tirage',
    subheadingDefault: 'réglez le lot avant impression',
    countLabel: 'Nombre de grilles',
    countHint: '1 à 60 · le solveur vérifie que chaque grille n’a qu’une solution avant de l’ajouter',
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
    statusComplete: (n) => `Tirage terminé : ${n} grilles prêtes à télécharger.`,
    statusError: 'Le tirage a échoué. Réessayez.',
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
    liveSampleNote: 'Cet exemple laisse place à vos propres grilles à la fin du tirage.',
    previewPuzzleOf: (done, total) => `grille ${done} sur ${total}`,
    previewPuzzleOneOfRun: 'grille 1 de votre tirage',
    proofCopy: 'épreuve',
    noscript:
      'Votre navigateur génère le PDF : le générateur a donc besoin de JavaScript. Le reste de la page, dont la grille d’exemple et la FAQ, fonctionne sans.',
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
      length: 'Un code de grille comporte 6 caractères. Vérifiez que vous les avez tous saisis.',
      charset: 'Ce code contient un caractère que nous n’utilisons pas. Les codes ne contiennent jamais I, L, O ni U.',
      checksum:
        'Nous n’avons pas pu imprimer ce code. Vous avez sans doute mal lu un caractère : vérifiez la feuille.',
    },
    genericError: 'La recherche a échoué. Réessayez.',
    codeLabel: 'Code de la grille',
    submitIdle: 'Afficher la solution',
    submitBusy: 'Calcul en cours…',
    hintPrefix: (n) => `Le code à ${n} caractères imprimé sous la grille, par exemple `,
    hintSuffix: '. La casse n’a pas d’importance.',
    noscript: 'Votre navigateur calcule la solution : la recherche a donc besoin de JavaScript.',
    resultHeading: (code, difficulty, clueCount) => `Grille #${code} : ${difficulty}, ${clueCount} indices`,
    resultIntro:
      'À gauche, la grille telle que vous l’avez imprimée ; à droite, son unique solution. Comparez la grille de gauche à votre feuille avant de vous fier à la solution. Si elles diffèrent, vous avez mal lu un caractère du code.',
    puzzleStatus: 'la grille',
    solutionStatus: 'la solution',
    puzzleCaption: (difficulty, clueCount) => `difficulté : ${difficulty} · ${clueCount} indices`,
    solutionCaption: (code) => `solution de #${code}`,
    puzzleAriaLabel: (code) => `La grille originale du sudoku #${code}`,
    solutionAriaLabel: (code) => `La grille de solution complète du sudoku #${code}`,
  },
  notFound: {
    pageTitle: 'Page introuvable | Printable Sudoku',
    eyebrow: 'erreur 404',
    h1: 'Nous n’avons pas trouvé cette page',
    lede: 'L’adresse suivie ne correspond à aucune page de ce site. Vous avez peut-être mal saisi l’URL, ou suivi un lien vers une page que nous avons déplacée.',
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
      'Imprimez quelques grilles à votre niveau et essayez la technique sur papier. Vous la retiendrez plus vite qu’en lisant.',
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
    tagline: 'PRINTABLE SUDOKU crea hojas de sudoku en tu navegador, gratis y sin cuenta.',
    copyright: (year) => `© ${year} Printable Sudoku`,
  },
  difficultyLabel: { easy: 'fácil', medium: 'medio', hard: 'difícil', expert: 'experto' },
  breadcrumbHome: 'Inicio',
  breadcrumbAriaLabel: 'Migas de pan',
  difficultyCards: {
    titlePrefix: (name) => `Sudoku para imprimir: ${name}`,
    typicalSolve: (time) => `tiempo habitual: ${time}`,
  },
  generator: {
    headingDefault: 'Preparar la tirada',
    subheadingDefault: 'configura el lote antes de imprimir',
    countLabel: 'Número de sudokus',
    countHint: '1–60 · el solucionador comprueba que cada sudoku tenga una única solución antes de añadirlo',
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
    statusComplete: (n) => `Tirada lista: ${n} sudokus listos para descargar.`,
    statusError: 'La tirada ha fallado. Vuelve a intentarlo.',
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
    liveSampleNote: 'Esta muestra cambia a tus propios sudokus cuando termina la tirada.',
    previewPuzzleOf: (done, total) => `sudoku ${done} de ${total}`,
    previewPuzzleOneOfRun: 'sudoku 1 de tu tirada',
    proofCopy: 'prueba de imprenta',
    noscript:
      'Tu navegador genera el PDF, así que el generador necesita JavaScript. El resto de la página, incluidos el sudoku de muestra y las preguntas frecuentes, funciona sin él.',
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
      length: 'Los códigos de sudoku tienen 6 caracteres. Comprueba que los has escrito todos.',
      charset: 'Ese código tiene un carácter que no usamos. Los códigos nunca contienen I, L, O ni U.',
      checksum:
        'No podemos haber impreso ese código. Lo más probable es que hayas leído mal un carácter, así que revisa la hoja.',
    },
    genericError: 'La búsqueda ha fallado. Vuelve a intentarlo.',
    codeLabel: 'Código del sudoku',
    submitIdle: 'Mostrar la solución',
    submitBusy: 'Calculando…',
    hintPrefix: (n) => `El código de ${n} caracteres impreso bajo el sudoku, por ejemplo `,
    hintSuffix: '. Da igual si usas mayúsculas o minúsculas.',
    noscript: 'Tu navegador calcula la solución, así que la búsqueda necesita JavaScript.',
    resultHeading: (code, difficulty, clueCount) => `Sudoku #${code}: ${difficulty}, ${clueCount} pistas`,
    resultIntro:
      'A la izquierda está el sudoku tal como lo imprimiste; a la derecha, su única solución. Compara la cuadrícula de la izquierda con tu hoja antes de fiarte de la solución. Si no coinciden, has leído mal algún carácter del código.',
    puzzleStatus: 'el sudoku',
    solutionStatus: 'la solución',
    puzzleCaption: (difficulty, clueCount) => `dificultad: ${difficulty} · ${clueCount} pistas`,
    solutionCaption: (code) => `solución de #${code}`,
    puzzleAriaLabel: (code) => `La cuadrícula original del sudoku #${code}`,
    solutionAriaLabel: (code) => `La cuadrícula de solución completa del sudoku #${code}`,
  },
  notFound: {
    pageTitle: 'Página no encontrada | Printable Sudoku',
    eyebrow: 'error 404',
    h1: 'No hemos encontrado esta página',
    lede: 'La dirección que has seguido no corresponde a ninguna página de este sitio. Puede que hayas escrito mal la URL o que hayas seguido un enlace a una página que hemos movido.',
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
      'Imprime unos cuantos sudokus de tu nivel y prueba la técnica en papel. La recordarás antes que leyendo.',
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
