import Link from 'next/link';
import { Generator } from '@/components/generator';
import { Faq } from '@/components/faq';
import { JsonLd } from '@/components/json-ld';
import { Shell } from '@/components/shell';
import { PageHero } from '@/components/page-hero';
import { PreviewSheet } from '@/components/preview-sheet';
import { DifficultyCards } from '@/components/difficulty-cards';
import { SAMPLE_PUZZLES } from '@/lib/samples';
import { SITE_FAQS } from '@/content/faqs';
import { localizedPath, type Locale } from '@/i18n/config';
import { faqPageSchema, pageMetadata, webApplicationSchema } from '@/lib/seo';

const META: Record<
  Locale,
  { title: string; description: string; eyebrow: string; h1: string; lede: string; genHeading: string; genSubheading: string; appDescription: string; faqHeading: string; answerKeyStatus: string; solutionCaption: (code: string) => string; solutionAriaLabel: string }
> = {
  en: {
    title: 'Printable Sudoku With Answers — Free PDF and Key',
    description:
      'Print sudoku puzzles with the solutions included. The answer key sits on its own pages at the back of the PDF, matched to each puzzle by ID. Free, no sign-up.',
    eyebrow: 'answer key switched on',
    h1: 'Printable sudoku with answers — puzzles and full solutions in one PDF',
    lede: 'Every run can carry its own answer key: the puzzles first, then a matching solution section at the back, each grid labelled with the same ID as the puzzle it solves.',
    genHeading: 'Set a run with answers',
    genSubheading: 'answers are switched on here — untick any time',
    appDescription: 'Generate printable sudoku puzzles with a matching answer key and download both as a single PDF.',
    faqHeading: 'Sudoku with answers — questions',
    answerKeyStatus: 'answer key',
    solutionCaption: (code) => `solution to #${code}`,
    solutionAriaLabel: 'The completed solution grid for the sample medium sudoku puzzle',
  },
  de: {
    title: 'Sudoku zum Ausdrucken mit Lösungen — Kostenloses PDF mit Schlüssel',
    description:
      'Drucke Sudoku-Rätsel mit eingeschlossenen Lösungen. Der Lösungsschlüssel steht auf eigenen Seiten am Ende des PDFs, jedem Rätsel per Code zugeordnet. Kostenlos, keine Anmeldung.',
    eyebrow: 'Lösungsschlüssel eingeschaltet',
    h1: 'Sudoku zum Ausdrucken mit Lösungen — Rätsel und vollständige Lösungen in einem PDF',
    lede: 'Jede Auflage kann ihren eigenen Lösungsschlüssel tragen: zuerst die Rätsel, dann ein passender Lösungsabschnitt am Ende, jedes Raster mit demselben Code beschriftet wie das Rätsel, das es löst.',
    genHeading: 'Auflage mit Lösungen festlegen',
    genSubheading: 'Lösungen sind hier eingeschaltet — jederzeit abwählbar',
    appDescription: 'Erstellt Sudoku-Rätsel zum Ausdrucken mit passendem Lösungsschlüssel und lädt beides als ein PDF herunter.',
    faqHeading: 'Sudoku mit Lösungen — Fragen',
    answerKeyStatus: 'Lösungsschlüssel',
    solutionCaption: (code) => `Lösung zu #${code}`,
    solutionAriaLabel: 'Das vollständige Lösungsraster für das mittelschwere Beispiel-Sudoku',
  },
  fr: {
    title: 'Sudoku à Imprimer avec Solutions — PDF Gratuit avec Corrigé',
    description:
      'Imprimez des grilles de sudoku avec les solutions incluses. Le corrigé se trouve sur ses propres pages à la fin du PDF, associé à chaque grille par son code. Gratuit, sans inscription.',
    eyebrow: 'corrigé activé',
    h1: 'Sudoku à imprimer avec solutions — grilles et corrigé complet dans un seul PDF',
    lede: 'Chaque tirage peut porter son propre corrigé : les grilles d’abord, puis une section de solutions correspondantes à la fin, chaque grille étiquetée du même code que la grille qu’elle résout.',
    genHeading: 'Composer un tirage avec solutions',
    genSubheading: 'les solutions sont activées ici — décochables à tout moment',
    appDescription: 'Génère des grilles de sudoku à imprimer avec un corrigé correspondant et télécharge les deux en un seul PDF.',
    faqHeading: 'Sudoku avec solutions — questions',
    answerKeyStatus: 'corrigé',
    solutionCaption: (code) => `solution de #${code}`,
    solutionAriaLabel: 'La grille de solution complète pour l’exemple de sudoku moyen',
  },
  es: {
    title: 'Sudoku para Imprimir con Soluciones — PDF Gratis con Clave',
    description:
      'Imprime sudokus con las soluciones incluidas. Las soluciones ocupan sus propias páginas al final del PDF, emparejadas con cada sudoku por su código. Gratis, sin registro.',
    eyebrow: 'soluciones activadas',
    h1: 'Sudoku para imprimir con soluciones — sudokus y soluciones completas en un solo PDF',
    lede: 'Cada tirada puede llevar sus propias soluciones: primero los sudokus, luego una sección de soluciones a juego al final, cada cuadrícula etiquetada con el mismo código que el sudoku que resuelve.',
    genHeading: 'Preparar una tirada con soluciones',
    genSubheading: 'las soluciones están activadas aquí — puedes desmarcarlas cuando quieras',
    appDescription: 'Genera sudokus para imprimir con sus soluciones correspondientes y descarga ambos en un solo PDF.',
    faqHeading: 'Sudoku con soluciones — preguntas',
    answerKeyStatus: 'soluciones',
    solutionCaption: (code) => `solución de #${code}`,
    solutionAriaLabel: 'La cuadrícula de solución completa para el sudoku de nivel medio de muestra',
  },
};

