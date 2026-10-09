import Link from 'next/link';
import { Generator } from '@/components/generator';
import { Faq } from '@/components/faq';
import { JsonLd } from '@/components/json-ld';
import { Shell } from '@/components/shell';
import { PageHero } from '@/components/page-hero';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { DifficultyCards } from '@/components/difficulty-cards';
import { getDictionary } from '@/i18n/dictionary';
import { SAMPLE_PUZZLES } from '@/lib/samples';
import { DIFFICULTY_CONTENT, type DifficultyContent } from '@/content/difficulty';
import type { DifficultyKey } from '@/lib/sudoku';
import { localizedPath, type Locale } from '@/i18n/config';
import { breadcrumbSchema, faqPageSchema, pageMetadata, webApplicationSchema } from '@/lib/seo';

interface Copy {
  clueRangeSolveTime: (clueRange: string, typicalTime: string) => string;
  genHeading: (slug: string, article: string) => string;
  genSubheading: (slug: string) => string;
  aboutHeading: (slug: string) => string;
  faqHeading: (slug: string) => string;
  otherLevelsHeading: string;
  otherLevelsExpert: string;
  otherLevelsRest: string;
  backPre: string;
  backLink: string;
  backMid: string;
  answersLink: string;
  end: string;
  /** "a" vs "an" in English; other languages don't need the distinction, so return ''. */
  article: (slug: string) => string;
}

