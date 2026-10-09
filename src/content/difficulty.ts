import type { DifficultyKey } from '@/lib/sudoku';
import type { FaqItem } from '@/lib/seo';
import type { Locale } from '@/i18n/config';

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

const en: Record<DifficultyKey, DifficultyContent> = {
  easy: {
    slug: 'easy',
    name: 'Easy',
    h1: 'Printable easy sudoku puzzles you can download as a PDF',
    title: 'Printable Sudoku Easy: Free PDF Puzzles With Answers',
    description:
      'Print easy sudoku puzzles with 38–45 starting clues. Choose how many you want, 1 to 6 per page, A4 or Letter, and download a free PDF with answers.',
    clueRange: '38–45 clues',
    typicalTime: '5–10 minutes',
    lede: 'Plenty of clues, and a solving path you can find by scanning alone.',
    body: [
      'On an easy sudoku you can always find the next move. Each grid on this page starts with 38 to 45 clues, enough that scanning rows, columns and boxes for the one place a digit can go carries you from the first cell to the last. You should not need to sit and stare, and you should not need to guess.',
      'That makes easy the right level for learning the puzzle, for a child solving alongside an adult, and for a fifteen-minute wind-down. It is also the level to print for a group: an easy grid keeps a room of mixed abilities moving at about the same pace, where a harder one would leave half of them stuck on page one.',
      'These are still real sudoku, made the same way as the expert grids. The generator builds a complete solution, then removes clues one at a time, and keeps each removal only if a solver confirms the puzzle still has exactly one answer. An easy grid gives you more of that answer on the page when you sit down.',
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
          'Between 38 and 45 of the 81 cells start filled in. The exact number varies from puzzle to puzzle, and you can read it under each grid.',
      },
      {
        question: 'How long does an easy sudoku take to solve?',
        answer:
          'Most solvers finish one in five to ten minutes. Your first few will take longer if you are new to sudoku, and the time drops once scanning for single candidates becomes a habit.',
      },
      {
        question: 'Are easy puzzles good for children?',
        answer:
          'Yes, they make the right starting point. A child who can count to nine can solve one, because each step asks where a digit cannot go, with no need to plan several moves ahead. Print four or six per page so a sheet lasts an afternoon.',
      },
      {
        question: 'Do I still need to guess on an easy puzzle?',
        answer:
          'No. Each puzzle here has one solution, and logic alone reaches it. If you catch yourself guessing on an easy grid, you have missed a deduction somewhere on the board.',
      },
    ],
  },
  medium: {
    slug: 'medium',
    name: 'Medium',
    h1: 'Printable medium sudoku puzzles: free PDF with answer key',
    title: 'Printable Sudoku Medium: Free PDF Puzzles to Print',
    description:
      'Medium printable sudoku with 30–37 clues, solvable with candidate marks and clean logic. Generate a free PDF in A4 or US Letter, answers included.',
    clueRange: '30–37 clues',
    typicalTime: '10–20 minutes',
    lede: 'The everyday sudoku, at the level a newspaper prints midweek.',
    body: [
      'At medium you need more than scanning. With 30 to 37 clues on the board, you clear the obvious cells in a minute or two and then hit a wall that scanning cannot get through. To get past it, write candidates into the empty cells and look for pairs: two cells in a box that can hold only a 4 or a 7 lock that 4 and 7 out of the other cells in the box.',
      'That technique separates a medium solver from an easy one, which is why this level rewards practice. Hard and expert puzzles add more techniques, but they lean on this one at every turn. After twenty medium grids, you will pencil in candidates without thinking about it.',
      'Medium is also the safest level to print in bulk. A grid takes ten to twenty minutes, about the length of a coffee break or a train ride. Six of them on two sheets will fill a long afternoon without leaving you stuck enough to put the pencil down.',
    ],
    goodFor: [
      'Regular solvers who want more than a warm-up',
      'Practising candidate marking and naked pairs',
      'Commutes, breaks and waiting rooms',
      'Printing a batch that will not be finished in one sitting',
    ],
    faqs: [
      {
        question: 'How many clues does a medium sudoku have?',
        answer:
          'Between 30 and 37, about six to eight fewer than an easy puzzle. With that many fewer clues, you have to track candidates instead of filling one cell at a time.',
      },
      {
        question: 'What is the difference between easy and medium sudoku?',
        answer:
          'You can solve an easy puzzle by scanning alone: pick a digit, find the one cell in a box where it fits, write it in. On a medium puzzle that approach stalls partway through, and you need to note the possible digits for each empty cell and reason about them.',
      },
      {
        question: 'Do I need to write candidate numbers in the cells?',
        answer:
          'Most solvers do, at least for the second half of the grid. Print one or two puzzles per page and the larger cells leave room for small pencil marks in the corners without the grid turning into a mess.',
      },
      {
        question: 'Is medium a good level for a beginner?',
        answer:
          'Move up to medium once you can finish an easy puzzle without getting stuck. If you still hunt for the first move on an easy grid, stay there another week, because medium will frustrate you more than it teaches you.',
      },
    ],
  },
  hard: {
    slug: 'hard',
    name: 'Hard',
    h1: 'Printable hard sudoku puzzles: free PDF, answers included',
    title: 'Printable Sudoku Hard: Free Difficult Puzzle PDFs',
    description:
      'Hard printable sudoku with 25–29 clues, for solvers who find medium too quick. Free PDF download, 1 to 6 puzzles per page, with an optional answer key.',
    clueRange: '25–29 clues',
    typicalTime: '20–40 minutes',
    lede: 'Sparse grids that open up once you reason about where each digit cannot go.',
    body: [
      'A hard sudoku gives you 25 to 29 clues. Scanning fills a handful of cells, and after that you make no progress until you fill in candidates and work with the relationships between them. Pointing pairs, box-line reduction and hidden pairs do the work here. On a medium puzzle they feel like overkill; on this one you need them.',
      'Hard puzzles use the same logic as easier ones, with less redundancy. An easy grid usually offers three routes to the next cell, so you find one without trying. A hard grid often offers one deduction on the whole board, and you find it by searching the board in order. This level trains that systematic search.',
      'Expect twenty to forty minutes, expect to put the grid down and come back, and expect the odd mistake. A careless entry on a hard grid can sit unnoticed for twenty moves. Print the answer key so you can check a finished grid, and print one or two per page for room to write.',
    ],
    goodFor: [
      'Experienced solvers who find medium puzzles too quick',
      'Learning pointing pairs and box-line reduction',
      'A long sitting, or a puzzle left out on the table for a few days',
      'Solvers who enjoy staying stuck for a while',
    ],
    faqs: [
      {
        question: 'How many clues does a hard sudoku have?',
        answer:
          'Between 25 and 29. Each puzzle prints its clue count under the grid, so you can see how sparse the one in front of you is.',
      },
      {
        question: 'What techniques do I need for hard sudoku?',
        answer:
          'You need candidate marking, and on top of that naked and hidden pairs, pointing pairs and box-line reduction. Our solving techniques guide works through each with examples.',
      },
      {
        question: 'Do hard puzzles ever require guessing?',
        answer:
          'No. Each puzzle here has one solution and yields to logic. If you are guessing on a hard grid, you have probably missed a deduction, and a wrong guess on a sparse grid can take twenty minutes to unpick.',
      },
      {
        question: 'Should I print hard puzzles one per page?',
        answer:
          'Print one or two per page. Hard puzzles need candidate marks in nearly every empty cell, and a six-per-page grid leaves too little room to write them legibly.',
      },
    ],
  },
  expert: {
    slug: 'expert',
    name: 'Expert',
    h1: 'Printable expert sudoku puzzles: the hardest free PDF grids',
    title: 'Printable Sudoku Expert: Hardest Free Puzzle PDFs',
    description:
      'Expert printable sudoku with 20–24 clues, the hardest grids this generator makes. Free PDF with an answer key, in A4 or US Letter.',
    clueRange: '20–24 clues',
    typicalTime: '40 minutes to over an hour',
    lede: 'About a quarter of the grid filled in, and one solution to reach.',
    body: [
      'Expert puzzles carry 20 to 24 clues, close to the floor for a sudoku with one answer. The proven minimum is 17, and puzzles with 17 clues are rare enough that enthusiasts catalogue them one by one. At 20 to 24 the generator can produce sparse, sound grids on demand. Expect the first ten minutes to give you nothing beyond a fully pencilled board.',
      'From there you work with chains and eliminations: X-wings, unique rectangles and forcing chains, the techniques you reach for once nothing simpler is left. Many solvers spread an expert grid over several sittings. The grid tests whether you can keep a board consistent, in your head and on paper, for an hour, and speed has little to do with it.',
      'Two warnings. Print one per page, because you will need the space for candidate marks, and a cramped grid invites a misread digit. And print the answer key. On a grid this sparse, one wrong entry early on can survive forty moves before a contradiction shows up, and checking the finished grid saves you an evening of doubt.',
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
          'Between 20 and 24. An easy puzzle starts with 38 to 45, so an expert grid asks you to work out nearly three quarters of the board from a quarter of it.',
      },
      {
        question: 'What is the minimum number of clues a sudoku can have?',
        answer:
          'Seventeen. Researchers proved in 2012 that no valid sudoku with a unique solution has sixteen or fewer clues. Our expert range sits above that floor because puzzles with 17 clues are rare, and a generator cannot produce them reliably on demand.',
      },
      {
        question: 'Are expert puzzles still solvable without guessing?',
        answer:
          'Yes. The solver confirms each puzzle has one solution, and you can reach a unique solution by logic. It may take advanced techniques and patience, but a deduction exists at every stage.',
      },
      {
        question: 'Why do expert puzzles take longer to generate?',
        answer:
          'The generator tests each clue removal. To get down to 22 clues it tries removing far more cells than it keeps empty, running the solver each time to check the puzzle still has one answer. An expert batch does more work per puzzle than an easy one.',
      },
    ],
  },
};

