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
    title: 'Printable Sudoku Easy — Free PDF Puzzles With Answers',
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
    title: 'Printable Sudoku Medium — Free PDF Puzzles to Print',
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
    title: 'Printable Sudoku Hard — Free Difficult Puzzle PDFs',
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
    title: 'Printable Sudoku Expert — Hardest Free Puzzle PDFs',
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

const de: Record<DifficultyKey, DifficultyContent> = {
  easy: {
    slug: 'easy',
    name: 'Einfach',
    h1: 'Einfache Sudokus zum Ausdrucken — als PDF herunterladen',
    title: 'Sudoku Einfach zum Ausdrucken — Kostenlose PDF-Rätsel mit Lösung',
    description:
      'Drucke einfache Sudokus mit 38–45 vorgegebenen Zahlen. Wähle, wie viele du willst, 1 bis 6 pro Seite, A4 oder Letter, und lade ein kostenloses PDF mit Lösungen herunter.',
    clueRange: '38–45 Hinweise',
    typicalTime: '5–10 Minuten',
    lede: 'Großzügig viele Vorgaben, kein Raten nötig, und ein Lösungsweg, der sich schon beim ersten Überfliegen öffnet.',
    body: [
      'Ein einfaches Sudoku ist kein verwässertes Rätsel — es ist ein Rätsel, bei dem sich der nächste Zug immer finden lässt. Jedes Raster auf dieser Seite beginnt mit 38 bis 45 vorgegebenen Zahlen, und das reicht, um allein durch systematisches Absuchen von Zeilen, Spalten und Blöcken von der ersten bis zur letzten Zelle zu kommen. Du solltest nie ins Grübeln geraten und schon gar nicht raten müssen.',
      'Genau deshalb ist das die richtige Stufe, um das Rätsel überhaupt erst zu lernen, für Kinder, die zusammen mit einem Erwachsenen rätseln, und für alle, die Sudoku als fünfzehnminütige Entspannung wollen statt als Projekt. Es ist auch die Stufe, die sich am besten für eine Gruppe eignet, weil ein einfaches Raster eine Runde mit unterschiedlichem Können ungefähr im gleichen Tempo hält, statt die Hälfte schon auf der ersten Seite hängen zu lassen.',
      'Trotzdem sind es echte Sudokus, nach demselben Verfahren erzeugt wie die Experten-Rätsel: Zuerst entsteht eine vollständige Lösung, dann werden nacheinander Zahlen entfernt, und jede Entfernung bleibt nur bestehen, wenn ein Lösungsalgorithmus bestätigt, dass das Rätsel weiterhin genau eine Lösung hat. Leichter heißt nicht schlampiger — es heißt nur, dass beim Start schon mehr von der Lösung auf dem Blatt steht.',
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
          'Zwischen 38 und 45 der 81 Felder sind zu Beginn ausgefüllt. Die genaue Zahl schwankt von Rätsel zu Rätsel und steht unter jedem Raster, sodass du auf einen Blick siehst, wie viel Hilfe du bekommen hast.',
      },
      {
        question: 'Wie lange braucht man für ein einfaches Sudoku?',
        answer:
          'Die meisten schaffen eines in fünf bis zehn Minuten. Als Einsteiger dauert es bei den ersten Rätseln länger, das wird aber schnell weniger, sobald das Absuchen nach eindeutigen Kandidaten zur Routine wird.',
      },
      {
        question: 'Sind einfache Rätsel gut für Kinder?',
        answer:
          'Das ist genau der richtige Einstieg. Ein Kind, das bis neun zählen kann, kann eines lösen, weil jeder Schritt nur bedeutet zu erkennen, wo eine Zahl nicht hinpasst, statt mehrere Züge vorauszudenken. Drucke vier oder sechs pro Seite, damit ein Blatt einen ganzen Nachmittag reicht.',
      },
      {
        question: 'Muss ich bei einem einfachen Sudoku trotzdem raten?',
        answer:
          'Nie. Jedes Rätsel hier hat genau eine Lösung und lässt sich allein durch Logik erreichen. Wenn du bei einem einfachen Raster beim Raten landest, gibt es irgendwo auf dem Feld noch eine Schlussfolgerung, die du übersehen hast.',
      },
    ],
  },
  medium: {
    slug: 'medium',
    name: 'Mittel',
    h1: 'Mittelschwere Sudokus zum Ausdrucken — kostenloses PDF mit Lösung',
    title: 'Sudoku Mittel zum Ausdrucken — Kostenlose PDF-Rätsel',
    description:
      'Mittelschwere Sudokus zum Ausdrucken mit 30–37 Hinweisen: ein echter Kampf, aber mit sauberer Logik lösbar. Kostenloses PDF in A4 oder US Letter, inklusive Lösungen.',
    clueRange: '30–37 Hinweise',
    typicalTime: '10–20 Minuten',
    lede: 'Das Alltags-Sudoku — die Stufe, die eine Zeitung mittwochs abdruckt.',
    body: [
      'Bei mittlerer Schwierigkeit hört Sudoku auf, reines Absuchen zu sein, und wird zum echten Rätsel. Mit 30 bis 37 Hinweisen auf dem Feld erledigst du die offensichtlichen Felder in der ersten Minute oder zwei, dann stößt du auf eine Wand, die einfaches Absuchen nicht mehr durchbricht. Um weiterzukommen, musst du Kandidaten in die leeren Felder eintragen und nach Paaren suchen — zwei Felder in einem Block, die nur eine 4 oder eine 7 enthalten können, wodurch diese 4 und diese 7 für jedes andere Feld im Block ausgeschlossen sind.',
      'Genau diese eine Technik unterscheidet mittelschwere von einfachen Lösern, und deshalb lohnt es sich, auf dieser Stufe zu üben. Schwere und Experten-Rätsel verlangen noch mehr Techniken obendrauf, aber diese eine brauchst du bei ihnen ständig. Löse zwanzig mittelschwere Raster, und das Eintragen von Kandidaten fühlt sich nicht mehr wie Buchhaltung an, sondern wie das eigentliche Rätsel.',
      'Das ist auch die sicherste Stufe, um sie in größerer Menge zu drucken. Ein mittelschweres Raster dauert zehn bis zwanzig Minuten — etwa so lange wie eine Kaffeepause, eine Fahrt zur Arbeit oder ein Wartezimmer. Sechs davon auf zwei Blättern füllen einen langen Nachmittag, ohne dass es je in die Art von Feststecken kippt, bei der man den Stift hinlegt.',
    ],
    goodFor: [
      'Regelmäßige Löser, die ein echtes Rätsel wollen, kein Aufwärmen',
      'Kandidaten-Notation und offene Paare üben',
      'Pendelfahrten, Pausen und Wartezimmer',
      'Einen Stapel drucken, der nicht in einer Sitzung fertig wird',
    ],
    faqs: [
      {
        question: 'Wie viele Hinweise hat ein mittelschweres Sudoku?',
        answer:
          'Zwischen 30 und 37. Das sind etwa sechs bis acht weniger als bei einem einfachen Rätsel — klingt wenig, verändert das Lösen aber grundlegend: Du musst Kandidaten verfolgen, statt Feld für Feld zu lösen.',
      },
      {
        question: 'Was ist der Unterschied zwischen einfachem und mittelschwerem Sudoku?',
        answer:
          'Ein einfaches Rätsel lässt sich allein durch Absuchen lösen: eine Zahl anschauen, das eine Feld im Block finden, wo sie passt, eintragen. Bei einem mittelschweren Rätsel gerät dieser Ansatz auf halber Strecke ins Stocken, und du musst dir zu jedem leeren Feld die möglichen Zahlen notieren und logisch weiterdenken.',
      },
      {
        question: 'Muss ich Kandidatenzahlen in die Felder schreiben?',
        answer:
          'Die meisten tun das, zumindest für die zweite Hälfte des Rasters. Wenn du das lieber vermeiden willst, drucke ein oder zwei Rätsel pro Seite — die größeren Felder lassen Platz für kleine Bleistiftnotizen in den Ecken, ohne dass das Raster unleserlich wird.',
      },
      {
        question: 'Ist mittel eine gute Stufe für Einsteiger?',
        answer:
          'Es ist eine gute Stufe zum Aufsteigen, nicht zum Einsteigen. Wenn du ein einfaches Rätsel ohne Steckenbleiben lösen kannst, bist du bereit. Wenn du beim einfachen Raster noch nach dem ersten Zug suchst, bleib noch eine Woche dort — mittel wird dich eher frustrieren als lehren.',
      },
    ],
  },
  hard: {
    slug: 'hard',
    name: 'Schwer',
    h1: 'Schwere Sudokus zum Ausdrucken — kostenloses PDF mit Lösungen',
    title: 'Sudoku Schwer zum Ausdrucken — Kostenlose PDF-Rätsel',
    description:
      'Schwere Sudokus zum Ausdrucken mit nur 25–29 Hinweisen, für alle, die einen echten Kampf wollen. Kostenloses PDF, 1 bis 6 Rätsel pro Seite, Lösungsschlüssel optional.',
    clueRange: '25–29 Hinweise',
    typicalTime: '20–40 Minuten',
    lede: 'Karge Raster, die sich erst öffnen, wenn du anfängst zu überlegen, wo eine Zahl nicht stehen kann.',
    body: [
      'Ein schweres Sudoku gibt dir 25 bis 29 Hinweise und überlässt dir den Rest. Absuchen bringt dir eine Handvoll Felder; danach wird das Raster still, und es bleibt still, bis du Kandidaten einträgst und anfängst, mit den Beziehungen zwischen ihnen zu arbeiten. Zeigende Paare, Block-Zeilen-Reduktion und versteckte Paare zahlen sich hier erst richtig aus — Techniken, die bei einem mittelschweren Rätsel übertrieben wirken und hier der einzige Weg nach vorn sind.',
      'Der Unterschied ist nicht, dass schwere Rätsel schwierigere Logik enthalten. Es ist, dass sie weniger Redundanz haben. Bei einem einfachen Raster gibt es meist drei verschiedene Wege zum nächsten Feld, du findest also mühelos einen. Bei einem schweren Raster gibt es oft genau eine einzige mögliche Schlussfolgerung auf dem ganzen Feld, und sie zu finden heißt, systematisch statt hoffnungsvoll zu suchen. Genau diese Fähigkeit trainiert diese Stufe.',
      'Rechne mit zwanzig bis vierzig Minuten, rechne damit, das Rätsel wegzulegen und später weiterzumachen, und rechne mit gelegentlichen Fehlern — ein schweres Raster bestraft eine unachtsame Eintragung erst zwanzig Züge später, wenn du sie entdeckst. Drucke mit Lösungsschlüssel, damit du dein fertiges Raster prüfen kannst, statt zu rätseln, und drucke eines oder zwei pro Seite: Du wirst den Platz zum Schreiben brauchen.',
    ],
    goodFor: [
      'Erfahrene Löser, denen mittelschwere Rätsel zu schnell gehen',
      'Zeigende Paare und Block-Zeilen-Reduktion lernen',
      'Eine lange Sitzung, oder ein Rätsel, das tagelang auf dem Tisch liegt',
      'Alle, die für eine Weile wirklich feststecken wollen',
    ],
    faqs: [
      {
        question: 'Wie viele Hinweise hat ein schweres Sudoku?',
        answer:
          'Zwischen 25 und 29. Jedes Rätsel druckt seine eigene Anzahl an Hinweisen unter das Raster, sodass du genau siehst, wie karg das vor dir liegende Rätsel ist.',
      },
      {
        question: 'Welche Techniken brauche ich für schwere Sudokus?',
        answer:
          'Kandidaten-Notation ist unverzichtbar, und darüber hinaus stützt du dich auf offene und versteckte Paare, zeigende Paare und Block-Zeilen-Reduktion. Unsere Anleitung zu Lösungstechniken geht jede davon mit Beispielen durch.',
      },
      {
        question: 'Muss man bei schweren Rätseln manchmal raten?',
        answer:
          'Nein. Jedes Rätsel hier hat genau eine Lösung, und jedes lässt sich durch Logik lösen. Raten bei einem schweren Raster ist meist ein Zeichen, dass eine Schlussfolgerung übersehen wurde, und es ist ein schlechter Tausch — ein falscher Rateversuch auf einem kargen Raster kann zwanzig Minuten kosten, bis man ihn wieder rückgängig gemacht hat.',
      },
      {
        question: 'Sollte ich schwere Rätsel einzeln pro Seite drucken?',
        answer:
          'Ein oder zwei pro Seite ist die vernünftige Wahl. Schwere Rätsel brauchen Kandidatennotizen in fast jedem leeren Feld, und ein Raster mit sechs pro Seite lässt nicht genug Platz, um sie leserlich zu notieren.',
      },
    ],
  },
  expert: {
    slug: 'expert',
    name: 'Experte',
    h1: 'Experten-Sudokus zum Ausdrucken — die schwersten kostenlosen PDF-Raster',
    title: 'Sudoku Experte zum Ausdrucken — Schwerste Kostenlose PDF-Rätsel',
    description:
      'Experten-Sudokus zum Ausdrucken, reduziert auf 20–24 Hinweise — die schwersten Raster, die dieser Generator erstellt. Kostenloses PDF, Lösungsschlüssel inklusive, A4 oder US Letter.',
    clueRange: '20–24 Hinweise',
    typicalTime: '40 Minuten bis über eine Stunde',
    lede: 'Bis auf das Nötigste reduziert — etwa ein Viertel des Rasters ausgefüllt, und am Ende wartet genau eine Lösung.',
    body: [
      'Experten-Rätsel haben 20 bis 24 Hinweise, nahe an der Untergrenze für ein Sudoku mit noch genau einer Lösung. Das theoretische Minimum liegt bei 17, und Rätsel mit dieser Anzahl sind so selten, dass sie einzeln katalogisiert werden; bei 20 bis 24 kann der Generator verlässlich Raster erzeugen, die gnadenlos karg und trotzdem völlig korrekt sind. In der Praxis heißt das: In den ersten zehn Minuten kommt womöglich nichts anderes zustande als ein vollständig mit Bleistift notiertes Feld.',
      'Von da an geht es um Ketten und Ausschlüsse. X-Wings, eindeutige Rechtecke, erzwingende Ketten — Techniken, die sich erst auszahlen, wenn nichts Einfacheres mehr übrig ist. Viele Löser arbeiten sich über mehrere Sitzungen hinweg durch diese Rätsel, und das ist keine Schande. Ein Experten-Raster ist kein Schnelligkeitstest; es ist ein Test, ob du ein Feld über eine Stunde hinweg konsistent im Kopf und auf dem Papier halten kannst.',
      'Zwei Warnungen, die man ernst nehmen sollte. Erstens: Drucke eines pro Seite — du brauchst jeden Millimeter für Kandidatennotizen, und ein zu enges Raster kostet dich das Rätsel eher durch eine falsch gelesene Ziffer als durch die Logik. Zweitens: Drucke den Lösungsschlüssel. Bei einem so kargen Rätsel kann eine einzige falsche Eintragung ganz am Anfang vierzig Züge überleben, bevor der Widerspruch auftaucht — und ein fertiges Raster prüfen zu können, macht den Unterschied zwischen Zufriedenheit und einem verschwendeten Abend.',
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
          'Zwischen 20 und 24. Zum Vergleich: Ein einfaches Rätsel beginnt mit 38 bis 45 — ein Experten-Raster verlangt also, fast drei Viertel des Feldes aus einem Viertel davon herzuleiten.',
      },
      {
        question: 'Wie viele Hinweise braucht ein Sudoku mindestens?',
        answer:
          'Siebzehn. 2012 wurde bewiesen, dass kein gültiges Sudoku mit eindeutiger Lösung mit sechzehn oder weniger Hinweisen auskommt. Unser Experten-Bereich liegt etwas über dieser Grenze, weil Rätsel mit genau 17 Hinweisen extrem selten sind und sich nicht zuverlässig auf Abruf erzeugen lassen.',
      },
      {
        question: 'Sind Experten-Rätsel noch ohne Raten lösbar?',
        answer:
          'Ja. Jedes Rätsel hier ist geprüft und hat genau eine Lösung, und eine eindeutige Lösung lässt sich immer durch Logik erreichen. Es braucht dafür vielleicht fortgeschrittene Techniken und viel Geduld, aber auf jeder Stufe gibt es eine mögliche Schlussfolgerung.',
      },
      {
        question: 'Warum dauert die Erzeugung von Experten-Rätseln länger?',
        answer:
          'Weil jede Entfernung einer Zahl geprüft wird. Um auf 22 Hinweise zu kommen, muss der Generator deutlich mehr Felder testweise leeren, als am Ende tatsächlich leer bleiben, und dabei jedes Mal den Lösungsalgorithmus laufen lassen, um zu prüfen, ob das Rätsel noch genau eine Lösung hat. Ein Satz Experten-Rätsel macht also pro Rätsel mehr Arbeit als ein Satz einfacher Rätsel.',
      },
    ],
  },
};

