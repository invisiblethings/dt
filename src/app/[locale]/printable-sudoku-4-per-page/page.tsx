import { PageFrame } from '@/components/page-frame';
import { getFourPerPageMetadata, FourPerPagePage } from '@/content/pages/four-per-page';
import { localeStaticParams, requireLocale } from '@/i18n/static-params';

export const dynamicParams = false;
export const generateStaticParams = localeStaticParams;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return getFourPerPageMetadata(requireLocale(locale));
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const locale = requireLocale((await params).locale);
  return (
    <PageFrame locale={locale} path="/printable-sudoku-4-per-page">
      <FourPerPagePage locale={locale} />
    </PageFrame>
  );
}
