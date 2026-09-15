import { PageFrame } from '@/components/page-frame';
import { ArticleLayout } from '@/components/article-layout';
import { HowToPrintSudokuBody } from '@/content/pages/guide-print';
import { guideBySlug } from '@/content/guides';
import { pageMetadata } from '@/lib/seo';

const guide = guideBySlug('en', 'how-to-print-sudoku-puzzles')!;

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
        <HowToPrintSudokuBody locale="en" />
      </ArticleLayout>
    </PageFrame>
  );
}
