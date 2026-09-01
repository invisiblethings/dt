import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Generator } from '@/components/generator';
import { Faq } from '@/components/faq';
import { JsonLd } from '@/components/json-ld';
import { Shell } from '@/components/shell';
import { PageHero } from '@/components/page-hero';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { DifficultyCards } from '@/components/difficulty-cards';
import { SAMPLE_PUZZLES } from '@/lib/samples';
import { DIFFICULTY_CONTENT, DIFFICULTY_ORDER } from '@/content/difficulty';
import type { DifficultyKey } from '@/lib/sudoku';
import {
  breadcrumbSchema,
  faqPageSchema,
  pageMetadata,
  webApplicationSchema,
} from '@/lib/seo';

export const dynamicParams = false;

export function generateStaticParams() {
  return DIFFICULTY_ORDER.map((difficulty) => ({ difficulty }));
}

function contentFor(slug: string) {
  return DIFFICULTY_ORDER.includes(slug as DifficultyKey)
    ? DIFFICULTY_CONTENT[slug as DifficultyKey]
    : null;
}

export async function generateMetadata({ params }: { params: Promise<{ difficulty: string }> }) {
  const { difficulty } = await params;
  const content = contentFor(difficulty);
  if (!content) return {};
  return pageMetadata({
    title: content.title,
    description: content.description,
    path: `/printable-sudoku/${content.slug}`,
  });
}

export default async function DifficultyPage({
  params,
}: {
  params: Promise<{ difficulty: string }>;
}) {
  const { difficulty } = await params;
  const content = contentFor(difficulty);
  if (!content) notFound();

  const path = `/printable-sudoku/${content.slug}`;
  const trail = [
    { name: 'Home', path: '/' },
    { name: 'Printable sudoku', path: '/printable-sudoku' },
    { name: content.name, path },
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema(trail),
          faqPageSchema(content.faqs),
          webApplicationSchema({
            name: `Printable ${content.slug} sudoku — PDF generator`,
            description: content.description,
            path,
          }),
        ]}
      />

      <Shell className="py-10 shelf:py-14">
        <Breadcrumbs trail={trail} />

        <PageHero
          eyebrow={`${content.clueRange} · typical solve ${content.typicalTime}`}
          h1={content.h1}
          lede={content.lede}
        />

        <div className="mt-10">
          <Generator
            sample={SAMPLE_PUZZLES[content.slug]}
            defaultDifficulty={content.slug}
            heading={`Set ${'aeiou'.includes(content.slug[0]) ? 'an' : 'a'} ${content.slug} run`}
            subheading={`difficulty is already set to ${content.slug} — adjust the rest`}
          />
        </div>

        <div className="mt-20 grid gap-10 shelf:grid-cols-[minmax(0,1fr)_280px]">
          <section aria-labelledby="about-level-heading" className="max-w-prose">
            <h2 id="about-level-heading" className="m-0 font-display text-[24px] font-bold">
              What a {content.slug} sudoku asks of you
            </h2>
            <div className="prose-press mt-4">
              {content.body.map((para) => (
                <p key={para.slice(0, 40)}>{para}</p>
              ))}
            </div>
          </section>

          <aside aria-labelledby="good-for-heading" className="press-card h-fit p-5">
            <h2 id="good-for-heading" className="m-0 font-display text-[15px] font-bold">
              Good for
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
                <dt>Clues</dt>
                <dd className="m-0 text-ink">{content.clueRange}</dd>
              </div>
              <div className="flex justify-between py-1">
                <dt>Typical solve</dt>
                <dd className="m-0 text-ink">{content.typicalTime}</dd>
              </div>
              <div className="flex justify-between py-1">
                <dt>Solutions</dt>
                <dd className="m-0 text-ink">exactly one</dd>
              </div>
            </dl>
          </aside>
        </div>

        <Faq items={content.faqs} heading={`Printable ${content.slug} sudoku — questions`} />

        <section aria-labelledby="other-levels-heading" className="mt-16">
          <h2 id="other-levels-heading" className="m-0 font-display text-[24px] font-bold">
            Try another level
          </h2>
          <p className="mb-6 mt-3 max-w-prose text-[15.5px] leading-relaxed text-ink-soft">
            {content.slug === 'expert'
              ? 'Expert is as far as the generator goes. If these are taking longer than you would like, drop back a level — the logic is the same, there is just more of it on the page already.'
              : 'Too easy or too hard? Every level uses the same generator and the same uniqueness check — only the clue count changes.'}
          </p>
          <DifficultyCards exclude={content.slug} />

          <p className="mt-6 text-[15px] text-ink-soft">
            Or head back to the{' '}
            <Link href="/" className="font-medium text-stamp underline underline-offset-2">
              free printable sudoku generator
            </Link>{' '}
            for a mixed run, or take a set of{' '}
            <Link
              href="/printable-sudoku-with-answers"
              className="font-medium text-stamp underline underline-offset-2"
            >
              printable sudoku with answers
            </Link>
            .
          </p>
        </section>
      </Shell>
    </>
  );
}
