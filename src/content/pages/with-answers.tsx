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
    title: 'Printable Sudoku With Answers: Free PDF and Key',
    description:
      'Print sudoku puzzles with the solutions included. The answer key sits on its own pages at the back of the PDF, matched to each puzzle by ID. Free, no sign-up.',
    eyebrow: 'answer key switched on',
    h1: 'Printable sudoku with answers: puzzles and full solutions in one PDF',
    lede: 'Each run can carry its own answer key: the puzzles first, then a solution section at the back, with each grid labelled with the same ID as the puzzle it solves.',
    genHeading: 'Set a run with answers',
    genSubheading: 'answers are on here; untick the box to leave them out',
    appDescription: 'Generate printable sudoku puzzles with a matching answer key and download both as a single PDF.',
    faqHeading: 'Sudoku with answers: questions',
    answerKeyStatus: 'answer key',
    solutionCaption: (code) => `solution to #${code}`,
    solutionAriaLabel: 'The completed solution grid for the sample medium sudoku puzzle',
  },
  de: {
    title: 'Sudoku zum Ausdrucken mit Lösungen: Kostenloses PDF mit Schlüssel',
    description:
      'Drucke Sudoku-Rätsel mit eingeschlossenen Lösungen. Der Lösungsschlüssel steht auf eigenen Seiten am Ende des PDFs, jedem Rätsel per Code zugeordnet. Kostenlos, keine Anmeldung.',
    eyebrow: 'Lösungsschlüssel eingeschaltet',
    h1: 'Sudoku zum Ausdrucken mit Lösungen: Rätsel und vollständige Lösungen in einem PDF',
    lede: 'Jede Auflage kann ihren eigenen Lösungsschlüssel tragen: zuerst die Rätsel, dann ein Lösungsabschnitt am Ende, jedes Raster mit demselben Code beschriftet wie das Rätsel, das es löst.',
    genHeading: 'Auflage mit Lösungen festlegen',
    genSubheading: 'Lösungen sind hier eingeschaltet; nimm das Häkchen weg, um sie wegzulassen',
    appDescription: 'Erstellt Sudoku-Rätsel zum Ausdrucken mit passendem Lösungsschlüssel und lädt beides als ein PDF herunter.',
    faqHeading: 'Sudoku mit Lösungen: Fragen',
    answerKeyStatus: 'Lösungsschlüssel',
    solutionCaption: (code) => `Lösung zu #${code}`,
    solutionAriaLabel: 'Das vollständige Lösungsraster für das mittelschwere Beispiel-Sudoku',
  },
  fr: {
    title: 'Sudoku à Imprimer avec Solutions : PDF Gratuit avec Corrigé',
    description:
      'Imprimez des grilles de sudoku avec les solutions incluses. Le corrigé se trouve sur ses propres pages à la fin du PDF, associé à chaque grille par son code. Gratuit, sans inscription.',
    eyebrow: 'corrigé activé',
    h1: 'Sudoku à imprimer avec solutions : grilles et corrigé complet dans un seul PDF',
    lede: 'Chaque tirage peut porter son propre corrigé : les grilles d’abord, puis une section de solutions à la fin, chaque grille portant le même code que la grille qu’elle résout.',
    genHeading: 'Composer un tirage avec solutions',
    genSubheading: 'les solutions sont activées ici ; décochez la case pour les retirer',
    appDescription: 'Génère des grilles de sudoku à imprimer avec un corrigé correspondant et télécharge les deux en un seul PDF.',
    faqHeading: 'Sudoku avec solutions : questions',
    answerKeyStatus: 'corrigé',
    solutionCaption: (code) => `solution de #${code}`,
    solutionAriaLabel: 'La grille de solution complète pour l’exemple de sudoku moyen',
  },
  es: {
    title: 'Sudoku para Imprimir con Soluciones: PDF Gratis con Clave',
    description:
      'Imprime sudokus con las soluciones incluidas. Las soluciones ocupan sus propias páginas al final del PDF, emparejadas con cada sudoku por su código. Gratis, sin registro.',
    eyebrow: 'soluciones activadas',
    h1: 'Sudoku para imprimir con soluciones: sudokus y soluciones completas en un solo PDF',
    lede: 'Cada tirada puede llevar sus propias soluciones: primero los sudokus, luego una sección de soluciones al final, con cada cuadrícula etiquetada con el mismo código que el sudoku que resuelve.',
    genHeading: 'Preparar una tirada con soluciones',
    genSubheading: 'las soluciones están activadas aquí; desmarca la casilla para quitarlas',
    appDescription: 'Genera sudokus para imprimir con sus soluciones correspondientes y descarga ambos en un solo PDF.',
    faqHeading: 'Sudoku con soluciones: preguntas',
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
          So setzt das PDF den Lösungsschlüssel
        </h2>
        <div className="prose-press mt-4">
          <p>
            Lösungen und Rätsel stehen auf getrennten Seiten. Dein PDF bringt zuerst alle
            Rätselseiten, so viele dein Layout braucht, und beginnt dann einen neuen Abschnitt mit
            der Überschrift <em>Lösungen</em>. Teilst du Blätter aus, drucke das Dokument und
            behalte die hintere Hälfte, dann sieht niemand die Lösung zu dem Raster vor sich.
          </p>
          <p>
            Ein Code ordnet jede Lösung ihrem Rätsel zu. Jedes Rätsel druckt einen sechsstelligen
            Code unter sein Raster, zusammen mit Schwierigkeit und Anzahl der Hinweise. Seine Lösung
            druckt denselben Code, gefolgt vom Wort „Lösung“. Du kannst die Seiten mischen, auf zwei
            Räume verteilen und einen Monat später zurückkommen, und die Codes passen noch zusammen.
            Geht der Schlüssel verloren, liefert derselbe Code die Antwort auf der{' '}
            <Link href={L('/sudoku-answers')}>Lösungssuche-Seite</Link>.
          </p>
          <p>
            Der Lösungsschlüssel übernimmt das Layout der Rätsel, zwei Rätsel pro Seite ergeben also
            zwei Lösungen pro Seite. Für Lösungsraster, die du schnell prüfen kannst, stelle das
            Layout auf eins oder zwei pro Seite.
          </p>
        </div>
      </section>
    );
  }

  if (locale === 'fr') {
    return (
      <section aria-labelledby="key-heading" className="max-w-prose">
        <h2 id="key-heading" className="m-0 font-display text-[24px] font-bold">
          Comment le PDF met en page le corrigé
        </h2>
        <div className="prose-press mt-4">
          <p>
            Solutions et grilles figurent sur des pages séparées. Votre PDF enchaîne d’abord toutes
            les pages de grilles, autant que votre mise en page en demande, puis démarre une
            nouvelle section intitulée <em>solutions</em>. Si vous distribuez des feuilles, imprimez
            le document et gardez la seconde moitié : personne ne voit la solution de la grille
            qu’il a devant lui.
          </p>
          <p>
            Un code relie chaque solution à sa grille. Chaque grille imprime un code à six
            caractères sous son plateau, avec sa difficulté et son nombre d’indices de départ. Sa
            solution imprime le même code, suivi du mot « solution ». Vous pouvez mélanger les
            pages, les répartir entre deux pièces et y revenir un mois plus tard : les codes
            correspondent toujours. Si le corrigé disparaît, le même code retrouve la solution sur
            la <Link href={L('/sudoku-answers')}>page de recherche de solutions</Link>.
          </p>
          <p>
            Le corrigé reprend la mise en page des grilles : deux grilles par page donnent deux
            solutions par page. Pour des grilles de solution assez grandes à vérifier vite, réglez
            la mise en page sur une ou deux par page.
          </p>
        </div>
      </section>
    );
  }

  if (locale === 'es') {
    return (
      <section aria-labelledby="key-heading" className="max-w-prose">
        <h2 id="key-heading" className="m-0 font-display text-[24px] font-bold">
          Cómo organiza el PDF las soluciones
        </h2>
        <div className="prose-press mt-4">
          <p>
            Las soluciones y los sudokus van en páginas separadas. Tu PDF recorre primero todas las
            páginas de sudokus, las que necesite tu diseño, y luego empieza una sección nueva
            titulada <em>soluciones</em>. Si vas a repartir hojas, imprime el documento y quédate
            con la segunda mitad, y nadie verá la solución de la cuadrícula que tiene delante.
          </p>
          <p>
            Un código empareja cada solución con su sudoku. Cada sudoku imprime un código de seis
            caracteres bajo su cuadrícula, junto con su dificultad y su número de pistas iniciales.
            Su solución imprime el mismo código, seguido de la palabra «solución». Puedes mezclar
            las páginas, repartirlas entre dos salas y volver un mes después, y los códigos siguen
            coincidiendo. Si las soluciones se pierden, el mismo código trae la respuesta en la{' '}
            <Link href={L('/sudoku-answers')}>página de búsqueda de soluciones</Link>.
          </p>
          <p>
            Las soluciones copian el diseño de los sudokus, así que dos sudokus por página dan dos
            soluciones por página. Para cuadrículas de solución lo bastante grandes como para
            comprobarlas rápido, pon el diseño en uno o dos por página.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section aria-labelledby="key-heading" className="max-w-prose">
      <h2 id="key-heading" className="m-0 font-display text-[24px] font-bold">
        How the PDF lays out the answer key
      </h2>
      <div className="prose-press mt-4">
        <p>
          Solutions and puzzles sit on separate pages. Your PDF runs all the puzzle pages first,
          however many your layout needs, and then starts a fresh section headed <em>answer
          key</em>. If you hand sheets out, print the document and keep the back half, and nobody
          sees the answer to the grid in front of them.
        </p>
        <p>
          A code matches each solution to its puzzle. Each puzzle prints a six-character code
          under its grid, along with its difficulty and starting clue count. Its solution prints
          the same code followed by the word &ldquo;solution&rdquo;. You can shuffle the pages,
          split them between two rooms and come back a month later, and the codes still line up.
          If the key goes missing, the same code fetches the answer on the{' '}
          <Link href={L('/sudoku-answers')}>answer lookup page</Link>.
        </p>
        <p>
          The key copies the layout of the puzzles, so two puzzles per page gives two solutions per
          page. For solution grids large enough to check quickly, set the layout to one or two per
          page.
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
            Der Generator baut zuerst ein vollständiges, gültiges Raster, und das Rätsel ist das,
            was bleibt, nachdem er Hinweise entfernt hat. Der gedruckte Lösungsschlüssel ist dieses
            ursprüngliche Raster.
          </p>
          <p>
            Die Entfernungsregel verhindert eine zweite gültige Lösung. Nach jeder Entfernung zählt
            ein Lösungsalgorithmus die Lösungen des verbleibenden Rasters und hält bei zwei an.
            Findet er zwei, setzt der Generator den Hinweis zurück. Du kannst das gedruckte Rätsel
            also nur auf eine Weise vervollständigen, und der Lösungsschlüssel am Ende deines PDFs
            zeigt diese Weise.
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
            Le générateur construit d’abord une grille complète et valide, et la grille de jeu est
            ce qui reste une fois qu’il a retiré des indices. Le corrigé que vous imprimez, c’est
            cette grille d’origine.
          </p>
          <p>
            La règle de retrait empêche une seconde solution valide. Après chaque retrait, un
            solveur compte les solutions de la grille restante, en s’arrêtant à deux. S’il en trouve
            deux, le générateur remet l’indice. Vous ne pouvez donc compléter la grille imprimée que
            d’une seule façon, et le corrigé à la fin de votre PDF montre cette façon.
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
            El generador construye primero una cuadrícula completa y válida, y el sudoku es lo que
            queda después de que retire pistas. Las soluciones que imprimes son esa cuadrícula
            original.
          </p>
          <p>
            La regla de retirada impide una segunda respuesta válida. Tras cada retirada, un
            solucionador cuenta las soluciones de la cuadrícula restante y se detiene al llegar a
            dos. Si encuentra dos, el generador vuelve a colocar la pista. Así que solo puedes
            completar el sudoku impreso de una manera, y las soluciones al final de tu PDF muestran
            esa manera.
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
          The generator builds a complete, valid grid first, and the puzzle is what remains after it
          removes clues. The answer key you print is that original grid.
        </p>
        <p>
          The removal rule prevents a second valid answer. After each removal, a solver counts the
          solutions of the remaining grid, stopping at two. If it finds two, the generator puts the
          clue back. You can complete the printed puzzle only one way, and the key at the back of
          your PDF shows that way.
        </p>
      </div>
    </section>
  );
}

