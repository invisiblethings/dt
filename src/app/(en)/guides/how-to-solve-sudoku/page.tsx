import { PageFrame } from '@/components/page-frame';
import { ArticleLayout } from '@/components/article-layout';
import { HowToSolveSudokuBody } from '@/content/pages/guide-how-to-solve';
import { guideBySlug } from '@/content/guides';
import { pageMetadata } from '@/lib/seo';

const guide = guideBySlug('en', 'how-to-solve-sudoku')!;

export const metadata = pageMetadata({
  title: guide.title,
  description: guide.description,
  path: `/guides/${guide.slug}`,
  locale: 'en',
});

export default function Page() {
  return (
    <PageFrame locale="en" path={`/guides/${guide.slug}`}>
      <ArticleLayout guide={guide} locale="en">
        <HowToSolveSudokuBody locale="en" />
      </ArticleLayout>
    </PageFrame>
  );
}
