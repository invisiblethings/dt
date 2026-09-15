import Link from 'next/link';
import { AnswerLookup } from '@/components/answer-lookup';
import { Faq } from '@/components/faq';
import { JsonLd } from '@/components/json-ld';
import { Shell } from '@/components/shell';
import { PageHero } from '@/components/page-hero';
import { SAMPLE_PUZZLES } from '@/lib/samples';
import { SITE_FAQS } from '@/content/faqs';
import { localizedPath, type Locale } from '@/i18n/config';
import { faqPageSchema, pageMetadata, webApplicationSchema } from '@/lib/seo';

const META: Record<Locale, { title: string; description: string; eyebrow: string; h1: string; lede: string; appName: string; appDescription: string; faqHeading: string }> = {
  en: {
    title: 'Sudoku Answers — Look Up the Solution to Any Puzzle',
    description:
      'Lost the answer key? Type the code printed under any puzzle from this site and get its solution back instantly — no account, no sign-up, and nothing leaves your browser.',
    eyebrow: 'solution lookup',
    h1: 'Sudoku answers — look up the solution to any puzzle',
    lede: 'Stuck on a grid, or checking a finished one? Type the code printed under the puzzle and its solution comes straight back. No answer key needed, and no account.',
    appName: 'Sudoku answer lookup',
    appDescription: 'Rebuilds the solution to any puzzle generated on this site from the short code printed under its grid.',
    faqHeading: 'Looking up answers — questions',
  },
  de: {
    title: 'Sudoku-Lösungen — Die Lösung zu jedem Rätsel nachschlagen',
    description:
      'Lösungsschlüssel verloren? Gib den Code ein, der unter jedem Rätsel dieser Website steht, und erhalte sofort die Lösung — kein Konto, keine Anmeldung, nichts verlässt deinen Browser.',
    eyebrow: 'Lösungssuche',
    h1: 'Sudoku-Lösungen — die Lösung zu jedem Rätsel nachschlagen',
    lede: 'Bei einem Raster hängen geblieben, oder ein fertiges prüfen? Gib den Code unter dem Rätsel ein, und die Lösung kommt sofort zurück. Kein Lösungsschlüssel nötig, kein Konto.',
    appName: 'Sudoku-Lösungssuche',
    appDescription: 'Baut die Lösung jedes auf dieser Website erzeugten Rätsels aus dem kurzen Code unter seinem Raster neu auf.',
    faqHeading: 'Lösungen nachschlagen — Fragen',
  },
  fr: {
    title: 'Solutions de Sudoku — Retrouvez la Solution de N’importe Quelle Grille',
    description:
      'Corrigé perdu ? Saisissez le code imprimé sous n’importe quelle grille de ce site et récupérez sa solution instantanément — sans compte, sans inscription, et rien ne quitte votre navigateur.',
    eyebrow: 'recherche de solution',
    h1: 'Solutions de sudoku — retrouvez la solution de n’importe quelle grille',
    lede: 'Bloqué sur une grille, ou envie de vérifier une grille terminée ? Saisissez le code imprimé sous la grille et la solution revient aussitôt. Pas besoin de corrigé, ni de compte.',
    appName: 'Recherche de solution de sudoku',
    appDescription: 'Reconstruit la solution de n’importe quelle grille générée sur ce site à partir du code court imprimé sous son plateau.',
    faqHeading: 'Retrouver une solution — questions',
  },
  es: {
    title: 'Soluciones de Sudoku — Busca la Solución de Cualquier Sudoku',
    description:
      '¿Perdiste las soluciones? Escribe el código impreso bajo cualquier sudoku de este sitio y recupera su solución al instante — sin cuenta, sin registro, y nada sale de tu navegador.',
    eyebrow: 'búsqueda de solución',
    h1: 'Soluciones de sudoku — busca la solución de cualquier sudoku',
    lede: '¿Atascado en una cuadrícula, o quieres comprobar una que ya terminaste? Escribe el código impreso bajo el sudoku y la solución vuelve al instante. No hace falta la clave de soluciones, ni cuenta.',
    appName: 'Búsqueda de soluciones de sudoku',
    appDescription: 'Reconstruye la solución de cualquier sudoku generado en este sitio a partir del código corto impreso bajo su cuadrícula.',
    faqHeading: 'Buscar soluciones — preguntas',
  },
};

