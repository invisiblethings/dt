import Link from 'next/link';
import { Shell } from './shell';
import { Breadcrumbs } from './breadcrumbs';
import { JsonLd } from './json-ld';
import { articleSchema, breadcrumbSchema } from '@/lib/seo';
import type { GuideMeta } from '@/content/guides';

export function ArticleLayout({
  guide,
  children,
}: {
  guide: GuideMeta;
  children: React.ReactNode;
}) {
  const path = `/guides/${guide.slug}`;
  const trail = [
    { name: 'Home', path: '/' },
    { name: 'Guides', path: '/guides' },
    { name: guide.h1, path },
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(trail),
          articleSchema({
            headline: guide.h1,
            description: guide.description,
            path,
            datePublished: guide.published,
            dateModified: guide.updated,
          }),
        ]}
      />

      <Shell className="py-10 shelf:py-14">
        <Breadcrumbs trail={trail} />

        <article className="max-w-prose">
          <header>
            <h1 className="m-0 font-display text-[clamp(26px,4vw,36px)] font-bold leading-[1.18]">
              {guide.h1}
            </h1>
            <p className="mt-3 font-mono text-[11.5px] text-ink-soft">
              <time dateTime={guide.published}>
                {new Date(guide.published).toLocaleDateString('en-GB', {
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
          <h2 className="m-0 font-display text-[17px] font-bold">Put it into practice</h2>
          <p className="mb-4 mt-2 text-[14.5px] leading-relaxed text-ink-soft">
            Print a set of puzzles at the level you are working on and try it on paper — it sticks
            faster than reading about it does.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/"
              className="rounded-sm bg-stamp px-4 py-2.5 font-display text-[13.5px] font-bold text-white no-underline hover:bg-stamp-dark"
            >
              Generate a free PDF
            </Link>
            <Link
              href="/printable-sudoku"
              className="rounded-sm border border-rule bg-white px-4 py-2.5 font-display text-[13.5px] font-bold text-ink no-underline hover:border-stamp"
            >
              Browse difficulty levels
            </Link>
          </div>
        </aside>
      </Shell>
    </>
  );
}
