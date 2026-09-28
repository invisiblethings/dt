import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import { fontVariables } from '@/lib/fonts';
import { SITE, SITE_L10N } from '@/lib/site';
import { PREFIXED_LOCALES, isLocale } from '@/i18n/config';
import '../globals.css';

export const dynamicParams = false;

export function generateStaticParams() {
  return PREFIXED_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    metadataBase: new URL(SITE.url),
    title: SITE.name,
    description: SITE_L10N[locale].description,
    applicationName: SITE.name,
    authors: [{ name: SITE.name }],
    creator: SITE.name,
    publisher: SITE.name,
    formatDetection: { telephone: false, address: false, email: false },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
    },
  };
}

export const viewport: Viewport = {
  themeColor: '#EDEAE0',
  width: 'device-width',
  initialScale: 1,
};

export default async function LocaleRootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale) || locale === 'en') notFound();

  return (
    <html lang={locale} className={fontVariables}>
      <body className="flex min-h-screen flex-col">{children}</body>
    </html>
  );
}
