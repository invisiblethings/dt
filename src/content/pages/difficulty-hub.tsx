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
    title: 'Sudoku Puzzles Printable: Every Difficulty, Free PDF',
    description:
      'All four printable sudoku levels in one place, from 45-clue easy grids to 20-clue expert ones. Pick a level and download a free PDF with answers.',
    h1: 'Sudoku puzzles printable at four difficulty levels',
    lede: 'Every level uses the same generator and the same one-solution check. The levels differ in how much of the grid you start with. Pick a level and the generator opens with it already set.',
    intro: [
      'One number sets the difficulty of a sudoku: how many of the 81 cells you start with. An easy puzzle gives you 38 to 45, and you can solve it by scanning alone. An expert puzzle gives you 20 to 24, and you will not place a single cell until you have pencilled in the whole board. The four levels below differ only in how many clues the generator leaves.',
      'Each level is free, prints one, two, four or six to a page on A4 or US Letter, and can carry a full answer key. If you are unsure where to start, try medium: the level a newspaper prints midweek.',
    ],
    sampleStatus: 'sample sheet',
    levelsHeading: 'Choose a level',
    otherHeading: 'Other ways to print',
    otherP1Before: 'If you need the solutions as well as the puzzles, the ',
    otherP1Link1: 'printable sudoku with answers',
    otherP1Mid: ' page starts with the answer key switched on and explains its layout. If you print for a group and want to save paper, ',
    otherP1Link2: '4 per page sudoku printable',
    otherP1After: ' covers the denser layouts and the grid size each one gives.',
    otherP2Before: 'To mix levels in a single batch, say a warm-up easy grid, a couple of mediums and one hard grid at the back, use the ',
    otherP2Link: 'main generator',
    otherP2After: '. Select more than one difficulty and it splits the puzzles evenly across the levels you pick.',
    breadcrumbLabel: 'Printable sudoku',
  },
  de: {
    title: 'Sudoku zum Ausdrucken: Jede Schwierigkeit, Kostenloses PDF',
    description:
      'Alle vier Sudoku-Stufen zum Ausdrucken an einem Ort, von einfachen Rastern mit 45 Hinweisen bis zu Experten-Rastern mit 20. Wähle eine Stufe und lade ein kostenloses PDF mit Lösungen herunter.',
    h1: 'Sudoku zum Ausdrucken in vier Schwierigkeitsstufen',
    lede: 'Jede Stufe nutzt denselben Generator und dieselbe Prüfung auf eine Lösung. Die Stufen unterscheiden sich darin, wie viel vom Raster du am Anfang bekommst. Wähle eine Stufe, und der Generator öffnet sich bereits darauf eingestellt.',
    intro: [
      'Eine einzige Zahl bestimmt die Schwierigkeit eines Sudoku: wie viele der 81 Felder du zu Beginn bekommst. Ein einfaches Rätsel gibt dir 38 bis 45, und du löst es allein durch Absuchen. Ein Experten-Rätsel gibt dir 20 bis 24, und du setzt kein einziges Feld, bevor du das ganze Raster mit Bleistift notiert hast. Die vier Stufen unten unterscheiden sich nur darin, wie viele Hinweise der Generator stehen lässt.',
      'Jede Stufe ist kostenlos, lässt sich mit eins, zwei, vier oder sechs pro Seite auf A4 oder US Letter drucken und kann einen vollständigen Lösungsschlüssel tragen. Weißt du nicht, wo du anfangen sollst, probiere mittel: die Stufe, die eine Zeitung unter der Woche abdruckt.',
    ],
    sampleStatus: 'Musterblatt',
    levelsHeading: 'Wähle eine Stufe',
    otherHeading: 'Andere Möglichkeiten zu drucken',
    otherP1Before: 'Brauchst du die Lösungen zusätzlich zu den Rätseln, startet die Seite ',
    otherP1Link1: 'Sudoku zum Ausdrucken mit Lösungen',
    otherP1Mid: ' bereits mit eingeschaltetem Lösungsschlüssel und erklärt seinen Aufbau. Druckst du für eine Gruppe und willst Papier sparen, zeigt ',
    otherP1Link2: '4 Sudokus pro Seite ausdrucken',
    otherP1After: ' die dichteren Layouts und die Rastergröße, die jedes davon ergibt.',
    otherP2Before: 'Um Stufen in einer Auflage zu mischen, etwa ein einfaches Aufwärmraster, ein paar mittelschwere und ein schweres am Ende, nutze den ',
    otherP2Link: 'Hauptgenerator',
    otherP2After: '. Wähle mehr als eine Schwierigkeit, und er verteilt die Rätsel gleichmäßig auf die gewählten Stufen.',
    breadcrumbLabel: 'Sudoku zum Ausdrucken',
  },
  fr: {
    title: 'Sudoku à Imprimer : Toutes Difficultés, PDF Gratuit',
    description:
      'Les quatre niveaux de sudoku à imprimer réunis en un seul endroit, des grilles faciles à 45 indices aux grilles expert à 20. Choisissez un niveau et téléchargez un PDF gratuit avec les solutions.',
    h1: 'Sudoku à imprimer, quatre niveaux de difficulté',
    lede: 'Tous les niveaux utilisent le même générateur et la même vérification d’unicité. Ils diffèrent par la part de la grille remplie au départ. Choisissez un niveau, et le générateur s’ouvre déjà réglé dessus.',
    intro: [
      'Un seul chiffre fixe la difficulté d’un sudoku : le nombre de cases, sur 81, que vous recevez au départ. Une grille facile vous en donne 38 à 45, et vous la résolvez par balayage. Une grille expert vous en donne 20 à 24, et vous ne placerez pas une seule case avant d’avoir annoté tout le plateau au crayon. Les quatre niveaux ci-dessous ne diffèrent que par le nombre d’indices que le générateur laisse.',
      'Chaque niveau est gratuit, s’imprime à une, deux, quatre ou six grilles par page en A4 ou US Letter, et peut porter un corrigé complet. Si vous hésitez, essayez le niveau moyen : celui qu’un journal publie en milieu de semaine.',
    ],
    sampleStatus: 'feuille d’exemple',
    levelsHeading: 'Choisir un niveau',
    otherHeading: 'Autres façons d’imprimer',
    otherP1Before: 'Si vous avez besoin des solutions en plus des grilles, la page ',
    otherP1Link1: 'sudoku à imprimer avec solutions',
    otherP1Mid: ' démarre avec le corrigé activé et explique sa mise en page. Si vous imprimez pour un groupe et voulez économiser du papier, ',
    otherP1Link2: '4 sudokus par page à imprimer',
    otherP1After: ' présente les mises en page plus denses et la taille de grille de chacune.',
    otherP2Before: 'Pour mélanger les niveaux dans un même lot, par exemple une grille facile pour s’échauffer, quelques moyennes et une difficile à la fin, utilisez le ',
    otherP2Link: 'générateur principal',
    otherP2After: '. Sélectionnez plusieurs difficultés, et il répartit les grilles équitablement entre les niveaux choisis.',
    breadcrumbLabel: 'Sudoku à imprimer',
  },
  es: {
    title: 'Sudoku para Imprimir: Todas las Dificultades, PDF Gratis',
    description:
      'Los cuatro niveles de sudoku para imprimir en un solo sitio, desde cuadrículas fáciles de 45 pistas hasta expertas de 20. Elige un nivel y descarga un PDF gratis con soluciones.',
    h1: 'Sudoku para imprimir en cuatro niveles de dificultad',
    lede: 'Todos los niveles usan el mismo generador y la misma comprobación de solución única. Se diferencian en cuánta cuadrícula recibes al empezar. Elige un nivel y el generador se abre ya configurado con él.',
    intro: [
      'Un solo número fija la dificultad de un sudoku: cuántas de las 81 casillas recibes al empezar. Un sudoku fácil te da de 38 a 45, y lo resuelves repasando la cuadrícula. Un sudoku experto te da de 20 a 24, y no colocarás ni una casilla hasta haber anotado a lápiz todo el tablero. Los cuatro niveles de abajo solo se diferencian en cuántas pistas deja el generador.',
      'Cada nivel es gratis, se imprime a uno, dos, cuatro o seis por página en A4 o US Letter, y puede llevar las soluciones completas. Si no sabes por dónde empezar, prueba el nivel medio: el que publica un periódico entre semana.',
    ],
    sampleStatus: 'hoja de muestra',
    levelsHeading: 'Elige un nivel',
    otherHeading: 'Otras formas de imprimir',
    otherP1Before: 'Si necesitas las soluciones además de los sudokus, la página ',
    otherP1Link1: 'sudoku para imprimir con soluciones',
    otherP1Mid: ' empieza con las soluciones activadas y explica cómo se organizan. Si imprimes para un grupo y quieres ahorrar papel, ',
    otherP1Link2: '4 sudokus por página para imprimir',
    otherP1After: ' repasa los diseños más compactos y el tamaño de cuadrícula que da cada uno.',
    otherP2Before: 'Para mezclar niveles en un mismo lote, por ejemplo un sudoku fácil de calentamiento, un par de nivel medio y uno difícil al final, usa el ',
    otherP2Link: 'generador principal',
    otherP2After: '. Selecciona más de una dificultad y reparte los sudokus de forma equitativa entre los niveles elegidos.',
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
