import Link from 'next/link';
import { Generator } from '@/components/generator';
import { Faq } from '@/components/faq';
import { JsonLd } from '@/components/json-ld';
import { Shell } from '@/components/shell';
import { PageHero } from '@/components/page-hero';
import { DifficultyCards } from '@/components/difficulty-cards';
import { SAMPLE_PUZZLES } from '@/lib/samples';
import { SITE_FAQS } from '@/content/faqs';
import { localizedPath, type Locale } from '@/i18n/config';
import { faqPageSchema, pageMetadata, webApplicationSchema } from '@/lib/seo';

interface Meta {
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  lede: string;
  genHeading: string;
  genSubheading: string;
  appDescription: string;
  layoutsHeading: string;
  layoutsIntro: string;
  tableCaption: string;
  colPerPage: string;
  colArrangement: string;
  colGridSize: string;
  colBestFor: string;
  layouts: { n: string; shape: string; grid: string; use: string }[];
  whyHeading: string;
  whyBody: string[];
  printNoteBefore: string;
  printNoteLink: string;
  printNoteAfter: string;
  faqHeading: string;
  levelsHeading: string;
  chooseLevel: string;
  orGoTo: string;
  mainGenerator: string;
  toChange: string;
}

const META: Record<Locale, Meta> = {
  en: {
    title: '4 Per Page Sudoku Printable: Free PDF, 4 to a Sheet',
    description:
      'Print four sudoku puzzles per page and cut your paper use in half. Free PDF in A4 or US Letter, any difficulty, with a matching four-up answer key.',
    eyebrow: 'four grids to a sheet',
    h1: '4 per page sudoku printable: four puzzles on every sheet',
    lede: 'The paper-saving layout. Four grids in two columns of two, each around 8 cm square, with the answer key laid out four-up to match.',
    genHeading: 'Set a four-up run',
    genSubheading: 'layout is already set to 4 per page',
    appDescription: 'Generate printable sudoku laid out four puzzles to a page and download it as a PDF.',
    layoutsHeading: 'Grid size for each layout',
    layoutsIntro: 'Grid sizes below are for A4 with the standard 16 mm margins; US Letter is a couple of millimetres wider and slightly shorter, so the numbers land within a millimetre or two of these.',
    tableCaption: 'Sudoku grid size and recommended use for each puzzles-per-page layout',
    colPerPage: 'Per page',
    colArrangement: 'Arrangement',
    colGridSize: 'Grid size',
    colBestFor: 'Best for',
    layouts: [
      { n: '1', shape: 'one full-page grid', grid: '~17 cm square', use: 'Expert puzzles, large print, anyone writing lots of candidates.' },
      { n: '2', shape: 'two stacked grids', grid: '~12 cm square', use: 'The everyday default. Room for pencil marks, still economical.' },
      { n: '4', shape: 'two columns of two', grid: '~8 cm square', use: 'Travel packs, classroom sets, easy and medium batches.' },
      { n: '6', shape: 'two columns of three', grid: '~6.5 cm square', use: 'Maximum puzzles per sheet. Best for easy grids.' },
    ],
    whyHeading: 'When to print four per page',
    whyBody: [
      'Print four-up when you want volume. A run of forty puzzles takes ten sheets instead of twenty, or five if your printer prints both sides. At about 9 mm a cell, the grids match a newspaper sudoku, and you can solve them with a pencil. For a school set, a care-home activity folder or a holiday stack, pick this layout.',
      'Skip it for hard and expert grids. Those need candidate marks in nearly every empty cell, and a 9 mm cell leaves no room for three small digits in a corner. At those levels, print two per page and accept the extra paper, since a misread pencil mark can cost you the whole puzzle.',
    ],
    printNoteBefore: 'Print at 100% instead of "fit to page". The PDF already has generous margins, and scaling it down shrinks the cells for no benefit. The guide to ',
    printNoteLink: 'printing sudoku that looks right',
    printNoteAfter: ' covers this in more detail.',
    faqHeading: 'Four per page: questions',
    levelsHeading: 'Choose a difficulty for your four-up set',
    chooseLevel: '',
    orGoTo: 'Or go to the ',
    mainGenerator: 'main printable sudoku generator',
    toChange: ' to change every setting at once.',
  },
  de: {
    title: '4 Sudokus pro Seite Ausdrucken: Kostenloses PDF, 4 auf einem Blatt',
    description:
      'Drucke vier Sudoku-Rätsel pro Seite und halbiere deinen Papierverbrauch. Kostenloses PDF in A4 oder US Letter, jede Schwierigkeit, mit passendem Lösungsschlüssel zu viert pro Seite.',
    eyebrow: 'vier Raster pro Blatt',
    h1: '4 Sudokus pro Seite ausdrucken: vier Rätsel auf jedem Blatt',
    lede: 'Das papiersparende Layout. Vier Raster in zwei Spalten zu je zwei, jedes rund 8 cm im Quadrat, mit passend gesetztem Lösungsschlüssel zu viert pro Seite.',
    genHeading: 'Vierer-Auflage festlegen',
    genSubheading: 'Layout ist bereits auf 4 pro Seite gestellt',
    appDescription: 'Erstellt Sudoku zum Ausdrucken im Layout mit vier Rätseln pro Seite und lädt es als PDF herunter.',
    layoutsHeading: 'Rastergröße für jedes Layout',
    layoutsIntro: 'Die Rastergrößen unten gelten für A4 mit den üblichen 16-mm-Rändern; US Letter ist ein paar Millimeter breiter und etwas kürzer, sodass die Zahlen um ein, zwei Millimeter abweichen können.',
    tableCaption: 'Sudoku-Rastergröße und empfohlene Verwendung für jedes Rätsel-pro-Seite-Layout',
    colPerPage: 'Pro Seite',
    colArrangement: 'Anordnung',
    colGridSize: 'Rastergröße',
    colBestFor: 'Am besten für',
    layouts: [
      { n: '1', shape: 'ein Raster auf voller Seite', grid: '~17 cm im Quadrat', use: 'Experten-Rätsel, Großdruck, alle, die viele Kandidaten notieren.' },
      { n: '2', shape: 'zwei übereinander', grid: '~12 cm im Quadrat', use: 'Der Alltags-Standard. Platz für Bleistiftnotizen, trotzdem sparsam.' },
      { n: '4', shape: 'zwei Spalten zu je zwei', grid: '~8 cm im Quadrat', use: 'Reisesets, Klassensätze, einfache und mittelschwere Auflagen.' },
      { n: '6', shape: 'zwei Spalten zu je drei', grid: '~6,5 cm im Quadrat', use: 'Maximal viele Rätsel pro Blatt. Am besten für einfache Raster.' },
    ],
    whyHeading: 'Wann du vier pro Seite drucken solltest',
    whyBody: [
      'Drucke vier pro Seite, wenn du Menge willst. Eine Auflage von vierzig Rätseln braucht zehn Blätter statt zwanzig, oder fünf bei beidseitigem Druck. Mit rund 9 mm pro Feld sind die Raster so groß wie ein Zeitungs-Sudoku, und du kannst sie mit Bleistift lösen. Für einen Klassensatz, eine Beschäftigungsmappe im Pflegeheim oder einen Stapel für den Urlaub nimm dieses Layout.',
      'Für schwere und Experten-Raster lass es bleiben. Die brauchen Kandidatennotizen in fast jedem leeren Feld, und ein 9-mm-Feld lässt keinen Platz für drei kleine Ziffern in einer Ecke. Auf diesen Stufen drucke zwei pro Seite und nimm das zusätzliche Papier in Kauf, denn eine falsch gelesene Bleistiftnotiz kann dich das ganze Rätsel kosten.',
    ],
    printNoteBefore: 'Drucke mit 100 % statt mit „An Seite anpassen“. Das PDF hat bereits großzügige Ränder, und Herunterskalieren verkleinert die Felder ohne Nutzen. Mehr dazu steht in der Anleitung ',
    printNoteLink: 'Sudoku richtig ausdrucken',
    printNoteAfter: '.',
    faqHeading: 'Vier pro Seite: Fragen',
    levelsHeading: 'Wähle eine Schwierigkeit für dein Vierer-Set',
    chooseLevel: '',
    orGoTo: 'Oder gehe zum ',
    mainGenerator: 'Haupt-Sudoku-Generator zum Ausdrucken',
    toChange: ', um jede Einstellung auf einmal zu ändern.',
  },
  fr: {
    title: '4 Sudokus par Page à Imprimer : PDF Gratuit, 4 sur une Feuille',
    description:
      'Imprimez quatre grilles de sudoku par page et divisez par deux votre consommation de papier. PDF gratuit en A4 ou US Letter, toute difficulté, avec corrigé assorti à quatre par page.',
    eyebrow: 'quatre grilles par feuille',
    h1: '4 sudokus par page à imprimer : quatre grilles sur chaque feuille',
    lede: 'La mise en page qui économise le papier. Quatre grilles en deux colonnes de deux, chacune d’environ 8 cm de côté, avec le corrigé mis en page à quatre par page pour correspondre.',
    genHeading: 'Composer un tirage à quatre par page',
    genSubheading: 'la mise en page est déjà réglée sur 4 par page',
    appDescription: 'Génère des sudokus à imprimer disposés à quatre grilles par page et les télécharge en PDF.',
    layoutsHeading: 'Taille de grille selon la mise en page',
    layoutsIntro: 'Les tailles de grille ci-dessous concernent le format A4 avec les marges standards de 16 mm ; le format US Letter est un peu plus large et légèrement plus court, donc les chiffres varient de un à deux millimètres.',
    tableCaption: 'Taille de grille de sudoku et usage recommandé pour chaque mise en page de grilles par page',
    colPerPage: 'Par page',
    colArrangement: 'Disposition',
    colGridSize: 'Taille de grille',
    colBestFor: 'Idéal pour',
    layouts: [
      { n: '1', shape: 'une grille pleine page', grid: '~17 cm de côté', use: 'Grilles expert, gros caractères, pour qui note beaucoup de candidats.' },
      { n: '2', shape: 'deux grilles empilées', grid: '~12 cm de côté', use: 'Le réglage du quotidien. De la place pour les annotations, tout en restant économique.' },
      { n: '4', shape: 'deux colonnes de deux', grid: '~8 cm de côté', use: 'Lots de voyage, classes, tirages faciles et moyens.' },
      { n: '6', shape: 'deux colonnes de trois', grid: '~6,5 cm de côté', use: 'Le maximum de grilles par feuille. Idéal pour les grilles faciles.' },
    ],
    whyHeading: 'Quand imprimer quatre grilles par page',
    whyBody: [
      'Imprimez à quatre par page quand vous voulez du volume. Un tirage de quarante grilles tient sur dix feuilles au lieu de vingt, ou cinq en recto verso. Avec des cases d’environ 9 mm, les grilles ont la taille d’un sudoku de journal, et vous pouvez les résoudre au crayon. Pour un lot scolaire, un dossier d’activités en maison de retraite ou une pile à emporter en vacances, choisissez cette mise en page.',
      'Évitez-la pour les grilles difficiles et expert. Celles-ci demandent des annotations dans presque toutes les cases vides, et une case de 9 mm ne laisse pas de place pour trois petits chiffres dans un coin. À ces niveaux, imprimez deux grilles par page et acceptez le papier supplémentaire, car une annotation mal lue peut vous coûter toute la grille.',
    ],
    printNoteBefore: 'Imprimez à 100 % au lieu d’« ajuster à la page ». Le PDF a déjà des marges généreuses, et le réduire rétrécit les cases sans bénéfice. Pour en savoir plus, consultez le guide ',
    printNoteLink: 'bien imprimer son sudoku',
    printNoteAfter: '.',
    faqHeading: 'Quatre par page : questions',
    levelsHeading: 'Choisissez une difficulté pour votre lot à quatre par page',
    chooseLevel: '',
    orGoTo: 'Ou allez au ',
    mainGenerator: 'générateur principal de sudoku à imprimer',
    toChange: ' pour changer tous les réglages à la fois.',
  },
  es: {
    title: '4 Sudokus por Página para Imprimir: PDF Gratis, 4 en una Hoja',
    description:
      'Imprime cuatro sudokus por página y reduce a la mitad el papel que usas. PDF gratis en A4 o US Letter, cualquier dificultad, con soluciones a juego a cuatro por página.',
    eyebrow: 'cuatro cuadrículas por hoja',
    h1: '4 sudokus por página para imprimir: cuatro sudokus en cada hoja',
    lede: 'El diseño que ahorra papel. Cuatro cuadrículas en dos columnas de dos, cada una de unos 8 cm de lado, con las soluciones maquetadas también a cuatro por página.',
    genHeading: 'Preparar una tirada a cuatro por página',
    genSubheading: 'el diseño ya está puesto en 4 por página',
    appDescription: 'Genera sudokus para imprimir con un diseño de cuatro sudokus por página y los descarga en PDF.',
    layoutsHeading: 'Tamaño de cuadrícula según el diseño',
    layoutsIntro: 'Los tamaños de cuadrícula de abajo son para A4 con los márgenes habituales de 16 mm; US Letter es un poco más ancho y algo más corto, así que las cifras varían uno o dos milímetros.',
    tableCaption: 'Tamaño de cuadrícula de sudoku y uso recomendado para cada diseño de sudokus por página',
    colPerPage: 'Por página',
    colArrangement: 'Disposición',
    colGridSize: 'Tamaño de cuadrícula',
    colBestFor: 'Mejor para',
    layouts: [
      { n: '1', shape: 'una cuadrícula a página completa', grid: '~17 cm de lado', use: 'Sudokus expertos, letra grande, quien anota muchos candidatos.' },
      { n: '2', shape: 'dos cuadrículas apiladas', grid: '~12 cm de lado', use: 'La opción del día a día. Sitio para anotaciones, y sigue siendo económico.' },
      { n: '4', shape: 'dos columnas de dos', grid: '~8 cm de lado', use: 'Paquetes de viaje, sets de clase, tandas fáciles y de nivel medio.' },
      { n: '6', shape: 'dos columnas de tres', grid: '~6,5 cm de lado', use: 'El máximo de sudokus por hoja. Mejor para cuadrículas fáciles.' },
    ],
    whyHeading: 'Cuándo imprimir cuatro por página',
    whyBody: [
      'Imprime a cuatro por página cuando quieras volumen. Una tirada de cuarenta sudokus ocupa diez hojas en vez de veinte, o cinco si tu impresora imprime a doble cara. Con casillas de unos 9 mm, las cuadrículas tienen el tamaño de un sudoku de periódico, y puedes resolverlas a lápiz. Para un set escolar, una carpeta de actividades de una residencia o una pila para las vacaciones, elige este diseño.',
      'Evítalo con cuadrículas difíciles y expertas. Esas necesitan anotaciones en casi todas las casillas vacías, y una casilla de 9 mm no deja sitio para tres números pequeños en una esquina. En esos niveles, imprime dos por página y acepta el papel extra, porque una anotación mal leída puede costarte el sudoku entero.',
    ],
    printNoteBefore: 'Imprime al 100 % en vez de usar «ajustar a la página». El PDF ya tiene márgenes generosos, y reducirlo encoge las casillas sin ningún beneficio. La guía de ',
    printNoteLink: 'cómo imprimir sudokus que se vean bien',
    printNoteAfter: ' lo explica con más detalle.',
    faqHeading: 'Cuatro por página: preguntas',
    levelsHeading: 'Elige una dificultad para tu set a cuatro por página',
    chooseLevel: '',
    orGoTo: 'O ve al ',
    mainGenerator: 'generador principal de sudoku para imprimir',
    toChange: ' para cambiar todos los ajustes a la vez.',
  },
};