const COPY: Record<Locale, Copy> = {
  en: {
    clueRangeSolveTime: (c, t) => `${c} · typical solve ${t}`,
    genHeading: (slug, article) => `Set ${article} ${slug} run`,
    genSubheading: (slug) => `difficulty is already set to ${slug}; adjust the rest`,
    aboutHeading: (slug) => `What a ${slug} sudoku asks of you`,
    faqHeading: (slug) => `Printable ${slug} sudoku: questions`,
    otherLevelsHeading: 'Try another level',
    otherLevelsExpert: 'Expert is the hardest level the generator makes. If these take longer than you would like, drop back a level: the logic stays the same, with more of the grid already filled in.',
    otherLevelsRest: 'Each level uses the same generator and the same uniqueness check, and only the clue count changes. Try the next level up or down if this one is too easy or too hard.',
    backPre: 'Or head back to the ',
    backLink: 'free printable sudoku generator',
    backMid: ' for a mixed run, or take a set of ',
    answersLink: 'printable sudoku with answers',
    end: '.',
    article: (slug) => ('aeiou'.includes(slug[0]) ? 'an' : 'a'),
  },
  de: {
    clueRangeSolveTime: (c, t) => `${c} · typische Lösungszeit ${t}`,
    genHeading: (slug) => `Sudoku-Auflage auf ${DIFFICULTY_CONTENT.de[slug as DifficultyKey].name} festlegen`,
    genSubheading: (slug) => `Schwierigkeit ist bereits auf ${DIFFICULTY_CONTENT.de[slug as DifficultyKey].name.toLowerCase()} gestellt ; passe den Rest an`,
    aboutHeading: (slug) => `Was ein Sudoku der Stufe ${DIFFICULTY_CONTENT.de[slug as DifficultyKey].name.toLowerCase()} von dir verlangt`,
    faqHeading: (slug) => `Sudoku ${DIFFICULTY_CONTENT.de[slug as DifficultyKey].name.toLowerCase()} zum Ausdrucken: Fragen`,
    otherLevelsHeading: 'Eine andere Stufe ausprobieren',
    otherLevelsExpert: 'Experte ist die höchste Stufe des Generators. Dauert es dir zu lange, geh eine Stufe zurück: Die Logik bleibt gleich, und mehr vom Raster ist schon ausgefüllt.',
    otherLevelsRest: 'Jede Stufe verwendet denselben Generator und dieselbe Eindeutigkeitsprüfung, nur die Anzahl der Hinweise ändert sich. Ist dir diese Stufe zu leicht oder zu schwer, probiere die nächste.',
    backPre: 'Oder geh zurück zum ',
    backLink: 'kostenlosen Sudoku-Generator zum Ausdrucken',
    backMid: ' für eine gemischte Auflage, oder hol dir ein Set ',
    answersLink: 'Sudoku zum Ausdrucken mit Lösungen',
    end: '.',
    article: () => '',
  },
  fr: {
    clueRangeSolveTime: (c, t) => `${c} · temps de résolution habituel ${t}`,
    genHeading: (slug) => `Composer un tirage ${DIFFICULTY_CONTENT.fr[slug as DifficultyKey].name.toLowerCase()}`,
    genSubheading: (slug) => `la difficulté est déjà réglée sur ${DIFFICULTY_CONTENT.fr[slug as DifficultyKey].name.toLowerCase()} ; ajustez le reste`,
    aboutHeading: (slug) => `Ce qu’une grille ${DIFFICULTY_CONTENT.fr[slug as DifficultyKey].name.toLowerCase()} vous demande`,
    faqHeading: (slug) => `Sudoku ${DIFFICULTY_CONTENT.fr[slug as DifficultyKey].name.toLowerCase()} à imprimer : questions`,
    otherLevelsHeading: 'Essayer un autre niveau',
    otherLevelsExpert: 'Expert est le niveau maximal du générateur. Si ces grilles vous prennent plus de temps que vous ne le voudriez, redescendez d’un niveau : la logique reste la même, avec une plus grande part de la grille déjà remplie.',
    otherLevelsRest: 'Chaque niveau utilise le même générateur et la même vérification d’unicité, et seul le nombre d’indices change. Si ce niveau est trop facile ou trop difficile, essayez le suivant.',
    backPre: 'Ou retournez au ',
    backLink: 'générateur gratuit de sudoku à imprimer',
    backMid: ' pour un tirage mixte, ou prenez un lot de ',
    answersLink: 'sudoku à imprimer avec solutions',
    end: '.',
    article: () => '',
  },
  es: {
    clueRangeSolveTime: (c, t) => `${c} · tiempo habitual ${t}`,
    genHeading: (slug) => `Preparar una tirada de nivel ${DIFFICULTY_CONTENT.es[slug as DifficultyKey].name.toLowerCase()}`,
    genSubheading: (slug) => `la dificultad ya está puesta en ${DIFFICULTY_CONTENT.es[slug as DifficultyKey].name.toLowerCase()} ; ajusta el resto`,
    aboutHeading: (slug) => `Qué te pide un sudoku de nivel ${DIFFICULTY_CONTENT.es[slug as DifficultyKey].name.toLowerCase()}`,
    faqHeading: (slug) => `Sudoku ${DIFFICULTY_CONTENT.es[slug as DifficultyKey].name.toLowerCase()} para imprimir: preguntas`,
    otherLevelsHeading: 'Prueba otro nivel',
    otherLevelsExpert: 'Experto es el nivel más alto del generador. Si estos te están llevando más tiempo del que te gustaría, baja un nivel: la lógica es la misma, con más cuadrícula ya rellena.',
    otherLevelsRest: 'Todos los niveles usan el mismo generador y la misma comprobación de unicidad, y solo cambia el número de pistas. Si este nivel te resulta demasiado fácil o difícil, prueba el siguiente.',
    backPre: 'O vuelve al ',
    backLink: 'generador gratuito de sudoku para imprimir',
    backMid: ' para una tirada mixta, o consigue un set de ',
    answersLink: 'sudoku para imprimir con soluciones',
    end: '.',
    article: () => '',
  },
};

export function contentFor(locale: Locale, slug: string): DifficultyContent | null {
  const byLocale = DIFFICULTY_CONTENT[locale];
  return slug in byLocale ? byLocale[slug as DifficultyKey] : null;
}

export function getDifficultyDynamicMetadata(locale: Locale, content: DifficultyContent) {
  return pageMetadata({
    title: content.title,
    description: content.description,
    path: `/printable-sudoku/${content.slug}`,
    locale,
  });
}