export function getSudokuAnswersMetadata(locale: Locale) {
  const t = META[locale];
  return pageMetadata({ title: t.title, description: t.description, path: '/sudoku-answers', locale });
}

function HowSection({ locale }: { locale: Locale }) {
  if (locale === 'de') {
    return (
      <section aria-labelledby="how-heading" className="mt-20 max-w-prose">
        <h2 id="how-heading" className="m-0 font-display text-[24px] font-bold">
          Wie ein sechsstelliger Code die Antwort kennt
        </h2>
        <div className="prose-press mt-4">
          <p>
            Das ist der Teil, der normalerweise die Augenbrauen hochzieht, denn es gibt hier keine
            Datenbank, und dein Rätsel wurde nirgendwohin hochgeladen. Der Trick: Der Code ist kein
            Verweis auf ein gespeichertes Rätsel. Er <em>ist</em> das Rätsel, in komprimierter Form.
          </p>
          <p>
            Ein Sudoku zu erzeugen bedeutet viel Mischen: welche Ziffern im ersten vollständigen
            Raster wohin kommen, und in welcher Reihenfolge die Hinweise entfernt werden. Dieses ganze
            Mischen wird von einer einzigen Startzahl gesteuert. Legt man diese Zahl fest, läuft der
            gesamte Prozess jedes Mal gleich ab, bis zum letzten Feld. Der Code trägt also zwei Dinge —
            welche Schwierigkeit gewählt wurde und diese Startzahl — und daraus baut der Generator dein
            genaues Rätsel und damit seine genaue Lösung auf der Stelle wieder auf.
          </p>
          <p>
            Zwei nützliche Folgen davon. Nichts läuft ab: Ein Blatt, das du heute druckst, lässt sich
            auch in zehn Jahren noch nachschlagen, weil die Antwort neu berechnet statt abgerufen wird.
            Und nichts kann durchsickern: Die Suche läuft in deinem Browser wie alles andere auf dieser
            Website, sodass niemand, auch wir nicht, erfährt, an welchen Rätseln du gearbeitet hast.
          </p>
          <p>
            Die Codes sind absichtlich so gestaltet, dass sie sich schwer vertippen lassen. Sie
            verwenden nie die Buchstaben I, L, O oder U, damit keine Verwechslung mit 1 und 0 möglich
            ist, und jeder Code trägt eine kleine eingebaute Prüfung. Liest du ein Zeichen falsch,
            bekommst du gesagt, dass der Code falsch ist — statt still die Antwort auf ein anderes
            Rätsel zu erhalten und dich zu fragen, warum nichts zusammenpasst.
          </p>
        </div>
      </section>
    );
  }
  if (locale === 'fr') {
    return (
      <section aria-labelledby="how-heading" className="mt-20 max-w-prose">
        <h2 id="how-heading" className="m-0 font-display text-[24px] font-bold">
          Comment un code à six caractères connaît la réponse
        </h2>
        <div className="prose-press mt-4">
          <p>
            C’est la partie qui étonne généralement, car il n’y a ici aucune base de données et votre
            grille n’a jamais été envoyée nulle part. L’astuce, c’est que le code n’est pas une
            référence vers une grille stockée. Il <em>est</em> la grille, sous forme compressée.
          </p>
          <p>
            Générer un sudoku implique beaucoup de mélange : quels chiffres vont où dans le premier
            plateau complet, et dans quel ordre les indices sont retirés. Tout ce mélange est piloté
            par un seul nombre de départ. Fixez ce nombre, et tout le processus se déroule de la même
            façon à chaque fois, jusqu’à la dernière case. Le code porte donc deux informations — la
            difficulté demandée et ce nombre de départ — et à partir de là, le générateur reconstruit
            votre grille exacte, et donc sa solution exacte, sur-le-champ.
          </p>
          <p>
            Deux conséquences utiles. Rien n’expire : une feuille imprimée aujourd’hui se retrouvera
            toujours dans dix ans, car la réponse est recalculée plutôt que récupérée. Et rien ne peut
            fuiter : la recherche s’exécute dans votre navigateur comme tout le reste de ce site, si
            bien que personne, nous y compris, ne sait sur quelles grilles vous avez travaillé.
          </p>
          <p>
            Les codes sont volontairement conçus pour être difficiles à mal saisir. Ils n’utilisent
            jamais les lettres I, L, O ou U, pour éviter toute confusion avec 1 et 0, et chaque code
            intègre une petite vérification. Une erreur sur un caractère, et le site vous indique que
            le code est incorrect — plutôt que de vous donner la solution d’une autre grille en vous
            laissant vous demander pourquoi rien ne correspond.
          </p>
        </div>
      </section>
    );
  }
  if (locale === 'es') {
    return (
      <section aria-labelledby="how-heading" className="mt-20 max-w-prose">
        <h2 id="how-heading" className="m-0 font-display text-[24px] font-bold">
          Cómo un código de seis caracteres conoce la respuesta
        </h2>
        <div className="prose-press mt-4">
          <p>
            Esta es la parte que suele sorprender, porque aquí no hay ninguna base de datos y tu sudoku
            nunca se subió a ningún sitio. El truco es que el código no es una referencia a un sudoku
            guardado. <em>Es</em> el sudoku, en forma comprimida.
          </p>
          <p>
            Generar un sudoku implica mucho barajar: qué números van dónde en la primera cuadrícula
            completa, y en qué orden se retiran las pistas. Todo ese barajado está gobernado por un
            único número de partida. Fija ese número y todo el proceso se repite igual cada vez, hasta
            la última casilla. Así que el código lleva dos cosas — la dificultad pedida y ese número de
            partida — y a partir de ahí el generador reconstruye tu sudoku exacto, y por tanto su
            solución exacta, al instante.
          </p>
          <p>
            De ahí salen dos consecuencias útiles. No hay nada que caduque: una hoja que imprimas hoy
            se podrá seguir buscando dentro de diez años, porque la respuesta se recalcula en vez de
            recuperarse. Y no hay nada que se filtre: la búsqueda se ejecuta en tu navegador como todo
            lo demás en este sitio, así que nadie, ni siquiera nosotros, sabe en qué sudokus has estado
            trabajando.
          </p>
          <p>
            Los códigos están pensados a propósito para ser difíciles de teclear mal. Nunca usan las
            letras I, L, O ni U, para que no se confundan con 1 y 0, y cada código lleva integrada una
            pequeña comprobación. Si un carácter está mal, se te avisa de que el código es incorrecto —
            en vez de darte en silencio la respuesta de otro sudoku y dejarte preguntándote por qué no
            encaja nada.
          </p>
        </div>
      </section>
    );
  }
  return (
    <section aria-labelledby="how-heading" className="mt-20 max-w-prose">
      <h2 id="how-heading" className="m-0 font-display text-[24px] font-bold">
        How a six-character code knows the answer
      </h2>
      <div className="prose-press mt-4">
        <p>
          This is the part that usually raises an eyebrow, because there is no database here and
          your puzzle was never uploaded anywhere. The trick is that the code is not a reference
          to a stored puzzle. It <em>is</em> the puzzle, in compressed form.
        </p>
        <p>
          Generating a sudoku involves a lot of shuffling: which digits go where in the first
          complete grid, and which order the clues are taken out in. All of that shuffling is
          driven by a single starting number. Fix that number and the whole process runs the
          same way every time, down to the last cell. So the code carries two things — which
          difficulty was asked for, and that starting number — and from those the generator
          rebuilds your exact puzzle, and therefore its exact solution, on the spot.
        </p>
        <p>
          Two useful consequences. There is nothing to expire: a sheet you print today will
          still look up in ten years, because the answer is recomputed rather than retrieved.
          And there is nothing to leak: the lookup runs in your browser like everything else on
          this site, so no one, including us, learns which puzzles you have been working on.
        </p>
        <p>
          The codes are deliberately awkward to mistype. They never use the letters I, L, O or
          U, so there is no confusing them with 1 and 0, and each code carries a small check
          built into it. Get a character wrong and you are told the code is wrong — rather than
          being handed a different puzzle&rsquo;s answer and left to wonder why nothing lines up.
        </p>
      </div>
    </section>
  );
}