export function getFourPerPageMetadata(locale: Locale) {
  const t = META[locale];
  return pageMetadata({ title: t.title, description: t.description, path: '/printable-sudoku-4-per-page', locale });
}

function WhyBody({ paragraphs }: { paragraphs: string[] }) {
  return (
    <>
      {paragraphs.map((p) => (
        <p key={p.slice(0, 30)}>{p}</p>
      ))}
    </>
  );
}

export function FourPerPagePage({ locale }: { locale: Locale }) {
  const t = META[locale];
  const faqs = SITE_FAQS[locale];
  const L = (p: string) => localizedPath(locale, p);

  return (
    <>
      <JsonLd
        data={[
          webApplicationSchema({
            name: '4 per page sudoku printable: PDF generator',
            description: t.appDescription,
            path: '/printable-sudoku-4-per-page',
            locale,
            featureList: [],
          }),
          faqPageSchema(faqs.perPage),
        ]}
      />

      <Shell className="py-10 shelf:py-14">
        <PageHero eyebrow={t.eyebrow} h1={t.h1} lede={t.lede} />

        <div className="mt-10">
          <Generator
            sample={SAMPLE_PUZZLES.easy}
            locale={locale}
            defaultPerPage={4}
            defaultCount={12}
            heading={t.genHeading}
            subheading={t.genSubheading}
          />
        </div>

        <section aria-labelledby="layouts-heading" className="mt-20">
          <h2 id="layouts-heading" className="m-0 font-display text-[24px] font-bold">
            {t.layoutsHeading}
          </h2>
          <p className="mb-6 mt-3 max-w-prose text-[15.5px] leading-relaxed text-ink-soft">{t.layoutsIntro}</p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-left">
              <caption className="sr-only">{t.tableCaption}</caption>
              <thead>
                <tr className="border-b border-line font-mono text-[11px] uppercase tracking-[0.6px] text-ink-soft">
                  <th scope="col" className="py-2.5 pr-4 font-medium">{t.colPerPage}</th>
                  <th scope="col" className="py-2.5 pr-4 font-medium">{t.colArrangement}</th>
                  <th scope="col" className="py-2.5 pr-4 font-medium">{t.colGridSize}</th>
                  <th scope="col" className="py-2.5 font-medium">{t.colBestFor}</th>
                </tr>
              </thead>
              <tbody>
                {t.layouts.map((row) => (
                  <tr key={row.n} className="border-b border-line/70 align-top">
                    <th scope="row" className="py-3 pr-4 font-mono text-[14px] font-medium text-ink">
                      {row.n}
                    </th>
                    <td className="py-3 pr-4 text-[14px] text-ink-soft">{row.shape}</td>
                    <td className="py-3 pr-4 font-mono text-[13px] text-ink-soft">{row.grid}</td>
                    <td className="py-3 text-[14px] text-ink-soft">{row.use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section aria-labelledby="why-heading" className="mt-16 max-w-prose">
          <h2 id="why-heading" className="m-0 font-display text-[24px] font-bold">
            {t.whyHeading}
          </h2>
          <div className="prose-press mt-4">
            <WhyBody paragraphs={t.whyBody} />
            <p>
              {t.printNoteBefore}
              <Link href={L('/guides/how-to-print-sudoku-puzzles')}>{t.printNoteLink}</Link>
              {t.printNoteAfter}
            </p>
          </div>
        </section>

        <Faq items={faqs.perPage} heading={t.faqHeading} />

        <section aria-labelledby="levels-heading" className="mt-16">
          <h2 id="levels-heading" className="m-0 font-display text-[24px] font-bold">
            {t.levelsHeading}
          </h2>
          <div className="mt-6">
            <DifficultyCards locale={locale} />
          </div>
          <p className="mt-6 text-[15px] text-ink-soft">
            {t.orGoTo}
            <Link href={L('/')} className="font-medium text-stamp underline underline-offset-2">
              {t.mainGenerator}
            </Link>
            {t.toChange}
          </p>
        </section>
      </Shell>
    </>
  );
}
