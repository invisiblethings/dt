import Link from 'next/link';
import { Generator } from '@/components/generator';
import { Faq } from '@/components/faq';
import { JsonLd } from '@/components/json-ld';
import { Shell } from '@/components/shell';
import { PageHero } from '@/components/page-hero';
import { DifficultyCards } from '@/components/difficulty-cards';
import { getDictionary } from '@/i18n/dictionary';
import { SAMPLE_PUZZLES } from '@/lib/samples';
import { SITE_FAQS } from '@/content/faqs';
import { localizedPath, type Locale } from '@/i18n/config';
import { faqPageSchema, pageMetadata, webApplicationSchema, webSiteSchema } from '@/lib/seo';

const META: Record<Locale, { title: string; description: string; h1: string; lede: string; appDescription: string; featureList: string[] }> = {
  en: {
    title: 'Free Printable Sudoku: Download Puzzle PDFs',
    description:
      'Make your own free printable sudoku. Pick a difficulty, choose 1 to 6 puzzles per page in A4 or US Letter, and download a print-ready PDF with answers.',
    h1: 'Free printable sudoku puzzles, ready to download as a PDF',
    lede: 'Set the difficulty, choose how many puzzles go on a page, and pull a print-ready sheet. You need no account and pay nothing, and the solver checks each grid for a single solution before it reaches your printer.',
    appDescription:
      'A free browser-based tool that generates printable sudoku puzzles and downloads them as a PDF with an optional answer key.',
    featureList: [
      'Generate printable sudoku puzzles in easy, medium, hard and expert difficulty',
      'Download puzzles as a print-ready PDF in A4 or US Letter',
      'Print 1, 2, 4 or 6 puzzles per page',
      'Optional full answer key appended to the PDF',
      'Every puzzle verified to have exactly one solution',
    ],
  },
  de: {
    title: 'Kostenloses Sudoku zum Ausdrucken: PDF-Rätsel herunterladen',
    description:
      'Erstelle dein eigenes kostenloses Sudoku zum Ausdrucken. Wähle einen Schwierigkeitsgrad, 1 bis 6 Rätsel pro Seite in A4 oder US Letter, und lade ein druckfertiges PDF mit Lösungen herunter.',
    h1: 'Kostenlose Sudoku-Rätsel zum Ausdrucken, als PDF zum Herunterladen',
    lede: 'Wähle die Schwierigkeit, entscheide, wie viele Rätsel auf eine Seite sollen, und zieh ein druckfertiges Blatt. Du brauchst kein Konto und zahlst nichts, und der Lösungsalgorithmus prüft jedes Raster auf eine eindeutige Lösung, bevor es zu deinem Drucker kommt.',
    appDescription:
      'Ein kostenloses browserbasiertes Werkzeug, das Sudoku-Rätsel zum Ausdrucken erzeugt und als PDF mit optionalem Lösungsschlüssel herunterlädt.',
    featureList: [
      'Sudoku-Rätsel zum Ausdrucken in den Stufen einfach, mittel, schwer und experte erzeugen',
      'Rätsel als druckfertiges PDF in A4 oder US Letter herunterladen',
      '1, 2, 4 oder 6 Rätsel pro Seite drucken',
      'Optionaler vollständiger Lösungsschlüssel am Ende des PDFs',
      'Jedes Rätsel geprüft auf genau eine Lösung',
    ],
  },
  fr: {
    title: 'Sudoku Gratuit à Imprimer : Téléchargez des Grilles en PDF',
    description:
      'Composez votre propre sudoku gratuit à imprimer. Choisissez une difficulté, 1 à 6 grilles par page en A4 ou US Letter, et téléchargez un PDF prêt à imprimer avec les solutions.',
    h1: 'Sudoku gratuit à imprimer, prêt à télécharger en PDF',
    lede: 'Réglez la difficulté, choisissez combien de grilles tiennent sur une page, et tirez une feuille prête à imprimer. Vous n’avez besoin d’aucun compte et ne payez rien, et le solveur vérifie que chaque grille n’a qu’une solution avant qu’elle n’arrive sur votre imprimante.',
    appDescription:
      'Un outil gratuit fonctionnant dans le navigateur qui génère des grilles de sudoku à imprimer et les télécharge en PDF avec corrigé en option.',
    featureList: [
      'Générer des grilles de sudoku à imprimer aux niveaux facile, moyen, difficile et expert',
      'Télécharger les grilles en PDF prêt à imprimer, en A4 ou US Letter',
      'Imprimer 1, 2, 4 ou 6 grilles par page',
      'Corrigé complet en option, ajouté à la fin du PDF',
      'Chaque grille vérifiée pour n’avoir qu’une seule solution',
    ],
  },
  es: {
    title: 'Sudoku Gratis para Imprimir: Descarga PDF de Sudokus',
    description:
      'Crea tu propio sudoku gratis para imprimir. Elige una dificultad, de 1 a 6 sudokus por página en A4 o US Letter, y descarga un PDF listo para imprimir con soluciones.',
    h1: 'Sudoku gratis para imprimir, listo para descargar en PDF',
    lede: 'Elige la dificultad, decide cuántos sudokus caben en una página, y saca una hoja lista para imprimir. No necesitas cuenta ni pagas nada, y el solucionador comprueba que cada cuadrícula tenga una única solución antes de que llegue a tu impresora.',
    appDescription:
      'Una herramienta gratuita que funciona en el navegador, genera sudokus para imprimir y los descarga en PDF con soluciones opcionales.',
    featureList: [
      'Genera sudokus para imprimir en los niveles fácil, medio, difícil y experto',
      'Descarga los sudokus en un PDF listo para imprimir, en A4 o US Letter',
      'Imprime 1, 2, 4 o 6 sudokus por página',
      'Soluciones completas opcionales añadidas al final del PDF',
      'Cada sudoku verificado para tener exactamente una solución',
    ],
  },
};