function WhereSection({ locale }: { locale: Locale }) {
  const L = (p: string) => localizedPath(locale, p);

  if (locale === 'de') {
    return (
      <section aria-labelledby="where-heading" className="mt-16 max-w-prose">
        <h2 id="where-heading" className="m-0 font-display text-[24px] font-bold">
          Wo du den Code findest
        </h2>
        <div className="prose-press mt-4">
          <p>
            Schau direkt unter das Raster. Jedes Rätsel druckt seinen Code links — eine Raute gefolgt
            von sechs Zeichen — mit Schwierigkeit und Anzahl der Hinweise rechts. Auf einem Blatt mit
            vier oder sechs Rätseln pro Seite hat jedes Raster seinen eigenen, sodass du ein Rätsel
            nachschlagen kannst, ohne den Rest der Seite zu verraten.
          </p>
          <p>
            Willst du die Lösungen lieber von Anfang an auf Papier, kann der Generator sie dir drucken:
            siehe{' '}
            <Link href={L('/printable-sudoku-with-answers')}>Sudoku zum Ausdrucken mit Lösungen</Link>,
            das einen vollständigen Lösungsschlüssel ans Ende des PDFs setzt. Diese Seite ist die
            Rückfalllösung für den Fall, dass du keinen gedruckt hast oder ihn nicht mehr zur Hand hast.
          </p>
        </div>
      </section>
    );
  }
  if (locale === 'fr') {
    return (
      <section aria-labelledby="where-heading" className="mt-16 max-w-prose">
        <h2 id="where-heading" className="m-0 font-display text-[24px] font-bold">
          Où trouver le code
        </h2>
        <div className="prose-press mt-4">
          <p>
            Regardez directement sous la grille. Chaque grille imprime son code à gauche — un dièse
            suivi de six caractères — avec la difficulté et le nombre d’indices à droite. Sur une
            feuille à quatre ou six grilles par page, chaque grille a le sien, si bien que vous pouvez
            rechercher une solution sans gâcher le reste de la page.
          </p>
          <p>
            Si vous préférez avoir les solutions sur papier dès le départ, le générateur peut les
            imprimer pour vous : voir{' '}
            <Link href={L('/printable-sudoku-with-answers')}>sudoku à imprimer avec solutions</Link>,
            qui place un corrigé complet à la fin du PDF. Cette page est la solution de repli pour
            quand vous n’en avez pas imprimé, ou que vous ne l’avez plus sous la main.
          </p>
        </div>
      </section>
    );
  }
  if (locale === 'es') {
    return (
      <section aria-labelledby="where-heading" className="mt-16 max-w-prose">
        <h2 id="where-heading" className="m-0 font-display text-[24px] font-bold">
          Dónde encontrar el código
        </h2>
        <div className="prose-press mt-4">
          <p>
            Mira justo debajo de la cuadrícula. Cada sudoku imprime su código a la izquierda — una
            almohadilla seguida de seis caracteres — con la dificultad y el número de pistas a la
            derecha. En una hoja con cuatro o seis sudokus por página, cada cuadrícula tiene el suyo,
            así que puedes buscar la solución de un sudoku sin estropear el resto de la página.
          </p>
          <p>
            Si prefieres tener las soluciones en papel desde el principio, el generador puede
            imprimirlas por ti: mira{' '}
            <Link href={L('/printable-sudoku-with-answers')}>sudoku para imprimir con soluciones</Link>,
            que añade las soluciones completas al final del PDF. Esta página es la alternativa para
            cuando no las imprimiste, o ya no las tienes a mano.
          </p>
        </div>
      </section>
    );
  }
  return (
    <section aria-labelledby="where-heading" className="mt-16 max-w-prose">
      <h2 id="where-heading" className="m-0 font-display text-[24px] font-bold">
        Where to find the code
      </h2>
      <div className="prose-press mt-4">
        <p>
          Look directly beneath the grid. Each puzzle prints its code on the left — a hash
          followed by six characters — with the difficulty and clue count on the right. On a
          sheet with four or six puzzles to a page, every grid has its own, so you can look up
          one puzzle without spoiling the rest of the page.
        </p>
        <p>
          If you would rather have the answers on paper from the start, the generator can print
          them for you: see{' '}
          <Link href={L('/printable-sudoku-with-answers')}>printable sudoku with answers</Link>,
          which puts a full key at the back of the PDF. This page is the fallback for when you
          did not print one, or no longer have it to hand.
        </p>
      </div>
    </section>
  );
}

