import type { FaqItem } from '@/lib/seo';
import type { Locale } from '@/i18n/config';

export interface SiteFaqs {
  home: FaqItem[];
  answers: FaqItem[];
  perPage: FaqItem[];
  lookup: FaqItem[];
}

const en: SiteFaqs = {
  home: [
    {
      question: 'Is it free?',
      answer:
        'Yes. You pay nothing for puzzles or PDFs, and you need no account or email address. The printed sheets carry no watermark. The expert grids come from the same generator as the easy ones, with more clues removed, so no paid tier holds anything back.',
    },
    {
      question: 'Can I get the answers too?',
      answer:
        'Yes, in two ways. Tick "Include answers" before you generate, and the PDF adds a section after the puzzles with each solution labelled by its puzzle code. That suits a teacher who wants to keep the answer pages back. Or leave the box unticked and look up any solution later on the answer lookup page, using the code printed under the grid.',
    },
    {
      question: 'What paper size does it print on?',
      answer:
        'A4 or US Letter. Pick the one that matches your printer before you generate. The generator sets 16 mm margins on all four sides, inside the printable area of home and office printers, so you do not need to scale the pages down.',
    },
    {
      question: 'How many puzzles can I put on one page?',
      answer:
        'One, two, four or six. One per page gives a large grid with room for notes. Two per page suits most solvers. Four or six per page saves paper when you want a stack of puzzles for a trip or a class.',
    },
    {
      question: 'Does every puzzle have exactly one solution?',
      answer:
        'Yes, and the generator checks it. It starts from a completed grid and removes one clue at a time, running a solver after each removal. If a removal would allow a second answer, the generator puts that clue back. A puzzle reaches your PDF only after the solver confirms a single solution.',
    },
    {
      question: 'Do my puzzles get uploaded anywhere?',
      answer:
        'No. JavaScript in your browser generates the puzzles and assembles the PDF. Your run never reaches a server, which is why the download starts at once and why the page keeps working offline after it loads.',
    },
    {
      question: 'How long does a big batch take?',
      answer:
        'A few seconds for most runs. Sixty puzzles take longer than six, and expert puzzles take longer than easy ones, because the solver does more work at each removal step. Generation runs on a background thread, so the page stays responsive while a progress line shows which puzzle it is setting.',
    },
    {
      question: 'Can I use these puzzles in a classroom or a newsletter?',
      answer:
        'Yes. Print them for your class, your care home or your parish newsletter. A computer generates the grids and we claim no ownership of them, so you do not need to ask permission, credit us or pay.',
    },
  ],
  answers: [
    {
      question: 'Where do the answers appear in the PDF?',
      answer:
        'In their own section after the puzzle pages, on separate sheets from the puzzles they solve. You can hand out the puzzle pages and keep the key back, and nobody glimpses an answer by accident.',
    },
    {
      question: 'How do I match a solution to its puzzle?',
      answer:
        'Each puzzle has a six-character code printed under its grid, next to its difficulty and clue count. Its solution carries the same code, so "#K7M2A9 solution" answers puzzle #K7M2A9 however you shuffle the pages.',
    },
    {
      question: 'Can I print the puzzles without the answer key?',
      answer:
        'Yes. Leave "Include answers" unticked and the PDF contains puzzle pages only. That is the default everywhere except this page. You can also generate with answers and print the first half of the document, since the key comes last.',
    },
    {
      question: 'Are the answers guaranteed correct?',
      answer:
        'Yes. The generator builds a complete, valid grid first and then removes clues from it, so the printed answer is the grid the puzzle came from. It removes a clue only when the puzzle still has a single solution, so no other grid fits.',
    },
    {
      question: 'Can I get the answer key at a bigger size?',
      answer:
        'Set puzzles per page to 1 or 2. The key uses the same layout as the puzzle section, so a one-per-page run gives you full-size solution grids you can check at a glance.',
    },
  ],
  perPage: [
    {
      question: 'Are four-per-page grids big enough to write in?',
      answer:
        'On A4 or Letter each grid comes out about 8 cm square, with cells of about 9 mm, the size of a newspaper sudoku. That works with a pencil or a fine pen. If you write candidate numbers in the corners of cells, two per page will suit you better.',
    },
    {
      question: 'How many puzzles do I get per sheet of paper?',
      answer:
        'Four per side, or eight per sheet if your printer prints double-sided. A run of 24 puzzles at four per page fills six sheets, or three printed on both sides, plus six more pages if you include the answer key.',
    },
    {
      question: 'Does the answer key also print four per page?',
      answer:
        'Yes. The key copies the layout you chose for the puzzles, so a four-per-page run gives you four-per-page solutions in the same order.',
    },
    {
      question: 'What is the best layout for saving paper?',
      answer:
        'Six per page, in two columns of three, is the densest layout on offer. It suits easy and medium puzzles, where you write few notes. For hard and expert grids, pick four per page or fewer.',
    },
  ],
  lookup: [
    {
      question: 'Where do I find the puzzle code?',
      answer:
        'Under the grid, to the left of the difficulty. It has six characters after a hash, like #K7M2A9, and each puzzle on the sheet has its own.',
    },
    {
      question: 'How can it know the answer without storing my puzzle?',
      answer:
        'The code works as a recipe for the puzzle. The generator turns a code into a grid by a fixed procedure with no randomness in it, so entering the same code rebuilds the same puzzle and its solution from scratch. We never received your puzzle, so we had nothing to store.',
    },
    {
      question: 'Does this work for a sheet I printed months ago?',
      answer:
        'Yes. Codes do not expire, and no database can go stale, because the code holds everything the lookup needs. A sheet you find at the back of a drawer in five years will still work, as long as you can read the code.',
    },
    {
      question: 'It says the code is not one we could have printed. What now?',
      answer:
        'You have most likely misread a character. Codes leave out the letters I, L, O and U so you cannot confuse them with 1 and 0. If you read one of those letters, try the digit. A check built into each code makes the lookup reject a wrong entry instead of showing you someone else’s puzzle.',
    },
    {
      question: 'Can I still get the answers printed in the PDF?',
      answer:
        'Yes. Tick "Include answers" in the generator and the solutions print as a section at the back of the document. The option starts unticked, since most solvers prefer a clean set of puzzles and look up the odd answer here.',
    },
    {
      question: 'Can I link straight to a solution?',
      answer:
        'Add the code to the address: /sudoku-answers?code=K7M2A9 opens with that puzzle solved. Use it when you set puzzles for other people and want to send the answer separately.',
    },
  ],
};

