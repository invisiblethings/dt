import { PageFrame } from '@/components/page-frame';
import { getHomeMetadata, HomePage } from '@/content/pages/home';
import { localeStaticParams, requireLocale } from '@/i18n/static-params';

export const dynamicParams = false;
export const generateStaticParams = localeStaticParams;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return getHomeMetadata(requireLocale(locale));
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const locale = requireLocale((await params).locale);
  return (
    <PageFrame locale={locale} path="/">
      <HomePage locale={locale} />
    </PageFrame>
  );
}
