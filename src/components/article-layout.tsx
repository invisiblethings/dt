import Link from 'next/link';
import { Shell } from './shell';
import { Breadcrumbs } from './breadcrumbs';
import { JsonLd } from './json-ld';
import { getDictionary } from '@/i18n/dictionary';
import { localizedPath, type Locale } from '@/i18n/config';
import { articleSchema, breadcrumbSchema } from '@/lib/seo';
import type { GuideMeta } from '@/content/guides';

export function ArticleLayout({
  guide,
  locale,
  children,
}: {
  guide: GuideMeta;
  locale: Locale;
  children: React.ReactNode;
}) {
  const dict = getDictionary(locale);
  const path = `/guides/${guide.slug}`;
  const trail = [
    { name: dict.breadcrumbHome, path: '/' },
    { name: dict.nav.guides, path: '/guides' },
    { name: guide.h1, path },
  ];
  const L = (p: string) => localizedPath(locale, p);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(locale, trail),
          articleSchema({
            headline: guide.h1,
            description: guide.description,
            path,
            locale,
            datePublished: guide.published,
            dateModified: guide.updated,
          }),
        ]}
      />

      <Shell className="py-10 shelf:py-14">
        <Breadcrumbs trail={trail.map((c) => ({ ...c, path: L(c.path) }))} ariaLabel={dict.breadcrumbAriaLabel} />

        <article className="max-w-prose">
          <header>
            <h1 className="m-0 font-display text-[clamp(26px,4vw,36px)] font-bold leading-[1.18]">
              {guide.h1}
            </h1>
            <p className="mt-3 font-mono text-[11.5px] text-ink-soft">
              <time dateTime={guide.published}>
                {new Date(guide.published).toLocaleDateString(dict.article.dateLocale, {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </time>{' '}
              · {guide.readingTime}
            </p>
            <p className="mt-5 border-l-2 border-stamp pl-4 text-[17px] leading-relaxed text-ink-soft">
              {guide.summary}
            </p>
          </header>

          <div className="prose-press mt-8">{children}</div>
        </article>

        <aside className="mt-16 max-w-prose press-card p-6">
          <h2 className="m-0 font-display text-[17px] font-bold">{dict.article.practiceHeading}</h2>
          <p className="mb-4 mt-2 text-[14.5px] leading-relaxed text-ink-soft">{dict.article.practiceBody}</p>
          <div className="flex flex-wrap gap-3">
            <Link
              href={L('/')}
              className="rounded-sm bg-stamp px-4 py-2.5 font-display text-[13.5px] font-bold text-white no-underline hover:bg-stamp-dark"
            >
              {dict.article.generateLink}
            </Link>
            <Link
              href={L('/printable-sudoku')}
              className="rounded-sm border border-rule bg-white px-4 py-2.5 font-display text-[13.5px] font-bold text-ink no-underline hover:border-stamp"
            >
              {dict.article.browseLevelsLink}
            </Link>
          </div>
        </aside>
      </Shell>
    </>
  );
}