const NEXT_SECTION: Record<Locale, { heading: string; pre: string; link1: string; mid: string; link2: string; post: string }> = {
  en: {
    heading: 'Need more puzzles?',
    pre: 'The ',
    link1: 'free printable sudoku generator',
    mid: ' will make you a fresh set at any difficulty, and you can now mix levels in one run. If you are checking a grid because you got stuck rather than because you finished, ',
    link2: 'the solving techniques guide',
    post: ' may get you moving again without giving the whole thing away.',
  },
  de: {
    heading: 'Brauchst du mehr Rätsel?',
    pre: 'Der ',
    link1: 'kostenlose Sudoku-Generator zum Ausdrucken',
    mid: ' erstellt dir ein frisches Set in jeder Schwierigkeit, und du kannst jetzt Stufen in einer Auflage mischen. Prüfst du ein Raster, weil du hängen geblieben bist und nicht, weil du fertig bist, bringt dich ',
    link2: 'die Anleitung zu Lösungstechniken',
    post: ' vielleicht weiter, ohne gleich alles zu verraten.',
  },
  fr: {
    heading: 'Besoin de plus de grilles ?',
    pre: 'Le ',
    link1: 'générateur gratuit de sudoku à imprimer',
    mid: ' vous composera un nouveau lot à n’importe quelle difficulté, et vous pouvez désormais mélanger les niveaux dans un même tirage. Si vous vérifiez une grille parce que vous êtes bloqué plutôt que parce que vous avez terminé, ',
    link2: 'le guide des techniques de résolution',
    post: ' peut vous relancer sans tout révéler d’un coup.',
  },
  es: {
    heading: '¿Necesitas más sudokus?',
    pre: 'El ',
    link1: 'generador gratuito de sudoku para imprimir',
    mid: ' te prepara un set nuevo en cualquier dificultad, y ahora puedes mezclar niveles en una misma tirada. Si estás comprobando una cuadrícula porque te atascaste, y no porque la terminaste, ',
    link2: 'la guía de técnicas de resolución',
    post: ' puede ayudarte a avanzar sin desvelarlo todo de golpe.',
  },
};