const de: SiteFaqs = {
  home: [
    {
      question: 'Ist das kostenlos?',
      answer:
        'Ja. Rätsel und PDFs kosten nichts, und du brauchst weder Konto noch E-Mail-Adresse. Die gedruckten Blätter tragen kein Wasserzeichen. Die Experten-Raster kommen aus demselben Generator wie die einfachen, mit mehr entfernten Hinweisen, also hält keine kostenpflichtige Stufe etwas zurück.',
    },
    {
      question: 'Bekomme ich auch die Lösungen?',
      answer:
        'Ja, auf zwei Wegen. Hake vor dem Erstellen „Lösungen einschließen“ an, dann hängt das PDF nach den Rätseln einen Abschnitt an, in dem jede Lösung mit ihrem Rätselcode beschriftet ist. Das passt, wenn du als Lehrkraft die Lösungsseiten zurückhalten willst. Oder lass das Häkchen weg und schlage jede Lösung später auf der Lösungsseite nach, mit dem Code unter dem Raster.',
    },
    {
      question: 'Welche Papierformate gibt es?',
      answer:
        'A4 oder US Letter. Wähle vor dem Erstellen das Format deines Druckers. Der Generator setzt rundum 16 mm Rand, innerhalb des bedruckbaren Bereichs von Heim- und Bürodruckern, sodass du die Seiten nicht verkleinern musst.',
    },
    {
      question: 'Wie viele Rätsel passen auf eine Seite?',
      answer:
        'Eins, zwei, vier oder sechs. Eins pro Seite ergibt ein großes Raster mit Platz für Notizen. Zwei pro Seite passen den meisten. Vier oder sechs pro Seite sparen Papier, wenn du einen Stapel Rätsel für eine Reise oder eine Klasse willst.',
    },
    {
      question: 'Hat jedes Rätsel genau eine Lösung?',
      answer:
        'Ja, und der Generator prüft das. Er beginnt mit einem vollständigen Raster und entfernt einen Hinweis nach dem anderen, mit einem Lauf des Lösungsalgorithmus nach jeder Entfernung. Würde eine Entfernung eine zweite Lösung zulassen, setzt der Generator den Hinweis zurück. Ein Rätsel kommt erst in dein PDF, wenn der Lösungsalgorithmus eine einzige Lösung bestätigt.',
    },
    {
      question: 'Werden meine Rätsel irgendwohin hochgeladen?',
      answer:
        'Nein. JavaScript in deinem Browser erzeugt die Rätsel und setzt das PDF zusammen. Deine Auflage erreicht nie einen Server, deshalb startet der Download sofort, und die Seite funktioniert nach dem Laden auch offline.',
    },
    {
      question: 'Wie lange dauert eine große Auflage?',
      answer:
        'Bei den meisten Auflagen ein paar Sekunden. Sechzig Rätsel dauern länger als sechs, und Experten-Rätsel länger als einfache, weil der Lösungsalgorithmus bei jedem Entfernungsschritt mehr zu tun hat. Die Erstellung läuft in einem Hintergrund-Thread, sodass die Seite reagiert, während eine Fortschrittszeile zeigt, an welchem Rätsel der Generator gerade arbeitet.',
    },
    {
      question: 'Darf ich diese Rätsel in einer Klasse oder einem Newsletter verwenden?',
      answer:
        'Ja. Drucke sie für deine Klasse, dein Pflegeheim oder den Gemeindebrief. Ein Computer erzeugt die Raster, und wir beanspruchen kein Eigentum daran, also musst du weder fragen noch uns nennen noch bezahlen.',
    },
  ],
  answers: [
    {
      question: 'Wo stehen die Lösungen im PDF?',
      answer:
        'In einem eigenen Abschnitt nach den Rätselseiten, auf anderen Blättern als die Rätsel, die sie lösen. Du kannst die Rätselseiten austeilen und den Lösungsteil behalten, und niemand sieht versehentlich eine Lösung.',
    },
    {
      question: 'Wie ordne ich eine Lösung dem richtigen Rätsel zu?',
      answer:
        'Unter jedem Raster steht ein sechsstelliger Code, neben Schwierigkeit und Anzahl der Hinweise. Die Lösung trägt denselben Code, sodass „Lösung zu #K7M2A9“ zu Rätsel #K7M2A9 gehört, egal wie du die Seiten mischst.',
    },
    {
      question: 'Kann ich die Rätsel ohne Lösungsschlüssel drucken?',
      answer:
        'Ja. Lass „Lösungen einschließen“ leer, dann enthält das PDF nur Rätselseiten. Das ist überall die Voreinstellung außer auf dieser Seite. Du kannst auch mit Lösungen erstellen und nur die erste Hälfte des Dokuments drucken, da der Lösungsteil zuletzt kommt.',
    },
    {
      question: 'Sind die Lösungen garantiert richtig?',
      answer:
        'Ja. Der Generator baut zuerst ein vollständiges, gültiges Raster und entfernt dann Hinweise daraus, sodass die gedruckte Lösung das Raster ist, aus dem das Rätsel stammt. Er entfernt einen Hinweis nur, wenn das Rätsel danach eine einzige Lösung behält, also passt kein anderes Raster.',
    },
    {
      question: 'Kann ich den Lösungsschlüssel größer bekommen?',
      answer:
        'Stelle Rätsel pro Seite auf 1 oder 2. Der Lösungsschlüssel übernimmt das Layout des Rätselteils, sodass eine Auflage mit einem Rätsel pro Seite Lösungsraster in voller Größe liefert, die du auf einen Blick prüfen kannst.',
    },
  ],
  perPage: [
    {
      question: 'Sind Raster mit vier pro Seite groß genug zum Reinschreiben?',
      answer:
        'Auf A4 oder Letter wird jedes Raster etwa 8 cm im Quadrat, mit Feldern von rund 9 mm, so groß wie bei einem Zeitungs-Sudoku. Das reicht für Bleistift oder einen feinen Stift. Schreibst du Kandidatenzahlen in die Feldecken, passen zwei pro Seite besser zu dir.',
    },
    {
      question: 'Wie viele Rätsel bekomme ich pro Blatt Papier?',
      answer:
        'Vier pro Seite, oder acht pro Blatt, wenn dein Drucker beidseitig druckt. Eine Auflage von 24 Rätseln mit vier pro Seite füllt sechs Blätter, oder drei bei beidseitigem Druck, plus sechs weitere Seiten, wenn du den Lösungsschlüssel dazunimmst.',
    },
    {
      question: 'Druckt das PDF den Lösungsschlüssel auch mit vier pro Seite?',
      answer:
        'Ja. Der Lösungsschlüssel übernimmt das Layout, das du für die Rätsel gewählt hast, sodass eine Auflage mit vier pro Seite auch vier Lösungen pro Seite in derselben Reihenfolge liefert.',
    },
    {
      question: 'Welches Layout spart am meisten Papier?',
      answer:
        'Sechs pro Seite, in zwei Spalten zu je drei, ist das dichteste Layout. Es passt zu einfachen und mittelschweren Rätseln, bei denen du wenig notierst. Für schwere und Experten-Raster nimm vier pro Seite oder weniger.',
    },
  ],
  lookup: [
    {
      question: 'Wo finde ich den Rätselcode?',
      answer:
        'Unter dem Raster, links neben der Schwierigkeit. Er hat sechs Zeichen nach einer Raute, zum Beispiel #K7M2A9, und jedes Rätsel auf dem Blatt hat seinen eigenen.',
    },
    {
      question: 'Wie kann die Seite die Lösung kennen, ohne mein Rätsel zu speichern?',
      answer:
        'Der Code ist das Rezept für das Rätsel. Der Generator verwandelt einen Code nach einem festen Verfahren ohne Zufall in ein Raster, sodass derselbe Code dasselbe Rätsel samt Lösung von Grund auf neu erzeugt. Wir haben dein Rätsel nie erhalten und mussten deshalb nichts speichern.',
    },
    {
      question: 'Funktioniert das auch für ein Blatt, das ich vor Monaten gedruckt habe?',
      answer:
        'Ja. Codes laufen nicht ab, und es gibt keine Datenbank, die veralten könnte, weil der Code alles enthält, was die Suche braucht. Ein Blatt, das du in fünf Jahren hinten in einer Schublade findest, funktioniert weiterhin, solange du den Code lesen kannst.',
    },
    {
      question: 'Es heißt, der Code sei keiner, den wir hätten ausgeben können. Was jetzt?',
      answer:
        'Vermutlich hast du ein Zeichen falsch gelesen. Codes lassen die Buchstaben I, L, O und U weg, damit du sie nicht mit 1 und 0 verwechselst. Liest du einen dieser Buchstaben, probiere die Ziffer. Eine in jeden Code eingebaute Prüfung lässt die Suche eine falsche Eingabe ablehnen, statt dir das Rätsel eines anderen zu zeigen.',
    },
    {
      question: 'Kann ich die Lösungen trotzdem im PDF ausdrucken?',
      answer:
        'Ja. Hake im Generator „Lösungen einschließen“ an, dann druckt das PDF die Lösungen als Abschnitt am Ende. Die Option ist anfangs leer, weil die meisten lieber einen sauberen Satz Rätsel haben und gelegentlich hier eine Lösung nachschlagen.',
    },
    {
      question: 'Kann ich direkt auf eine Lösung verlinken?',
      answer:
        'Hänge den Code an die Adresse an: /sudoku-answers?code=K7M2A9 öffnet die Seite mit diesem gelösten Rätsel. Nutze das, wenn du Rätsel für andere zusammenstellst und die Lösung getrennt schicken willst.',
    },
  ],
};

