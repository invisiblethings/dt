import Link from 'next/link';
import { JsonLd } from '@/components/json-ld';
import { Shell } from '@/components/shell';
import { PageHero } from '@/components/page-hero';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { getDictionary } from '@/i18n/dictionary';
import { GUIDES_BY_LOCALE } from '@/content/guides';
import { DIFFICULTY_CONTENT } from '@/content/difficulty';
import { localizedPath, type Locale } from '@/i18n/config';
import { breadcrumbSchema, pageMetadata } from '@/lib/seo';

const META: Record<
  Locale,
  { title: string; description: string; h1: string; lede: string; intro: string[]; printHeading: string; printBody: string[] }
> = {
  en: {
    title: 'Sudoku Guides: Solve Better, Print Better',
    description:
      'Practical sudoku guides: how to solve your first grid, the techniques that get you past a stall, and how to print puzzles that are pleasant to work on.',
    h1: 'Sudoku guides',
    lede: 'Three short guides: one to get you solving, one for when a grid stalls, and one on getting a good print.',
    intro: [
      'Few people ever get taught sudoku. You pick up a grid somewhere, work out the rule in about a minute, and then either find your own way through or give up. Plenty of people who would enjoy it give up at that point because nobody showed them the first move.',
      'The first guide assumes no prior knowledge. The second assumes you can finish a medium grid and want to know what to do when a hard one stalls. The third covers the printer settings that decide whether a grid is pleasant to write on.',
    ],
    printHeading: 'Practise on paper',
    printBody: [
      'You learn these techniques by using them. Pick your level (|easy|, |medium|, |hard| or |expert|), print a handful with the answer key, and work them with a pencil. Ten grids will teach you more than these pages can.',
    ],
  },
  de: {
    title: 'Sudoku-Anleitungen: Besser Lösen, Besser Drucken',
    description:
      'Praktische Sudoku-Anleitungen: wie du dein erstes Raster löst, die Techniken, die dich über einen Stillstand hinausbringen, und wie du Rätsel druckst, die angenehm zu bearbeiten sind.',
    h1: 'Sudoku-Anleitungen',
    lede: 'Drei kurze Anleitungen: eine für den Einstieg, eine für den Moment, in dem ein Raster stockt, und eine für einen guten Ausdruck.',
    intro: [
      'Kaum jemandem wird Sudoku beigebracht. Du nimmst dir irgendwo ein Raster, findest die Regel in etwa einer Minute heraus und findest dann entweder selbst einen Weg hindurch oder gibst auf. Viele, denen es Spaß machen würde, geben an dieser Stelle auf, weil ihnen niemand den ersten Zug gezeigt hat.',
      'Die erste Anleitung setzt kein Vorwissen voraus. Die zweite setzt voraus, dass du ein mittelschweres Raster schaffst und wissen willst, was zu tun ist, wenn ein schweres stockt. Die dritte behandelt die Druckereinstellungen, die entscheiden, ob sich ein Raster angenehm beschriften lässt.',
    ],
    printHeading: 'Auf Papier üben',
    printBody: [
      'Du lernst diese Techniken, indem du sie anwendest. Wähle deine Stufe (|easy|, |medium|, |hard| oder |expert|), drucke eine Handvoll mit Lösungsschlüssel und arbeite sie mit einem Bleistift durch. Zehn Raster bringen dir mehr bei, als diese Seiten es können.',
    ],
  },
  fr: {
    title: 'Guides Sudoku : Mieux Résoudre, Mieux Imprimer',
    description:
      'Guides pratiques du sudoku : comment résoudre votre première grille, les techniques qui vous font franchir un blocage, et comment imprimer des grilles agréables à travailler.',
    h1: 'Guides sudoku',
    lede: 'Trois guides courts : un pour vous lancer, un pour le moment où une grille bloque, et un pour réussir l’impression.',
    intro: [
      'Presque personne n’apprend le sudoku auprès de quelqu’un. On tombe sur une grille quelque part, on en déduit la règle en une minute environ, puis on trouve son propre chemin ou on abandonne. Beaucoup de gens qui y prendraient plaisir abandonnent à ce moment-là, parce que personne ne leur a montré le premier coup.',
      'Le premier guide ne suppose aucune connaissance préalable. Le second suppose que vous savez terminer une grille moyenne et voulez savoir quoi faire quand une grille difficile bloque. Le troisième couvre les réglages d’impression qui décident si une grille est agréable à annoter.',
    ],
    printHeading: 'S’entraîner sur papier',
    printBody: [
      'Vous apprenez ces techniques en les appliquant. Choisissez votre niveau (|easy|, |medium|, |hard| ou |expert|), imprimez-en quelques-unes avec le corrigé et travaillez-les au crayon. Dix grilles vous en apprendront plus que ces pages.',
    ],
  },
  es: {
    title: 'Guías de Sudoku: Resuelve Mejor, Imprime Mejor',
    description:
      'Guías prácticas de sudoku: cómo resolver tu primera cuadrícula, las técnicas que te sacan de un bloqueo, y cómo imprimir sudokus agradables de trabajar.',
    h1: 'Guías de sudoku',
    lede: 'Tres guías breves: una para empezar a resolver, otra para cuando una cuadrícula se atasca y otra para conseguir una buena impresión.',
    intro: [
      'Casi a nadie le enseñan sudoku. Te encuentras una cuadrícula en algún sitio, averiguas la regla en un minuto más o menos, y luego encuentras tu propio camino o lo dejas. Mucha gente a la que le gustaría lo deja en ese punto, porque nadie le enseñó el primer movimiento.',
      'La primera guía no da por hecho ningún conocimiento previo. La segunda da por hecho que puedes terminar una cuadrícula de nivel medio y quieres saber qué hacer cuando una difícil se atasca. La tercera trata los ajustes de impresión que deciden si una cuadrícula resulta cómoda para escribir.',
    ],
    printHeading: 'Practica en papel',
    printBody: [
      'Aprendes estas técnicas usándolas. Elige tu nivel (|easy|, |medium|, |hard| o |expert|), imprime unos cuantos con las soluciones y trabájalos a lápiz. Diez cuadrículas te enseñarán más que estas páginas.',
    ],
  },
};

