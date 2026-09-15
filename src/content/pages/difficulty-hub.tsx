import Link from 'next/link';
import { JsonLd } from '@/components/json-ld';
import { Shell } from '@/components/shell';
import { PageHero } from '@/components/page-hero';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { PreviewSheet } from '@/components/preview-sheet';
import { getDictionary } from '@/i18n/dictionary';
import { SAMPLE_PUZZLES } from '@/lib/samples';
import { DIFFICULTY_CONTENT, DIFFICULTY_ORDER } from '@/content/difficulty';
import { localizedPath, type Locale } from '@/i18n/config';
import { breadcrumbSchema, pageMetadata } from '@/lib/seo';

const META: Record<
  Locale,
  {
    title: string;
    description: string;
    h1: string;
    lede: string;
    intro: string[];
    sampleStatus: string;
    levelsHeading: string;
    otherHeading: string;
    otherP1Before: string;
    otherP1Link1: string;
    otherP1Mid: string;
    otherP1Link2: string;
    otherP1After: string;
    otherP2Before: string;
    otherP2Link: string;
    otherP2After: string;
    breadcrumbLabel: string;
  }
> = {
  en: {
    title: 'Sudoku Puzzles Printable — Every Difficulty, Free PDF',
    description:
      'All four printable sudoku levels in one place, from 45-clue easy grids to 20-clue expert ones. Pick a level and download a free PDF with answers.',
    h1: 'Sudoku puzzles printable at four difficulty levels',
    lede: 'The same generator and the same one-solution guarantee at every level — what changes is how much of the grid is filled in when you sit down. Pick the level that suits you and the generator opens with it already set.',
    intro: [
      'Difficulty in sudoku comes down to one number: how many of the 81 cells are given to you at the start. An easy puzzle hands you 38 to 45 and can be solved by scanning alone. An expert puzzle hands you 20 to 24 and will not give up a single cell until the whole board is pencilled in. The four levels below are the same puzzles pared back by different amounts.',
      'Every level is free, every level can be printed one, two, four or six to a page on A4 or US Letter, and every level can carry a full answer key. If you are not sure where to start, medium is the level a newspaper prints midweek and the one most people settle at.',
    ],
    sampleStatus: 'sample sheet',
    levelsHeading: 'Choose a level',
    otherHeading: 'Other ways to print',
    otherP1Before: 'If what you need is the solutions as well as the puzzles, the ',
    otherP1Link1: 'printable sudoku with answers',
    otherP1Mid: ' page starts with the answer key switched on and explains how the key is laid out. If you are printing for a group and want to spend less paper, ',
    otherP1Link2: '4 per page sudoku printable',
    otherP1After: ' covers the denser layouts and what size the grids actually come out.',
    otherP2Before: 'And if you want to mix levels in a single batch — a warm-up easy grid, a couple of mediums, one hard one at the back — the ',
    otherP2Link: 'main generator',
    otherP2After: ' lets you select more than one difficulty for a single run, with puzzles split evenly across the levels you pick.',
    breadcrumbLabel: 'Printable sudoku',
  },
  de: {
    title: 'Sudoku zum Ausdrucken — Jede Schwierigkeit, Kostenloses PDF',
    description:
      'Alle vier Sudoku-Stufen zum Ausdrucken an einem Ort, von einfachen Rastern mit 45 Hinweisen bis zu Experten-Rastern mit 20. Wähle eine Stufe und lade ein kostenloses PDF mit Lösungen herunter.',
    h1: 'Sudoku zum Ausdrucken in vier Schwierigkeitsstufen',
    lede: 'Derselbe Generator und dieselbe Garantie auf eine Lösung auf jeder Stufe — was sich ändert, ist, wie viel vom Raster schon ausgefüllt ist, wenn du dich hinsetzt. Wähle die Stufe, die zu dir passt, und der Generator öffnet sich bereits darauf eingestellt.',
    intro: [
      'Schwierigkeit bei Sudoku läuft auf eine einzige Zahl hinaus: wie viele der 81 Felder du zu Beginn vorgegeben bekommst. Ein einfaches Rätsel gibt dir 38 bis 45 und lässt sich allein durch Absuchen lösen. Ein Experten-Rätsel gibt dir 20 bis 24 und rückt kein einziges Feld heraus, bis das gesamte Feld mit Bleistift durchgearbeitet ist. Die vier Stufen unten sind dieselben Rätsel, nur um unterschiedlich viel ausgedünnt.',
      'Jede Stufe ist kostenlos, jede Stufe lässt sich mit eins, zwei, vier oder sechs pro Seite auf A4 oder US Letter drucken, und jede Stufe kann einen vollständigen Lösungsschlüssel tragen. Wenn du nicht weißt, wo du anfangen sollst: mittel ist die Stufe, die eine Zeitung mittwochs abdruckt, und die Stufe, bei der die meisten Leute bleiben.',
    ],
    sampleStatus: 'Musterblatt',
    levelsHeading: 'Wähle eine Stufe',
    otherHeading: 'Andere Möglichkeiten zu drucken',
    otherP1Before: 'Brauchst du sowohl die Lösungen als auch die Rätsel, startet die Seite ',
    otherP1Link1: 'Sudoku zum Ausdrucken mit Lösungen',
    otherP1Mid: ' bereits mit eingeschaltetem Lösungsschlüssel und erklärt, wie er aufgebaut ist. Druckst du für eine Gruppe und willst weniger Papier verbrauchen, zeigt ',
    otherP1Link2: '4 Sudokus pro Seite ausdrucken',
    otherP1After: ' die dichteren Layouts und wie groß die Raster dabei tatsächlich werden.',
    otherP2Before: 'Und willst du Stufen in einer einzigen Auflage mischen — ein einfaches Aufwärmraster, ein paar mittelschwere, ein schweres am Ende — erlaubt dir der ',
    otherP2Link: 'Hauptgenerator',
    otherP2After: ', mehr als eine Schwierigkeit für eine Auflage auszuwählen, wobei die Rätsel gleichmäßig auf die gewählten Stufen verteilt werden.',
    breadcrumbLabel: 'Sudoku zum Ausdrucken',
  },
  fr: {
    title: 'Sudoku à Imprimer — Toutes Difficultés, PDF Gratuit',
    description:
      'Les quatre niveaux de sudoku à imprimer réunis en un seul endroit, des grilles faciles à 45 indices aux grilles expert à 20. Choisissez un niveau et téléchargez un PDF gratuit avec les solutions.',
    h1: 'Sudoku à imprimer, quatre niveaux de difficulté',
    lede: 'Le même générateur et la même garantie d’une seule solution à tous les niveaux — ce qui change, c’est la part de la grille déjà remplie quand vous vous y mettez. Choisissez le niveau qui vous convient, le générateur s’ouvre déjà réglé dessus.',
    intro: [
      'La difficulté d’un sudoku se résume à un seul chiffre : combien des 81 cases vous sont données au départ. Une grille facile vous en donne 38 à 45 et se résout par simple balayage. Une grille expert vous en donne 20 à 24 et ne cédera pas une seule case tant que tout le plateau n’aura pas été annoté au crayon. Les quatre niveaux ci-dessous sont les mêmes grilles, réduites à des degrés différents.',
      'Chaque niveau est gratuit, chaque niveau peut s’imprimer à une, deux, quatre ou six grilles par page en A4 ou US Letter, et chaque niveau peut porter un corrigé complet. Si vous ne savez pas par où commencer, moyen est le niveau qu’un journal publie en milieu de semaine, et celui où la plupart des gens se fixent.',
    ],
    sampleStatus: 'feuille d’exemple',
    levelsHeading: 'Choisir un niveau',
    otherHeading: 'Autres façons d’imprimer',
    otherP1Before: 'Si vous avez besoin des solutions en plus des grilles, la page ',
    otherP1Link1: 'sudoku à imprimer avec solutions',
    otherP1Mid: ' démarre avec le corrigé déjà activé et explique comment il est mis en page. Si vous imprimez pour un groupe et voulez économiser du papier, ',
    otherP1Link2: '4 sudokus par page à imprimer',
    otherP1After: ' couvre les mises en page plus denses et la taille réelle des grilles obtenues.',
    otherP2Before: 'Et si vous voulez mélanger les niveaux dans un même lot — une grille facile pour s’échauffer, quelques moyennes, une difficile à la fin — le ',
    otherP2Link: 'générateur principal',
    otherP2After: ' vous permet de sélectionner plusieurs difficultés pour un même tirage, les grilles étant réparties équitablement entre les niveaux choisis.',
    breadcrumbLabel: 'Sudoku à imprimer',
  },
  es: {
    title: 'Sudoku para Imprimir — Todas las Dificultades, PDF Gratis',
    description:
      'Los cuatro niveles de sudoku para imprimir en un solo sitio, desde cuadrículas fáciles de 45 pistas hasta expertas de 20. Elige un nivel y descarga un PDF gratis con soluciones.',
    h1: 'Sudoku para imprimir en cuatro niveles de dificultad',
    lede: 'El mismo generador y la misma garantía de una única solución en todos los niveles — lo que cambia es cuánta parte de la cuadrícula ya está rellena cuando te sientas. Elige el nivel que te convenga y el generador se abre ya configurado con él.',
    intro: [
      'La dificultad en el sudoku se reduce a un número: cuántas de las 81 casillas se te dan al empezar. Un sudoku fácil te da de 38 a 45 y se resuelve solo con repasar la cuadrícula. Un sudoku experto te da de 20 a 24 y no te va a ceder ni una casilla hasta que todo el tablero esté anotado a lápiz. Los cuatro niveles de abajo son los mismos sudokus, reducidos en distinta medida.',
      'Todos los niveles son gratis, todos se pueden imprimir a uno, dos, cuatro o seis por página en A4 o US Letter, y todos pueden llevar las soluciones completas. Si no sabes por dónde empezar, medio es el nivel que publica un periódico entre semana, y el que elige la mayoría.',
    ],
    sampleStatus: 'hoja de muestra',
    levelsHeading: 'Elige un nivel',
    otherHeading: 'Otras formas de imprimir',
    otherP1Before: 'Si necesitas tanto las soluciones como los sudokus, la página ',
    otherP1Link1: 'sudoku para imprimir con soluciones',
    otherP1Mid: ' empieza ya con las soluciones activadas y explica cómo están organizadas. Si imprimes para un grupo y quieres gastar menos papel, ',
    otherP1Link2: '4 sudokus por página para imprimir',
    otherP1After: ' repasa los diseños más compactos y el tamaño real que salen las cuadrículas.',
    otherP2Before: 'Y si quieres mezclar niveles en un mismo lote — un sudoku fácil de calentamiento, un par de nivel medio, uno difícil al final — el ',
    otherP2Link: 'generador principal',
    otherP2After: ' te permite seleccionar más de una dificultad para una misma tirada, repartiendo los sudokus de forma equitativa entre los niveles elegidos.',
    breadcrumbLabel: 'Sudoku para imprimir',
  },
};

