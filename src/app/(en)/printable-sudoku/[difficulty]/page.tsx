import { notFound } from 'next/navigation';
import { PageFrame } from '@/components/page-frame';
import { contentFor, getDifficultyDynamicMetadata, DifficultyDynamicPage } from '@/content/pages/difficulty-dynamic';
import { DIFFICULTY_ORDER } from '@/content/difficulty';

export const dynamicParams = false;

export function generateStaticParams() {
  return DIFFICULTY_ORDER.map((difficulty) => ({ difficulty }));
}

export async function generateMetadata({ params }: { params: Promise<{ difficulty: string }> }) {
  const { difficulty } = await params;
  const content = contentFor('en', difficulty);
  if (!content) return {};
  return getDifficultyDynamicMetadata('en', content);
}

export default async function Page({ params }: { params: Promise<{ difficulty: string }> }) {
  const { difficulty } = await params;
  const content = contentFor('en', difficulty);
  if (!content) notFound();

  return (
    <PageFrame locale="en" path={`/printable-sudoku/${difficulty}`}>
      <DifficultyDynamicPage locale="en" content={content} />
    </PageFrame>
  );
}