const fr: Record<DifficultyKey, DifficultyContent> = {
  easy: {
    slug: 'easy',
    name: 'Facile',
    h1: 'Sudoku facile à imprimer, téléchargeable en PDF',
    title: 'Sudoku Facile à Imprimer — Grilles PDF Gratuites avec Solutions',
    description:
      'Imprimez des grilles de sudoku facile avec 38 à 45 indices de départ. Choisissez leur nombre, 1 à 6 par page, A4 ou Letter, et téléchargez un PDF gratuit avec solutions.',
    clueRange: '38–45 indices',
    typicalTime: '5 à 10 minutes',
    lede: 'Beaucoup d’indices, aucun besoin de deviner, et un chemin de résolution qui s’ouvre dès le premier coup d’œil.',
    body: [
      'Une grille facile n’est pas une grille édulcorée : c’est une grille où le coup suivant se trouve toujours. Chaque grille de cette page démarre avec 38 à 45 indices, ce qui suffit pour qu’un simple balayage des lignes, des colonnes et des blocs vous mène de la première case à la dernière. Vous ne devriez jamais avoir à réfléchir longuement, et encore moins à deviner.',
      'C’est donc le bon niveau pour apprendre le jeu, pour un enfant qui joue aux côtés d’un adulte, ou pour quiconque veut du sudoku comme détente de quinze minutes plutôt que comme projet. C’est aussi le niveau à privilégier pour un groupe, car une grille facile fait avancer une salle aux niveaux variés à peu près au même rythme, au lieu de bloquer la moitié dès la première page.',
      'Ce sont malgré tout de vraies grilles de sudoku, générées de la même façon que les grilles expert : une solution complète est d’abord construite, puis les indices sont retirés un par un, et chaque retrait n’est conservé que si un solveur confirme que la grille n’a toujours qu’une seule solution. Plus facile ne veut pas dire moins soigné — cela veut simplement dire qu’une plus grande partie de la solution est déjà sur la feuille au départ.',
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
          'Entre 38 et 45 des 81 cases sont déjà remplies au départ. Le nombre exact varie d’une grille à l’autre et est imprimé sous chacune d’elles, pour voir d’un coup d’œil l’aide dont vous disposez.',
      },
      {
        question: 'Combien de temps faut-il pour résoudre un sudoku facile ?',
        answer:
          'La plupart des gens en terminent une en cinq à dix minutes. Si vous débutez, comptez plus de temps pour les premières grilles, un délai qui diminue vite une fois que le balayage des candidats uniques devient un réflexe.',
      },
      {
        question: 'Les grilles faciles conviennent-elles aux enfants ?',
        answer:
          'C’est exactement le bon point de départ. Un enfant qui sait compter jusqu’à neuf peut en résoudre une, car chaque étape consiste simplement à repérer où un chiffre ne peut pas aller, sans avoir à anticiper plusieurs coups à l’avance. Imprimez-en quatre ou six par page pour qu’une feuille occupe tout un après-midi.',
      },
      {
        question: 'Faut-il quand même deviner sur une grille facile ?',
        answer:
          'Jamais. Chaque grille ici n’a qu’une seule solution, accessible par la seule logique. Si vous en venez à deviner sur une grille facile, c’est qu’une déduction reste quelque part sur le plateau sans avoir été repérée.',
      },
    ],
  },
  medium: {
    slug: 'medium',
    name: 'Moyen',
    h1: 'Sudoku moyen à imprimer — PDF gratuit avec solutions',
    title: 'Sudoku Moyen à Imprimer — Grilles PDF Gratuites',
    description:
      'Sudoku moyen à imprimer avec 30 à 37 indices : un vrai défi, mais toujours accessible par une logique claire. Générez un PDF gratuit en A4 ou US Letter, solutions incluses.',
    clueRange: '30–37 indices',
    typicalTime: '10 à 20 minutes',
    lede: 'Le sudoku du quotidien — le niveau qu’un journal publie un mercredi.',
    body: [
      'Le niveau moyen, c’est le moment où le sudoku cesse d’être un simple balayage pour devenir une véritable énigme. Avec 30 à 37 indices sur le plateau, vous réglez les cases évidentes en une minute ou deux, puis vous butez sur un mur que le simple balayage ne suffit plus à franchir. Pour avancer, il faut noter les candidats dans les cases vides et chercher les paires — deux cases d’un bloc qui ne peuvent contenir qu’un 4 ou un 7, ce qui exclut ce 4 et ce 7 de toutes les autres cases du bloc.',
      'C’est cette technique, à elle seule, qui distingue un joueur de niveau moyen d’un joueur de niveau facile, et c’est pourquoi ce niveau vaut la peine d’être pratiqué. Les grilles difficiles et expert demandent des techniques supplémentaires, mais elles font appel à celle-ci en permanence. Résolvez une vingtaine de grilles moyennes, et noter les candidats cesse de ressembler à de la comptabilité pour devenir le jeu lui-même.',
      'C’est aussi le niveau le plus sûr à imprimer en grande quantité. Une grille moyenne prend dix à vingt minutes, à peu près la durée d’une pause-café, d’un trajet ou d’une salle d’attente. Six grilles sur deux feuilles occupent tout un long après-midi, sans jamais basculer dans le genre de blocage qui fait poser le crayon.',
    ],
    goodFor: [
      'Les habitués qui veulent une vraie grille, pas un échauffement',
      'S’entraîner à noter les candidats et repérer les paires nues',
      'Les trajets, les pauses et les salles d’attente',
      'Imprimer un lot qui ne se terminera pas en une seule séance',
    ],
    faqs: [
      {
        question: 'Combien d’indices comporte un sudoku moyen ?',
        answer:
          'Entre 30 et 37. C’est environ six à huit de moins qu’une grille facile, ce qui paraît peu mais change complètement la façon de résoudre : il faut suivre des candidats plutôt que résoudre case par case.',
      },
      {
        question: 'Quelle est la différence entre un sudoku facile et un sudoku moyen ?',
        answer:
          'Une grille facile se résout par simple balayage : repérer un chiffre, trouver la seule case d’un bloc où il peut aller, l’inscrire. Une grille moyenne fait caler cette méthode à mi-parcours et demande de noter les chiffres possibles de chaque case vide pour raisonner ensuite dessus.',
      },
      {
        question: 'Faut-il noter les candidats dans les cases ?',
        answer:
          'La plupart des joueurs le font, au moins pour la seconde moitié de la grille. Si vous préférez éviter cela, imprimez une ou deux grilles par page — les cases plus grandes laissent de la place pour de petites annotations au crayon dans les coins sans que la grille devienne illisible.',
      },
      {
        question: 'Le niveau moyen convient-il à un débutant ?',
        answer:
          'C’est un bon niveau vers lequel progresser, pas un bon point de départ. Si vous terminez une grille facile sans bloquer, vous êtes prêt. Si vous cherchez encore le premier coup sur une grille facile, restez-y encore une semaine — le niveau moyen vous frustrera plus qu’il ne vous apprendra.',
      },
    ],
  },
  hard: {
    slug: 'hard',
    name: 'Difficile',
    h1: 'Sudoku difficile à imprimer — PDF gratuit, solutions incluses',
    title: 'Sudoku Difficile à Imprimer — Grilles PDF Gratuites',
    description:
      'Sudoku difficile à imprimer avec seulement 25 à 29 indices, pour les joueurs qui veulent un vrai défi. PDF gratuit à télécharger, 1 à 6 grilles par page, corrigé complet en option.',
    clueRange: '25–29 indices',
    typicalTime: '20 à 40 minutes',
    lede: 'Des grilles clairsemées qui ne s’ouvrent que lorsque vous commencez à raisonner sur les cases où un chiffre ne peut pas aller.',
    body: [
      'Une grille difficile vous donne 25 à 29 indices et vous laisse faire le reste. Le balayage vous offre une poignée de cases ; ensuite, la grille se tait, et elle reste silencieuse jusqu’à ce que vous notiez les candidats et commenciez à travailler leurs relations entre elles. Les paires pointantes, la réduction bloc-ligne et les paires cachées trouvent enfin leur utilité ici — des techniques qui semblent superflues sur une grille moyenne et deviennent le seul moyen d’avancer sur celle-ci.',
      'La différence n’est pas que les grilles difficiles contiennent une logique plus complexe. C’est qu’elles ont moins de redondance. Sur une grille facile, il existe généralement trois chemins différents vers la case suivante, si bien qu’on en trouve un sans effort. Sur une grille difficile, il n’existe souvent qu’une seule déduction possible sur tout le plateau, et la trouver demande de chercher méthodiquement plutôt qu’au hasard. C’est exactement cette compétence que ce niveau entraîne.',
      'Comptez vingt à quarante minutes, attendez-vous à poser la grille et à y revenir plus tard, et à vous tromper de temps en temps — une grille difficile punit une entrée étourdie vingt coups plus tard, au moment où vous le découvrez. Imprimez avec le corrigé pour vérifier votre grille terminée plutôt que de rester dans le doute, et imprimez-en une ou deux par page : vous aurez besoin de place pour écrire.',
    ],
    goodFor: [
      'Les joueurs expérimentés pour qui le niveau moyen va trop vite',
      'Apprendre les paires pointantes et la réduction bloc-ligne',
      'Une longue séance, ou une grille laissée sur la table pendant plusieurs jours',
      'Quiconque veut être vraiment bloqué pendant un moment',
    ],
    faqs: [
      {
        question: 'Combien d’indices comporte un sudoku difficile ?',
        answer:
          'Entre 25 et 29. Chaque grille indique son propre nombre d’indices sous le plateau, pour voir exactement à quel point celle que vous avez devant vous est clairsemée.',
      },
      {
        question: 'Quelles techniques faut-il connaître pour le sudoku difficile ?',
        answer:
          'Noter les candidats est indispensable, et au-delà vous vous appuierez sur les paires nues et cachées, les paires pointantes et la réduction bloc-ligne. Notre guide des techniques de résolution détaille chacune d’elles avec des exemples travaillés.',
      },
      {
        question: 'Les grilles difficiles demandent-elles parfois de deviner ?',
        answer:
          'Non. Chaque grille ici n’a qu’une seule solution et se résout entièrement par la logique. Deviner sur une grille difficile est généralement le signe qu’une déduction a été manquée, et c’est un mauvais calcul — une supposition erronée sur une grille clairsemée peut prendre vingt minutes à démêler.',
      },
      {
        question: 'Faut-il imprimer les grilles difficiles une par page ?',
        answer:
          'Une ou deux par page est le choix raisonnable. Les grilles difficiles demandent des annotations de candidats dans presque toutes les cases vides, et une grille à six par page ne laisse pas assez de place pour les écrire lisiblement.',
      },
    ],
  },
  expert: {
    slug: 'expert',
    name: 'Expert',
    h1: 'Sudoku expert à imprimer — les grilles PDF gratuites les plus difficiles',
    title: 'Sudoku Expert à Imprimer — Grilles PDF Gratuites les Plus Difficiles',
    description:
      'Sudoku expert à imprimer, réduit à 20–24 indices — les grilles les plus difficiles que ce générateur puisse produire. PDF gratuit, corrigé inclus, A4 ou US Letter.',
    clueRange: '20–24 indices',
    typicalTime: '40 minutes à plus d’une heure',
    lede: 'Réduites à l’essentiel — environ un quart de la grille rempli, et une seule solution vous attend au bout.',
    body: [
      'Les grilles expert comptent 20 à 24 indices, proches du plancher pour un sudoku qui garde encore une solution unique. Le minimum théorique est de 17, et les grilles à ce nombre sont assez rares pour être répertoriées une à une ; entre 20 et 24, le générateur peut produire de façon fiable des grilles impitoyablement clairsemées et pourtant parfaitement valides. En pratique, cela signifie que les dix premières minutes peuvent ne rien donner d’autre qu’un plateau entièrement annoté au crayon.',
      'À partir de là, tout est affaire de chaînes et d’éliminations. X-wings, rectangles uniques, chaînes forcées — des techniques qui ne paient que lorsqu’il ne reste plus rien de plus simple à essayer. Beaucoup de joueurs travaillent ces grilles sur plusieurs séances, et il n’y a aucune honte à cela. Une grille expert n’est pas un test de vitesse ; c’est un test de votre capacité à garder un plateau cohérent, dans votre tête et sur le papier, pendant une heure.',
      'Deux avertissements à prendre au sérieux. D’abord, imprimez-en une par page — vous aurez besoin de chaque millimètre pour les annotations de candidats, et une grille trop serrée vous fera perdre la partie à cause d’un chiffre mal lu plutôt qu’à cause de la logique. Ensuite, imprimez le corrigé. Sur une grille aussi clairsemée, une seule entrée erronée au début peut survivre quarante coups avant que la contradiction n’apparaisse, et pouvoir vérifier une grille terminée fait toute la différence entre la satisfaction et une soirée gâchée.',
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
          'Entre 20 et 24. À titre de comparaison, une grille facile démarre avec 38 à 45 indices — une grille expert demande donc de déduire près des trois quarts du plateau à partir d’un quart seulement.',
      },
      {
        question: 'Quel est le nombre minimum d’indices possible pour un sudoku ?',
        answer:
          'Dix-sept. Il a été démontré en 2012 qu’aucun sudoku valide à solution unique ne peut comporter seize indices ou moins. Notre plage expert se situe légèrement au-dessus de ce plancher, car les grilles à 17 indices sont extrêmement rares et ne peuvent pas être produites de façon fiable à la demande.',
      },
      {
        question: 'Les grilles expert restent-elles solubles sans deviner ?',
        answer:
          'Oui. Chaque grille ici est vérifiée pour n’avoir qu’une seule solution, et une solution unique est toujours accessible par la logique. Cela peut demander des techniques avancées et beaucoup de patience, mais une déduction reste possible à chaque étape.',
      },
      {
        question: 'Pourquoi les grilles expert mettent-elles plus de temps à être générées ?',
        answer:
          'Parce que chaque retrait d’indice est testé. Pour descendre à 22 indices, le générateur doit essayer de retirer bien plus de cases qu’il n’en retire réellement, en relançant le solveur à chaque fois pour vérifier que la grille garde une solution unique. Un lot de grilles expert demande donc plus de travail par grille qu’un lot de grilles faciles.',
      },
    ],
  },
};

