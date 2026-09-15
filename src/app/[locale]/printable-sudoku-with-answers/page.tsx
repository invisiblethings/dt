import { PageFrame } from '@/components/page-frame';
import { getWithAnswersMetadata, WithAnswersPage } from '@/content/pages/with-answers';
import { localeStaticParams, requireLocale } from '@/i18n/static-params';

export const dynamicParams = false;
export const generateStaticParams = localeStaticParams;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return getWithAnswersMetadata(requireLocale(locale));
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const locale = requireLocale((await params).locale);
  return (
    <PageFrame locale={locale} path="/printable-sudoku-with-answers">
      <WithAnswersPage locale={locale} />
    </PageFrame>
  );
}