export function getWithAnswersMetadata(locale: Locale) {
  const t = META[locale];
  return pageMetadata({ title: t.title, description: t.description, path: '/printable-sudoku-with-answers', locale });
}

function KeyLayoutSection({ locale }: { locale: Locale }) {
  const L = (p: string) => localizedPath(locale, p);

  if (locale === 'de') {
    return (
      <section aria-labelledby="key-heading" className="max-w-prose">
        <h2 id="key-heading" className="m-0 font-display text-[24px] font-bold">
          So ist der Lösungsschlüssel aufgebaut
        </h2>
        <div className="prose-press mt-4">
          <p>
            Die Lösungen teilen sich nie eine Seite mit den Rätseln. Dein PDF durchläuft zuerst die
            Rätselseiten — so viele, wie dein gewähltes Layout braucht — und beginnt dann einen neuen
            Abschnitt mit der Überschrift <em>Lösungen</em>. Das ist wichtig, wenn du Blätter austeilst:
            drucke das Dokument, behalte die hintere Hälfte zurück, und niemand sieht die Lösung zu dem
            Raster, an dem er gerade sitzt.
          </p>
          <p>
            Eine Lösung ihrem Rätsel zuzuordnen, geschieht über den Code. Jedes Rätsel druckt einen
            sechsstelligen Code unter sein Raster, zusammen mit Schwierigkeit und Anzahl der Hinweise.
            Die passende Lösung druckt denselben Code, gefolgt vom Wort „Lösung“. Mische die Seiten,
            verteile sie auf zwei Räume, komm einen Monat später zurück — die Codes passen immer noch
            zusammen. Und geht der Schlüssel ganz verloren, liefert dieser Code trotzdem die Antwort auf
            der <Link href={L('/sudoku-answers')}>Lösungssuche-Seite</Link>.
          </p>
          <p>
            Der Lösungsschlüssel verwendet dasselbe Layout wie die Rätsel. Zwei Rätsel pro Seite bedeuten
            zwei Lösungen pro Seite; sechs bedeuten sechs. Willst du Lösungsraster in einer Größe, die
            sich schnell prüfen lässt, stelle das Layout auf eins oder zwei pro Seite, und der
            Lösungsschlüssel folgt.
          </p>
        </div>
      </section>
    );
  }

  if (locale === 'fr') {
    return (
      <section aria-labelledby="key-heading" className="max-w-prose">
        <h2 id="key-heading" className="m-0 font-display text-[24px] font-bold">
          Comment le corrigé est mis en page
        </h2>
        <div className="prose-press mt-4">
          <p>
            Les solutions ne partagent jamais une page avec les grilles. Votre PDF parcourt d’abord les
            pages de grilles — autant qu’il en faut selon la mise en page choisie — puis démarre une
            nouvelle section intitulée <em>solutions</em>. C’est important si vous distribuez des
            feuilles : imprimez le document, gardez la seconde moitié, et personne ne voit la solution de
            la grille sur laquelle il travaille.
          </p>
          <p>
            Associer une solution à sa grille se fait par le code. Chaque grille imprime un code à six
            caractères sous son plateau, avec sa difficulté et le nombre d’indices de départ. La solution
            correspondante imprime le même code, suivi du mot « solution ». Mélangez les pages,
            répartissez-les entre deux pièces, revenez un mois plus tard — les codes correspondent
            toujours. Et si le corrigé venait à disparaître complètement, ce code retrouve quand même la
            solution sur la <Link href={L('/sudoku-answers')}>page de recherche de solutions</Link>.
          </p>
          <p>
            Le corrigé suit la même mise en page que les grilles. Deux grilles par page donnent deux
            solutions par page ; six en donnent six. Si vous voulez des grilles de solution assez grandes
            pour être vérifiées rapidement, réglez la mise en page sur une ou deux par page, et le corrigé
            suit.
          </p>
        </div>
      </section>
    );
  }

  if (locale === 'es') {
    return (
      <section aria-labelledby="key-heading" className="max-w-prose">
        <h2 id="key-heading" className="m-0 font-display text-[24px] font-bold">
          Cómo están organizadas las soluciones
        </h2>
        <div className="prose-press mt-4">
          <p>
            Las soluciones nunca comparten página con los sudokus. Tu PDF recorre primero las páginas de
            sudokus — las que hagan falta según el diseño elegido — y luego empieza una nueva sección
            titulada <em>soluciones</em>. Esto importa si vas a repartir las hojas: imprime el documento,
            quédate con la segunda mitad, y nadie verá la solución de la cuadrícula en la que está
            trabajando.
          </p>
          <p>
            Emparejar una solución con su sudoku se hace mediante el código. Cada sudoku imprime un
            código de seis caracteres bajo su cuadrícula, junto con su dificultad y el número de pistas
            con las que empezó. La solución correspondiente imprime el mismo código, seguido de la
            palabra «solución». Mezcla las páginas, repártelas entre dos salas, vuelve un mes después —
            los códigos siguen coincidiendo. Y si las soluciones llegan a perderse del todo, ese código
            sigue trayendo la respuesta en la{' '}
            <Link href={L('/sudoku-answers')}>página de búsqueda de soluciones</Link>.
          </p>
          <p>
            Las soluciones usan el mismo diseño que los sudokus. Dos sudokus por página significan dos
            soluciones por página; seis significan seis. Si quieres cuadrículas de solución lo bastante
            grandes para comprobarlas rápido, pon el diseño en uno o dos por página, y las soluciones lo
            seguirán.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section aria-labelledby="key-heading" className="max-w-prose">
      <h2 id="key-heading" className="m-0 font-display text-[24px] font-bold">
        How the answer key is laid out
      </h2>
      <div className="prose-press mt-4">
        <p>
          The solutions never share a page with the puzzles. Your PDF runs the puzzle pages
          first — however many that takes at your chosen layout — and then starts a fresh
          section headed <em>answer key</em>. That matters if you are handing sheets out:
          print the document, keep the back half, and nobody is looking at the answer to the
          grid in front of them.
        </p>
        <p>
          Matching a solution to its puzzle is done by code. Each puzzle prints a
          six-character code under its grid, along with its difficulty and how many clues it
          started with. The corresponding solution prints the same code followed by the word
          &ldquo;solution&rdquo;. Shuffle the pages, split them between two rooms, come back
          to them a month later — the codes still line up. And if the key goes missing
          altogether, that code still fetches the answer on the{' '}
          <Link href={L('/sudoku-answers')}>answer lookup page</Link>.
        </p>
        <p>
          The key uses the same layout as the puzzles. Two puzzles per page means two
          solutions per page; six means six. So if you want solution grids large enough to
          check quickly, set the layout to one or two per page and the key follows.
        </p>
      </div>
    </section>
  );
}

function TrustSection({ locale }: { locale: Locale }) {
  if (locale === 'de') {
    return (
      <section aria-labelledby="trust-heading" className="mt-16 max-w-prose">
        <h2 id="trust-heading" className="m-0 font-display text-[24px] font-bold">
          Warum die gedruckte Antwort die richtige ist
        </h2>
        <div className="prose-press mt-4">
          <p>
            Die Lösung wird nicht im Nachhinein aus dem Rätsel zurückgerechnet. Es ist umgekehrt: Der
            Generator baut zuerst ein vollständiges, gültiges Raster, und das Rätsel ist das, was
            übrig bleibt, nachdem Hinweise daraus entfernt wurden. Der gedruckte Lösungsschlüssel ist
            genau dieses ursprüngliche Raster.
          </p>
          <p>
            Dass es keine zweite gültige Antwort gibt, liegt an der Entfernungsregel. Nach jeder
            Entfernung eines Hinweises zählt ein Lösungsalgorithmus, wie viele Lösungen das
            verbleibende Raster hat, und hält bei zwei an. Findet er zwei, kommt der Hinweis zurück.
            Also lässt sich das gedruckte Rätsel nur auf eine Weise vervollständigen, und das ist der
            Lösungsschlüssel am Ende deines PDFs.
          </p>
        </div>
      </section>
    );
  }
  if (locale === 'fr') {
    return (
      <section aria-labelledby="trust-heading" className="mt-16 max-w-prose">
        <h2 id="trust-heading" className="m-0 font-display text-[24px] font-bold">
          Pourquoi la solution imprimée est la bonne
        </h2>
        <div className="prose-press mt-4">
          <p>
            La solution n’est pas reconstituée après coup à partir de la grille. C’est l’inverse : le
            générateur construit d’abord une grille complète et valide, et la grille de jeu est ce qui
            reste une fois les indices retirés. Le corrigé que vous imprimez, c’est cette grille
            d’origine.
          </p>
          <p>
            S’il n’existe pas de seconde solution valide, c’est grâce à la règle de retrait. Après
            chaque retrait d’indice, un solveur compte le nombre de solutions de la grille restante, en
            s’arrêtant à deux. S’il en trouve deux, l’indice revient. La grille que vous imprimez ne
            peut donc se compléter que d’une seule façon, et c’est le corrigé à la fin de votre PDF.
          </p>
        </div>
      </section>
    );
  }
  if (locale === 'es') {
    return (
      <section aria-labelledby="trust-heading" className="mt-16 max-w-prose">
        <h2 id="trust-heading" className="m-0 font-display text-[24px] font-bold">
          Por qué la respuesta impresa es la correcta
        </h2>
        <div className="prose-press mt-4">
          <p>
            La solución no se calcula a partir del sudoku después de generarlo. Es al revés: el
            generador construye primero una cuadrícula completa y válida, y el sudoku es lo que queda
            tras retirar pistas de ella. Las soluciones que imprimes son esa cuadrícula original.
          </p>
          <p>
            El motivo de que no exista una segunda respuesta válida es la regla de retirada. Tras cada
            retirada de una pista, un solucionador cuenta cuántas soluciones tiene la cuadrícula
            restante, deteniéndose al llegar a dos. Si encuentra dos, la pista vuelve a su sitio. Así
            que el sudoku que imprimes solo se puede completar de una manera, y esa es la clave que
            aparece al final de tu PDF.
          </p>
        </div>
      </section>
    );
  }
  return (
    <section aria-labelledby="trust-heading" className="mt-16 max-w-prose">
      <h2 id="trust-heading" className="m-0 font-display text-[24px] font-bold">
        Why the printed answer is the right one
      </h2>
      <div className="prose-press mt-4">
        <p>
          The solution is not reverse-engineered from the puzzle after the fact. It is the
          other way round: the generator builds a complete, valid grid first, and the puzzle is
          what is left after clues are taken out of it. The answer key you print is that
          original grid.
        </p>
        <p>
          The reason there is no second valid answer is the removal rule. After each clue is
          removed, a solver counts how many solutions the remaining grid has, stopping at two.
          If it finds two, the clue goes back. So the puzzle you print can only be completed
          one way, and that way is the key at the back of your PDF.
        </p>
      </div>
    </section>
  );
}

const LEVELS_SECTION: Record<Locale, { heading: string; intro: string; backPre: string; backLink: string; browseMid: string; browseLink: string; end: string }> = {
  en: {
    heading: 'Pick a difficulty for your answer-key set',
    intro: 'The answer key works the same at every level, but it earns its place most on the hard and expert grids — where a single wrong entry can hide for forty moves.',
    backPre: 'Back to the ',
    backLink: 'free printable sudoku generator',
    browseMid: ' or browse ',
    browseLink: 'all printable sudoku levels',
    end: '.',
  },
  de: {
    heading: 'Wähle eine Schwierigkeit für dein Set mit Lösungsschlüssel',
    intro: 'Der Lösungsschlüssel funktioniert auf jeder Stufe gleich, verdient sich seinen Platz aber am meisten bei schweren und Experten-Rastern — wo eine einzige falsche Eintragung sich vierzig Züge lang verstecken kann.',
    backPre: 'Zurück zum ',
    backLink: 'kostenlosen Sudoku-Generator',
    browseMid: ' oder alle ',
    browseLink: 'Sudoku-Stufen zum Ausdrucken durchsehen',
    end: '.',
  },
  fr: {
    heading: 'Choisissez une difficulté pour votre lot avec corrigé',
    intro: 'Le corrigé fonctionne de la même façon à tous les niveaux, mais il se révèle surtout utile sur les grilles difficiles et expert — où une seule erreur peut rester cachée pendant quarante coups.',
    backPre: 'Retour au ',
    backLink: 'générateur gratuit de sudoku à imprimer',
    browseMid: ' ou parcourez ',
    browseLink: 'tous les niveaux de sudoku à imprimer',
    end: '.',
  },
  es: {
    heading: 'Elige una dificultad para tu set con soluciones',
    intro: 'Las soluciones funcionan igual en todos los niveles, pero se ganan su sitio sobre todo en las cuadrículas difíciles y expertas — donde una sola anotación equivocada puede esconderse durante cuarenta movimientos.',
    backPre: 'Vuelve al ',
    backLink: 'generador gratuito de sudoku para imprimir',
    browseMid: ' o explora ',
    browseLink: 'todos los niveles de sudoku para imprimir',
    end: '.',
  },
};

export function WithAnswersPage({ locale }: { locale: Locale }) {
  const t = META[locale];
  const faqs = SITE_FAQS[locale];
  const lv = LEVELS_SECTION[locale];
  const L = (p: string) => localizedPath(locale, p);

  return (
    <>
      <JsonLd
        data={[
          webApplicationSchema({
            name: 'Printable sudoku with answers — PDF generator',
            description: t.appDescription,
            path: '/printable-sudoku-with-answers',
            locale,
            featureList: [],
          }),
          faqPageSchema(faqs.answers),
        ]}
      />

      <Shell className="py-10 shelf:py-14">
        <PageHero eyebrow={t.eyebrow} h1={t.h1} lede={t.lede} />

        <div className="mt-10">
          <Generator
            sample={SAMPLE_PUZZLES.medium}
            locale={locale}
            defaultIncludeSolutions
            heading={t.genHeading}
            subheading={t.genSubheading}
          />
        </div>

        <div className="mt-20 grid items-start gap-10 shelf:grid-cols-[minmax(0,1fr)_340px]">
          <KeyLayoutSection locale={locale} />

          <div className="flex justify-center pt-2">
            <PreviewSheet
              cells={SAMPLE_PUZZLES.medium.solution}
              code={SAMPLE_PUZZLES.medium.code}
              difficulty="medium"
              clueCount={SAMPLE_PUZZLES.medium.clueCount}
              locale={locale}
              caption={t.solutionCaption(SAMPLE_PUZZLES.medium.code)}
              label={t.solutionAriaLabel}
              status={t.answerKeyStatus}
            />
          </div>
        </div>

        <TrustSection locale={locale} />

        <Faq items={faqs.answers} heading={t.faqHeading} />

        <section aria-labelledby="levels-heading" className="mt-16">
          <h2 id="levels-heading" className="m-0 font-display text-[24px] font-bold">
            {lv.heading}
          </h2>
          <p className="mb-6 mt-3 max-w-prose text-[15.5px] leading-relaxed text-ink-soft">{lv.intro}</p>
          <DifficultyCards locale={locale} />
          <p className="mt-6 text-[15px] text-ink-soft">
            {lv.backPre}
            <Link href={L('/')} className="font-medium text-stamp underline underline-offset-2">
              {lv.backLink}
            </Link>
            {lv.browseMid}
            <Link href={L('/printable-sudoku')} className="font-medium text-stamp underline underline-offset-2">
              {lv.browseLink}
            </Link>
            {lv.end}
          </p>
        </section>
      </Shell>
    </>
  );
}