export function DifficultyDynamicPage({ locale, content }: { locale: Locale; content: DifficultyContent }) {
  const dict = getDictionary(locale);
  const c = COPY[locale];
  const L = (p: string) => localizedPath(locale, p);
  const path = `/printable-sudoku/${content.slug}`;
  const trail = [
    { name: dict.breadcrumbHome, path: '/' },
    { name: dict.footer.byDifficulty.heading, path: '/printable-sudoku' },
    { name: content.name, path },
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(locale, trail),
          faqPageSchema(content.faqs),
          webApplicationSchema({
            name: `Printable ${content.slug} sudoku: PDF generator`,
            description: content.description,
            path,
            locale,
            featureList: [],
          }),
        ]}
      />

      <Shell className="py-10 shelf:py-14">
        <Breadcrumbs trail={trail.map((t) => ({ ...t, path: L(t.path) }))} ariaLabel={dict.breadcrumbAriaLabel} />

        <PageHero
          eyebrow={c.clueRangeSolveTime(content.clueRange, content.typicalTime)}
          h1={content.h1}
          lede={content.lede}
        />

        <div className="mt-10">
          <Generator
            sample={SAMPLE_PUZZLES[content.slug]}
            locale={locale}
            defaultDifficulties={[content.slug]}
            heading={c.genHeading(content.slug, c.article(content.slug))}
            subheading={c.genSubheading(content.slug)}
          />
        </div>

        <div className="mt-20 grid gap-10 shelf:grid-cols-[minmax(0,1fr)_280px]">
          <section aria-labelledby="about-level-heading" className="max-w-prose">
            <h2 id="about-level-heading" className="m-0 font-display text-[24px] font-bold">
              {c.aboutHeading(content.slug)}
            </h2>
            <div className="prose-press mt-4">
              {content.body.map((para) => (
                <p key={para.slice(0, 40)}>{para}</p>
              ))}
            </div>
          </section>

          <aside aria-labelledby="good-for-heading" className="press-card h-fit p-5">
            <h2 id="good-for-heading" className="m-0 font-display text-[15px] font-bold">
              {dict.difficultyPage.goodFor}
            </h2>
            <ul className="mt-3 list-none space-y-2.5 p-0">
              {content.goodFor.map((item) => (
                <li key={item} className="flex gap-2.5 text-[13.5px] leading-relaxed text-ink-soft">
                  <span aria-hidden="true" className="font-mono text-stamp">
                    ·
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <dl className="mt-5 border-t border-line pt-4 font-mono text-[11.5px] text-ink-soft">
              <div className="flex justify-between py-1">
                <dt>{dict.difficultyPage.clues}</dt>
                <dd className="m-0 text-ink">{content.clueRange}</dd>
              </div>
              <div className="flex justify-between py-1">
                <dt>{dict.difficultyPage.typicalSolve}</dt>
                <dd className="m-0 text-ink">{content.typicalTime}</dd>
              </div>
              <div className="flex justify-between py-1">
                <dt>{dict.difficultyPage.solutions}</dt>
                <dd className="m-0 text-ink">{dict.difficultyPage.exactlyOne}</dd>
              </div>
            </dl>
          </aside>
        </div>

        <Faq items={content.faqs} heading={c.faqHeading(content.slug)} />

        <section aria-labelledby="other-levels-heading" className="mt-16">
          <h2 id="other-levels-heading" className="m-0 font-display text-[24px] font-bold">
            {c.otherLevelsHeading}
          </h2>
          <p className="mb-6 mt-3 max-w-prose text-[15.5px] leading-relaxed text-ink-soft">
            {content.slug === 'expert' ? c.otherLevelsExpert : c.otherLevelsRest}
          </p>
          <DifficultyCards locale={locale} exclude={content.slug} />

          <p className="mt-6 text-[15px] text-ink-soft">
            {c.backPre}
            <Link href={L('/')} className="font-medium text-stamp underline underline-offset-2">
              {c.backLink}
            </Link>
            {c.backMid}
            <Link href={L('/printable-sudoku-with-answers')} className="font-medium text-stamp underline underline-offset-2">
              {c.answersLink}
            </Link>
            {c.end}
          </p>
        </section>
      </Shell>
    </>
  );
}