export function getDifficultyHubMetadata(locale: Locale) {
  const t = META[locale];
  return pageMetadata({ title: t.title, description: t.description, path: '/printable-sudoku', locale });
}

export function DifficultyHubPage({ locale }: { locale: Locale }) {
  const t = META[locale];
  const dict = getDictionary(locale);
  const content = DIFFICULTY_CONTENT[locale];
  const L = (p: string) => localizedPath(locale, p);

  const trail = [
    { name: dict.breadcrumbHome, path: '/' },
    { name: t.breadcrumbLabel, path: '/printable-sudoku' },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(locale, trail)} />

      <Shell className="py-10 shelf:py-14">
        <Breadcrumbs trail={trail.map((c) => ({ ...c, path: L(c.path) }))} ariaLabel={dict.breadcrumbAriaLabel} />

        <div className="grid items-start gap-10 shelf:grid-cols-[minmax(0,1fr)_360px]">
          <div>
            <PageHero h1={t.h1} lede={t.lede} />
            <div className="prose-press mt-6 max-w-prose">
              {t.intro.map((p) => (
                <p key={p.slice(0, 30)}>{p}</p>
              ))}
            </div>
          </div>

          <div className="flex justify-center pt-2">
            <PreviewSheet
              cells={SAMPLE_PUZZLES.hard.clues}
              code={SAMPLE_PUZZLES.hard.code}
              difficulty="hard"
              clueCount={SAMPLE_PUZZLES.hard.clueCount}
              locale={locale}
              status={t.sampleStatus}
            />
          </div>
        </div>

        <section aria-labelledby="levels-heading" className="mt-16">
          <h2 id="levels-heading" className="m-0 font-display text-[24px] font-bold">
            {t.levelsHeading}
          </h2>
          <ul className="mt-6 list-none space-y-4 p-0">
            {DIFFICULTY_ORDER.map((key) => {
              const d = content[key];
              return (
                <li key={key}>
                  <Link
                    href={L(`/printable-sudoku/${key}`)}
                    className="press-card group block p-6 no-underline transition-colors hover:border-stamp/60"
                  >
                    <span className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <span className="font-display text-[19px] font-bold text-ink group-hover:text-stamp">
                        {dict.difficultyCards.titlePrefix(d.name)}
                      </span>
                      <span className="font-mono text-[11px] text-ink-soft">
                        {d.clueRange} · {d.typicalTime}
                      </span>
                    </span>
                    <span className="mt-2 block max-w-prose text-[14.5px] leading-relaxed text-ink-soft">
                      {d.body[0].split('. ').slice(0, 2).join('. ')}.
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        <section aria-labelledby="other-heading" className="mt-16 max-w-prose">
          <h2 id="other-heading" className="m-0 font-display text-[24px] font-bold">
            {t.otherHeading}
          </h2>
          <div className="prose-press mt-4">
            <p>
              {t.otherP1Before}
              <Link href={L('/printable-sudoku-with-answers')}>{t.otherP1Link1}</Link>
              {t.otherP1Mid}
              <Link href={L('/printable-sudoku-4-per-page')}>{t.otherP1Link2}</Link>
              {t.otherP1After}
            </p>
            <p>
              {t.otherP2Before}
              <Link href={L('/')}>{t.otherP2Link}</Link>
              {t.otherP2After}
            </p>
          </div>
        </section>
      </Shell>
    </>
  );
}
