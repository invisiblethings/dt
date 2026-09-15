import { notFound } from 'next/navigation';
import { PageFrame } from '@/components/page-frame';
import { contentFor, getDifficultyDynamicMetadata, DifficultyDynamicPage } from '@/content/pages/difficulty-dynamic';
import { DIFFICULTY_ORDER } from '@/content/difficulty';
import { PREFIXED_LOCALES } from '@/i18n/config';
import { requireLocale } from '@/i18n/static-params';

export const dynamicParams = false;

export function generateStaticParams() {
  return PREFIXED_LOCALES.flatMap((locale) => DIFFICULTY_ORDER.map((difficulty) => ({ locale, difficulty })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; difficulty: string }>;
}) {
  const { locale: rawLocale, difficulty } = await params;
  const locale = requireLocale(rawLocale);
  const content = contentFor(locale, difficulty);
  if (!content) return {};
  return getDifficultyDynamicMetadata(locale, content);
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; difficulty: string }>;
}) {
  const { locale: rawLocale, difficulty } = await params;
  const locale = requireLocale(rawLocale);
  const content = contentFor(locale, difficulty);
  if (!content) notFound();

  return (
    <PageFrame locale={locale} path={`/printable-sudoku/${difficulty}`}>
      <DifficultyDynamicPage locale={locale} content={content} />
    </PageFrame>
  );
}