const fr: SiteFaqs = {
  home: [
    {
      question: 'Est-ce gratuit ?',
      answer:
        'Oui. Les grilles et les PDF ne coûtent rien, et vous n’avez besoin ni de compte ni d’adresse e-mail. Les feuilles imprimées ne portent aucun filigrane. Les grilles expert sortent du même générateur que les faciles, avec plus d’indices retirés : aucune formule payante ne retient quoi que ce soit.',
    },
    {
      question: 'Puis-je obtenir aussi les solutions ?',
      answer:
        'Oui, de deux façons. Cochez « Inclure les solutions » avant de générer, et le PDF ajoute après les grilles une section où chaque solution porte le code de sa grille. Cela convient à un enseignant qui veut garder les pages de solutions à part. Ou laissez la case décochée et retrouvez n’importe quelle solution plus tard sur la page de recherche, avec le code imprimé sous la grille.',
    },
    {
      question: 'Quels formats de papier sont proposés ?',
      answer:
        'A4 ou US Letter. Choisissez celui de votre imprimante avant de générer. Le générateur fixe des marges de 16 mm sur les quatre côtés, dans la zone imprimable des imprimantes domestiques et de bureau : vous n’avez pas à réduire les pages.',
    },
    {
      question: 'Combien de grilles puis-je mettre sur une page ?',
      answer:
        'Une, deux, quatre ou six. Une par page donne une grande grille avec de la place pour les notes. Deux par page conviennent à la plupart des joueurs. Quatre ou six par page économisent du papier quand vous voulez une pile de grilles pour un voyage ou une classe.',
    },
    {
      question: 'Chaque grille a-t-elle une seule solution ?',
      answer:
        'Oui, et le générateur le vérifie. Il part d’une grille complète et retire les indices un par un, en lançant un solveur après chaque retrait. Si un retrait autorisait une deuxième solution, le générateur remet l’indice en place. Une grille n’arrive dans votre PDF qu’après confirmation par le solveur d’une solution unique.',
    },
    {
      question: 'Mes grilles sont-elles envoyées quelque part ?',
      answer:
        'Non. Le JavaScript de votre navigateur génère les grilles et assemble le PDF. Votre tirage n’atteint jamais un serveur : c’est pourquoi le téléchargement démarre tout de suite et la page fonctionne hors connexion une fois chargée.',
    },
    {
      question: 'Combien de temps prend un gros lot ?',
      answer:
        'Quelques secondes pour la plupart des tirages. Soixante grilles prennent plus de temps que six, et les grilles expert plus que les faciles, car le solveur a plus de travail à chaque étape de retrait. La génération tourne sur un fil d’arrière-plan : la page reste réactive pendant qu’une ligne de progression indique la grille en cours.',
    },
    {
      question: 'Puis-je utiliser ces grilles en classe ou dans un bulletin ?',
      answer:
        'Oui. Imprimez-les pour votre classe, votre maison de retraite ou le bulletin de votre paroisse. Un ordinateur génère les grilles et nous n’en revendiquons pas la propriété : vous n’avez ni autorisation à demander, ni crédit à donner, ni rien à payer.',
    },
  ],
  answers: [
    {
      question: 'Où apparaissent les solutions dans le PDF ?',
      answer:
        'Dans leur propre section après les pages de grilles, sur d’autres feuilles que les grilles qu’elles résolvent. Vous pouvez distribuer les grilles et garder le corrigé, sans que personne n’aperçoive une solution par mégarde.',
    },
    {
      question: 'Comment associer une solution à sa grille ?',
      answer:
        'Chaque grille porte sous son plateau un code à six caractères, à côté de sa difficulté et de son nombre d’indices. Sa solution porte le même code : « solution de #K7M2A9 » répond à la grille #K7M2A9, quel que soit l’ordre des pages.',
    },
    {
      question: 'Puis-je imprimer les grilles sans le corrigé ?',
      answer:
        'Oui. Laissez « Inclure les solutions » décoché et le PDF ne contient que les grilles. C’est le réglage par défaut partout, sauf sur cette page. Vous pouvez aussi générer avec les solutions et n’imprimer que la première moitié du document, puisque le corrigé arrive en dernier.',
    },
    {
      question: 'Les solutions sont-elles garanties correctes ?',
      answer:
        'Oui. Le générateur construit d’abord une grille complète et valide, puis en retire des indices : la solution imprimée est la grille d’où vient le sudoku. Il ne retire un indice que si la grille garde une solution unique, donc aucune autre grille ne convient.',
    },
    {
      question: 'Puis-je obtenir le corrigé en plus grand ?',
      answer:
        'Réglez le nombre de grilles par page sur 1 ou 2. Le corrigé reprend la mise en page des grilles : un tirage à une grille par page vous donne des solutions en pleine taille, faciles à vérifier d’un coup d’œil.',
    },
  ],
  perPage: [
    {
      question: 'Les grilles à quatre par page sont-elles assez grandes pour écrire dedans ?',
      answer:
        'Sur A4 ou Letter, chaque grille mesure environ 8 cm de côté, avec des cases d’environ 9 mm, la taille d’un sudoku de journal. Cela suffit au crayon ou au stylo fin. Si vous notez les candidats dans les coins des cases, deux par page vous conviendront mieux.',
    },
    {
      question: 'Combien de grilles obtient-on par feuille de papier ?',
      answer:
        'Quatre par face, ou huit par feuille si votre imprimante imprime en recto verso. Un tirage de 24 grilles à quatre par page remplit six feuilles, ou trois en recto verso, plus six pages si vous incluez le corrigé.',
    },
    {
      question: 'Le corrigé s’imprime-t-il aussi à quatre par page ?',
      answer:
        'Oui. Le corrigé reprend la mise en page choisie pour les grilles : un tirage à quatre par page donne des solutions à quatre par page, dans le même ordre.',
    },
    {
      question: 'Quelle est la meilleure mise en page pour économiser du papier ?',
      answer:
        'Six par page, en deux colonnes de trois, est la mise en page la plus dense. Elle convient aux grilles faciles et moyennes, où vous notez peu de choses. Pour les grilles difficiles et expert, choisissez quatre par page ou moins.',
    },
  ],
  lookup: [
    {
      question: 'Où trouver le code de la grille ?',
      answer:
        'Sous la grille, à gauche de la difficulté. Il compte six caractères après un dièse, par exemple #K7M2A9, et chaque grille de la feuille a le sien.',
    },
    {
      question: 'Comment le site peut-il connaître la solution sans stocker ma grille ?',
      answer:
        'Le code sert de recette pour la grille. Le générateur transforme un code en grille selon une procédure fixe, sans hasard : saisir le même code reconstruit la même grille et sa solution à partir de zéro. Nous n’avons jamais reçu votre grille, donc nous n’avions rien à conserver.',
    },
    {
      question: 'Cela fonctionne-t-il pour une feuille imprimée il y a des mois ?',
      answer:
        'Oui. Les codes n’expirent pas et aucune base de données ne peut devenir obsolète, car le code contient tout ce dont la recherche a besoin. Une feuille retrouvée au fond d’un tiroir dans cinq ans fonctionnera toujours, tant que vous pouvez lire le code.',
    },
    {
      question: 'Le site indique que ce code n’a pas pu être imprimé par nos soins. Que faire ?',
      answer:
        'Vous avez probablement mal lu un caractère. Les codes excluent les lettres I, L, O et U pour que vous ne les confondiez pas avec 1 et 0. Si vous lisez l’une de ces lettres, essayez le chiffre. Une vérification intégrée à chaque code fait rejeter une saisie erronée au lieu de vous montrer la grille de quelqu’un d’autre.',
    },
    {
      question: 'Puis-je quand même faire imprimer les solutions dans le PDF ?',
      answer:
        'Oui. Cochez « Inclure les solutions » dans le générateur, et le PDF imprime les solutions en une section à la fin du document. La case est décochée par défaut, car la plupart des joueurs préfèrent un jeu de grilles net et viennent chercher une solution ici au besoin.',
    },
    {
      question: 'Puis-je créer un lien direct vers une solution ?',
      answer:
        'Ajoutez le code à l’adresse : /sudoku-answers?code=K7M2A9 ouvre la page avec cette grille résolue. Utilisez-le quand vous composez des grilles pour d’autres personnes et voulez leur envoyer la solution à part.',
    },
  ],
};

