import Link from 'next/link';
import { Shell } from '@/components/shell';
import { PageHero } from '@/components/page-hero';
import { localizedPath, type Locale } from '@/i18n/config';
import { pageMetadata } from '@/lib/seo';

const META: Record<Locale, { title: string; description: string; h1: string; lede: string }> = {
  en: {
    title: 'About: Free Printable Sudoku, Made in Your Browser',
    description:
      'This site generates and verifies sudoku puzzles in your browser, with no account and no fee. This page explains the generator and the uniqueness check.',
    h1: 'About Printable Sudoku',
    lede: 'A puzzle generator built the way a small print shop would do it: set the run, pull a proof, print it.',
  },
  de: {
    title: 'Über uns: Kostenloses Sudoku zum Ausdrucken, direkt im Browser',
    description:
      'Diese Website erzeugt und prüft Sudoku-Rätsel in deinem Browser, ohne Konto und ohne Kosten. Diese Seite erklärt den Generator und die Eindeutigkeitsprüfung.',
    h1: 'Über Printable Sudoku',
    lede: 'Ein Rätselgenerator, gebaut wie in einer kleinen Druckerei: die Auflage festlegen, einen Andruck ziehen, drucken.',
  },
  fr: {
    title: 'À propos : sudoku à imprimer gratuit, composé dans votre navigateur',
    description:
      'Ce site génère et vérifie des grilles de sudoku dans votre navigateur, sans compte et sans frais. Cette page explique le générateur et la vérification d’unicité.',
    h1: 'À propos de Printable Sudoku',
    lede: 'Un générateur de grilles conçu comme le ferait un petit atelier d’impression : composer le tirage, tirer une épreuve, imprimer.',
  },
  es: {
    title: 'Acerca de: sudoku gratis para imprimir, hecho en tu navegador',
    description:
      'Este sitio genera y comprueba sudokus en tu navegador, sin cuenta y sin coste. Esta página explica el generador y la comprobación de unicidad.',
    h1: 'Acerca de Printable Sudoku',
    lede: 'Un generador de sudokus construido como lo haría una pequeña imprenta: preparar la tirada, sacar una prueba, imprimir.',
  },
};

export function getAboutMetadata(locale: Locale) {
  const t = META[locale];
  return pageMetadata({ title: t.title, description: t.description, path: '/about', locale });
}