/** Turns |easy|-style tokens into real links, with the level name translated per locale. */
function withLevelLinks(text: string, locale: Locale) {
  const content = DIFFICULTY_CONTENT[locale];
  const parts = text.split(/\|(\w+)\|/g);
  return parts.map((part, i) => {
    if (i % 2 === 0) return part;
    const key = part as keyof typeof content;
    return (
      <Link key={i} href={localizedPath(locale, `/printable-sudoku/${part}`)}>
        {content[key].name.toLowerCase()}
      </Link>
    );
  });
}

export function getGuidesIndexMetadata(locale: Locale) {
  const t = META[locale];
  return pageMetadata({ title: t.title, description: t.description, path: '/guides', locale });
}

export function GuidesIndexPage({ locale }: { locale: Locale }) {
  const t = META[locale];
  const dict = getDictionary(locale);
  const guides = GUIDES_BY_LOCALE[locale];
  const L = (p: string) => localizedPath(locale, p);

  const trail = [
    { name: dict.breadcrumbHome, path: '/' },
    { name: dict.nav.guides, path: '/guides' },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(locale, trail)} />

      <Shell className="py-10 shelf:py-14">
        <Breadcrumbs trail={trail.map((c) => ({ ...c, path: L(c.path) }))} ariaLabel={dict.breadcrumbAriaLabel} />

        <PageHero h1={t.h1} lede={t.lede} />

        <div className="prose-press mt-6 max-w-prose">
          {t.intro.map((p) => (
            <p key={p.slice(0, 30)}>{p}</p>
          ))}
        </div>

        <ul className="mt-10 list-none space-y-4 p-0">
          {guides.map((g) => (
            <li key={g.slug}>
              <Link
                href={L(`/guides/${g.slug}`)}
                className="press-card group block p-6 no-underline transition-colors hover:border-stamp/60"
              >
                <span className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <span className="font-display text-[19px] font-bold text-ink group-hover:text-stamp">
                    {g.h1}
                  </span>
                  <span className="font-mono text-[11px] text-ink-soft">{g.readingTime}</span>
                </span>
                <span className="mt-2 block max-w-prose text-[14.5px] leading-relaxed text-ink-soft">
                  {g.summary}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <section aria-labelledby="print-heading" className="mt-16 max-w-prose">
          <h2 id="print-heading" className="m-0 font-display text-[24px] font-bold">
            {t.printHeading}
          </h2>
          <div className="prose-press mt-4">
            {t.printBody.map((p) => (
              <p key={p.slice(0, 30)}>{withLevelLinks(p, locale)}</p>
            ))}
          </div>
        </section>
      </Shell>
    </>
  );
}