const LEVELS_SECTION: Record<Locale, { heading: string; intro: string; backPre: string; backLink: string; browseMid: string; browseLink: string; end: string }> = {
  en: {
    heading: 'Pick a difficulty for your answer-key set',
    intro: 'The answer key works the same at every level. You will use it most on hard and expert grids, where one wrong entry can hide for forty moves.',
    backPre: 'Back to the ',
    backLink: 'free printable sudoku generator',
    browseMid: ' or browse ',
    browseLink: 'all printable sudoku levels',
    end: '.',
  },
  de: {
    heading: 'Wähle eine Schwierigkeit für dein Set mit Lösungsschlüssel',
    intro: 'Der Lösungsschlüssel funktioniert auf jeder Stufe gleich. Am häufigsten brauchst du ihn bei schweren und Experten-Rastern, wo sich eine falsche Eintragung vierzig Züge lang verstecken kann.',
    backPre: 'Zurück zum ',
    backLink: 'kostenlosen Sudoku-Generator',
    browseMid: ' oder alle ',
    browseLink: 'Sudoku-Stufen zum Ausdrucken durchsehen',
    end: '.',
  },
  fr: {
    heading: 'Choisissez une difficulté pour votre lot avec corrigé',
    intro: 'Le corrigé fonctionne de la même façon à tous les niveaux. Vous vous en servirez surtout sur les grilles difficiles et expert, où une seule erreur peut rester cachée pendant quarante coups.',
    backPre: 'Retour au ',
    backLink: 'générateur gratuit de sudoku à imprimer',
    browseMid: ' ou parcourez ',
    browseLink: 'tous les niveaux de sudoku à imprimer',
    end: '.',
  },
  es: {
    heading: 'Elige una dificultad para tu set con soluciones',
    intro: 'Las soluciones funcionan igual en todos los niveles. Las usarás sobre todo en las cuadrículas difíciles y expertas, donde una sola anotación equivocada puede esconderse durante cuarenta movimientos.',
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
            name: 'Printable sudoku with answers: PDF generator',
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