const de: Record<DifficultyKey, DifficultyContent> = {
  easy: {
    slug: 'easy',
    name: 'Einfach',
    h1: 'Einfache Sudokus zum Ausdrucken: als PDF herunterladen',
    title: 'Sudoku Einfach zum Ausdrucken: Kostenlose PDF-Rätsel mit Lösung',
    description:
      'Drucke einfache Sudokus mit 38–45 vorgegebenen Zahlen. Wähle, wie viele du willst, 1 bis 6 pro Seite, A4 oder Letter, und lade ein kostenloses PDF mit Lösungen herunter.',
    clueRange: '38–45 Hinweise',
    typicalTime: '5–10 Minuten',
    lede: 'Viele Vorgaben und ein Lösungsweg, den du allein durch Absuchen findest.',
    body: [
      'Bei einem einfachen Sudoku findest du den nächsten Zug jederzeit. Jedes Raster auf dieser Seite beginnt mit 38 bis 45 Hinweisen, genug, dass dich das Absuchen von Zeilen, Spalten und Blöcken nach dem einen Platz für eine Zahl vom ersten bis zum letzten Feld trägt. Du musst weder lange grübeln noch raten.',
      'Damit ist einfach die richtige Stufe, um das Rätsel zu lernen, für ein Kind, das mit einem Erwachsenen rätselt, und für eine Viertelstunde Entspannung. Für eine Gruppe solltest du ebenfalls diese Stufe drucken: Ein einfaches Raster hält eine Runde mit unterschiedlichem Können ungefähr im gleichen Tempo, wo ein schwereres die Hälfte auf der ersten Seite hängen ließe.',
      'Trotzdem sind es echte Sudokus, erzeugt wie die Experten-Raster. Der Generator baut eine vollständige Lösung, entfernt dann nacheinander Hinweise und behält jede Entfernung nur, wenn ein Lösungsalgorithmus bestätigt, dass das Rätsel weiterhin genau eine Lösung hat. Ein einfaches Raster zeigt dir beim Start mehr von dieser Lösung.',
    ],
    goodFor: [
      'Das Rätsel zum ersten Mal lernen',
      'Gemeinsames Lösen mit einem Kind oder Einsteiger',
      'Eine kurze Pause statt einer langen Sitzung',
      'Ein Set mit gemischtem Können für eine Gruppe oder Klasse drucken',
    ],
    faqs: [
      {
        question: 'Wie viele Hinweise hat ein einfaches Sudoku?',
        answer:
          'Zwischen 38 und 45 der 81 Felder sind zu Beginn ausgefüllt. Die genaue Zahl schwankt von Rätsel zu Rätsel und steht unter jedem Raster.',
      },
      {
        question: 'Wie lange braucht man für ein einfaches Sudoku?',
        answer:
          'Die meisten schaffen eines in fünf bis zehn Minuten. Als Einsteiger brauchst du für die ersten länger, und die Zeit sinkt, sobald das Absuchen nach eindeutigen Kandidaten zur Gewohnheit wird.',
      },
      {
        question: 'Sind einfache Rätsel gut für Kinder?',
        answer:
          'Ja, sie sind der richtige Einstieg. Ein Kind, das bis neun zählen kann, kann eines lösen, weil jeder Schritt fragt, wo eine Zahl nicht hinpasst, ohne mehrere Züge vorauszudenken. Drucke vier oder sechs pro Seite, damit ein Blatt einen Nachmittag reicht.',
      },
      {
        question: 'Muss ich bei einem einfachen Sudoku trotzdem raten?',
        answer:
          'Nein. Jedes Rätsel hier hat eine Lösung, und Logik allein führt dorthin. Ertappst du dich beim Raten auf einem einfachen Raster, hast du irgendwo auf dem Feld eine Schlussfolgerung übersehen.',
      },
    ],
  },
  medium: {
    slug: 'medium',
    name: 'Mittel',
    h1: 'Mittelschwere Sudokus zum Ausdrucken: kostenloses PDF mit Lösung',
    title: 'Sudoku Mittel zum Ausdrucken: Kostenlose PDF-Rätsel',
    description:
      'Mittelschwere Sudokus zum Ausdrucken mit 30–37 Hinweisen, lösbar mit Kandidatennotizen und sauberer Logik. Kostenloses PDF in A4 oder US Letter, inklusive Lösungen.',
    clueRange: '30–37 Hinweise',
    typicalTime: '10–20 Minuten',
    lede: 'Das Alltags-Sudoku, auf der Stufe, die eine Zeitung unter der Woche abdruckt.',
    body: [
      'Auf mittlerer Stufe reicht Absuchen nicht mehr. Mit 30 bis 37 Hinweisen auf dem Feld erledigst du die offensichtlichen Felder in ein, zwei Minuten und stößt dann auf eine Wand, die Absuchen nicht durchbricht. Um weiterzukommen, trägst du Kandidaten in die leeren Felder ein und suchst nach Paaren: Zwei Felder in einem Block, die nur eine 4 oder eine 7 aufnehmen können, sperren diese 4 und 7 für die übrigen Felder des Blocks.',
      'Diese Technik unterscheidet mittelschwere von einfachen Lösern, deshalb lohnt sich das Üben auf dieser Stufe. Schwere und Experten-Rätsel fügen weitere Techniken hinzu, greifen aber bei jedem Schritt auf diese zurück. Nach zwanzig mittelschweren Rastern trägst du Kandidaten ein, ohne darüber nachzudenken.',
      'Mittel ist auch die sicherste Stufe, um in Menge zu drucken. Ein Raster dauert zehn bis zwanzig Minuten, etwa so lange wie eine Kaffeepause oder eine Zugfahrt. Sechs davon auf zwei Blättern füllen einen langen Nachmittag, ohne dass du so festhängst, dass du den Stift hinlegst.',
    ],
    goodFor: [
      'Regelmäßige Löser, die mehr als ein Aufwärmen wollen',
      'Kandidaten-Notation und offene Paare üben',
      'Pendelfahrten, Pausen und Wartezimmer',
      'Einen Stapel drucken, der nicht in einer Sitzung fertig wird',
    ],
    faqs: [
      {
        question: 'Wie viele Hinweise hat ein mittelschweres Sudoku?',
        answer:
          'Zwischen 30 und 37, etwa sechs bis acht weniger als bei einem einfachen Rätsel. Mit so viel weniger Hinweisen musst du Kandidaten verfolgen, statt Feld für Feld zu füllen.',
      },
      {
        question: 'Was ist der Unterschied zwischen einfachem und mittelschwerem Sudoku?',
        answer:
          'Ein einfaches Rätsel löst du allein durch Absuchen: eine Zahl wählen, das eine Feld im Block finden, wo sie passt, eintragen. Bei einem mittelschweren Rätsel stockt dieser Ansatz auf halber Strecke, und du musst zu jedem leeren Feld die möglichen Zahlen notieren und damit weiterdenken.',
      },
      {
        question: 'Muss ich Kandidatenzahlen in die Felder schreiben?',
        answer:
          'Die meisten tun das, zumindest für die zweite Hälfte des Rasters. Drucke ein oder zwei Rätsel pro Seite, dann lassen die größeren Felder Platz für kleine Bleistiftnotizen in den Ecken, ohne dass das Raster unleserlich wird.',
      },
      {
        question: 'Ist mittel eine gute Stufe für Einsteiger?',
        answer:
          'Steig auf mittel um, sobald du ein einfaches Rätsel ohne Steckenbleiben lösen kannst. Suchst du beim einfachen Raster noch nach dem ersten Zug, bleib noch eine Woche dort, denn mittel frustriert dich dann mehr, als es dich lehrt.',
      },
    ],
  },
  hard: {
    slug: 'hard',
    name: 'Schwer',
    h1: 'Schwere Sudokus zum Ausdrucken: kostenloses PDF mit Lösungen',
    title: 'Sudoku Schwer zum Ausdrucken: Kostenlose PDF-Rätsel',
    description:
      'Schwere Sudokus zum Ausdrucken mit 25–29 Hinweisen, für alle, denen mittel zu schnell geht. Kostenloses PDF, 1 bis 6 Rätsel pro Seite, Lösungsschlüssel optional.',
    clueRange: '25–29 Hinweise',
    typicalTime: '20–40 Minuten',
    lede: 'Karge Raster, die sich öffnen, sobald du überlegst, wo eine Zahl nicht stehen kann.',
    body: [
      'Ein schweres Sudoku gibt dir 25 bis 29 Hinweise. Absuchen füllt eine Handvoll Felder, danach kommst du nicht weiter, bis du Kandidaten einträgst und mit den Beziehungen zwischen ihnen arbeitest. Zeigende Paare, Block-Zeilen-Reduktion und versteckte Paare leisten hier die Arbeit. Bei einem mittelschweren Rätsel wirken sie übertrieben, bei diesem brauchst du sie.',
      'Schwere Rätsel nutzen dieselbe Logik wie leichtere, mit weniger Redundanz. Ein einfaches Raster bietet meist drei Wege zum nächsten Feld, du findest also mühelos einen. Ein schweres Raster bietet oft eine einzige Schlussfolgerung auf dem ganzen Feld, und du findest sie, indem du das Feld der Reihe nach absuchst. Diese Stufe trainiert diese systematische Suche.',
      'Rechne mit zwanzig bis vierzig Minuten, damit, das Raster wegzulegen und später weiterzumachen, und mit gelegentlichen Fehlern. Eine unachtsame Eintragung kann auf einem schweren Raster zwanzig Züge lang unbemerkt bleiben. Drucke den Lösungsschlüssel, damit du ein fertiges Raster prüfen kannst, und drucke eines oder zwei pro Seite, damit du Platz zum Schreiben hast.',
    ],
    goodFor: [
      'Erfahrene Löser, denen mittelschwere Rätsel zu schnell gehen',
      'Zeigende Paare und Block-Zeilen-Reduktion lernen',
      'Eine lange Sitzung, oder ein Rätsel, das tagelang auf dem Tisch liegt',
      'Löser, die gern eine Weile feststecken',
    ],
    faqs: [
      {
        question: 'Wie viele Hinweise hat ein schweres Sudoku?',
        answer:
          'Zwischen 25 und 29. Jedes Rätsel druckt seine Anzahl an Hinweisen unter das Raster, sodass du siehst, wie karg das Rätsel vor dir ist.',
      },
      {
        question: 'Welche Techniken brauche ich für schwere Sudokus?',
        answer:
          'Du brauchst Kandidaten-Notation und dazu offene und versteckte Paare, zeigende Paare und Block-Zeilen-Reduktion. Unsere Anleitung zu Lösungstechniken geht jede davon mit Beispielen durch.',
      },
      {
        question: 'Muss man bei schweren Rätseln manchmal raten?',
        answer:
          'Nein. Jedes Rätsel hier hat eine Lösung und lässt sich mit Logik lösen. Rätst du bei einem schweren Raster, hast du vermutlich eine Schlussfolgerung übersehen, und ein falscher Rateversuch auf einem kargen Raster kann zwanzig Minuten kosten, bis du ihn rückgängig gemacht hast.',
      },
      {
        question: 'Sollte ich schwere Rätsel einzeln pro Seite drucken?',
        answer:
          'Drucke eines oder zwei pro Seite. Schwere Rätsel brauchen Kandidatennotizen in fast jedem leeren Feld, und ein Raster mit sechs pro Seite lässt zu wenig Platz, um sie leserlich zu schreiben.',
      },
    ],
  },
  expert: {
    slug: 'expert',
    name: 'Experte',
    h1: 'Experten-Sudokus zum Ausdrucken: die schwersten kostenlosen PDF-Raster',
    title: 'Sudoku Experte zum Ausdrucken: Schwerste Kostenlose PDF-Rätsel',
    description:
      'Experten-Sudokus zum Ausdrucken mit 20–24 Hinweisen, die schwersten Raster dieses Generators. Kostenloses PDF mit Lösungsschlüssel, in A4 oder US Letter.',
    clueRange: '20–24 Hinweise',
    typicalTime: '40 Minuten bis über eine Stunde',
    lede: 'Etwa ein Viertel des Rasters ist ausgefüllt, und es gibt genau eine Lösung zu finden.',
    body: [
      'Experten-Rätsel haben 20 bis 24 Hinweise, nahe an der Untergrenze für ein Sudoku mit einer Lösung. Das bewiesene Minimum liegt bei 17, und Rätsel mit 17 Hinweisen sind so selten, dass Liebhaber sie einzeln katalogisieren. Bei 20 bis 24 kann der Generator karge, korrekte Raster auf Abruf erzeugen. Rechne damit, dass dir die ersten zehn Minuten nicht mehr als ein vollständig mit Bleistift notiertes Feld bringen.',
      'Danach arbeitest du mit Ketten und Ausschlüssen: X-Wings, eindeutige Rechtecke und erzwingende Ketten, Techniken, zu denen du greifst, wenn nichts Einfacheres übrig ist. Viele Löser verteilen ein Experten-Raster auf mehrere Sitzungen. Das Raster prüft, ob du ein Feld eine Stunde lang im Kopf und auf dem Papier widerspruchsfrei halten kannst, und Tempo spielt dabei kaum eine Rolle.',
      'Zwei Warnungen. Drucke eines pro Seite, denn du brauchst den Platz für Kandidatennotizen, und ein enges Raster verleitet zum Verlesen einer Ziffer. Und drucke den Lösungsschlüssel. Auf einem so kargen Raster kann eine falsche Eintragung am Anfang vierzig Züge überleben, bevor ein Widerspruch auftaucht, und das Prüfen des fertigen Rasters erspart dir einen Abend voller Zweifel.',
    ],
    goodFor: [
      'Löser, die schwere Rätsel ohne Steckenbleiben schaffen',
      'X-Wings, Ketten und fortgeschrittene Ausschlüsse üben',
      'Ein Rätsel für mehrere Sitzungen',
      'Alle, die das schwerste Raster wollen, das dieser Generator erstellen kann',
    ],
    faqs: [
      {
        question: 'Wie viele Hinweise hat ein Experten-Sudoku?',
        answer:
          'Zwischen 20 und 24. Ein einfaches Rätsel beginnt mit 38 bis 45, ein Experten-Raster verlangt also, fast drei Viertel des Feldes aus einem Viertel herzuleiten.',
      },
      {
        question: 'Wie viele Hinweise braucht ein Sudoku mindestens?',
        answer:
          'Siebzehn. Forscher bewiesen 2012, dass kein gültiges Sudoku mit eindeutiger Lösung sechzehn oder weniger Hinweise hat. Unser Experten-Bereich liegt über dieser Grenze, weil Rätsel mit 17 Hinweisen selten sind und ein Generator sie nicht zuverlässig auf Abruf erzeugen kann.',
      },
      {
        question: 'Sind Experten-Rätsel noch ohne Raten lösbar?',
        answer:
          'Ja. Der Lösungsalgorithmus bestätigt für jedes Rätsel eine einzige Lösung, und eine eindeutige Lösung erreichst du mit Logik. Dafür brauchst du vielleicht fortgeschrittene Techniken und Geduld, aber in jeder Phase gibt es eine Schlussfolgerung.',
      },
      {
        question: 'Warum dauert die Erzeugung von Experten-Rätseln länger?',
        answer:
          'Der Generator prüft jede Entfernung eines Hinweises. Um auf 22 Hinweise zu kommen, versucht er, weit mehr Felder zu leeren, als am Ende leer bleiben, und lässt jedes Mal den Lösungsalgorithmus laufen, um zu prüfen, ob das Rätsel noch eine Lösung hat. Ein Satz Experten-Rätsel kostet pro Rätsel mehr Arbeit als ein Satz einfacher.',
      },
    ],
  },
};

