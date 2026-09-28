import type { Metadata } from 'next';
import { SITE, absoluteUrl, alternateLinks } from './site';
import { LOCALE_TAGS, OG_LOCALES, type Locale } from '@/i18n/config';

interface PageMetaInput {
  title: string;
  description: string;
  /** Locale-independent logical path, e.g. "/printable-sudoku/easy". */
  path: string;
  locale: Locale;
  /** Set on utility pages that add nothing to search results. */
  noIndex?: boolean;
}

/**
 * Builds the per-page title, description, canonical, hreflang alternates,
 * Open Graph and Twitter card tags. The Open Graph image itself comes from
 * the file-based `opengraph-image.tsx` in each route group, which Next
 * applies to every route beneath it.
 */
export function pageMetadata({ title, description, path, locale, noIndex }: PageMetaInput): Metadata {
  const url = absoluteUrl(path, locale);
  return {
    // Absolute so each page controls its own full title rather than inheriting
    // the layout template — several would otherwise run past ~60 characters.
    title: { absolute: title },
    description,
    // A canonical (and hreflang set) on a noindex page just points crawlers
    // back at a page we are asking them not to index, so both are left off.
    ...(noIndex
      ? { robots: { index: false, follow: true } }
      : { alternates: { canonical: url, languages: alternateLinks(path) } }),
    openGraph: {
      type: 'website',
      siteName: SITE.name,
      locale: OG_LOCALES[locale],
      title,
      description,
      url,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

/** Renders a JSON-LD block. Structured data must be in the server HTML. */
export function jsonLdScript(data: Record<string, unknown> | Record<string, unknown>[]) {
  return {
    __html: JSON.stringify(data).replace(/</g, '\\u003c'),
  };
}

export interface FaqItem {
  question: string;
  answer: string;
}

export function faqPageSchema(items: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

export function breadcrumbSchema(locale: Locale, trail: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path, locale),
    })),
  };
}

export function webApplicationSchema(opts: {
  name: string;
  description: string;
  path: string;
  locale: Locale;
  featureList: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: opts.name,
    url: absoluteUrl(opts.path, opts.locale),
    description: opts.description,
    applicationCategory: 'GameApplication',
    operatingSystem: 'Any modern web browser',
    browserRequirements: 'Requires JavaScript for PDF generation',
    isAccessibleForFree: true,
    inLanguage: LOCALE_TAGS[opts.locale],
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: opts.featureList,
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      url: SITE.url,
    },
  };
}

/**
 * Declares the site name for search engines. Page titles deliberately carry no
 * "| Printable Sudoku" suffix — the brand name is itself the primary keyword,
 * so repeating it in every title reads as stuffing. This is what lets Google
 * show the site name alongside the result instead.
 */
export function webSiteSchema(locale: Locale, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    alternateName: 'Printable Sudoku PDF generator',
    url: absoluteUrl('/', locale),
    description,
    inLanguage: LOCALE_TAGS[locale],
    publisher: { '@type': 'Organization', name: SITE.name, url: SITE.url },
  };
}

export function articleSchema(opts: {
  headline: string;
  description: string;
  path: string;
  locale: Locale;
  datePublished: string;
  dateModified: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: opts.headline,
    description: opts.description,
    mainEntityOfPage: { '@type': 'WebPage', '@id': absoluteUrl(opts.path, opts.locale) },
    datePublished: opts.datePublished,
    dateModified: opts.dateModified,
    inLanguage: LOCALE_TAGS[opts.locale],
    author: { '@type': 'Organization', name: SITE.name, url: SITE.url },
    publisher: { '@type': 'Organization', name: SITE.name, url: SITE.url },
  };
}