const es: SiteFaqs = {
  home: [
    {
      question: '¿Es gratis?',
      answer:
        'Sí. Los sudokus y los PDF no cuestan nada, y no necesitas cuenta ni dirección de correo. Las hojas impresas no llevan marca de agua. Las cuadrículas expertas salen del mismo generador que las fáciles, con más pistas retiradas, así que ningún plan de pago se guarda nada.',
    },
    {
      question: '¿También puedo conseguir las soluciones?',
      answer:
        'Sí, de dos maneras. Marca «Incluir soluciones» antes de generar y el PDF añade, después de los sudokus, una sección donde cada solución lleva el código de su sudoku. Eso le viene bien a un profesor que quiere guardarse las páginas de soluciones. O deja la casilla sin marcar y busca cualquier solución más tarde en la página de búsqueda, con el código impreso bajo la cuadrícula.',
    },
    {
      question: '¿En qué tamaño de papel imprime?',
      answer:
        'A4 o US Letter. Elige el de tu impresora antes de generar. El generador fija márgenes de 16 mm en los cuatro lados, dentro del área imprimible de las impresoras domésticas y de oficina, así que no hace falta reducir las páginas.',
    },
    {
      question: '¿Cuántos sudokus puedo poner en una página?',
      answer:
        'Uno, dos, cuatro o seis. Uno por página da una cuadrícula grande con sitio para anotar. Dos por página le va bien a la mayoría. Cuatro o seis por página ahorran papel cuando quieres una pila de sudokus para un viaje o una clase.',
    },
    {
      question: '¿Todos los sudokus tienen exactamente una solución?',
      answer:
        'Sí, y el generador lo comprueba. Parte de una cuadrícula completa y retira las pistas una a una, ejecutando un solucionador después de cada retirada. Si una retirada permitiera una segunda solución, el generador vuelve a colocar la pista. Un sudoku solo llega a tu PDF cuando el solucionador confirma una única solución.',
    },
    {
      question: '¿Mis sudokus se suben a algún sitio?',
      answer:
        'No. El JavaScript de tu navegador genera los sudokus y monta el PDF. Tu tirada nunca llega a un servidor, por eso la descarga empieza al momento y la página sigue funcionando sin conexión una vez cargada.',
    },
    {
      question: '¿Cuánto tarda una tirada grande?',
      answer:
        'Unos segundos en la mayoría de los casos. Sesenta sudokus tardan más que seis, y los expertos más que los fáciles, porque el solucionador trabaja más en cada paso de retirada. La generación corre en un hilo en segundo plano, así que la página responde mientras una línea de progreso indica qué sudoku está preparando.',
    },
    {
      question: '¿Puedo usar estos sudokus en una clase o en un boletín?',
      answer:
        'Sí. Imprímelos para tu clase, tu residencia o el boletín de tu parroquia. Un ordenador genera las cuadrículas y no reclamamos su propiedad, así que no tienes que pedir permiso, citarnos ni pagar.',
    },
  ],
  answers: [
    {
      question: '¿Dónde aparecen las soluciones en el PDF?',
      answer:
        'En su propia sección después de las páginas de sudokus, en hojas distintas de los sudokus que resuelven. Puedes repartir los sudokus y quedarte con las soluciones, sin que nadie vea una respuesta sin querer.',
    },
    {
      question: '¿Cómo sé qué solución corresponde a qué sudoku?',
      answer:
        'Cada sudoku lleva un código de seis caracteres bajo su cuadrícula, junto a su dificultad y su número de pistas. Su solución lleva el mismo código, así que «solución de #K7M2A9» responde al sudoku #K7M2A9 aunque mezcles las páginas.',
    },
    {
      question: '¿Puedo imprimir los sudokus sin las soluciones?',
      answer:
        'Sí. Deja «Incluir soluciones» sin marcar y el PDF contendrá solo sudokus. Esa es la opción por defecto en todas partes menos en esta página. También puedes generar con soluciones e imprimir solo la primera mitad del documento, porque las soluciones van al final.',
    },
    {
      question: '¿Las soluciones son siempre correctas?',
      answer:
        'Sí. El generador construye primero una cuadrícula completa y válida y luego le retira pistas, así que la solución impresa es la cuadrícula de la que salió el sudoku. Solo retira una pista si el sudoku conserva una única solución, así que ninguna otra cuadrícula encaja.',
    },
    {
      question: '¿Puedo conseguir las soluciones en un tamaño más grande?',
      answer:
        'Pon el número de sudokus por página en 1 o 2. Las soluciones usan el mismo diseño que los sudokus, así que una tirada de uno por página te da soluciones a tamaño completo, fáciles de comprobar de un vistazo.',
    },
  ],
  perPage: [
    {
      question: '¿Las cuadrículas de cuatro por página son lo bastante grandes para escribir en ellas?',
      answer:
        'En A4 o Letter, cada cuadrícula sale de unos 8 cm de lado, con casillas de unos 9 mm, el tamaño de un sudoku de periódico. Basta con lápiz o con un bolígrafo fino. Si anotas candidatos en las esquinas de las casillas, dos por página te irán mejor.',
    },
    {
      question: '¿Cuántos sudokus obtengo por hoja de papel?',
      answer:
        'Cuatro por cara, u ocho por hoja si tu impresora imprime a doble cara. Una tirada de 24 sudokus a cuatro por página ocupa seis hojas, o tres a doble cara, más seis páginas si incluyes las soluciones.',
    },
    {
      question: '¿Las soluciones también se imprimen a cuatro por página?',
      answer:
        'Sí. Las soluciones copian el diseño que elegiste para los sudokus, así que una tirada de cuatro por página da soluciones a cuatro por página, en el mismo orden.',
    },
    {
      question: '¿Cuál es el mejor diseño para ahorrar papel?',
      answer:
        'Seis por página, en dos columnas de tres, es el diseño más compacto. Va bien con sudokus fáciles y medios, donde anotas poco. Para cuadrículas difíciles y expertas, elige cuatro por página o menos.',
    },
  ],
  lookup: [
    {
      question: '¿Dónde encuentro el código del sudoku?',
      answer:
        'Bajo la cuadrícula, a la izquierda de la dificultad. Tiene seis caracteres después de una almohadilla, como #K7M2A9, y cada sudoku de la hoja lleva el suyo.',
    },
    {
      question: '¿Cómo puede saber la solución sin guardar mi sudoku?',
      answer:
        'El código funciona como la receta del sudoku. El generador convierte un código en una cuadrícula con un procedimiento fijo y sin azar, así que al introducir el mismo código reconstruye el mismo sudoku y su solución desde cero. Nunca recibimos tu sudoku, así que no teníamos nada que guardar.',
    },
    {
      question: '¿Esto funciona con una hoja que imprimí hace meses?',
      answer:
        'Sí. Los códigos no caducan y no hay base de datos que pueda quedar obsoleta, porque el código contiene todo lo que necesita la búsqueda. Una hoja que encuentres al fondo de un cajón dentro de cinco años seguirá funcionando, siempre que puedas leer el código.',
    },
    {
      question: 'Dice que ese código no es uno que hayamos podido generar. ¿Y ahora qué?',
      answer:
        'Lo más probable es que hayas leído mal un carácter. Los códigos excluyen las letras I, L, O y U para que no las confundas con 1 y 0. Si lees una de esas letras, prueba con el número. Una comprobación integrada en cada código hace que la búsqueda rechace una entrada equivocada en vez de mostrarte el sudoku de otra persona.',
    },
    {
      question: '¿Puedo seguir teniendo las soluciones impresas en el PDF?',
      answer:
        'Sí. Marca «Incluir soluciones» en el generador y el PDF imprime las soluciones como una sección al final del documento. La casilla empieza sin marcar, porque la mayoría prefiere un conjunto limpio de sudokus y viene aquí a buscar alguna solución suelta.',
    },
    {
      question: '¿Puedo enlazar directamente a una solución?',
      answer:
        'Añade el código a la dirección: /sudoku-answers?code=K7M2A9 abre la página con ese sudoku resuelto. Úsalo cuando prepares sudokus para otras personas y quieras enviarles la solución por separado.',
    },
  ],
};

export const SITE_FAQS: Record<Locale, SiteFaqs> = { en, de, fr, es };
