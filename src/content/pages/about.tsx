import Link from 'next/link';
import { Shell } from '@/components/shell';
import { PageHero } from '@/components/page-hero';
import { localizedPath, type Locale } from '@/i18n/config';
import { pageMetadata } from '@/lib/seo';

const META: Record<Locale, { title: string; description: string; h1: string; lede: string }> = {
  en: {
    title: 'About — Free Printable Sudoku, Made in Your Browser',
    description:
      'What this site is, how the puzzles are generated and verified, and why the whole thing runs in your browser with no account and no cost.',
    h1: 'About Printable Sudoku',
    lede: 'A puzzle generator built the way a small print shop would do it: set the run, pull a proof, print it.',
  },
  de: {
    title: 'Über uns — Kostenloses Sudoku zum Ausdrucken, direkt im Browser',
    description:
      'Was diese Website ist, wie die Rätsel erzeugt und geprüft werden, und warum das Ganze im Browser läuft, ohne Konto und ohne Kosten.',
    h1: 'Über Printable Sudoku',
    lede: 'Ein Rätselgenerator, gebaut wie in einer kleinen Druckerei: die Auflage festlegen, einen Andruck ziehen, drucken.',
  },
  fr: {
    title: 'À propos — Sudoku à imprimer gratuit, composé dans votre navigateur',
    description:
      'Ce qu’est ce site, comment les grilles sont générées et vérifiées, et pourquoi tout fonctionne dans votre navigateur, sans compte et sans frais.',
    h1: 'À propos de Printable Sudoku',
    lede: 'Un générateur de grilles conçu comme le ferait un petit atelier d’impression : composer le tirage, tirer une épreuve, imprimer.',
  },
  es: {
    title: 'Acerca de — Sudoku gratis para imprimir, hecho en tu navegador',
    description:
      'Qué es este sitio, cómo se generan y verifican los sudokus, y por qué todo funciona en tu navegador sin cuenta y sin coste.',
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
        <h2>Worum es hier geht</h2>
        <p>
          Diese Website erstellt Sudoku-PDFs zum Ausdrucken, nach Maß. Du wählst, wie viele Rätsel, wie
          schwer, wie viele pro Seite und welches Papierformat; sie baut die Rätsel und das Dokument,
          während du wartest. Es gibt sie, weil das meiste kostenlose Sudoku zum Ausdrucken im Netz ein
          fest fertiges PDF ist, das irgendjemand einmal erstellt hat — vierzig Rätsel, ein Layout, friss
          oder stirb — und das ist selten das Blatt, das man eigentlich wollte.
        </p>

        <h2>Wie die Rätsel entstehen</h2>
        <p>
          Jedes Rätsel beginnt als vollständiges, gültiges 9×9-Raster, erzeugt durch randomisiertes
          Backtracking. Danach werden nacheinander in zufälliger Reihenfolge Hinweise entfernt. Nach jeder
          Entfernung durchsucht ein Lösungsalgorithmus das verbleibende Raster und zählt die Lösungen,
          bis er eine zweite findet. Gibt es zwei, wird der Hinweis zurückgesetzt; nur Entfernungen, die
          das Rätsel eindeutig lösbar lassen, bleiben bestehen.
        </p>
        <p>
          Der Lösungsalgorithmus arbeitet mit Bitmasken für die Kandidaten und wählt zuerst das am
          stärksten eingeschränkte Feld — dadurch bleibt er bei jeder einzelnen Entfernung schnell genug
          für die Praxis. Diese Prüfung ist der aufwendige Teil der Erzeugung, und genau den lassen viele
          kostenlose Generatoren weg. Wir nicht, denn ein Sudoku mit zwei Lösungen ist kein Sudoku — es
          ist ein Raster, bei dem man irgendwann raten muss.
        </p>
        <p>
          Die Schwierigkeit wird über die Anzahl der Hinweise definiert:{' '}
          <Link href={L('/printable-sudoku/easy')}>einfach</Link> 38–45,{' '}
          <Link href={L('/printable-sudoku/medium')}>mittel</Link> 30–37,{' '}
          <Link href={L('/printable-sudoku/hard')}>schwer</Link> 25–29 und{' '}
          <Link href={L('/printable-sudoku/expert')}>experte</Link> 20–24. Die Anzahl für jedes einzelne
          Rätsel steht unter dessen Raster, sodass die Angabe durch eine nachprüfbare Zahl belegt ist.
        </p>

        <h2>Alles läuft in deinem Browser</h2>
        <p>
          Kein Server ist an der Erstellung deiner Rätsel beteiligt. Der Generator, der prüfende
          Lösungsalgorithmus und der Code, der das PDF setzt, laufen alle als JavaScript auf deinem
          eigenen Gerät — die Erzeugung in einem Hintergrund-Thread, damit die Seite auch bei einer
          großen Auflage reagibel bleibt. Nichts von deiner Auflage wird hochgeladen, deshalb ist der
          Download sofort da, und deshalb wird nichts, was du erstellst, je irgendwo gespeichert. Die{' '}
          <Link href={L('/privacy')}>Datenschutzseite</Link> erklärt genau, was das bedeutet.
        </p>

        <h2>Was es kostet</h2>
        <p>
          Nichts. Es gibt kein Konto, keine E-Mail-Abfrage, keine Testphase, kein Wasserzeichen und
          keine kostenpflichtige Stufe, die die guten Rätsel zurückhält. Drucke sie für deine Klasse,
          deine Familie, dein Pflegeheim oder deinen Newsletter — die Raster werden maschinell erzeugt,
          und wir erheben keinen Eigentumsanspruch auf das, was du damit machst.
        </p>

        <h2>Was als Nächstes kommt</h2>
        <p>
          Naheliegende Ergänzungen sind weitere Rastergrößen, Großdruck-Layouts und Rätselvarianten.
          Wenn du schon ein paar Sätze gedruckt hast und dir etwas an den Blättern im Weg stand, ist das
          genau die Art von Rückmeldung, die hilft — die Layout-Entscheidungen hier entstanden dadurch,
          dass viele Seiten gedruckt und angepasst wurden, und das wird auch so weitergehen.
        </p>
      </div>
    );
  }

  if (locale === 'fr') {
    return (
      <div className="prose-press mt-8 max-w-prose">
        <h2>Ce que c’est</h2>
        <p>
          Ce site fabrique des PDF de sudoku à imprimer, sur mesure. Vous choisissez le nombre de
          grilles, leur difficulté, leur nombre par page et le format de papier ; le site construit les
          grilles et le document pendant que vous patientez. Il existe parce que la plupart des sudokus
          gratuits à imprimer sur le web sont des PDF figés, composés une fois pour toutes — quarante
          grilles, une seule mise en page, à prendre ou à laisser — et ce n’est rarement la feuille que
          vous vouliez vraiment.
        </p>

        <h2>Comment les grilles sont fabriquées</h2>
        <p>
          Chaque grille part d’un plateau 9×9 complet et valide, produit par retour arrière aléatoire
          (backtracking). Les indices sont ensuite retirés un par un, dans un ordre aléatoire. Après
          chaque retrait, un solveur parcourt ce qu’il reste et compte les solutions, s’arrêtant dès
          qu’il en trouve une deuxième. S’il y en a deux, l’indice est remis en place ; seuls les
          retraits qui laissent la grille résoluble de façon unique sont conservés.
        </p>
        <p>
          Le solveur utilise des ensembles de candidats par masques de bits et choisit d’abord la case
          la plus contrainte, ce qui le rend assez rapide pour être exécuté après chaque retrait. Cette
          vérification est la partie coûteuse de la génération, et c’est justement celle que beaucoup de
          générateurs gratuits sautent. Pas nous, car un sudoku à deux solutions n’est pas un sudoku —
          c’est une grille où, à un moment donné, il faut deviner.
        </p>
        <p>
          La difficulté se définit par le nombre d’indices :{' '}
          <Link href={L('/printable-sudoku/easy')}>facile</Link> 38–45,{' '}
          <Link href={L('/printable-sudoku/medium')}>moyen</Link> 30–37,{' '}
          <Link href={L('/printable-sudoku/hard')}>difficile</Link> 25–29 et{' '}
          <Link href={L('/printable-sudoku/expert')}>expert</Link> 20–24. Le nombre exact de chaque
          grille est imprimé sous son plateau, si bien que l’étiquette repose sur un chiffre que vous
          pouvez vérifier.
        </p>

        <h2>Tout se passe dans votre navigateur</h2>
        <p>
          Aucun serveur n’intervient dans la fabrication de vos grilles. Le générateur, le solveur qui
          les vérifie et le code qui met en page le PDF s’exécutent tous en JavaScript sur votre propre
          machine — la génération sur un fil d’arrière-plan pour que la page reste réactive lors d’un
          gros tirage. Rien de votre tirage n’est envoyé, ce qui explique à la fois la rapidité du
          téléchargement et le fait que rien de ce que vous générez n’est jamais stocké nulle part. La
          page <Link href={L('/privacy')}>confidentialité</Link> précise exactement ce que cela signifie.
        </p>

        <h2>Ce que ça coûte</h2>
        <p>
          Rien. Il n’y a ni compte, ni collecte d’e-mail, ni essai, ni filigrane, ni formule payante qui
          réserverait les meilleures grilles. Imprimez-les pour votre classe, votre famille, votre
          maison de retraite ou votre bulletin — les grilles sont générées par ordinateur et nous ne
          revendiquons aucun droit de propriété sur ce que vous en faites.
        </p>

        <h2>Et ensuite</h2>
        <p>
          Les ajouts les plus évidents sont d’autres tailles de grilles, des mises en page grands
          caractères et des variantes du jeu. Si vous avez déjà imprimé quelques lots et que quelque
          chose dans les feuilles vous a gêné, c’est exactement le genre de retour utile — les choix de
          mise en page ici sont nés d’impressions répétées et d’ajustements, et cela continuera ainsi.
        </p>
      </div>
    );
  }

  if (locale === 'es') {
    return (
      <div className="prose-press mt-8 max-w-prose">
        <h2>Qué es esto</h2>
        <p>
          Este sitio hace PDF de sudoku para imprimir, a medida. Eliges cuántos sudokus, con qué
          dificultad, cuántos por página y en qué tamaño de papel; el sitio construye los sudokus y el
          documento mientras esperas. Existe porque la mayoría del sudoku gratis para imprimir en
          internet es un PDF fijo que alguien hizo una vez — cuarenta sudokus, un solo diseño, lo tomas o
          lo dejas — y pocas veces es la hoja que realmente querías.
        </p>

        <h2>Cómo se hacen los sudokus</h2>
        <p>
          Cada sudoku empieza como una cuadrícula 9×9 completa y válida, generada por backtracking
          aleatorio. Después se retiran las pistas una a una en orden aleatorio. Tras cada retirada, un
          solucionador recorre lo que queda y cuenta las soluciones, deteniéndose en cuanto encuentra una
          segunda. Si hay dos, la pista se vuelve a colocar; solo se conservan las retiradas que dejan el
          sudoku con una única solución posible.
        </p>
        <p>
          El solucionador usa conjuntos de candidatos con máscaras de bits y elige primero la casilla más
          restringida, lo que lo hace lo bastante rápido como para ejecutarlo después de cada retirada.
          Esa comprobación es la parte costosa de la generación, y es justo la que muchos generadores
          gratuitos se saltan. Nosotros no, porque un sudoku con dos soluciones no es un sudoku — es una
          cuadrícula en la que, en algún momento, hay que adivinar.
        </p>
        <p>
          La dificultad se define por el número de pistas:{' '}
          <Link href={L('/printable-sudoku/easy')}>fácil</Link> 38–45,{' '}
          <Link href={L('/printable-sudoku/medium')}>medio</Link> 30–37,{' '}
          <Link href={L('/printable-sudoku/hard')}>difícil</Link> 25–29 y{' '}
          <Link href={L('/printable-sudoku/expert')}>experto</Link> 20–24. El número exacto de cada
          sudoku se imprime bajo su cuadrícula, así que la etiqueta está respaldada por una cifra que
          puedes comprobar.
        </p>

        <h2>Todo funciona en tu navegador</h2>
        <p>
          Ningún servidor participa en la creación de tus sudokus. El generador, el solucionador que los
          verifica y el código que maqueta el PDF se ejecutan como JavaScript en tu propio equipo — la
          generación en un hilo en segundo plano para que la página siga respondiendo durante una tirada
          grande. Nada de tu tirada se sube a ningún sitio, por eso la descarga es instantánea y por eso
          nada de lo que generas se guarda en ningún lugar. La página de{' '}
          <Link href={L('/privacy')}>privacidad</Link> explica exactamente qué significa eso.
        </p>

        <h2>Lo que cuesta</h2>
        <p>
          Nada. No hay cuenta, ni captación de correo, ni prueba, ni marca de agua, ni ningún plan de
          pago que se guarde los mejores sudokus. Imprímelos para tu clase, tu familia, tu residencia o
          tu boletín — las cuadrículas se generan por ordenador y no reclamamos ningún derecho sobre lo
          que hagas con ellas.
        </p>

        <h2>Qué viene después</h2>
        <p>
          Las incorporaciones más obvias son más tamaños de cuadrícula, diseños en letra grande y
          variantes del juego. Si ya has impreso algunos lotes y algo de las hojas se te ha atravesado,
          ese es justo el tipo de comentario que sirve — las decisiones de diseño de aquí nacieron de
          imprimir muchas páginas y ajustarlas, y eso va a seguir siendo así.
        </p>
      </div>
    );
  }

  return (
    <div className="prose-press mt-8 max-w-prose">
      <h2>What this is</h2>
      <p>
        This site makes printable sudoku PDFs to order. You choose how many puzzles, how hard,
        how many to a page and what size paper; it builds the puzzles and the document while you
        wait. It exists because most free printable sudoku on the web is a fixed PDF somebody
        made once — forty puzzles, one layout, take it or leave it — and that is rarely the sheet
        you actually wanted.
      </p>

      <h2>How the puzzles are made</h2>
      <p>
        Each puzzle starts as a complete, valid 9×9 grid produced by randomised backtracking.
        Clues are then removed one at a time in random order. After each removal a solver runs
        over what is left and counts solutions, stopping as soon as it finds a second one. If
        there are two, the clue is put back; only removals that leave the puzzle uniquely
        solvable are kept.
      </p>
      <p>
        The solver uses bitmask candidate sets and picks the most constrained cell first, which
        is what makes running it after every single removal fast enough to be practical. This
        check is the expensive part of generation and it is the part plenty of free generators
        skip. We do not, because a sudoku with two answers is not a sudoku — it is a grid where
        at some point you have to pick.
      </p>
      <p>
        Difficulty is defined by clue count:{' '}
        <Link href={L('/printable-sudoku/easy')}>easy</Link> 38–45,{' '}
        <Link href={L('/printable-sudoku/medium')}>medium</Link> 30–37,{' '}
        <Link href={L('/printable-sudoku/hard')}>hard</Link> 25–29 and{' '}
        <Link href={L('/printable-sudoku/expert')}>expert</Link> 20–24. The count for each individual
        puzzle is printed under its grid, so the label is backed by a number you can check.
      </p>

      <h2>Everything runs in your browser</h2>
      <p>
        There is no server involved in making your puzzles. The generator, the solver that
        verifies them and the code that lays out the PDF all run as JavaScript on your own
        machine — generation on a background thread so the page stays responsive during a large
        batch. Nothing about your run is uploaded, which is why the download is instant and why
        nothing you generate is ever stored anywhere. The{' '}
        <Link href={L('/privacy')}>privacy page</Link> spells out exactly what that means.
      </p>

      <h2>What it costs</h2>
      <p>
        Nothing. There is no account, no email capture, no trial, no watermark and no paid tier
        holding back the good puzzles. Print them for your class, your family, your care home or
        your newsletter — the grids are machine-generated and we make no ownership claim over
        what you produce.
      </p>

      <h2>Where it goes next</h2>
      <p>
        The obvious additions are more grid sizes, large-print layouts and puzzle variants. If
        you have printed a few sets and something about the sheets got in your way, that is the
        useful kind of feedback — the layout decisions here were made by printing a lot of pages
        and adjusting, and they will keep being made that way.
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
