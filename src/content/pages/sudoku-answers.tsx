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
    title: 'Sudoku Answers: Look Up the Solution to Any Puzzle',
    description:
      'Lost the answer key? Type the code printed under any puzzle from this site to get its solution. You need no account, and the lookup runs in your browser.',
    eyebrow: 'solution lookup',
    h1: 'Sudoku answers: look up the solution to any puzzle',
    lede: 'Type the code printed under a puzzle to see its solution, whether you are stuck or checking a finished grid. You need no answer key and no account.',
    appName: 'Sudoku answer lookup',
    appDescription: 'Rebuilds the solution to any puzzle generated on this site from the short code printed under its grid.',
    faqHeading: 'Looking up answers: questions',
  },
  de: {
    title: 'Sudoku-Lösungen: Die Lösung zu jedem Rätsel nachschlagen',
    description:
      'Lösungsschlüssel verloren? Gib den Code unter einem Rätsel dieser Website ein und erhalte seine Lösung. Du brauchst kein Konto, und die Suche läuft in deinem Browser.',
    eyebrow: 'Lösungssuche',
    h1: 'Sudoku-Lösungen: die Lösung zu jedem Rätsel nachschlagen',
    lede: 'Gib den Code unter einem Rätsel ein, um seine Lösung zu sehen, ob du feststeckst oder ein fertiges Raster prüfst. Du brauchst weder Lösungsschlüssel noch Konto.',
    appName: 'Sudoku-Lösungssuche',
    appDescription: 'Baut die Lösung jedes auf dieser Website erzeugten Rätsels aus dem kurzen Code unter seinem Raster neu auf.',
    faqHeading: 'Lösungen nachschlagen: Fragen',
  },
  fr: {
    title: 'Solutions de Sudoku : Retrouvez la Solution de N’importe Quelle Grille',
    description:
      'Corrigé perdu ? Saisissez le code imprimé sous une grille de ce site pour obtenir sa solution. Vous n’avez besoin d’aucun compte, et la recherche tourne dans votre navigateur.',
    eyebrow: 'recherche de solution',
    h1: 'Solutions de sudoku : retrouvez la solution de n’importe quelle grille',
    lede: 'Saisissez le code imprimé sous une grille pour voir sa solution, que vous soyez bloqué ou que vous vérifiiez une grille terminée. Vous n’avez besoin ni de corrigé ni de compte.',
    appName: 'Recherche de solution de sudoku',
    appDescription: 'Reconstruit la solution de n’importe quelle grille générée sur ce site à partir du code court imprimé sous son plateau.',
    faqHeading: 'Retrouver une solution : questions',
  },
  es: {
    title: 'Soluciones de Sudoku: Busca la Solución de Cualquier Sudoku',
    description:
      '¿Perdiste las soluciones? Escribe el código impreso bajo un sudoku de este sitio para obtener su solución. No necesitas cuenta, y la búsqueda funciona en tu navegador.',
    eyebrow: 'búsqueda de solución',
    h1: 'Soluciones de sudoku: busca la solución de cualquier sudoku',
    lede: 'Escribe el código impreso bajo un sudoku para ver su solución, tanto si estás atascado como si quieres comprobar una cuadrícula terminada. No necesitas las soluciones impresas ni una cuenta.',
    appName: 'Búsqueda de soluciones de sudoku',
    appDescription: 'Reconstruye la solución de cualquier sudoku generado en este sitio a partir del código corto impreso bajo su cuadrícula.',
    faqHeading: 'Buscar soluciones: preguntas',
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
          Wie die Suche die Antwort aus einem sechsstelligen Code findet
        </h2>
        <div className="prose-press mt-4">
          <p>
            Die Website hat keine Datenbank, und du hast dein Rätsel nie hochgeladen. Der Code
            funktioniert als komprimierte Kopie des Rätsels, sodass die Suche es neu aufbauen kann,
            ohne etwas zu speichern.
          </p>
          <p>
            Ein Sudoku zu erzeugen bedeutet viel Mischen: welche Ziffern im ersten vollständigen
            Raster wohin kommen, und in welcher Reihenfolge der Generator Hinweise entfernt. Eine
            einzige Startzahl steuert dieses ganze Mischen. Legst du die Zahl fest, läuft der
            Generator jedes Mal gleich ab, bis zum letzten Feld. Der Code trägt die gewählte
            Schwierigkeit und diese Startzahl, und daraus baut der Generator dein Rätsel samt Lösung
            auf der Stelle wieder auf.
          </p>
          <p>
            Codes laufen nicht ab: Ein Blatt, das du heute druckst, lässt sich auch in zehn Jahren
            noch nachschlagen, weil die Suche die Antwort neu berechnet. Und die Suche läuft wie der
            Rest dieser Website in deinem Browser, sodass niemand, auch wir nicht, erfährt, an
            welchen Rätseln du gearbeitet hast.
          </p>
          <p>
            Wir haben die Codes gegen Tippfehler gebaut. Sie lassen die Buchstaben I, L, O und U
            weg, damit du sie nicht mit 1 und 0 verwechselst, und jeder Code trägt eine kleine
            eingebaute Prüfung. Liest du ein Zeichen falsch, sagt dir die Seite, dass der Code
            falsch ist, statt dir die Antwort auf ein anderes Rätsel zu zeigen.
          </p>
        </div>
      </section>
    );
  }

  if (locale === 'fr') {
    return (
      <section aria-labelledby="how-heading" className="mt-20 max-w-prose">
        <h2 id="how-heading" className="m-0 font-display text-[24px] font-bold">
          Comment la recherche retrouve la réponse à partir d’un code à six caractères
        </h2>
        <div className="prose-press mt-4">
          <p>
            Le site n’a pas de base de données, et vous n’avez jamais envoyé votre grille. Le code
            fonctionne comme une copie compressée de la grille : la recherche peut donc la
            reconstruire sans rien stocker.
          </p>
          <p>
            Générer un sudoku implique beaucoup de mélange : quels chiffres vont où dans le premier
            plateau complet, et dans quel ordre le générateur retire les indices. Un seul nombre de
            départ pilote tout ce mélange. Fixez ce nombre, et le générateur se déroule de la même
            façon à chaque fois, jusqu’à la dernière case. Le code porte la difficulté choisie et ce
            nombre de départ, et à partir de ces deux éléments le générateur reconstruit votre
            grille et sa solution sur-le-champ.
          </p>
          <p>
            Les codes n’expirent pas : une feuille imprimée aujourd’hui se retrouvera encore dans
            dix ans, car la recherche recalcule la réponse. Et la recherche s’exécute dans votre
            navigateur comme le reste du site : personne, nous y compris, ne sait sur quelles
            grilles vous avez travaillé.
          </p>
          <p>
            Nous avons conçu les codes pour résister aux fautes de frappe. Ils excluent les lettres
            I, L, O et U pour éviter toute confusion avec 1 et 0, et chaque code intègre une petite
            vérification. Si vous vous trompez d’un caractère, la page vous signale que le code est
            incorrect au lieu d’afficher la solution d’une autre grille.
          </p>
        </div>
      </section>
    );
  }

  if (locale === 'es') {
    return (
      <section aria-labelledby="how-heading" className="mt-20 max-w-prose">
        <h2 id="how-heading" className="m-0 font-display text-[24px] font-bold">
          Cómo encuentra la búsqueda la respuesta a partir de un código de seis caracteres
        </h2>
        <div className="prose-press mt-4">
          <p>
            El sitio no tiene base de datos, y nunca subiste tu sudoku. El código funciona como una
            copia comprimida del sudoku, así que la búsqueda puede reconstruirlo sin guardar nada.
          </p>
          <p>
            Generar un sudoku implica mucho barajar: qué números van dónde en la primera cuadrícula
            completa, y en qué orden retira el generador las pistas. Un único número de partida
            gobierna todo ese barajado. Fija ese número y el generador se ejecuta igual cada vez,
            hasta la última casilla. El código lleva la dificultad que elegiste y ese número de
            partida, y con esos dos datos el generador reconstruye tu sudoku y su solución al
            momento.
          </p>
          <p>
            Los códigos no caducan: una hoja que imprimas hoy se podrá seguir buscando dentro de
            diez años, porque la búsqueda recalcula la respuesta. Y la búsqueda se ejecuta en tu
            navegador como el resto del sitio, así que nadie, ni siquiera nosotros, sabe en qué
            sudokus has estado trabajando.
          </p>
          <p>
            Diseñamos los códigos para resistir las erratas. Excluyen las letras I, L, O y U para
            que no las confundas con 1 y 0, y cada código lleva integrada una pequeña comprobación.
            Si escribes mal un carácter, la página te avisa de que el código es incorrecto en vez de
            mostrarte la respuesta de otro sudoku.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section aria-labelledby="how-heading" className="mt-20 max-w-prose">
      <h2 id="how-heading" className="m-0 font-display text-[24px] font-bold">
        How the lookup finds the answer from a six-character code
      </h2>
      <div className="prose-press mt-4">
        <p>
          The site has no database, and you never uploaded your puzzle. The code works as a
          compressed copy of the puzzle, so the lookup can rebuild it without storing anything.
        </p>
        <p>
          Generating a sudoku involves a lot of shuffling: which digits go where in the first
          complete grid, and in which order the generator removes clues. A single starting number
          drives all of that shuffling. Fix the number and the generator runs the same way each
          time, down to the last cell. The code carries the difficulty you chose and that starting
          number, and from those two the generator rebuilds your puzzle, and its solution, on the
          spot.
        </p>
        <p>
          Codes do not expire, so a sheet you print today will still look up in ten years, because
          the lookup recomputes the answer. And the lookup runs in your browser like the rest of
          this site, so nobody, including us, learns which puzzles you have been working on.
        </p>
        <p>
          We designed the codes to resist typos. They leave out the letters I, L, O and U, so you
          cannot confuse them with 1 and 0, and each code carries a small built-in check. If you get
          a character wrong, the page tells you the code is wrong instead of showing the answer to a
          different puzzle.
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
            Schau unter das Raster. Jedes Rätsel druckt seinen Code links, eine Raute gefolgt von
            sechs Zeichen, mit Schwierigkeit und Anzahl der Hinweise rechts. Auf einem Blatt mit
            vier oder sechs Rätseln pro Seite hat jedes Raster seinen eigenen Code, sodass du ein
            Rätsel nachschlagen kannst, ohne den Rest der Seite zu verraten.
          </p>
          <p>
            Willst du die Lösungen von Anfang an auf Papier, nutze{' '}
            <Link href={L('/printable-sudoku-with-answers')}>Sudoku zum Ausdrucken mit Lösungen</Link>,
            das einen vollständigen Lösungsschlüssel ans Ende des PDFs setzt. Diese Seite hilft,
            wenn du keinen Schlüssel gedruckt oder ihn verloren hast.
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
            Regardez sous la grille. Chaque grille imprime son code à gauche, un dièse suivi de six
            caractères, avec la difficulté et le nombre d’indices à droite. Sur une feuille à quatre
            ou six grilles par page, chaque grille a son propre code : vous pouvez rechercher une
            solution sans gâcher le reste de la page.
          </p>
          <p>
            Pour avoir les solutions sur papier dès le départ, utilisez{' '}
            <Link href={L('/printable-sudoku-with-answers')}>sudoku à imprimer avec solutions</Link>,
            qui place un corrigé complet à la fin du PDF. Servez-vous de cette page si vous n’avez
            pas imprimé de corrigé ou si vous l’avez perdu.
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
            Mira bajo la cuadrícula. Cada sudoku imprime su código a la izquierda, una almohadilla
            seguida de seis caracteres, con la dificultad y el número de pistas a la derecha. En una
            hoja con cuatro o seis sudokus por página, cada cuadrícula tiene su propio código, así
            que puedes buscar la solución de uno sin estropear el resto de la página.
          </p>
          <p>
            Para tener las soluciones en papel desde el principio, usa{' '}
            <Link href={L('/printable-sudoku-with-answers')}>sudoku para imprimir con soluciones</Link>,
            que añade las soluciones completas al final del PDF. Usa esta página cuando no las
            imprimiste o las has perdido.
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
          Look under the grid. Each puzzle prints its code on the left, a hash followed by six
          characters, with the difficulty and clue count on the right. On a sheet with four or six
          puzzles to a page, each grid has its own code, so you can look up one puzzle without
          spoiling the rest of the page.
        </p>
        <p>
          To get the answers on paper from the start, use{' '}
          <Link href={L('/printable-sudoku-with-answers')}>printable sudoku with answers</Link>,
          which puts a full key at the back of the PDF. Use this page when you did not print a key
          or have lost it.
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
    mid: ' makes a fresh set at any difficulty, including runs that mix levels. If you are checking a grid because you got stuck, ',
    link2: 'the solving techniques guide',
    post: ' can get you moving again without giving away the answer.',
  },
  de: {
    heading: 'Brauchst du mehr Rätsel?',
    pre: 'Der ',
    link1: 'kostenlose Sudoku-Generator zum Ausdrucken',
    mid: ' erstellt dir ein frisches Set in jeder Schwierigkeit, auch mit gemischten Stufen. Prüfst du ein Raster, weil du hängen geblieben bist, bringt dich ',
    link2: 'die Anleitung zu Lösungstechniken',
    post: ' vielleicht weiter, ohne die Lösung zu verraten.',
  },
  fr: {
    heading: 'Besoin de plus de grilles ?',
    pre: 'Le ',
    link1: 'générateur gratuit de sudoku à imprimer',
    mid: ' vous compose un nouveau lot à n’importe quelle difficulté, y compris en mélangeant les niveaux. Si vous vérifiez une grille parce que vous êtes bloqué, ',
    link2: 'le guide des techniques de résolution',
    post: ' peut vous relancer sans révéler la réponse.',
  },
  es: {
    heading: '¿Necesitas más sudokus?',
    pre: 'El ',
    link1: 'generador gratuito de sudoku para imprimir',
    mid: ' te prepara un set nuevo en cualquier dificultad, también con niveles mezclados. Si estás comprobando una cuadrícula porque te atascaste, ',
    link2: 'la guía de técnicas de resolución',
    post: ' puede ayudarte a avanzar sin desvelar la respuesta.',
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
