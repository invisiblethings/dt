import { PageFrame } from '@/components/page-frame';
import { ArticleLayout } from '@/components/article-layout';
import { HowToSolveSudokuBody } from '@/content/pages/guide-how-to-solve';
import { guideBySlug } from '@/content/guides';
import { pageMetadata } from '@/lib/seo';
import { localeStaticParams, requireLocale } from '@/i18n/static-params';

export const dynamicParams = false;
export const generateStaticParams = localeStaticParams;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const locale = requireLocale((await params).locale);
  const guide = guideBySlug(locale, 'how-to-solve-sudoku')!;
  return pageMetadata({ title: guide.title, description: guide.description, path: `/guides/${guide.slug}`, locale });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const locale = requireLocale((await params).locale);
  const guide = guideBySlug(locale, 'how-to-solve-sudoku')!;
  return (
    <PageFrame locale={locale} path={`/guides/${guide.slug}`}>
      <ArticleLayout guide={guide} locale={locale}>
        <HowToSolveSudokuBody locale={locale} />
      </ArticleLayout>
    </PageFrame>
  );
}
