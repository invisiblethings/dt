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
    title: 'Sudoku Guides — Solve Better, Print Better',
    description:
      'Practical sudoku guides: how to solve your first grid, the techniques that get you past a stall, and how to print puzzles that are pleasant to work on.',
    h1: 'Sudoku guides',
    lede: 'Three short guides — one to get you solving, one for when the grid stops giving anything up, and one about the unglamorous business of getting a good print.',
    intro: [
      'Sudoku is unusual among puzzles in that almost nobody is taught it. You pick up a grid somewhere, work out the rule in about a minute, and then either find your own way through or decide it is not for you. Plenty of people who would enjoy it stop at that second step, not because the puzzle is too hard but because nobody ever showed them the first move.',
      'These guides are written to close that gap and then keep going. The first assumes no knowledge at all. The second assumes you can finish a medium grid and want to know what to do when a hard one goes quiet. The third has nothing to do with solving and everything to do with the printer, which turns out to matter more than most people expect.',
    ],
    printHeading: 'Reading is not solving',
    printBody: [
      'None of this sticks until you do it on paper. Pick the level you are working at — |easy|, |medium|, |hard| or |expert| — print a handful with the answer key, and work them with a pencil. Ten grids will teach you more than any of these pages will.',
    ],
  },
  de: {
    title: 'Sudoku-Anleitungen — Besser Lösen, Besser Drucken',
    description:
      'Praktische Sudoku-Anleitungen: wie du dein erstes Raster löst, die Techniken, die dich über einen Stillstand hinausbringen, und wie du Rätsel druckst, die angenehm zu bearbeiten sind.',
    h1: 'Sudoku-Anleitungen',
    lede: 'Drei kurze Anleitungen — eine, um dich ans Lösen zu bringen, eine für den Moment, in dem das Raster nichts mehr hergibt, und eine über das wenig glamouröse Geschäft, einen guten Ausdruck hinzubekommen.',
    intro: [
      'Sudoku ist unter den Rätseln ungewöhnlich, weil es fast niemandem beigebracht wird. Man nimmt sich irgendwo ein Raster, findet die Regel in etwa einer Minute heraus und findet dann entweder selbst einen Weg hindurch oder entscheidet, dass es nichts für einen ist. Viele, denen es Spaß machen würde, hören genau bei diesem zweiten Schritt auf — nicht, weil das Rätsel zu schwer ist, sondern weil ihnen nie jemand den ersten Zug gezeigt hat.',
      'Diese Anleitungen sind dafür geschrieben, genau diese Lücke zu schließen und dann weiterzumachen. Die erste setzt kein Vorwissen voraus. Die zweite setzt voraus, dass du ein mittelschweres Raster fertig bekommst und wissen willst, was zu tun ist, wenn ein schweres verstummt. Die dritte hat nichts mit Lösen zu tun und alles mit dem Drucker, der sich als wichtiger erweist, als die meisten erwarten.',
    ],
    printHeading: 'Lesen ist nicht Lösen',
    printBody: [
      'Nichts davon setzt sich fest, bis du es auf Papier machst. Wähle die Stufe, an der du gerade arbeitest — |easy|, |medium|, |hard| oder |expert| — drucke eine Handvoll mit Lösungsschlüssel, und arbeite sie mit einem Bleistift durch. Zehn Raster bringen dir mehr bei als jede dieser Seiten.',
    ],
  },
  fr: {
    title: 'Guides Sudoku — Mieux Résoudre, Mieux Imprimer',
    description:
      'Guides pratiques du sudoku : comment résoudre votre première grille, les techniques qui vous font franchir un blocage, et comment imprimer des grilles agréables à travailler.',
    h1: 'Guides sudoku',
    lede: 'Trois guides courts — un pour vous lancer dans la résolution, un pour le moment où la grille ne donne plus rien, et un sur l’aspect peu glamour de réussir une bonne impression.',
    intro: [
      'Le sudoku est un jeu inhabituel en ce que presque personne ne l’apprend vraiment. On tombe sur une grille quelque part, on en déduit la règle en une minute environ, puis on trouve son propre chemin ou on décide que ce n’est pas pour soi. Beaucoup de gens qui y prendraient plaisir s’arrêtent à cette deuxième étape, non pas parce que le jeu est trop difficile, mais parce que personne ne leur a jamais montré le premier coup.',
      'Ces guides sont écrits pour combler cet écart, puis aller plus loin. Le premier ne suppose aucune connaissance préalable. Le second suppose que vous savez terminer une grille moyenne et voulez savoir quoi faire quand une grille difficile se tait. Le troisième n’a rien à voir avec la résolution et tout à voir avec l’imprimante, qui s’avère compter plus que la plupart des gens ne le pensent.',
    ],
    printHeading: 'Lire n’est pas résoudre',
    printBody: [
      'Rien de tout cela ne s’imprime vraiment dans la mémoire tant que vous ne le faites pas sur papier. Choisissez le niveau où vous en êtes — |easy|, |medium|, |hard| ou |expert| — imprimez-en quelques-unes avec le corrigé, et travaillez-les au crayon. Dix grilles vous apprendront plus que n’importe laquelle de ces pages.',
    ],
  },
  es: {
    title: 'Guías de Sudoku — Resuelve Mejor, Imprime Mejor',
    description:
      'Guías prácticas de sudoku: cómo resolver tu primera cuadrícula, las técnicas que te sacan de un bloqueo, y cómo imprimir sudokus agradables de trabajar.',
    h1: 'Guías de sudoku',
    lede: 'Tres guías breves — una para ponerte a resolver, una para cuando la cuadrícula deja de dar nada más, y una sobre el poco glamuroso asunto de conseguir una buena impresión.',
    intro: [
      'El sudoku es poco habitual entre los rompecabezas porque casi a nadie se lo enseñan de verdad. Te encuentras una cuadrícula en algún sitio, averiguas la regla en un minuto más o menos, y luego encuentras tu propio camino o decides que no es para ti. Mucha gente a la que le gustaría se queda justo en ese segundo paso, no porque el juego sea demasiado difícil, sino porque nadie les enseñó nunca el primer movimiento.',
      'Estas guías están escritas para cerrar ese hueco y seguir a partir de ahí. La primera no da por hecho ningún conocimiento previo. La segunda da por hecho que puedes terminar una cuadrícula de nivel medio y quieres saber qué hacer cuando una difícil se queda en silencio. La tercera no tiene nada que ver con resolver y todo que ver con la impresora, que resulta importar más de lo que la mayoría espera.',
    ],
    printHeading: 'Leer no es resolver',
    printBody: [
      'Nada de esto se te queda hasta que lo haces en papel. Elige el nivel en el que estás trabajando — |easy|, |medium|, |hard| o |expert| — imprime unos cuantos con las soluciones, y trabájalos a lápiz. Diez cuadrículas te van a enseñar más que cualquiera de estas páginas.',
    ],
  },
};

/** Renders "... — |easy|, |medium|, |hard| or |expert| — ..." with real links, translated per locale. */
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