const STEPS: Record<Locale, { n: string; title: string; body: string }[]> = {
  en: [
    {
      n: '01',
      title: 'Set the run',
      body: 'Choose how many puzzles you want, how hard they should be, and how many should sit on each page. Pick A4 or US Letter to match your printer, and decide whether you want the answer key.',
    },
    {
      n: '02',
      title: 'Pull the proof',
      body: 'Press Generate. A background thread builds the puzzles one at a time, and a solver checks each for a single solution before the generator accepts it. The preview sheet shows each puzzle as it comes off the press.',
    },
    {
      n: '03',
      title: 'Print it',
      body: 'Download the PDF and print it. The margins sit inside the printable area, heavy rules mark the 3×3 boxes so the grid reads clearly, and the footer numbers each page.',
    },
  ],
  de: [
    {
      n: '01',
      title: 'Auflage festlegen',
      body: 'Wähle, wie viele Rätsel du willst, wie schwer sie sein sollen und wie viele auf jede Seite sollen. Wähle A4 oder US Letter passend zu deinem Drucker, und entscheide, ob du den Lösungsschlüssel willst.',
    },
    {
      n: '02',
      title: 'Andruck ziehen',
      body: 'Klicke auf „PDF erstellen“. Ein Hintergrund-Thread baut die Rätsel nacheinander, und ein Lösungsalgorithmus prüft jedes auf eine eindeutige Lösung, bevor der Generator es übernimmt. Das Vorschaublatt zeigt jedes Rätsel, sobald es fertig ist.',
    },
    {
      n: '03',
      title: 'Drucken',
      body: 'Lade das PDF herunter und drucke es. Die Ränder liegen innerhalb des bedruckbaren Bereichs, kräftige Linien markieren die 3×3-Blöcke, damit das Raster klar lesbar bleibt, und die Fußzeile nummeriert jede Seite.',
    },
  ],
  fr: [
    {
      n: '01',
      title: 'Composer le tirage',
      body: 'Choisissez le nombre de grilles voulu, leur difficulté, et combien doivent tenir sur chaque page. Choisissez A4 ou US Letter selon votre imprimante, et décidez si vous voulez le corrigé.',
    },
    {
      n: '02',
      title: 'Tirer l’épreuve',
      body: 'Cliquez sur « Générer le PDF ». Un fil d’arrière-plan compose les grilles une par une, et un solveur vérifie que chacune n’a qu’une solution avant que le générateur ne l’accepte. La feuille d’aperçu affiche chaque grille à sa sortie.',
    },
    {
      n: '03',
      title: 'Imprimer',
      body: 'Téléchargez le PDF et imprimez-le. Les marges restent dans la zone imprimable, des traits épais marquent les blocs 3×3 pour que la grille se lise clairement, et le pied de page numérote chaque page.',
    },
  ],
  es: [
    {
      n: '01',
      title: 'Preparar la tirada',
      body: 'Elige cuántos sudokus quieres, con qué dificultad y cuántos deben ir en cada página. Elige A4 o US Letter según tu impresora, y decide si quieres las soluciones.',
    },
    {
      n: '02',
      title: 'Sacar la prueba',
      body: 'Pulsa «Generar PDF». Un hilo en segundo plano construye los sudokus uno a uno, y un solucionador comprueba que cada uno tenga una única solución antes de que el generador lo acepte. La hoja de vista previa muestra cada sudoku a medida que sale.',
    },
    {
      n: '03',
      title: 'Imprimir',
      body: 'Descarga el PDF e imprímelo. Los márgenes quedan dentro del área imprimible, unas líneas gruesas marcan las regiones 3×3 para que la cuadrícula se lea con claridad, y el pie numera cada página.',
    },
  ],
};

