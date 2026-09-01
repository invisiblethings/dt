import type { Metadata } from 'next';
import { SITE, absoluteUrl } from './site';

interface PageMetaInput {
  title: string;
  description: string;
  path: string;
  /** Set on utility pages that add nothing to search results. */
  noIndex?: boolean;
}

/**
 * Builds the per-page title, description, canonical, Open Graph and Twitter
 * card tags. The Open Graph image itself comes from the file-based
 * `app/opengraph-image.tsx`, which Next applies to every route.
 */
export function pageMetadata({ title, description, path, noIndex }: PageMetaInput): Metadata {
  const url = absoluteUrl(path);
  return {
    // Absolute so each page controls its own full title rather than inheriting
    // the layout template — several would otherwise run past ~60 characters.
    title: { absolute: title },
    description,
    // A canonical on a noindex page just points crawlers back at a page we are
    // asking them not to index, so it is left off.
    ...(noIndex
      ? { robots: { index: false, follow: true } }
      : { alternates: { canonical: url } }),
    openGraph: {
      type: 'website',
      siteName: SITE.name,
      locale: SITE.locale,
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

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

export function webApplicationSchema(opts: { name: string; description: string; path: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: opts.name,
    url: absoluteUrl(opts.path),
    description: opts.description,
    applicationCategory: 'GameApplication',
    operatingSystem: 'Any modern web browser',
    browserRequirements: 'Requires JavaScript for PDF generation',
    isAccessibleForFree: true,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      'Generate printable sudoku puzzles in easy, medium, hard and expert difficulty',
      'Download puzzles as a print-ready PDF in A4 or US Letter',
      'Print 1, 2, 4 or 6 puzzles per page',
      'Optional full answer key appended to the PDF',
      'Every puzzle verified to have exactly one solution',
    ],
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      url: SITE.url,
    },
  };
}

export function articleSchema(opts: {
  headline: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: opts.headline,
    description: opts.description,
    mainEntityOfPage: { '@type': 'WebPage', '@id': absoluteUrl(opts.path) },
    datePublished: opts.datePublished,
    dateModified: opts.dateModified,
    author: { '@type': 'Organization', name: SITE.name, url: SITE.url },
    publisher: { '@type': 'Organization', name: SITE.name, url: SITE.url },
  };
}