function Body({ locale }: { locale: Locale }) {
  const L = (path: string) => localizedPath(locale, path);

  if (locale === 'de') {
    return (
      <div className="prose-press mt-8 max-w-prose">
        <h2>Was die Website macht</h2>
        <p>
          Diese Website erstellt Sudoku-PDFs zum Ausdrucken nach Maß. Du wählst, wie viele Rätsel,
          wie schwer, wie viele pro Seite und welches Papierformat, und sie baut Rätsel und
          Dokument, während du wartest. Wir haben sie gebaut, weil die meisten kostenlosen Sudokus
          zum Ausdrucken im Netz als festes PDF mit vierzig Rätseln in einem Layout kommen, und das
          ist selten das Blatt, das du willst.
        </p>

        <h2>Wie der Generator Rätsel erzeugt</h2>
        <p>
          Der Generator beginnt jedes Rätsel mit einem vollständigen, gültigen 9×9-Raster, erzeugt
          durch randomisiertes Backtracking. Dann entfernt er nacheinander in zufälliger Reihenfolge
          Hinweise. Nach jeder Entfernung zählt ein Lösungsalgorithmus die Lösungen des Rests und
          hört auf, sobald er eine zweite findet. Findet er zwei, setzt der Generator den Hinweis
          zurück und behält so nur Entfernungen, die eine eindeutige Lösung lassen.
        </p>
        <p>
          Der Lösungsalgorithmus verwaltet Kandidaten als Bitmasken und probiert zuerst das am
          stärksten eingeschränkte Feld, was ihn schnell genug macht, um nach jeder Entfernung zu
          laufen. Diese Prüfung kostet bei der Erzeugung die meiste Zeit, und viele kostenlose
          Generatoren lassen sie weg. Wir führen sie durch, weil ein Raster mit zwei Lösungen dich
          irgendwann zum Raten zwingt.
        </p>
        <p>
          Die Anzahl der Hinweise bestimmt die Schwierigkeit:{' '}
          <Link href={L('/printable-sudoku/easy')}>einfach</Link> 38–45,{' '}
          <Link href={L('/printable-sudoku/medium')}>mittel</Link> 30–37,{' '}
          <Link href={L('/printable-sudoku/hard')}>schwer</Link> 25–29 und{' '}
          <Link href={L('/printable-sudoku/expert')}>experte</Link> 20–24. Das PDF druckt die
          Anzahl jedes Rätsels unter sein Raster, sodass du die Angabe an einer Zahl prüfen
          kannst.
        </p>

        <h2>Alles läuft in deinem Browser</h2>
        <p>
          Kein Server ist an der Erstellung deiner Rätsel beteiligt. Der Generator, der prüfende
          Lösungsalgorithmus und der Code, der das PDF setzt, laufen alle als JavaScript auf
          deinem eigenen Gerät, die Erzeugung in einem Hintergrund-Thread, damit die Seite auch
          bei einer großen Auflage reagiert. Deine Auflage verlässt nie dein Gerät, deshalb ist
          der Download sofort da, und deshalb speichern wir nichts, was du erzeugst. Die{' '}
          <Link href={L('/privacy')}>Datenschutzseite</Link> nennt die Einzelheiten.
        </p>

        <h2>Kosten</h2>
        <p>
          Keine. Du brauchst kein Konto und gibst keine E-Mail-Adresse an, und die Website hat keine
          Testphase, kein Wasserzeichen und keine kostenpflichtige Stufe. Drucke die Rätsel für
          deine Klasse, deine Familie oder deinen Newsletter. Ein Computer erzeugt die Raster, und
          wir beanspruchen kein Eigentum an dem, was du erstellst.
        </p>

        <h2>Was wir als Nächstes planen</h2>
        <p>
          Als Nächstes stehen weitere Rastergrößen, Großdruck-Layouts und Rätselvarianten auf der
          Liste. Stand dir nach ein paar Auflagen etwas an den Blättern im Weg, wollen wir davon
          hören. Wir haben das jetzige Layout festgelegt, indem wir viele Seiten gedruckt und
          angepasst haben, und wir arbeiten weiter so.
        </p>
      </div>
    );
  }

  if (locale === 'fr') {
    return (
      <div className="prose-press mt-8 max-w-prose">
        <h2>Ce que fait le site</h2>
        <p>
          Ce site fabrique des PDF de sudoku à imprimer, sur mesure. Vous choisissez le nombre de
          grilles, leur difficulté, leur nombre par page et le format de papier, et le site
          construit les grilles et le document pendant que vous patientez. Nous l’avons créé parce
          que la plupart des sudokus gratuits à imprimer sur le web se présentent comme un PDF figé
          de quarante grilles dans une seule mise en page, et c’est rarement la feuille que vous
          voulez.
        </p>

        <h2>Comment le générateur fabrique les grilles</h2>
        <p>
          Le générateur part, pour chaque grille, d’un plateau 9×9 complet et valide, produit par
          retour arrière aléatoire (backtracking). Il retire ensuite les indices un par un dans un
          ordre aléatoire. Après chaque retrait, un solveur compte les solutions de ce qui reste et
          s’arrête dès qu’il en trouve une deuxième. S’il en trouve deux, le générateur remet
          l’indice en place et ne garde ainsi que les retraits qui laissent une solution unique.
        </p>
        <p>
          Le solveur gère les candidats sous forme de masques de bits et essaie d’abord la case la
          plus contrainte, ce qui le rend assez rapide pour tourner après chaque retrait. Cette
          vérification coûte le plus de temps pendant la génération, et beaucoup de générateurs
          gratuits la sautent. Nous la faisons, parce qu’une grille à deux solutions vous oblige à
          deviner à un moment donné.
        </p>
        <p>
          Le nombre d’indices fixe la difficulté :{' '}
          <Link href={L('/printable-sudoku/easy')}>facile</Link> 38–45,{' '}
          <Link href={L('/printable-sudoku/medium')}>moyen</Link> 30–37,{' '}
          <Link href={L('/printable-sudoku/hard')}>difficile</Link> 25–29 et{' '}
          <Link href={L('/printable-sudoku/expert')}>expert</Link> 20–24. Le PDF imprime le nombre
          de chaque grille sous son plateau, pour que vous puissiez vérifier l’étiquette sur un
          chiffre.
        </p>

        <h2>Tout se passe dans votre navigateur</h2>
        <p>
          Aucun serveur n’intervient dans la fabrication de vos grilles. Le générateur, le solveur
          qui les vérifie et le code qui met en page le PDF s’exécutent tous en JavaScript sur
          votre propre machine, la génération sur un fil d’arrière-plan pour que la page reste
          réactive lors d’un gros tirage. Votre tirage ne quitte jamais votre machine : c’est
          pourquoi le téléchargement est immédiat et pourquoi nous ne stockons rien de ce que vous
          générez. La page <Link href={L('/privacy')}>confidentialité</Link> donne les détails.
        </p>

        <h2>Ce que ça coûte</h2>
        <p>
          Rien. Vous n’avez besoin d’aucun compte ni d’adresse e-mail, et le site n’a ni essai, ni
          filigrane, ni formule payante. Imprimez les grilles pour votre classe, votre famille ou
          votre bulletin. Un ordinateur génère les grilles, et nous ne revendiquons aucun droit sur
          ce que vous en faites.
        </p>

        <h2>Ce que nous prévoyons</h2>
        <p>
          Prochaines étapes : d’autres tailles de grilles, des mises en page en grands caractères et
          des variantes du jeu. Si quelque chose dans les feuilles vous a gêné après quelques
          tirages, nous voulons le savoir. Nous avons fixé la mise en page actuelle en imprimant
          beaucoup de pages et en ajustant, et nous continuerons ainsi.
        </p>
      </div>
    );
  }

  if (locale === 'es') {
    return (
      <div className="prose-press mt-8 max-w-prose">
        <h2>Qué hace el sitio</h2>
        <p>
          Este sitio hace PDF de sudoku para imprimir, a medida. Eliges cuántos sudokus, con qué
          dificultad, cuántos por página y en qué tamaño de papel, y el sitio construye los sudokus
          y el documento mientras esperas. Lo creamos porque la mayoría del sudoku gratis para
          imprimir en internet llega como un PDF fijo de cuarenta sudokus en un solo diseño, y pocas
          veces es la hoja que quieres.
        </p>

        <h2>Cómo hace los sudokus el generador</h2>
        <p>
          El generador empieza cada sudoku con una cuadrícula 9×9 completa y válida, generada por
          backtracking aleatorio. Luego retira las pistas una a una en orden aleatorio. Tras cada
          retirada, un solucionador cuenta las soluciones de lo que queda y se detiene en cuanto
          encuentra una segunda. Si encuentra dos, el generador vuelve a colocar la pista, y así
          solo conserva las retiradas que dejan una solución única.
        </p>
        <p>
          El solucionador maneja los candidatos como máscaras de bits y prueba primero la casilla
          más restringida, lo que lo hace lo bastante rápido para ejecutarlo tras cada retirada. Esa
          comprobación es lo que más tiempo consume al generar, y muchos generadores gratuitos se la
          saltan. Nosotros la hacemos, porque una cuadrícula con dos soluciones te obliga a adivinar
          en algún momento.
        </p>
        <p>
          El número de pistas fija la dificultad:{' '}
          <Link href={L('/printable-sudoku/easy')}>fácil</Link> 38–45,{' '}
          <Link href={L('/printable-sudoku/medium')}>medio</Link> 30–37,{' '}
          <Link href={L('/printable-sudoku/hard')}>difícil</Link> 25–29 y{' '}
          <Link href={L('/printable-sudoku/expert')}>experto</Link> 20–24. El PDF imprime el
          número de cada sudoku bajo su cuadrícula, así que puedes comprobar la etiqueta con una
          cifra.
        </p>

        <h2>Todo funciona en tu navegador</h2>
        <p>
          Ningún servidor participa en la creación de tus sudokus. El generador, el solucionador
          que los comprueba y el código que maqueta el PDF se ejecutan como JavaScript en tu
          propio equipo, con la generación en un hilo en segundo plano para que la página siga
          respondiendo durante una tirada grande. Tu tirada nunca sale de tu equipo, por eso la
          descarga es instantánea y por eso no guardamos nada de lo que generas. La página de{' '}
          <Link href={L('/privacy')}>privacidad</Link> da los detalles.
        </p>

        <h2>Lo que cuesta</h2>
        <p>
          Nada. No necesitas cuenta ni correo, y el sitio no tiene prueba, marca de agua ni plan de
          pago. Imprime los sudokus para tu clase, tu familia o tu boletín. Un ordenador genera las
          cuadrículas, y no reclamamos ningún derecho sobre lo que hagas con ellas.
        </p>

        <h2>Qué planeamos añadir</h2>
        <p>
          Lo siguiente en la lista son más tamaños de cuadrícula, diseños en letra grande y
          variantes del juego. Si algo de las hojas te ha molestado después de unas cuantas tiradas,
          queremos saberlo. Decidimos el diseño actual imprimiendo muchas páginas y ajustándolo, y
          seguiremos trabajando así.
        </p>
      </div>
    );
  }

  return (
    <div className="prose-press mt-8 max-w-prose">
      <h2>What the site does</h2>
      <p>
        This site makes printable sudoku PDFs to order. You choose how many puzzles, how hard, how
        many to a page and what size paper, and it builds the puzzles and the document while you
        wait. We built it because most free printable sudoku on the web comes as a fixed PDF of
        forty puzzles in one layout, and that is rarely the sheet you want.
      </p>

      <h2>How the generator makes puzzles</h2>
      <p>
        The generator starts each puzzle from a complete, valid 9×9 grid produced by randomised
        backtracking. It then removes clues one at a time in random order. After each removal a
        solver counts the solutions of what is left, stopping as soon as it finds a second one. If
        it finds two, the generator puts the clue back, so it keeps only removals that leave a
        unique solution.
      </p>
      <p>
        The solver tracks candidates as bitmasks and tries the most constrained cell first, which
        makes it fast enough to run after each removal. This check costs the most time during
        generation, and plenty of free generators skip it. We run it because a grid with two answers
        forces you to guess at some point.
      </p>
      <p>
        Clue count sets the difficulty: <Link href={L('/printable-sudoku/easy')}>easy</Link>{' '}
        38–45, <Link href={L('/printable-sudoku/medium')}>medium</Link> 30–37,{' '}
        <Link href={L('/printable-sudoku/hard')}>hard</Link> 25–29 and{' '}
        <Link href={L('/printable-sudoku/expert')}>expert</Link> 20–24. The PDF prints each
        puzzle&rsquo;s count under its grid, so you can check the label against a number.
      </p>

      <h2>Everything runs in your browser</h2>
      <p>
        No server takes part in making your puzzles. The generator, the solver that checks them
        and the code that lays out the PDF all run as JavaScript on your own machine, with
        generation on a background thread so the page stays responsive during a large batch.
        Your run never leaves your machine, which is why the download is instant and why we
        store nothing you generate. The <Link href={L('/privacy')}>privacy page</Link> covers
        the details.
      </p>

      <h2>Cost</h2>
      <p>
        Nothing. You need no account and give no email address, and the site has no trial, watermark
        or paid tier. Print the puzzles for your class, your family or your newsletter. A computer
        generates the grids, and we claim no ownership of what you produce.
      </p>

      <h2>What we plan to add</h2>
      <p>
        Next on the list are more grid sizes, large-print layouts and puzzle variants. If something
        about the sheets got in your way after a few runs, we want to hear about it. We settled the
        current layout by printing many pages and adjusting, and we will keep working that way.
      </p>
    </div>
  );
}

const BACK_LINK: Record<Locale, string> = {
  en: 'Back to the printable sudoku generator',
  de: 'Zurück zum Sudoku-Generator',
  fr: 'Retour au générateur de sudoku à imprimer',
  es: 'Volver al generador de sudoku para imprimir',
};

export function AboutPage({ locale }: { locale: Locale }) {
  const t = META[locale];
  return (
    <Shell className="py-10 shelf:py-14">
      <PageHero h1={t.h1} lede={t.lede} />
      <Body locale={locale} />
      <p className="mt-10 text-[15px] text-ink-soft">
        <Link href={localizedPath(locale, '/')} className="font-medium text-stamp underline underline-offset-2">
          {BACK_LINK[locale]}
        </Link>
      </p>
    </Shell>
  );
}