const fr: Record<DifficultyKey, DifficultyContent> = {
  easy: {
    slug: 'easy',
    name: 'Facile',
    h1: 'Sudoku facile à imprimer, téléchargeable en PDF',
    title: 'Sudoku Facile à Imprimer : Grilles PDF Gratuites avec Solutions',
    description:
      'Imprimez des grilles de sudoku facile avec 38 à 45 indices de départ. Choisissez leur nombre, 1 à 6 par page, A4 ou Letter, et téléchargez un PDF gratuit avec solutions.',
    clueRange: '38–45 indices',
    typicalTime: '5 à 10 minutes',
    lede: 'Beaucoup d’indices, et un chemin de résolution que vous trouvez par balayage.',
    body: [
      'Sur une grille facile, vous trouvez toujours le coup suivant. Chaque grille de cette page démarre avec 38 à 45 indices, assez pour qu’un balayage des lignes, des colonnes et des blocs, à la recherche de la seule case possible pour un chiffre, vous mène de la première case à la dernière. Vous n’avez ni à réfléchir longuement, ni à deviner.',
      'C’est donc le bon niveau pour apprendre le jeu, pour un enfant qui joue avec un adulte, ou pour quinze minutes de détente. C’est aussi le niveau à imprimer pour un groupe : une grille facile fait avancer une salle aux niveaux variés à peu près au même rythme, là où une grille plus dure bloquerait la moitié dès la première page.',
      'Ce sont malgré tout de vraies grilles, fabriquées comme les grilles expert. Le générateur construit une solution complète, retire ensuite les indices un par un et ne garde chaque retrait que si un solveur confirme que la grille n’a toujours qu’une solution. Une grille facile vous montre une plus grande part de cette solution au départ.',
    ],
    goodFor: [
      'Découvrir le jeu pour la première fois',
      'Résoudre en famille avec un enfant ou un débutant',
      'Une courte pause plutôt qu’une longue séance',
      'Imprimer un lot pour un groupe ou une classe de niveaux mixtes',
    ],
    faqs: [
      {
        question: 'Combien d’indices comporte un sudoku facile ?',
        answer:
          'Entre 38 et 45 des 81 cases sont remplies au départ. Le nombre exact varie d’une grille à l’autre et figure sous chacune.',
      },
      {
        question: 'Combien de temps faut-il pour résoudre un sudoku facile ?',
        answer:
          'La plupart des joueurs en terminent une en cinq à dix minutes. Si vous débutez, les premières vous prendront plus de temps, et ce temps baisse dès que le balayage des candidats uniques devient un réflexe.',
      },
      {
        question: 'Les grilles faciles conviennent-elles aux enfants ?',
        answer:
          'Oui, c’est le bon point de départ. Un enfant qui sait compter jusqu’à neuf peut en résoudre une, car chaque étape demande où un chiffre ne peut pas aller, sans anticiper plusieurs coups. Imprimez-en quatre ou six par page pour qu’une feuille occupe un après-midi.',
      },
      {
        question: 'Faut-il quand même deviner sur une grille facile ?',
        answer:
          'Non. Chaque grille ici a une solution, et la logique seule y mène. Si vous vous surprenez à deviner sur une grille facile, vous avez manqué une déduction quelque part sur le plateau.',
      },
    ],
  },
  medium: {
    slug: 'medium',
    name: 'Moyen',
    h1: 'Sudoku moyen à imprimer : PDF gratuit avec solutions',
    title: 'Sudoku Moyen à Imprimer : Grilles PDF Gratuites',
    description:
      'Sudoku moyen à imprimer avec 30 à 37 indices, soluble avec des annotations de candidats et une logique claire. Générez un PDF gratuit en A4 ou US Letter, solutions incluses.',
    clueRange: '30–37 indices',
    typicalTime: '10 à 20 minutes',
    lede: 'Le sudoku du quotidien, au niveau qu’un journal publie en milieu de semaine.',
    body: [
      'Au niveau moyen, le balayage ne suffit plus. Avec 30 à 37 indices sur le plateau, vous réglez les cases évidentes en une minute ou deux, puis vous butez sur un mur que le balayage ne franchit pas. Pour avancer, notez les candidats dans les cases vides et cherchez les paires : deux cases d’un bloc qui ne peuvent contenir qu’un 4 ou un 7 excluent ce 4 et ce 7 des autres cases du bloc.',
      'Cette technique distingue un joueur de niveau moyen d’un joueur de niveau facile, d’où l’intérêt de s’entraîner ici. Les grilles difficiles et expert ajoutent d’autres techniques, mais s’appuient sur celle-ci à chaque étape. Après une vingtaine de grilles moyennes, vous noterez les candidats sans y penser.',
      'C’est aussi le niveau le plus sûr à imprimer en quantité. Une grille prend dix à vingt minutes, la durée d’une pause-café ou d’un trajet en train. Six grilles sur deux feuilles occupent un long après-midi sans vous bloquer au point de poser le crayon.',
    ],
    goodFor: [
      'Les habitués qui veulent plus qu’un échauffement',
      'S’entraîner à noter les candidats et repérer les paires nues',
      'Les trajets, les pauses et les salles d’attente',
      'Imprimer un lot qui ne se terminera pas en une seule séance',
    ],
    faqs: [
      {
        question: 'Combien d’indices comporte un sudoku moyen ?',
        answer:
          'Entre 30 et 37, soit six à huit de moins qu’une grille facile. Avec autant d’indices en moins, vous devez suivre les candidats au lieu de remplir les cases une à une.',
      },
      {
        question: 'Quelle est la différence entre un sudoku facile et un sudoku moyen ?',
        answer:
          'Une grille facile se résout par balayage : choisir un chiffre, trouver la seule case d’un bloc où il va, l’inscrire. Sur une grille moyenne, cette méthode cale à mi-parcours, et vous devez noter les chiffres possibles de chaque case vide pour raisonner dessus.',
      },
      {
        question: 'Faut-il noter les candidats dans les cases ?',
        answer:
          'La plupart des joueurs le font, au moins pour la seconde moitié de la grille. Imprimez une ou deux grilles par page : les cases plus grandes laissent de la place pour de petites annotations au crayon dans les coins sans rendre la grille illisible.',
      },
      {
        question: 'Le niveau moyen convient-il à un débutant ?',
        answer:
          'Passez au niveau moyen quand vous terminez une grille facile sans bloquer. Si vous cherchez encore le premier coup sur une grille facile, restez-y une semaine de plus, car le niveau moyen vous frustrerait plus qu’il ne vous apprendrait.',
      },
    ],
  },
  hard: {
    slug: 'hard',
    name: 'Difficile',
    h1: 'Sudoku difficile à imprimer : PDF gratuit, solutions incluses',
    title: 'Sudoku Difficile à Imprimer : Grilles PDF Gratuites',
    description:
      'Sudoku difficile à imprimer avec 25 à 29 indices, pour les joueurs qui trouvent le niveau moyen trop rapide. PDF gratuit, 1 à 6 grilles par page, corrigé en option.',
    clueRange: '25–29 indices',
    typicalTime: '20 à 40 minutes',
    lede: 'Des grilles clairsemées qui s’ouvrent quand vous raisonnez sur les cases où un chiffre ne peut pas aller.',
    body: [
      'Une grille difficile vous donne 25 à 29 indices. Le balayage remplit une poignée de cases, puis vous n’avancez plus tant que vous n’avez pas noté les candidats et travaillé sur leurs relations. Les paires pointantes, la réduction bloc-ligne et les paires cachées font ici le travail. Sur une grille moyenne, elles semblent superflues ; sur celle-ci, vous en avez besoin.',
      'Les grilles difficiles emploient la même logique que les plus faciles, avec moins de redondance. Une grille facile offre en général trois chemins vers la case suivante, et vous en trouvez un sans effort. Une grille difficile n’offre souvent qu’une déduction sur tout le plateau, et vous la trouvez en parcourant le plateau dans l’ordre. Ce niveau entraîne cette recherche méthodique.',
      'Comptez vingt à quarante minutes, attendez-vous à poser la grille pour y revenir, et à commettre une erreur de temps en temps. Une entrée étourdie peut passer inaperçue pendant vingt coups sur une grille difficile. Imprimez le corrigé pour vérifier une grille terminée, et imprimez-en une ou deux par page pour avoir de la place pour écrire.',
    ],
    goodFor: [
      'Les joueurs expérimentés pour qui le niveau moyen va trop vite',
      'Apprendre les paires pointantes et la réduction bloc-ligne',
      'Une longue séance, ou une grille laissée sur la table pendant plusieurs jours',
      'Les joueurs qui aiment rester bloqués un moment',
    ],
    faqs: [
      {
        question: 'Combien d’indices comporte un sudoku difficile ?',
        answer:
          'Entre 25 et 29. Chaque grille indique son nombre d’indices sous le plateau : vous voyez à quel point celle que vous avez devant vous est clairsemée.',
      },
      {
        question: 'Quelles techniques faut-il connaître pour le sudoku difficile ?',
        answer:
          'Il vous faut la notation des candidats, puis les paires nues et cachées, les paires pointantes et la réduction bloc-ligne. Notre guide des techniques de résolution les détaille une à une avec des exemples.',
      },
      {
        question: 'Les grilles difficiles demandent-elles parfois de deviner ?',
        answer:
          'Non. Chaque grille ici a une solution et se résout par la logique. Si vous devinez sur une grille difficile, vous avez sans doute manqué une déduction, et une supposition erronée sur une grille clairsemée peut prendre vingt minutes à démêler.',
      },
      {
        question: 'Faut-il imprimer les grilles difficiles une par page ?',
        answer:
          'Imprimez-en une ou deux par page. Les grilles difficiles demandent des annotations dans presque toutes les cases vides, et une grille à six par page laisse trop peu de place pour les écrire lisiblement.',
      },
    ],
  },
  expert: {
    slug: 'expert',
    name: 'Expert',
    h1: 'Sudoku expert à imprimer : les grilles PDF gratuites les plus difficiles',
    title: 'Sudoku Expert à Imprimer : Grilles PDF Gratuites les Plus Difficiles',
    description:
      'Sudoku expert à imprimer avec 20 à 24 indices, les grilles les plus difficiles de ce générateur. PDF gratuit avec corrigé, en A4 ou US Letter.',
    clueRange: '20–24 indices',
    typicalTime: '40 minutes à plus d’une heure',
    lede: 'Environ un quart de la grille rempli, et une seule solution à atteindre.',
    body: [
      'Les grilles expert comptent 20 à 24 indices, près du plancher pour un sudoku à solution unique. Le minimum démontré est de 17, et les grilles à 17 indices sont si rares que des passionnés les répertorient une à une. Entre 20 et 24, le générateur produit à la demande des grilles clairsemées et valides. Attendez-vous à ce que les dix premières minutes ne vous donnent rien de plus qu’un plateau entièrement annoté au crayon.',
      'Ensuite, vous travaillez avec des chaînes et des éliminations : X-wings, rectangles uniques et chaînes forcées, les techniques auxquelles vous recourez quand il ne reste rien de plus simple. Beaucoup de joueurs répartissent une grille expert sur plusieurs séances. La grille teste votre capacité à garder un plateau cohérent, dans votre tête et sur le papier, pendant une heure, et la vitesse y compte peu.',
      'Deux avertissements. Imprimez-en une par page, car vous aurez besoin de place pour les annotations, et une grille serrée pousse à mal lire un chiffre. Et imprimez le corrigé. Sur une grille aussi clairsemée, une entrée erronée au début peut survivre quarante coups avant qu’une contradiction n’apparaisse, et vérifier la grille terminée vous épargne une soirée de doute.',
    ],
    goodFor: [
      'Les joueurs qui terminent les grilles difficiles sans bloquer',
      'S’entraîner aux X-wings, aux chaînes et aux éliminations avancées',
      'Une grille à travailler sur plusieurs séances',
      'Quiconque veut la grille la plus difficile que ce générateur puisse produire',
    ],
    faqs: [
      {
        question: 'Combien d’indices comporte un sudoku expert ?',
        answer:
          'Entre 20 et 24. Une grille facile démarre avec 38 à 45 indices : une grille expert vous demande donc de déduire près des trois quarts du plateau à partir d’un quart.',
      },
      {
        question: 'Quel est le nombre minimum d’indices possible pour un sudoku ?',
        answer:
          'Dix-sept. Des chercheurs ont démontré en 2012 qu’aucun sudoku valide à solution unique ne comporte seize indices ou moins. Notre plage expert se situe au-dessus de ce plancher, car les grilles à 17 indices sont rares et un générateur ne peut pas les produire de façon fiable à la demande.',
      },
      {
        question: 'Les grilles expert restent-elles solubles sans deviner ?',
        answer:
          'Oui. Le solveur confirme que chaque grille n’a qu’une solution, et vous atteignez une solution unique par la logique. Il vous faudra peut-être des techniques avancées et de la patience, mais une déduction existe à chaque étape.',
      },
      {
        question: 'Pourquoi les grilles expert mettent-elles plus de temps à être générées ?',
        answer:
          'Le générateur teste chaque retrait d’indice. Pour descendre à 22 indices, il essaie de vider bien plus de cases qu’il n’en laisse vides, et relance le solveur à chaque fois pour vérifier que la grille garde une solution unique. Un lot expert demande plus de travail par grille qu’un lot facile.',
      },
    ],
  },
};

