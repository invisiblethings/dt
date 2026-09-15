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
    title: 'Free Printable Sudoku — Download Puzzle PDFs',
    description:
      'Make your own free printable sudoku. Pick a difficulty, choose 1 to 6 puzzles per page in A4 or US Letter, and download a print-ready PDF with answers.',
    h1: 'Free printable sudoku puzzles, ready to download as a PDF',
    lede: 'Set the difficulty, choose how many puzzles go on a page, and pull a print-ready sheet. No account, no watermark, no cost — and every grid is checked for a single solution before it reaches your printer.',
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
    title: 'Kostenloses Sudoku zum Ausdrucken — PDF-Rätsel herunterladen',
    description:
      'Erstelle dein eigenes kostenloses Sudoku zum Ausdrucken. Wähle einen Schwierigkeitsgrad, 1 bis 6 Rätsel pro Seite in A4 oder US Letter, und lade ein druckfertiges PDF mit Lösungen herunter.',
    h1: 'Kostenlose Sudoku-Rätsel zum Ausdrucken — als PDF herunterladen',
    lede: 'Wähle die Schwierigkeit, entscheide, wie viele Rätsel auf eine Seite sollen, und zieh ein druckfertiges Blatt. Kein Konto, kein Wasserzeichen, keine Kosten — und jedes Raster wird auf eine eindeutige Lösung geprüft, bevor es zu deinem Drucker kommt.',
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
    title: 'Sudoku Gratuit à Imprimer — Téléchargez des Grilles en PDF',
    description:
      'Composez votre propre sudoku gratuit à imprimer. Choisissez une difficulté, 1 à 6 grilles par page en A4 ou US Letter, et téléchargez un PDF prêt à imprimer avec les solutions.',
    h1: 'Sudoku gratuit à imprimer, prêt à télécharger en PDF',
    lede: 'Réglez la difficulté, choisissez combien de grilles tiennent sur une page, et tirez une feuille prête à imprimer. Sans compte, sans filigrane, sans frais — et chaque grille est vérifiée pour n’avoir qu’une seule solution avant d’arriver sur votre imprimante.',
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
    title: 'Sudoku Gratis para Imprimir — Descarga PDF de Sudokus',
    description:
      'Crea tu propio sudoku gratis para imprimir. Elige una dificultad, de 1 a 6 sudokus por página en A4 o US Letter, y descarga un PDF listo para imprimir con soluciones.',
    h1: 'Sudoku gratis para imprimir, listo para descargar en PDF',
    lede: 'Elige la dificultad, decide cuántos sudokus caben en una página, y saca una hoja lista para imprimir. Sin cuenta, sin marca de agua, sin coste — y cada cuadrícula se comprueba para tener una única solución antes de llegar a tu impresora.',
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
      body: 'Press Generate. Puzzles are built one at a time on a background thread, each one checked by a solver for a single solution before it is accepted. The preview sheet shows them as they come off the press.',
    },
    {
      n: '03',
      title: 'Print it',
      body: 'Download the PDF and print it. Margins are set well inside the printable area, the 3×3 boxes are drawn with heavy rules so the grid reads clearly, and every page is numbered.',
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
      body: 'Klicke auf Erstellen. Rätsel werden nacheinander in einem Hintergrund-Thread gebaut, jedes von einem Lösungsalgorithmus auf eine eindeutige Lösung geprüft, bevor es übernommen wird. Das Vorschaublatt zeigt sie, sobald sie fertig sind.',
    },
    {
      n: '03',
      title: 'Drucken',
      body: 'Lade das PDF herunter und drucke es. Die Ränder liegen deutlich innerhalb des bedruckbaren Bereichs, die 3×3-Blöcke sind mit kräftigen Linien gezeichnet, damit das Raster klar lesbar bleibt, und jede Seite ist nummeriert.',
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
      body: 'Cliquez sur Générer. Les grilles sont composées une par une sur un fil d’arrière-plan, chacune vérifiée par un solveur pour n’avoir qu’une seule solution avant d’être acceptée. La feuille d’aperçu les affiche à mesure qu’elles sortent.',
    },
    {
      n: '03',
      title: 'Imprimer',
      body: 'Téléchargez le PDF et imprimez-le. Les marges sont bien à l’intérieur de la zone imprimable, les blocs 3×3 sont tracés avec des traits épais pour que la grille se lise clairement, et chaque page est numérotée.',
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
      body: 'Pulsa Generar. Los sudokus se construyen uno a uno en un hilo en segundo plano, cada uno comprobado por un solucionador para tener una única solución antes de aceptarlo. La hoja de vista previa los muestra a medida que van saliendo.',
    },
    {
      n: '03',
      title: 'Imprimir',
      body: 'Descarga el PDF e imprímelo. Los márgenes quedan bien dentro del área imprimible, las regiones 3×3 se dibujan con líneas gruesas para que la cuadrícula se lea con claridad, y cada página está numerada.',
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
            Ein Sudoku-Ausdruck, den du wirklich selbst bestimmst
          </h2>
          <div className="prose-press mt-4">
            <p>
              Die meisten kostenlosen Sudokus zum Ausdrucken sind ein einmal erstelltes, festes PDF:
              vierzig Rätsel, ein Layout, welche Schwierigkeit der Ersteller an dem Tag gerade wollte.
              Dieses hier baut das Blatt dann, wenn du danach fragst. Willst du elf schwere Rätsel, vier
              pro Seite, auf US Letter, mit den Lösungen hinten dran, kommt genau das heraus — und
              willst du fünf Minuten später elf andere, klickst du einfach erneut.
            </p>
            <p>
              Die Rätsel werden jedes Mal frisch erzeugt statt aus einer Bibliothek gezogen, sodass du
              nicht zweimal dasselbe Raster druckst oder auf das Rätsel triffst, das schon jemand anderes
              im Raum in der Hand hält. Alles passiert in deinem Browser: der Generator, der prüfende
              Lösungsalgorithmus und das PDF selbst. Nichts wird hochgeladen, nichts wird gespeichert, und
              kein Konto steht zwischen dir und dem Download.
            </p>
            <p>
              Was du bekommst, ist eine saubere gedruckte Seite. Kräftige Linien an den 3×3-Blockgrenzen,
              damit das Raster auf einen Blick lesbar ist, der Rätselcode, die Schwierigkeit und die
              Anzahl der Hinweise unter jedem Raster, Seitenzahlen im Fuß, und ein Lösungsschlüssel in
              derselben Reihenfolge wie die Rätsel, wenn du einen willst.
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
              Ein Sudoku mit zwei gültigen Lösungen ist kein Sudoku — es ist ein Raster, bei dem man
              irgendwann raten muss, und Raten ist nicht Lösen. Viele kostenlose Generatoren lassen
              diese Prüfung weg, weil sie der aufwendige Teil ist. Dieser hier nicht.
            </p>
            <p>
              Jedes Rätsel beginnt als vollständiges, gültiges 9×9-Raster, erzeugt durch randomisiertes
              Backtracking. Danach werden nacheinander in zufälliger Reihenfolge Hinweise entfernt, und
              nach jeder Entfernung durchsucht ein Lösungsalgorithmus mit Bitmasken das verbleibende
              Raster und zählt die Lösungen, bis er eine zweite findet. Gibt es eine zweite Lösung, kommt
              der Hinweis sofort zurück. Nur Entfernungen, die das Rätsel eindeutig lösbar lassen, bleiben
              bestehen.
            </p>
            <p>
              Deshalb dauert eine Experten-Auflage etwas länger als eine einfache: weniger Hinweise
              bedeuten deutlich mehr Durchläufe des Lösungsalgorithmus. Es bedeutet auch, dass die unter
              jedem Raster gedruckte Anzahl der Hinweise eine echte Messung dieses konkreten Rätsels ist,
              kein nach Gefühl vergebenes Schwierigkeits-Etikett.
            </p>
          </div>
        </section>

        <section aria-labelledby="levels-heading" className="mt-16">
          <h2 id="levels-heading" className="m-0 font-display text-[24px] font-bold">
            Sudoku zum Ausdrucken nach Schwierigkeit
          </h2>
          <p className="mb-6 mt-3 max-w-prose text-[15.5px] leading-relaxed text-ink-soft">
            Jede Stufe hat ihre eigene Seite mit bereits eingestelltem Generator, sodass du direkt zu den
            Rätseln kommst, die du willst.
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
                Rätsel und ein vollständiger Lösungsschlüssel in einem PDF, mit den Lösungen auf eigenen
                Seiten am Ende.
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
                Vier Raster pro Blatt — das papiersparende Layout für Reisesets und Klassensätze.
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
            Un sudoku à imprimer que vous contrôlez vraiment
          </h2>
          <div className="prose-press mt-4">
            <p>
              La plupart des sudokus gratuits à imprimer sont un PDF figé, composé une fois pour toutes :
              quarante grilles, une seule mise en page, la difficulté que son auteur avait envie de fixer
              ce jour-là. Celui-ci compose la feuille au moment où vous la demandez. Vous voulez onze
              grilles difficiles, quatre par page, en US Letter, avec les solutions à la fin ? C’est
              exactement ce que vous obtenez — et si vous voulez onze autres grilles cinq minutes plus
              tard, il suffit de cliquer à nouveau.
            </p>
            <p>
              Les grilles sont générées à neuf à chaque fois plutôt que puisées dans une bibliothèque, si
              bien que vous n’imprimerez jamais deux fois la même grille et ne tomberez pas sur celle que
              quelqu’un d’autre tient déjà dans la pièce. Tout se passe dans votre navigateur : le
              générateur, le solveur qui vérifie chaque grille, et le PDF lui-même. Rien n’est envoyé,
              rien n’est stocké, et aucun compte ne se met entre vous et le téléchargement.
            </p>
            <p>
              Ce que vous obtenez, c’est une page imprimée nette. Des traits épais sur les bordures des
              blocs 3×3 pour que la grille se lise d’un coup d’œil, le code de la grille, sa difficulté
              et son nombre d’indices imprimés sous chaque plateau, des numéros de page en pied de page,
              et un corrigé mis en page dans le même ordre que les grilles quand vous en voulez un.
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
              Un sudoku à deux solutions valides n’est pas un sudoku — c’est une grille où, à un moment
              donné, il faut deviner, et deviner n’est pas résoudre. Beaucoup de générateurs gratuits
              sautent cette vérification parce que c’est la partie coûteuse. Pas celui-ci.
            </p>
            <p>
              Chaque grille naît sous la forme d’un plateau 9×9 complet et valide, construit par retour
              arrière aléatoire. Les indices sont ensuite retirés un par un dans un ordre aléatoire, et
              après chaque retrait, un solveur à masques de bits parcourt la grille restante et compte
              les solutions, s’arrêtant dès qu’il en trouve une deuxième. S’il y en a une deuxième,
              l’indice revient immédiatement. Seuls les retraits qui laissent la grille résoluble de
              façon unique sont conservés.
            </p>
            <p>
              C’est pourquoi un lot de grilles expert prend un peu plus de temps qu’un lot de grilles
              faciles : moins d’indices signifie bien plus de passages du solveur. Cela signifie aussi que
              le nombre d’indices imprimé sous chaque grille est une mesure réelle de cette grille
              précise, et non une étiquette de difficulté fixée au feeling.
            </p>
          </div>
        </section>

        <section aria-labelledby="levels-heading" className="mt-16">
          <h2 id="levels-heading" className="m-0 font-display text-[24px] font-bold">
            Sudoku à imprimer par difficulté
          </h2>
          <p className="mb-6 mt-3 max-w-prose text-[15.5px] leading-relaxed text-ink-soft">
            Chaque niveau a sa propre page, avec le générateur déjà réglé, pour aller droit aux grilles
            que vous voulez.
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
                Grilles et corrigé complet dans un seul PDF, les solutions étant conservées sur leurs
                propres pages à la fin.
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
                Quatre grilles par feuille — la mise en page qui économise le papier, pour les lots de
                voyage et les classes.
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
            Un sudoku para imprimir que de verdad controlas tú
          </h2>
          <div className="prose-press mt-4">
            <p>
              La mayoría del sudoku gratis para imprimir es un PDF fijo hecho una sola vez: cuarenta
              sudokus, un solo diseño, la dificultad que a su autor le apeteciera ese día. Este los
              construye en el momento en que se los pides. Si quieres once sudokus difíciles, cuatro por
              página, en US Letter, con las soluciones al final, eso es justo lo que obtienes — y si
              quieres otros once cinco minutos después, solo tienes que volver a pulsar el botón.
            </p>
            <p>
              Los sudokus se generan desde cero cada vez, en lugar de sacarse de una biblioteca, así que
              no vas a imprimir la misma cuadrícula dos veces ni te vas a encontrar con el mismo sudoku
              que ya tiene otra persona en la sala. Todo ocurre en tu navegador: el generador, el
              solucionador que verifica cada sudoku, y el propio PDF. No se sube nada, no se guarda nada,
              y ninguna cuenta se interpone entre tú y la descarga.
            </p>
            <p>
              Lo que obtienes es una página impresa limpia. Líneas gruesas en los bordes de las regiones
              3×3 para que la cuadrícula se lea de un vistazo, el código del sudoku, su dificultad y su
              número de pistas impresos bajo cada cuadrícula, números de página en el pie, y soluciones
              maquetadas en el mismo orden que los sudokus cuando las quieras.
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
              Un sudoku con dos soluciones válidas no es un sudoku — es una cuadrícula en la que, en algún
              momento, hay que adivinar, y adivinar no es resolver. Muchos generadores gratuitos se saltan
              esta comprobación porque es la parte costosa. Este no.
            </p>
            <p>
              Cada sudoku nace como una cuadrícula 9×9 completa y válida, construida por backtracking
              aleatorio. Después se retiran las pistas una a una en orden aleatorio, y tras cada retirada
              un solucionador con máscaras de bits recorre la cuadrícula restante y cuenta las soluciones,
              deteniéndose en cuanto encuentra una segunda. Si hay una segunda solución, la pista vuelve
              a su sitio de inmediato. Solo se conservan las retiradas que dejan el sudoku con una única
              solución.
            </p>
            <p>
              Por eso una tanda de sudokus expertos tarda algo más que una fácil: menos pistas significan
              muchas más pasadas del solucionador. También significa que el número de pistas impreso bajo
              cada cuadrícula es una medida real de ese sudoku en concreto, no una etiqueta de dificultad
              puesta a ojo.
            </p>
          </div>
        </section>

        <section aria-labelledby="levels-heading" className="mt-16">
          <h2 id="levels-heading" className="m-0 font-display text-[24px] font-bold">
            Sudoku para imprimir por dificultad
          </h2>
          <p className="mb-6 mt-3 max-w-prose text-[15.5px] leading-relaxed text-ink-soft">
            Cada nivel tiene su propia página con el generador ya configurado, así que puedes ir
            directamente a los sudokus que quieres.
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
                Sudokus y las soluciones completas en un solo PDF, con las soluciones guardadas en sus
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
                Cuatro cuadrículas por hoja — el diseño que ahorra papel, ideal para paquetes de viaje y
                clases.
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
          A sudoku printable you actually control
        </h2>
        <div className="prose-press mt-4">
          <p>
            Most free printable sudoku is a fixed PDF someone made once: forty puzzles, one
            layout, whatever difficulty they felt like that day. This one builds the sheet when
            you ask for it. If you want eleven hard puzzles, four to a page, on US Letter, with
            the answers at the back, that is what comes out — and if you want a different eleven
            five minutes later, press the button again.
          </p>
          <p>
            The puzzles are generated fresh each time rather than pulled from a library, so you
            are not going to print the same grid twice or find the same puzzle someone else in
            the room is holding. All of it happens in your browser: the generator, the solver
            that verifies each puzzle, and the PDF itself. Nothing is uploaded, nothing is
            stored, and no account stands between you and the download.
          </p>
          <p>
            What you get is a clean printed page. Heavy rules on the 3×3 box borders so the grid
            reads at a glance, the puzzle code, difficulty and clue count printed under every grid,
            page numbers in the footer, and an answer key laid out in the same order as the
            puzzles when you want one.
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
            A sudoku with two valid solutions is not a sudoku — it is a grid where at some point
            you have to pick, and picking is not solving. Plenty of free generators skip this
            check because it is the expensive part. This one does not.
          </p>
          <p>
            Each puzzle starts life as a complete, valid 9×9 grid built by randomised
            backtracking. Clues are then removed one at a time in random order, and after every
            removal a bitmask solver runs over the remaining grid and counts solutions, stopping
            as soon as it finds a second one. If there is a second solution, the clue goes
            straight back in. Only removals that leave the puzzle uniquely solvable are kept.
          </p>
          <p>
            That is why an expert batch takes a moment longer than an easy one: fewer clues means
            far more solver passes. It also means the clue count printed under each grid is a
            real measurement of that specific puzzle, not a difficulty label someone assigned by
            feel.
          </p>
        </div>
      </section>

      <section aria-labelledby="levels-heading" className="mt-16">
        <h2 id="levels-heading" className="m-0 font-display text-[24px] font-bold">
          Printable sudoku by difficulty
        </h2>
        <p className="mb-6 mt-3 max-w-prose text-[15.5px] leading-relaxed text-ink-soft">
          Each level has its own page with the generator already set, so you can go straight to
          the puzzles you want.
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
              Puzzles and a full solution key in one PDF, with the answers kept on their own
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
              Four grids to a sheet — the paper-saving layout for travel packs and classroom
              sets.
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
    mid: ' first — it covers the one rule, the first move and the habits that get you through an easy grid. When easy puzzles stop being a challenge, ',
    link2: 'the solving techniques guide',
    post: ' picks up where it leaves off.',
  },
  de: {
    heading: 'Neu bei Sudoku?',
    pre: 'Wenn du ein gedrucktes Blatt vor dir hast und nicht weißt, wo du anfangen sollst, lies zuerst ',
    link1: 'Sudoku lösen für Einsteiger',
    mid: ' — die Anleitung erklärt die eine Regel, den ersten Zug und die Gewohnheiten, mit denen du ein einfaches Raster durcharbeitest. Wenn einfache Rätsel keine Herausforderung mehr sind, knüpft ',
    link2: 'die Anleitung zu Lösungstechniken',
    post: ' dort an, wo diese aufhört.',
  },
  fr: {
    heading: 'Nouveau dans le sudoku ?',
    pre: 'Si vous avez une feuille imprimée devant vous et aucune idée par où commencer, lisez d’abord ',
    link1: 'comment résoudre un sudoku',
    mid: ' — ce guide couvre la règle unique, le premier coup et les habitudes qui vous font traverser une grille facile. Quand les grilles faciles cessent d’être un défi, ',
    link2: 'le guide des techniques de résolution',
    post: ' prend le relais.',
  },
  es: {
    heading: '¿Nuevo en el sudoku?',
    pre: 'Si tienes una hoja impresa delante y no sabes por dónde empezar, lee primero ',
    link1: 'cómo resolver un sudoku',
    mid: ' — cubre la única regla, el primer movimiento y los hábitos que te llevan a completar una cuadrícula fácil. Cuando los sudokus fáciles dejen de ser un reto, ',
    link2: 'la guía de técnicas de resolución',
    post: ' continúa justo donde lo deja.',
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
            name: 'Printable Sudoku — puzzle PDF generator',
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