export function getHomeMetadata(locale: Locale) {
  const t = META[locale];
  return pageMetadata({ title: t.title, description: t.description, path: '/', locale });
}

function ProseSections({ locale }: { locale: Locale }) {
  if (locale === 'de') {
    return (
      <>
        <section aria-labelledby="what-heading" className="mt-20 max-w-prose">
          <h2 id="what-heading" className="m-0 font-display text-[24px] font-bold">
            Ein Sudoku-Ausdruck, den du selbst bestimmst
          </h2>
          <div className="prose-press mt-4">
            <p>
              Die meisten kostenlosen Sudokus zum Ausdrucken kommen als festes PDF, das jemand
              einmal erstellt hat, mit vierzig Rätseln in einem Layout und der Schwierigkeit, die
              der Ersteller an dem Tag gewählt hat. Dieser Generator baut das Blatt, wenn du danach
              fragst. Bestell elf schwere Rätsel, vier pro Seite, auf US Letter, mit den Lösungen
              hinten, und du bekommst dieses Blatt. Fünf Minuten später klickst du erneut und
              bekommst elf andere.
            </p>
            <p>
              Der Generator erzeugt bei jeder Auflage frische Rätsel, statt sie aus einer Bibliothek
              zu ziehen, sodass du kein Raster zweimal druckst und niemandem im Raum ein Rätsel
              gibst, das er schon hat. Generator, prüfender Lösungsalgorithmus und PDF-Erstellung
              laufen alle in deinem Browser. Wir laden nichts hoch und speichern nichts, und du
              brauchst kein Konto für den Download.
            </p>
            <p>
              Du bekommst eine saubere gedruckte Seite. Kräftige Linien markieren die
              3×3-Blockgrenzen, damit das Raster auf einen Blick lesbar ist, und unter jedem Raster
              stehen Rätselcode, Schwierigkeit und Anzahl der Hinweise. Die Fußzeile nummeriert jede
              Seite, und ein Lösungsschlüssel folgt auf Wunsch in derselben Reihenfolge wie die
              Rätsel.
            </p>
          </div>
        </section>

        <section aria-labelledby="how-heading" className="mt-16">
          <h2 id="how-heading" className="m-0 font-display text-[24px] font-bold">
            So funktioniert es
          </h2>
          <ol className="mt-6 grid list-none gap-4 p-0 shelf:grid-cols-3">
            {STEPS.de.map((step) => (
              <li key={step.n} className="press-card p-5">
                <p className="m-0 font-mono text-[11px] tracking-[1px] text-stamp">{step.n}</p>
                <h3 className="mb-2 mt-2 font-display text-[16px] font-bold">{step.title}</h3>
                <p className="m-0 text-[14px] leading-relaxed text-ink-soft">{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="unique-heading" className="mt-16 max-w-prose">
          <h2 id="unique-heading" className="m-0 font-display text-[24px] font-bold">
            Warum jedes Rätsel genau eine Lösung hat
          </h2>
          <div className="prose-press mt-4">
            <p>
              Ein Raster mit zwei gültigen Lösungen zwingt dich irgendwann zum Raten, und das
              widerspricht dem Sinn eines Logikrätsels. Viele kostenlose Generatoren lassen die
              Eindeutigkeitsprüfung weg, weil sie die meiste Rechenzeit kostet. Dieser führt sie für
              jedes Rätsel durch.
            </p>
            <p>
              Der Generator beginnt jedes Rätsel mit einem vollständigen, gültigen 9×9-Raster,
              erzeugt durch randomisiertes Backtracking. Dann entfernt er nacheinander in zufälliger
              Reihenfolge Hinweise. Nach jeder Entfernung zählt ein Lösungsalgorithmus mit Bitmasken
              die Lösungen des verbleibenden Rasters und hört auf, sobald er eine zweite findet.
              Findet er eine, setzt der Generator den Hinweis sofort zurück und behält so nur
              Entfernungen, die eine eindeutige Lösung lassen.
            </p>
            <p>
              Weniger Hinweise bedeuten weit mehr Durchläufe des Lösungsalgorithmus, deshalb dauert
              eine Experten-Auflage etwas länger als eine einfache. Dafür ist die Anzahl der
              Hinweise unter jedem Raster eine Messung dieses Rätsels, die du nachprüfen kannst.
            </p>
          </div>
        </section>

        <section aria-labelledby="levels-heading" className="mt-16">
          <h2 id="levels-heading" className="m-0 font-display text-[24px] font-bold">
            Sudoku zum Ausdrucken nach Schwierigkeit
          </h2>
          <p className="mb-6 mt-3 max-w-prose text-[15.5px] leading-relaxed text-ink-soft">
            Jede Stufe hat ihre eigene Seite mit bereits eingestelltem Generator, sodass
            du direkt zu den Rätseln kommst, die du willst.
          </p>
          <DifficultyCards locale={locale} />

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Link
            href={localizedPath(locale, '/printable-sudoku-with-answers')}
            className="press-card group block p-5 no-underline transition-colors hover:border-stamp/60"
          >
            <span className="font-display text-[17px] font-bold text-ink group-hover:text-stamp">
              Sudoku zum Ausdrucken mit Lösungen
            </span>
            <span className="mt-2 block text-[14px] leading-relaxed text-ink-soft">
              Rätsel und ein vollständiger Lösungsschlüssel in einem PDF, mit den
              Lösungen auf eigenen Seiten am Ende.
            </span>
          </Link>
          <Link
            href={localizedPath(locale, '/printable-sudoku-4-per-page')}
            className="press-card group block p-5 no-underline transition-colors hover:border-stamp/60"
          >
            <span className="font-display text-[17px] font-bold text-ink group-hover:text-stamp">
              4 Sudokus pro Seite ausdrucken
            </span>
            <span className="mt-2 block text-[14px] leading-relaxed text-ink-soft">
              Vier Raster pro Blatt, das papiersparende Layout für Reisesets und
              Klassensätze.
            </span>
          </Link>
          </div>
        </section>
      </>
    );
  }

  if (locale === 'fr') {
    return (
      <>
        <section aria-labelledby="what-heading" className="mt-20 max-w-prose">
          <h2 id="what-heading" className="m-0 font-display text-[24px] font-bold">
            Un sudoku à imprimer que vous contrôlez
          </h2>
          <div className="prose-press mt-4">
            <p>
              La plupart des sudokus gratuits à imprimer se présentent comme un PDF figé, composé
              une fois, avec quarante grilles dans une seule mise en page et la difficulté choisie
              ce jour-là par son auteur. Ce générateur compose la feuille quand vous la demandez.
              Demandez onze grilles difficiles, quatre par page, en US Letter, avec les solutions à
              la fin, et vous obtenez cette feuille. Cinq minutes plus tard, un nouveau clic vous en
              donne onze autres.
            </p>
            <p>
              Le générateur crée de nouvelles grilles à chaque tirage au lieu de les puiser dans une
              bibliothèque : vous n’imprimerez pas deux fois la même grille et ne distribuerez pas
              une grille que quelqu’un dans la pièce possède déjà. Le générateur, le solveur qui
              vérifie chaque grille et la mise en page du PDF tournent dans votre navigateur. Nous
              n’envoyons ni ne stockons rien, et vous n’avez besoin d’aucun compte pour télécharger.
            </p>
            <p>
              Vous obtenez une page imprimée nette. Des traits épais marquent les bordures des blocs
              3×3 pour que la grille se lise d’un coup d’œil, et chaque grille porte son code, sa
              difficulté et son nombre d’indices en dessous. Le pied de page numérote chaque page,
              et le corrigé, si vous le voulez, suit le même ordre que les grilles.
            </p>
          </div>
        </section>

        <section aria-labelledby="how-heading" className="mt-16">
          <h2 id="how-heading" className="m-0 font-display text-[24px] font-bold">
            Comment ça marche
          </h2>
          <ol className="mt-6 grid list-none gap-4 p-0 shelf:grid-cols-3">
            {STEPS.fr.map((step) => (
              <li key={step.n} className="press-card p-5">
                <p className="m-0 font-mono text-[11px] tracking-[1px] text-stamp">{step.n}</p>
                <h3 className="mb-2 mt-2 font-display text-[16px] font-bold">{step.title}</h3>
                <p className="m-0 text-[14px] leading-relaxed text-ink-soft">{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="unique-heading" className="mt-16 max-w-prose">
          <h2 id="unique-heading" className="m-0 font-display text-[24px] font-bold">
            Pourquoi chaque grille n’a qu’une seule solution
          </h2>
          <div className="prose-press mt-4">
            <p>
              Une grille à deux solutions valides vous oblige à deviner à un moment donné, ce qui va
              à l’encontre du principe d’un jeu de logique. Beaucoup de générateurs gratuits sautent
              la vérification d’unicité parce qu’elle coûte le plus de temps de calcul. Celui-ci la
              fait pour chaque grille.
            </p>
            <p>
              Le générateur part, pour chaque grille, d’un plateau 9×9 complet et valide, construit
              par retour arrière aléatoire. Il retire ensuite les indices un par un dans un ordre
              aléatoire. Après chaque retrait, un solveur à masques de bits compte les solutions de
              la grille restante et s’arrête dès qu’il en trouve une deuxième. S’il en trouve une,
              le générateur remet l’indice aussitôt et ne garde ainsi que les retraits qui laissent
              une solution unique.
            </p>
            <p>
              Moins d’indices signifient bien plus de passages du solveur : un lot expert prend donc
              un peu plus de temps qu’un lot facile. En échange, le nombre d’indices imprimé sous
              chaque grille est une mesure de cette grille que vous pouvez vérifier.
            </p>
          </div>
        </section>

        <section aria-labelledby="levels-heading" className="mt-16">
          <h2 id="levels-heading" className="m-0 font-display text-[24px] font-bold">
            Sudoku à imprimer par difficulté
          </h2>
          <p className="mb-6 mt-3 max-w-prose text-[15.5px] leading-relaxed text-ink-soft">
            Chaque niveau a sa propre page, avec le générateur déjà réglé, pour aller
            droit aux grilles que vous voulez.
          </p>
          <DifficultyCards locale={locale} />

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Link
            href={localizedPath(locale, '/printable-sudoku-with-answers')}
            className="press-card group block p-5 no-underline transition-colors hover:border-stamp/60"
          >
            <span className="font-display text-[17px] font-bold text-ink group-hover:text-stamp">
              Sudoku à imprimer avec solutions
            </span>
            <span className="mt-2 block text-[14px] leading-relaxed text-ink-soft">
              Grilles et corrigé complet dans un seul PDF, avec les solutions sur
              leurs propres pages à la fin.
            </span>
          </Link>
          <Link
            href={localizedPath(locale, '/printable-sudoku-4-per-page')}
            className="press-card group block p-5 no-underline transition-colors hover:border-stamp/60"
          >
            <span className="font-display text-[17px] font-bold text-ink group-hover:text-stamp">
              4 sudokus par page à imprimer
            </span>
            <span className="mt-2 block text-[14px] leading-relaxed text-ink-soft">
              Quatre grilles par feuille, la mise en page qui économise le papier,
              pour les lots de voyage et les classes.
            </span>
          </Link>
          </div>
        </section>
      </>
    );
  }

  if (locale === 'es') {
    return (
      <>
        <section aria-labelledby="what-heading" className="mt-20 max-w-prose">
          <h2 id="what-heading" className="m-0 font-display text-[24px] font-bold">
            Un sudoku para imprimir que controlas tú
          </h2>
          <div className="prose-press mt-4">
            <p>
              La mayoría del sudoku gratis para imprimir llega como un PDF fijo que alguien hizo una
              vez, con cuarenta sudokus en un solo diseño y la dificultad que su autor eligió ese
              día. Este generador construye la hoja cuando se la pides. Pide once sudokus difíciles,
              cuatro por página, en US Letter, con las soluciones al final, y obtienes esa hoja.
              Cinco minutos después, vuelves a pulsar el botón y consigues otros once.
            </p>
            <p>
              El generador crea sudokus nuevos en cada tirada en vez de sacarlos de una biblioteca,
              así que no imprimirás la misma cuadrícula dos veces ni repartirás un sudoku que ya
              tenga alguien en la sala. El generador, el solucionador que comprueba cada sudoku y la
              maquetación del PDF funcionan en tu navegador. No subimos ni guardamos nada, y no
              necesitas cuenta para descargar.
            </p>
            <p>
              Obtienes una página impresa limpia. Unas líneas gruesas marcan los bordes de las
              regiones 3×3 para que la cuadrícula se lea de un vistazo, y cada cuadrícula lleva
              debajo su código, su dificultad y su número de pistas. El pie numera cada página, y
              las soluciones, si las quieres, siguen el mismo orden que los sudokus.
            </p>
          </div>
        </section>

        <section aria-labelledby="how-heading" className="mt-16">
          <h2 id="how-heading" className="m-0 font-display text-[24px] font-bold">
            Cómo funciona
          </h2>
          <ol className="mt-6 grid list-none gap-4 p-0 shelf:grid-cols-3">
            {STEPS.es.map((step) => (
              <li key={step.n} className="press-card p-5">
                <p className="m-0 font-mono text-[11px] tracking-[1px] text-stamp">{step.n}</p>
                <h3 className="mb-2 mt-2 font-display text-[16px] font-bold">{step.title}</h3>
                <p className="m-0 text-[14px] leading-relaxed text-ink-soft">{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="unique-heading" className="mt-16 max-w-prose">
          <h2 id="unique-heading" className="m-0 font-display text-[24px] font-bold">
            Por qué cada sudoku tiene exactamente una solución
          </h2>
          <div className="prose-press mt-4">
            <p>
              Una cuadrícula con dos soluciones válidas te obliga a adivinar en algún momento, y eso
              va contra la idea de un juego de lógica. Muchos generadores gratuitos se saltan la
              comprobación de unicidad porque es la que más tiempo de cálculo consume. Este la hace
              con cada sudoku.
            </p>
            <p>
              El generador empieza cada sudoku con una cuadrícula 9×9 completa y válida, construida
              por backtracking aleatorio. Luego retira las pistas una a una en orden aleatorio. Tras
              cada retirada, un solucionador con máscaras de bits cuenta las soluciones de la
              cuadrícula restante y se detiene en cuanto encuentra una segunda. Si la encuentra, el
              generador devuelve la pista a su sitio de inmediato, y así solo conserva las retiradas
              que dejan una solución única.
            </p>
            <p>
              Menos pistas implican muchas más pasadas del solucionador, así que una tanda experta
              tarda algo más que una fácil. A cambio, el número de pistas impreso bajo cada
              cuadrícula es una medida de ese sudoku que puedes comprobar.
            </p>
          </div>
        </section>

        <section aria-labelledby="levels-heading" className="mt-16">
          <h2 id="levels-heading" className="m-0 font-display text-[24px] font-bold">
            Sudoku para imprimir por dificultad
          </h2>
          <p className="mb-6 mt-3 max-w-prose text-[15.5px] leading-relaxed text-ink-soft">
            Cada nivel tiene su propia página con el generador ya configurado, así que
            puedes ir directo a los sudokus que quieres.
          </p>
          <DifficultyCards locale={locale} />

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Link
            href={localizedPath(locale, '/printable-sudoku-with-answers')}
            className="press-card group block p-5 no-underline transition-colors hover:border-stamp/60"
          >
            <span className="font-display text-[17px] font-bold text-ink group-hover:text-stamp">
              Sudoku para imprimir con soluciones
            </span>
            <span className="mt-2 block text-[14px] leading-relaxed text-ink-soft">
              Sudokus y soluciones completas en un solo PDF, con las soluciones en sus
              propias páginas al final.
            </span>
          </Link>
          <Link
            href={localizedPath(locale, '/printable-sudoku-4-per-page')}
            className="press-card group block p-5 no-underline transition-colors hover:border-stamp/60"
          >
            <span className="font-display text-[17px] font-bold text-ink group-hover:text-stamp">
              4 sudokus por página para imprimir
            </span>
            <span className="mt-2 block text-[14px] leading-relaxed text-ink-soft">
              Cuatro cuadrículas por hoja, el diseño que ahorra papel, ideal para
              paquetes de viaje y clases.
            </span>
          </Link>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <section aria-labelledby="what-heading" className="mt-20 max-w-prose">
        <h2 id="what-heading" className="m-0 font-display text-[24px] font-bold">
          A sudoku printable you control
        </h2>
        <div className="prose-press mt-4">
          <p>
            Most free printable sudoku comes as a fixed PDF someone made once, with forty puzzles in
            one layout at whatever difficulty they picked that day. This generator builds the sheet
            when you ask. Ask for eleven hard puzzles, four to a page, on US Letter, with the
            answers at the back, and you get that sheet. Five minutes later you can press the button
            again for a different eleven.
          </p>
          <p>
            The generator makes fresh puzzles each run instead of pulling them from a library, so
            you will not print the same grid twice or hand out a puzzle someone in the room already
            has. The generator, the solver that checks each puzzle and the PDF builder all run in
            your browser. We upload and store nothing, and you need no account to download.
          </p>
          <p>
            You get a clean printed page. Heavy rules mark the 3×3 box borders so the grid reads at
            a glance, and each grid carries its puzzle code, difficulty and clue count underneath.
            The footer numbers each page, and an answer key, if you want one, follows the same order
            as the puzzles.
          </p>
        </div>
      </section>

      <section aria-labelledby="how-heading" className="mt-16">
        <h2 id="how-heading" className="m-0 font-display text-[24px] font-bold">
          How it works
        </h2>
        <ol className="mt-6 grid list-none gap-4 p-0 shelf:grid-cols-3">
          {STEPS.en.map((step) => (
            <li key={step.n} className="press-card p-5">
              <p className="m-0 font-mono text-[11px] tracking-[1px] text-stamp">{step.n}</p>
              <h3 className="mb-2 mt-2 font-display text-[16px] font-bold">{step.title}</h3>
              <p className="m-0 text-[14px] leading-relaxed text-ink-soft">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="unique-heading" className="mt-16 max-w-prose">
        <h2 id="unique-heading" className="m-0 font-display text-[24px] font-bold">
          Why every puzzle has exactly one answer
        </h2>
        <div className="prose-press mt-4">
          <p>
            A grid with two valid solutions forces you to guess at some point, which defeats the
            point of a logic puzzle. Plenty of free generators skip the uniqueness check because it
            costs the most computing time. This one runs it on each puzzle.
          </p>
          <p>
            The generator starts each puzzle from a complete, valid 9×9 grid built by randomised
            backtracking. It then removes clues one at a time in random order. After each removal a
            bitmask solver counts the solutions of the remaining grid, stopping as soon as it finds
            a second one. If it finds one, the generator puts the clue straight back, so it keeps
            only removals that leave a unique solution.
          </p>
          <p>
            Fewer clues mean far more solver passes, so an expert batch takes a moment longer than
            an easy one. In return, the clue count printed under each grid is a measurement of that
            puzzle you can check.
          </p>
        </div>
      </section>

      <section aria-labelledby="levels-heading" className="mt-16">
        <h2 id="levels-heading" className="m-0 font-display text-[24px] font-bold">
          Printable sudoku by difficulty
        </h2>
        <p className="mb-6 mt-3 max-w-prose text-[15.5px] leading-relaxed text-ink-soft">
          Each level has its own page with the generator already set, so you can go
          straight to the puzzles you want.
        </p>
        <DifficultyCards locale={locale} />

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <Link
          href={localizedPath(locale, '/printable-sudoku-with-answers')}
          className="press-card group block p-5 no-underline transition-colors hover:border-stamp/60"
        >
          <span className="font-display text-[17px] font-bold text-ink group-hover:text-stamp">
            Printable sudoku with answers
          </span>
          <span className="mt-2 block text-[14px] leading-relaxed text-ink-soft">
            Puzzles and a full answer key in one PDF, with the answers on their own
            pages at the back.
          </span>
        </Link>
        <Link
          href={localizedPath(locale, '/printable-sudoku-4-per-page')}
          className="press-card group block p-5 no-underline transition-colors hover:border-stamp/60"
        >
          <span className="font-display text-[17px] font-bold text-ink group-hover:text-stamp">
            4 per page sudoku printable
          </span>
          <span className="mt-2 block text-[14px] leading-relaxed text-ink-soft">
            Four grids to a sheet, the paper-saving layout for travel packs and
            classroom sets.
          </span>
        </Link>
        </div>
      </section>
    </>
  );
}

const NEW_TO_SUDOKU: Record<Locale, { heading: string; pre: string; link1: string; mid: string; link2: string; post: string }> = {
  en: {
    heading: 'New to sudoku?',
    pre: 'If you have a printed sheet in front of you and no idea where to start, read ',
    link1: 'how to solve sudoku',
    mid: ' first. It covers the one rule of sudoku and the habits that get you through an easy grid. Once easy puzzles feel too simple, ',
    link2: 'the solving techniques guide',
    post: ' continues from there.',
  },
  de: {
    heading: 'Neu bei Sudoku?',
    pre: 'Wenn du ein gedrucktes Blatt vor dir hast und nicht weißt, wo du anfangen sollst, lies zuerst ',
    link1: 'Sudoku lösen für Einsteiger',
    mid: '. Die Anleitung erklärt die eine Regel des Sudoku und die Gewohnheiten, mit denen du ein einfaches Raster durcharbeitest. Sobald dir einfache Rätsel zu leicht werden, knüpft ',
    link2: 'die Anleitung zu Lösungstechniken',
    post: ' daran an.',
  },
  fr: {
    heading: 'Nouveau dans le sudoku ?',
    pre: 'Si vous avez une feuille imprimée devant vous et aucune idée par où commencer, lisez d’abord ',
    link1: 'comment résoudre un sudoku',
    mid: '. Ce guide couvre l’unique règle du sudoku et les habitudes qui vous mènent au bout d’une grille facile. Quand les grilles faciles vous paraissent trop simples, ',
    link2: 'le guide des techniques de résolution',
    post: ' prend le relais.',
  },
  es: {
    heading: '¿Nuevo en el sudoku?',
    pre: 'Si tienes una hoja impresa delante y no sabes por dónde empezar, lee primero ',
    link1: 'cómo resolver un sudoku',
    mid: '. Cubre la única regla del sudoku y los hábitos que te llevan a completar una cuadrícula fácil. Cuando los sudokus fáciles se te queden cortos, ',
    link2: 'la guía de técnicas de resolución',
    post: ' continúa desde ahí.',
  },
};

export function HomePage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const t = META[locale];
  const faqs = SITE_FAQS[locale];
  const n = NEW_TO_SUDOKU[locale];
  const L = (p: string) => localizedPath(locale, p);

  return (
    <>
      <JsonLd
        data={[
          webSiteSchema(locale, t.description),
          webApplicationSchema({
            name: 'Printable Sudoku: puzzle PDF generator',
            description: t.appDescription,
            path: '/',
            locale,
            featureList: t.featureList,
          }),
          faqPageSchema(faqs.home),
        ]}
      />

      <Shell className="py-10 shelf:py-14">
        <PageHero h1={t.h1} lede={t.lede} />

        <div className="mt-10">
          <Generator
            sample={SAMPLE_PUZZLES.medium}
            locale={locale}
            heading={dict.generator.headingDefault}
            subheading={dict.generator.subheadingDefault}
          />
        </div>

        <ProseSections locale={locale} />

        <Faq
          items={faqs.home}
          heading={
            locale === 'de'
              ? 'Fragen, die vor dem Drucken gestellt werden'
              : locale === 'fr'
                ? 'Questions posées avant d’imprimer'
                : locale === 'es'
                  ? 'Preguntas antes de imprimir'
                  : 'Questions people ask before they print'
          }
        />

        <section aria-labelledby="guides-heading" className="mt-16 max-w-prose">
          <h2 id="guides-heading" className="m-0 font-display text-[24px] font-bold">
            {n.heading}
          </h2>
          <p className="mt-3 text-[15.5px] leading-relaxed text-ink-soft">
            {n.pre}
            <Link href={L('/guides/how-to-solve-sudoku')} className="font-medium text-stamp underline underline-offset-2">
              {n.link1}
            </Link>
            {n.mid}
            <Link href={L('/guides/sudoku-solving-techniques')} className="font-medium text-stamp underline underline-offset-2">
              {n.link2}
            </Link>
            {n.post}
          </p>
        </section>
      </Shell>
    </>
  );
}