const es: Record<DifficultyKey, DifficultyContent> = {
  easy: {
    slug: 'easy',
    name: 'Fácil',
    h1: 'Sudokus fáciles para imprimir, descargables en PDF',
    title: 'Sudoku Fácil para Imprimir: PDF Gratis con Soluciones',
    description:
      'Imprime sudokus fáciles con 38–45 pistas iniciales. Elige cuántos quieres, de 1 a 6 por página, A4 o Letter, y descarga un PDF gratis con soluciones.',
    clueRange: '38–45 pistas',
    typicalTime: '5–10 minutos',
    lede: 'Muchas pistas, y un camino de resolución que encuentras repasando la cuadrícula.',
    body: [
      'En un sudoku fácil siempre encuentras el siguiente movimiento. Cada cuadrícula de esta página empieza con 38 a 45 pistas, suficientes para que repasar filas, columnas y regiones, buscando el único hueco donde cabe un número, te lleve de la primera casilla a la última. No tienes que quedarte pensando ni adivinar.',
      'Por eso es el nivel adecuado para aprender el juego, para un niño que resuelve junto a un adulto y para un descanso de quince minutos. También es el nivel que conviene imprimir para un grupo: una cuadrícula fácil mantiene a personas de distinto nivel avanzando a un ritmo parecido, mientras que una más difícil dejaría a la mitad atascada en la primera página.',
      'Aun así, son sudokus de verdad, hechos igual que los expertos. El generador construye una solución completa, retira luego las pistas una a una y conserva cada retirada solo si un solucionador confirma que el sudoku sigue teniendo una única solución. Un sudoku fácil te muestra más de esa solución al empezar.',
    ],
    goodFor: [
      'Aprender el juego por primera vez',
      'Resolver acompañado de un niño o de alguien que empieza',
      'Un descanso corto en vez de una sesión larga',
      'Imprimir un set de nivel mixto para un grupo o una clase',
    ],
    faqs: [
      {
        question: '¿Cuántas pistas tiene un sudoku fácil?',
        answer:
          'Entre 38 y 45 de las 81 casillas empiezan rellenas. El número exacto varía de un sudoku a otro y aparece bajo cada cuadrícula.',
      },
      {
        question: '¿Cuánto se tarda en resolver un sudoku fácil?',
        answer:
          'La mayoría termina uno en cinco a diez minutos. Si empiezas, los primeros te llevarán más, y el tiempo baja en cuanto buscar candidatos únicos se vuelve un hábito.',
      },
      {
        question: '¿Los sudokus fáciles son buenos para niños?',
        answer:
          'Sí, son el punto de partida adecuado. Un niño que sepa contar hasta nueve puede resolver uno, porque cada paso pregunta dónde no puede ir un número, sin pensar varios movimientos por delante. Imprime cuatro o seis por página para que una hoja dure una tarde.',
      },
      {
        question: '¿Aun así hace falta adivinar en un sudoku fácil?',
        answer:
          'No. Cada sudoku aquí tiene una solución, y la lógica basta para llegar a ella. Si te pillas adivinando en una cuadrícula fácil, se te ha escapado una deducción en algún punto del tablero.',
      },
    ],
  },
  medium: {
    slug: 'medium',
    name: 'Medio',
    h1: 'Sudokus de nivel medio para imprimir: PDF gratis con soluciones',
    title: 'Sudoku Medio para Imprimir: PDF Gratis para Imprimir',
    description:
      'Sudoku de nivel medio para imprimir con 30–37 pistas, resoluble con anotación de candidatos y lógica clara. Genera un PDF gratis en A4 o US Letter, con soluciones incluidas.',
    clueRange: '30–37 pistas',
    typicalTime: '10–20 minutos',
    lede: 'El sudoku de cada día, al nivel que publica un periódico a mitad de semana.',
    body: [
      'En el nivel medio, repasar la cuadrícula ya no basta. Con 30 a 37 pistas sobre el tablero, resuelves las casillas evidentes en un minuto o dos y luego chocas con una pared que el repaso no atraviesa. Para seguir, anota los candidatos en las casillas vacías y busca parejas: dos casillas de una región que solo admiten un 4 o un 7 bloquean ese 4 y ese 7 para el resto de la región.',
      'Esa técnica separa a quien resuelve nivel medio de quien resuelve nivel fácil, y por eso merece la pena practicar aquí. Los sudokus difíciles y expertos añaden más técnicas, pero recurren a esta a cada paso. Tras veinte cuadrículas de nivel medio, anotarás candidatos sin pensarlo.',
      'Este es también el nivel más seguro para imprimir en cantidad. Una cuadrícula lleva de diez a veinte minutos, lo que dura una pausa para el café o un trayecto en tren. Seis de ellas en dos hojas llenan una tarde larga sin atascarte hasta el punto de soltar el lápiz.',
    ],
    goodFor: [
      'Quien resuelve a menudo y quiere algo más que un calentamiento',
      'Practicar la anotación de candidatos y las parejas simples',
      'Trayectos, descansos y salas de espera',
      'Imprimir un lote que no se va a terminar en una sola sesión',
    ],
    faqs: [
      {
        question: '¿Cuántas pistas tiene un sudoku de nivel medio?',
        answer:
          'Entre 30 y 37, unas seis a ocho menos que en un sudoku fácil. Con tantas pistas menos, tienes que seguir candidatos en vez de rellenar casilla a casilla.',
      },
      {
        question: '¿Cuál es la diferencia entre un sudoku fácil y uno de nivel medio?',
        answer:
          'Un sudoku fácil se resuelve repasando: eliges un número, encuentras la única casilla de una región donde encaja y lo escribes. En un sudoku de nivel medio ese método se atasca a mitad de camino, y tienes que anotar los números posibles de cada casilla vacía y razonar con ellos.',
      },
      {
        question: '¿Hace falta anotar los números candidatos en las casillas?',
        answer:
          'La mayoría lo hace, al menos en la segunda mitad de la cuadrícula. Imprime uno o dos sudokus por página y las casillas más grandes dejarán sitio para pequeñas anotaciones a lápiz en las esquinas sin que la cuadrícula se vuelva un lío.',
      },
      {
        question: '¿El nivel medio es bueno para alguien que empieza?',
        answer:
          'Pasa al nivel medio cuando termines un sudoku fácil sin atascarte. Si todavía buscas el primer movimiento en una cuadrícula fácil, quédate ahí una semana más, porque el nivel medio te frustrará más de lo que te enseñe.',
      },
    ],
  },
  hard: {
    slug: 'hard',
    name: 'Difícil',
    h1: 'Sudokus difíciles para imprimir: PDF gratis, con soluciones',
    title: 'Sudoku Difícil para Imprimir: PDF Gratis de Sudokus Difíciles',
    description:
      'Sudoku difícil para imprimir con 25–29 pistas, para quien encuentra el nivel medio demasiado rápido. Descarga gratis en PDF, de 1 a 6 sudokus por página, con soluciones opcionales.',
    clueRange: '25–29 pistas',
    typicalTime: '20–40 minutos',
    lede: 'Cuadrículas escasas que se abren cuando razonas sobre dónde no puede ir cada número.',
    body: [
      'Un sudoku difícil te da entre 25 y 29 pistas. Repasar la cuadrícula rellena un puñado de casillas, y después no avanzas hasta que anotas candidatos y trabajas con las relaciones entre ellos. Las parejas apuntadoras, la reducción caja-línea y las parejas ocultas hacen aquí el trabajo. En un sudoku de nivel medio parecen excesivas; en este las necesitas.',
      'Los sudokus difíciles usan la misma lógica que los más fáciles, con menos redundancia. Una cuadrícula fácil suele ofrecer tres caminos hasta la siguiente casilla, así que encuentras uno sin esfuerzo. Una cuadrícula difícil suele ofrecer una sola deducción en todo el tablero, y la encuentras recorriendo el tablero con orden. Este nivel entrena esa búsqueda sistemática.',
      'Cuenta con veinte a cuarenta minutos, con dejarlo y retomarlo más tarde, y con equivocarte alguna vez. Una anotación descuidada puede pasar desapercibida veinte movimientos en una cuadrícula difícil. Imprime las soluciones para comprobar una cuadrícula terminada, e imprime uno o dos por página para tener sitio donde escribir.',
    ],
    goodFor: [
      'Quien resuelve con experiencia y encuentra el nivel medio demasiado rápido',
      'Aprender parejas apuntadoras y reducción caja-línea',
      'Una sesión larga, o un sudoku que se queda varios días sobre la mesa',
      'Quien disfruta quedándose atascado un rato',
    ],
    faqs: [
      {
        question: '¿Cuántas pistas tiene un sudoku difícil?',
        answer:
          'Entre 25 y 29. Cada sudoku imprime su número de pistas bajo la cuadrícula, así que ves lo escaso que es el que tienes delante.',
      },
      {
        question: '¿Qué técnicas hacen falta para el sudoku difícil?',
        answer:
          'Necesitas anotar candidatos y, además, parejas simples y ocultas, parejas apuntadoras y reducción caja-línea. Nuestra guía de técnicas de resolución repasa cada una con ejemplos.',
      },
      {
        question: '¿Los sudokus difíciles alguna vez requieren adivinar?',
        answer:
          'No. Cada sudoku aquí tiene una solución y se resuelve con lógica. Si adivinas en una cuadrícula difícil, lo más probable es que se te haya escapado una deducción, y una suposición equivocada en una cuadrícula escasa puede llevar veinte minutos deshacerla.',
      },
      {
        question: '¿Conviene imprimir los sudokus difíciles de uno en uno por página?',
        answer:
          'Imprime uno o dos por página. Los sudokus difíciles necesitan anotaciones en casi todas las casillas vacías, y una cuadrícula de seis por página deja poco sitio para escribirlas con claridad.',
      },
    ],
  },
  expert: {
    slug: 'expert',
    name: 'Experto',
    h1: 'Sudokus de nivel experto para imprimir: las cuadrículas PDF más difíciles',
    title: 'Sudoku Experto para Imprimir: Los PDF Gratis Más Difíciles',
    description:
      'Sudoku de nivel experto para imprimir con 20–24 pistas, las cuadrículas más difíciles de esta herramienta. PDF gratis con soluciones, en A4 o US Letter.',
    clueRange: '20–24 pistas',
    typicalTime: '40 minutos o más de una hora',
    lede: 'Alrededor de una cuarta parte de la cuadrícula rellena, y una única solución por alcanzar.',
    body: [
      'Los sudokus expertos llevan de 20 a 24 pistas, cerca del límite para un sudoku con una sola solución. El mínimo demostrado es 17, y los sudokus con 17 pistas son tan raros que hay aficionados que los catalogan uno a uno. Entre 20 y 24, el generador produce bajo demanda cuadrículas escasas y correctas. Cuenta con que los primeros diez minutos no te den más que un tablero anotado a lápiz por completo.',
      'A partir de ahí trabajas con cadenas y eliminaciones: X-wings, rectángulos únicos y cadenas forzadas, técnicas a las que recurres cuando no queda nada más sencillo. Mucha gente reparte un sudoku experto en varias sesiones. La cuadrícula pone a prueba tu capacidad de mantener un tablero coherente, en la cabeza y en el papel, durante una hora, y la velocidad cuenta poco.',
      'Dos avisos. Imprime uno por página, porque necesitarás el sitio para las anotaciones, y una cuadrícula apretada invita a leer mal un número. E imprime las soluciones. En una cuadrícula tan escasa, una anotación equivocada al principio puede sobrevivir cuarenta movimientos antes de que aparezca una contradicción, y comprobar la cuadrícula terminada te ahorra una noche de dudas.',
    ],
    goodFor: [
      'Quien termina sudokus difíciles sin atascarse',
      'Practicar X-wings, cadenas y eliminaciones avanzadas',
      'Un sudoku para trabajar en varias sesiones',
      'Cualquiera que quiera la cuadrícula más difícil que puede generar esta herramienta',
    ],
    faqs: [
      {
        question: '¿Cuántas pistas tiene un sudoku de nivel experto?',
        answer:
          'Entre 20 y 24. Un sudoku fácil empieza con 38 a 45 pistas, así que una cuadrícula experta te pide deducir casi tres cuartas partes del tablero a partir de una cuarta parte.',
      },
      {
        question: '¿Cuál es el número mínimo de pistas que puede tener un sudoku?',
        answer:
          'Diecisiete. En 2012, unos investigadores demostraron que ningún sudoku válido con solución única tiene dieciséis pistas o menos. Nuestro rango experto queda por encima de ese límite porque los sudokus con 17 pistas son raros y un generador no puede producirlos de forma fiable bajo demanda.',
      },
      {
        question: '¿Los sudokus de nivel experto se pueden resolver sin adivinar?',
        answer:
          'Sí. El solucionador confirma que cada sudoku tiene una sola solución, y a una solución única llegas con lógica. Puede que necesites técnicas avanzadas y paciencia, pero en cada etapa existe una deducción.',
      },
      {
        question: '¿Por qué tardan más en generarse los sudokus de nivel experto?',
        answer:
          'El generador comprueba cada retirada de pista. Para bajar a 22 pistas, intenta vaciar muchas más casillas de las que deja vacías, y ejecuta el solucionador cada vez para comprobar que el sudoku conserva una sola solución. Un lote experto exige más trabajo por sudoku que un lote fácil.',
      },
    ],
  },
};

export const DIFFICULTY_CONTENT: Record<Locale, Record<DifficultyKey, DifficultyContent>> = { en, de, fr, es };

export const DIFFICULTY_ORDER: DifficultyKey[] = ['easy', 'medium', 'hard', 'expert'];