const es: Record<DifficultyKey, DifficultyContent> = {
  easy: {
    slug: 'easy',
    name: 'Fácil',
    h1: 'Sudokus fáciles para imprimir, descargables en PDF',
    title: 'Sudoku Fácil para Imprimir — PDF Gratis con Soluciones',
    description:
      'Imprime sudokus fáciles con 38–45 pistas iniciales. Elige cuántos quieres, de 1 a 6 por página, A4 o Letter, y descarga un PDF gratis con soluciones.',
    clueRange: '38–45 pistas',
    typicalTime: '5–10 minutos',
    lede: 'Muchas pistas, nada de adivinar, y un camino de resolución que se abre en cuanto empiezas a mirar la cuadrícula.',
    body: [
      'Un sudoku fácil no es un sudoku aguado: es un sudoku en el que siempre se puede encontrar el siguiente movimiento. Todas las cuadrículas de esta página empiezan con entre 38 y 45 pistas, suficientes para que, con solo repasar filas, columnas y regiones buscando el único hueco donde puede ir un número, llegues de la primera casilla a la última. Nunca deberías tener que quedarte pensando, y desde luego nunca deberías tener que adivinar.',
      'Por eso es el nivel adecuado para quien está aprendiendo el juego, para un niño que juega junto a un adulto, y para cualquiera que quiera el sudoku como un descanso de quince minutos en vez de como un proyecto. También es el nivel que conviene imprimir para un grupo, porque una cuadrícula fácil mantiene a un grupo con niveles distintos avanzando a un ritmo parecido, en lugar de dejar a la mitad atascada en la primera página.',
      'Aun así, son sudokus de verdad, generados igual que los de nivel experto: primero se construye una solución completa, luego se retiran las pistas una a una, y cada retirada solo se mantiene si un solucionador confirma que el sudoku sigue teniendo exactamente una solución. Más fácil no significa menos cuidado — significa que hay más solución ya escrita en el papel cuando te sientas.',
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
          'Entre 38 y 45 de las 81 casillas están rellenas al empezar. El número exacto varía de un sudoku a otro y se imprime bajo cada cuadrícula, así que puedes ver de un vistazo cuánta ayuda te han dado.',
      },
      {
        question: '¿Cuánto se tarda en resolver un sudoku fácil?',
        answer:
          'La mayoría de la gente termina uno en cinco a diez minutos. Si eres nuevo en esto, espera tardar más con los primeros, y espera que eso baje rápido en cuanto encontrar candidatos únicos se vuelva automático.',
      },
      {
        question: '¿Los sudokus fáciles son buenos para niños?',
        answer:
          'Es el punto de partida ideal. Un niño que sepa contar hasta nueve puede resolver uno, porque cada paso consiste solo en darse cuenta de dónde no puede ir un número, sin tener que pensar varios movimientos por delante. Imprime cuatro o seis por página para que una hoja dure toda una tarde.',
      },
      {
        question: '¿Aun así hace falta adivinar en un sudoku fácil?',
        answer:
          'Nunca. Todos los sudokus aquí tienen exactamente una solución y se pueden resolver solo con lógica. Si te descubres adivinando en una cuadrícula fácil, es que hay una deducción disponible en algún punto del tablero que todavía no has visto.',
      },
    ],
  },
  medium: {
    slug: 'medium',
    name: 'Medio',
    h1: 'Sudokus de nivel medio para imprimir — PDF gratis con soluciones',
    title: 'Sudoku Medio para Imprimir — PDF Gratis para Imprimir',
    description:
      'Sudoku de nivel medio para imprimir con 30–37 pistas: un reto de verdad, pero resoluble con lógica clara. Genera un PDF gratis en A4 o US Letter, con soluciones incluidas.',
    clueRange: '30–37 pistas',
    typicalTime: '10–20 minutos',
    lede: 'El sudoku de cada día — el nivel que publica un periódico un miércoles cualquiera.',
    body: [
      'El nivel medio es donde el sudoku deja de ser solo repasar la cuadrícula y se convierte en un rompecabezas de verdad. Con 30 a 37 pistas sobre el tablero, resolverás las casillas evidentes en el primer minuto o dos, y luego chocarás con una pared que el simple repaso ya no puede atravesar. Para seguir adelante hay que anotar los candidatos en las casillas vacías y buscar parejas — dos casillas de una región que solo pueden contener un 4 o un 7, lo que bloquea ese 4 y ese 7 para el resto de casillas de la región.',
      'Esa única técnica es lo que separa a quien resuelve nivel medio de quien resuelve nivel fácil, y por eso merece la pena practicarla en este nivel. Los sudokus difíciles y expertos piden más técnicas además de esta, pero la piden constantemente. Resuelve veinte cuadrículas de nivel medio y anotar candidatos deja de sentirse como llevar cuentas para sentirse como el propio juego.',
      'Este es también el nivel más seguro para imprimir en cantidad. Una cuadrícula media lleva de diez a veinte minutos, más o menos lo que dura una pausa para el café, un trayecto o una sala de espera. Seis de ellas en dos hojas llenan una tarde larga sin llegar nunca al tipo de bloqueo que hace soltar el lápiz.',
    ],
    goodFor: [
      'Quien resuelve con regularidad y quiere un reto, no un calentamiento',
      'Practicar la anotación de candidatos y las parejas simples',
      'Trayectos, descansos y salas de espera',
      'Imprimir un lote que no se va a terminar en una sola sesión',
    ],
    faqs: [
      {
        question: '¿Cuántas pistas tiene un sudoku de nivel medio?',
        answer:
          'Entre 30 y 37. Son unas seis a ocho pistas menos que en un sudoku fácil, lo que parece poco pero cambia por completo la forma de resolver: hay que seguir candidatos en vez de resolver casilla a casilla.',
      },
      {
        question: '¿Cuál es la diferencia entre un sudoku fácil y uno de nivel medio?',
        answer:
          'Un sudoku fácil se resuelve solo repasando: fijarte en un número, encontrar la única casilla de una región donde encaja, escribirlo. Un sudoku de nivel medio hace que ese método se atasque a mitad de camino y te obliga a anotar los números posibles de cada casilla vacía y razonar a partir de ahí.',
      },
      {
        question: '¿Hace falta anotar los números candidatos en las casillas?',
        answer:
          'La mayoría de la gente lo hace, al menos en la segunda mitad de la cuadrícula. Si prefieres no hacerlo, imprime uno o dos sudokus por página — las casillas más grandes dejan sitio para pequeñas anotaciones a lápiz en las esquinas sin que la cuadrícula se vuelva un lío.',
      },
      {
        question: '¿El nivel medio es bueno para alguien que empieza?',
        answer:
          'Es un buen nivel al que subir, no uno por el que empezar. Si terminas un sudoku fácil sin atascarte, ya estás listo. Si todavía andas buscando el primer movimiento en una cuadrícula fácil, quédate ahí una semana más — el nivel medio te va a frustrar más de lo que te va a enseñar.',
      },
    ],
  },
  hard: {
    slug: 'hard',
    name: 'Difícil',
    h1: 'Sudokus difíciles para imprimir — PDF gratis, con soluciones',
    title: 'Sudoku Difícil para Imprimir — PDF Gratis de Sudokus Difíciles',
    description:
      'Sudoku difícil para imprimir con solo 25–29 pistas, para quien busca un reto de verdad. Descarga gratis en PDF, de 1 a 6 sudokus por página, soluciones completas opcionales.',
    clueRange: '25–29 pistas',
    typicalTime: '20–40 minutos',
    lede: 'Cuadrículas escasas que no se abren hasta que empiezas a razonar sobre dónde no puede ir un número.',
    body: [
      'Un sudoku difícil te da entre 25 y 29 pistas y espera que hagas el resto. Repasar la cuadrícula te da un puñado de casillas; después, el tablero se queda en silencio, y sigue en silencio hasta que anotas candidatos y empiezas a trabajar con las relaciones entre ellos. Las parejas apuntadoras, la reducción caja-línea y las parejas ocultas se ganan aquí el sueldo — técnicas que en un sudoku de nivel medio parecen excesivas y aquí son el único camino hacia delante.',
      'La diferencia no es que los sudokus difíciles tengan una lógica más complicada. Es que tienen menos redundancia. En una cuadrícula fácil suele haber tres caminos distintos hasta la siguiente casilla, así que encuentras uno sin esfuerzo. En una cuadrícula difícil suele haber exactamente una deducción posible en todo el tablero, y encontrarla significa buscar de forma sistemática en vez de al azar. Esa es justo la habilidad que entrena este nivel.',
      'Cuenta con veinte a cuarenta minutos, cuenta con dejarlo y retomarlo más tarde, y cuenta con equivocarte alguna vez — una cuadrícula difícil castiga una anotación descuidada veinte movimientos después, que es cuando la descubres. Imprime con las soluciones para poder comprobar tu cuadrícula terminada en vez de quedarte con la duda, e imprime uno o dos por página: vas a necesitar sitio para escribir.',
    ],
    goodFor: [
      'Quien resuelve con experiencia y encuentra el nivel medio demasiado rápido',
      'Aprender parejas apuntadoras y reducción caja-línea',
      'Una sesión larga, o un sudoku que se queda varios días sobre la mesa',
      'Cualquiera que quiera quedarse genuinamente atascado un rato',
    ],
    faqs: [
      {
        question: '¿Cuántas pistas tiene un sudoku difícil?',
        answer:
          'Entre 25 y 29. Cada sudoku imprime su propio número de pistas bajo la cuadrícula, así que puedes ver exactamente lo escaso que es el que tienes delante.',
      },
      {
        question: '¿Qué técnicas hacen falta para el sudoku difícil?',
        answer:
          'Anotar candidatos es imprescindible, y además te apoyarás en parejas simples y ocultas, parejas apuntadoras y reducción caja-línea. Nuestra guía de técnicas de resolución repasa cada una con ejemplos trabajados.',
      },
      {
        question: '¿Los sudokus difíciles alguna vez requieren adivinar?',
        answer:
          'No. Todos los sudokus aquí tienen exactamente una solución y todos se pueden resolver con lógica. Adivinar en una cuadrícula difícil suele ser señal de que se ha pasado por alto una deducción, y sale caro — una suposición equivocada en una cuadrícula escasa puede llevar veinte minutos deshacer.',
      },
      {
        question: '¿Conviene imprimir los sudokus difíciles de uno en uno por página?',
        answer:
          'Uno o dos por página es la opción sensata. Los sudokus difíciles necesitan anotaciones de candidatos en casi todas las casillas vacías, y una cuadrícula de seis por página no deja sitio suficiente para escribirlas con claridad.',
      },
    ],
  },
  expert: {
    slug: 'expert',
    name: 'Experto',
    h1: 'Sudokus de nivel experto para imprimir — las cuadrículas PDF más difíciles',
    title: 'Sudoku Experto para Imprimir — Los PDF Gratis Más Difíciles',
    description:
      'Sudoku de nivel experto para imprimir, reducido a 20–24 pistas — las cuadrículas más difíciles que genera esta herramienta. PDF gratis, soluciones incluidas, A4 o US Letter.',
    clueRange: '20–24 pistas',
    typicalTime: '40 minutos o más de una hora',
    lede: 'Reducido al mínimo — alrededor de una cuarta parte de la cuadrícula rellena, y una única solución esperando al final.',
    body: [
      'Los sudokus de nivel experto llevan de 20 a 24 pistas, cerca del límite para un sudoku que aún conserve una sola solución. El mínimo teórico es 17, y los sudokus con esa cantidad son tan raros que se catalogan de uno en uno; entre 20 y 24, el generador puede producir de forma fiable cuadrículas brutalmente escasas y aun así perfectamente correctas. En la práctica, eso significa que los primeros diez minutos pueden no dar más que un tablero completamente anotado a lápiz.',
      'A partir de ahí, todo son cadenas y eliminaciones. X-wings, rectángulos únicos, cadenas forzadas — técnicas que solo dan resultado cuando ya no queda nada más sencillo que probar. Mucha gente trabaja estos sudokus en varias sesiones, y no hay nada de malo en eso. Una cuadrícula experta no es una prueba de velocidad; es una prueba de si puedes mantener un tablero coherente en la cabeza, y sobre el papel, durante una hora.',
      'Dos avisos que conviene tomarse en serio. Primero, imprime uno por página — vas a necesitar hasta el último milímetro para las anotaciones de candidatos, y una cuadrícula apretada te hará perder el sudoku por un número mal leído antes que por la lógica. Segundo, imprime las soluciones. En un sudoku tan escaso, una sola anotación equivocada al principio puede sobrevivir cuarenta movimientos antes de que aparezca la contradicción, y poder comprobar una cuadrícula terminada marca la diferencia entre la satisfacción y una noche echada a perder.',
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
          'Entre 20 y 24. Como comparación, un sudoku fácil empieza con 38 a 45 pistas — así que una cuadrícula experta te pide deducir casi tres cuartas partes del tablero a partir de una cuarta parte.',
      },
      {
        question: '¿Cuál es el número mínimo de pistas que puede tener un sudoku?',
        answer:
          'Diecisiete. En 2012 se demostró que ningún sudoku válido con solución única puede tener dieciséis pistas o menos. Nuestro rango experto queda algo por encima de ese límite porque los sudokus con exactamente 17 pistas son extremadamente raros y no se pueden generar de forma fiable bajo demanda.',
      },
      {
        question: '¿Los sudokus de nivel experto se pueden resolver sin adivinar?',
        answer:
          'Sí. Todos los sudokus aquí están verificados para tener exactamente una solución, y una solución única siempre se puede alcanzar con lógica. Puede que haga falta usar técnicas avanzadas y mucha paciencia, pero hay una deducción disponible en cada etapa.',
      },
      {
        question: '¿Por qué tardan más en generarse los sudokus de nivel experto?',
        answer:
          'Porque se comprueba cada retirada de pista. Para bajar a 22 pistas, el generador tiene que intentar retirar muchas más casillas de las que acaba dejando vacías, ejecutando el solucionador cada vez para comprobar que el sudoku conserva una sola solución. Un lote de sudokus expertos exige más trabajo por sudoku que un lote de sudokus fáciles.',
      },
    ],
  },
};

export const DIFFICULTY_CONTENT: Record<Locale, Record<DifficultyKey, DifficultyContent>> = { en, de, fr, es };

export const DIFFICULTY_ORDER: DifficultyKey[] = ['easy', 'medium', 'hard', 'expert'];
