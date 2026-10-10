// Schema.org helpers. Everything emitted here must describe content that is
// visible on the page it appears on. No review stars: Google ignores
// self-serving review markup for an organisation's own products, and the
// Udemy rating belongs to Udemy's page, so we show it as linked text only.
import { SITE_URL, BRAND, ROBIN, PRODUCTS, type Product } from '../data/site';

export const abs = (path: string) => new URL(path, SITE_URL).href.replace(/\/$/, '') || SITE_URL;

export const ORG_ID = `${SITE_URL}/#organization`;
export const SITE_ID = `${SITE_URL}/#website`;
export const ROBIN_ID = `${SITE_URL}/about#robin-hall`;

export function organization() {
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: BRAND.name,
    url: SITE_URL,
    logo: { '@type': 'ImageObject', url: abs(BRAND.logo), width: 221, height: 221 },
    foundingDate: BRAND.founded,
    founder: { '@id': ROBIN_ID },
    email: BRAND.email,
    sameAs: BRAND.sameAs,
    description:
      'Pianoforall is an online piano course for adults created by Robin Hall in 2006. Students start with chords, rhythm and playing by ear, then learn to read music as they go.',
  };
}

export function website() {
  return {
    '@type': 'WebSite',
    '@id': SITE_ID,
    url: SITE_URL,
    name: BRAND.name,
    publisher: { '@id': ORG_ID },
    inLanguage: 'en',
  };
}

export function person() {
  return {
    '@type': 'Person',
    '@id': ROBIN_ID,
    name: ROBIN.name,
    jobTitle: ROBIN.jobTitle,
    worksFor: { '@id': ORG_ID },
    url: abs('/about'),
    image: abs('/brand/robin-hall.jpg'),
    knowsAbout: ['Piano', 'Playing piano by ear', 'Piano chords', 'Music education for adults', 'Cartooning'],
  };
}

export function breadcrumbs(items: { name: string; href: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: abs(it.href),
    })),
  };
}

export function faqPage(faqs: { q: string; a: string }[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function course(p: Product, description: string, extra: Record<string, unknown> = {}) {
  return {
    '@type': 'Course',
    '@id': `${abs(p.url)}#course`,
    name: p.name,
    description,
    url: abs(p.url),
    inLanguage: 'en',
    provider: { '@id': ORG_ID },
    creator: { '@id': ROBIN_ID },
    instructor: { '@id': ROBIN_ID },
    educationalLevel: 'Beginner',
    isAccessibleForFree: false,
    offers: {
      '@type': 'Offer',
      category: 'Paid',
      price: p.price.toFixed(2),
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: abs(p.url),
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'Online',
      courseWorkload: p.videoHours ? `PT${Math.round(p.videoHours * 60)}M` : undefined,
      instructor: { '@id': ROBIN_ID },
    },
    ...extra,
  };
}

export function article(opts: {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  author?: string;
}) {
  return {
    '@type': 'Article',
    '@id': `${abs(opts.path)}#article`,
    headline: opts.title,
    description: opts.description,
    url: abs(opts.path),
    mainEntityOfPage: abs(opts.path),
    datePublished: opts.datePublished,
    dateModified: opts.dateModified ?? opts.datePublished,
    author: !opts.author || opts.author === 'Robin Hall' ? { '@id': ROBIN_ID } : opts.author === 'Pianoforall' ? { '@id': ORG_ID } : { '@type': 'Person', name: opts.author },
    publisher: { '@id': ORG_ID },
    image: opts.image ? abs(opts.image) : undefined,
    inLanguage: 'en',
  };
}

export function video(opts: { name: string; description: string; vimeoId: string; thumbnail: string; uploadDate: string; durationSec: number }) {
  const m = Math.floor(opts.durationSec / 60);
  const s = opts.durationSec % 60;
  return {
    '@type': 'VideoObject',
    name: opts.name,
    description: opts.description,
    thumbnailUrl: abs(opts.thumbnail),
    uploadDate: opts.uploadDate,
    duration: `PT${m}M${s}S`,
    embedUrl: `https://player.vimeo.com/video/${opts.vimeoId}`,
    publisher: { '@id': ORG_ID },
  };
}

export const allCourses = () => Object.values(PRODUCTS).filter((p) => p.lessons);