export function SudokuAnswersPage({ locale }: { locale: Locale }) {
  const t = META[locale];
  const faqs = SITE_FAQS[locale];
  const n = NEXT_SECTION[locale];
  const L = (p: string) => localizedPath(locale, p);

  return (
    <>
      <JsonLd
        data={[
          webApplicationSchema({
            name: t.appName,
            description: t.appDescription,
            path: '/sudoku-answers',
            locale,
            featureList: [],
          }),
          faqPageSchema(faqs.lookup),
        ]}
      />

      <Shell className="py-10 shelf:py-14">
        <PageHero eyebrow={t.eyebrow} h1={t.h1} lede={t.lede} />

        <div className="mt-10 max-w-[760px]">
          <AnswerLookup sample={SAMPLE_PUZZLES.medium} locale={locale} />
        </div>

        <HowSection locale={locale} />
        <WhereSection locale={locale} />

        <Faq items={faqs.lookup} heading={t.faqHeading} />

        <section aria-labelledby="next-heading" className="mt-16 max-w-prose">
          <h2 id="next-heading" className="m-0 font-display text-[24px] font-bold">
            {n.heading}
          </h2>
          <p className="mt-3 text-[15.5px] leading-relaxed text-ink-soft">
            {n.pre}
            <Link href={L('/')} className="font-medium text-stamp underline underline-offset-2">
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
