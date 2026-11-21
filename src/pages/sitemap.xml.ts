// XML sitemap built from the actual pages. Excludes noindex pages (404,
// thin categories) so the sitemap only lists canonical, indexable URLs.
import type { APIRoute } from 'astro';
import { SITE_URL, FEATURES } from '../data/site';
import { GUIDES } from '../data/guides';
import { GUIDE_IMAGES } from '../data/guide-images';
import { CLASSICS } from '../data/classics';

const BUILD = new Date().toISOString().slice(0, 10);

export const GET: APIRoute = async () => {
  const urls: { loc: string; lastmod?: string }[] = [
    ...['/', '/course', '/how-it-works', '/classics-by-ear', '/pricing', ...(FEATURES.freeLessons ? ['/free-lessons'] : []), '/reviews', '/about', '/faq', '/compare', '/learn', '/start', '/contact', '/gift', '/refund-policy', '/affiliate-program', '/privacy-policy', '/terms-of-use'].map((loc) => ({ loc, lastmod: BUILD })),
    ...CLASSICS.map((c) => ({ loc: c.product.url, lastmod: BUILD })),
    ...GUIDES.map((g) => ({ loc: g.href, lastmod: BUILD })),
  ];
  const seen = new Set<string>();
  const body = urls
    .filter((u) => (seen.has(u.loc) ? false : (seen.add(u.loc), true)))
    .map((u) => `  <url><loc>${u.loc === '/' ? SITE_URL + '/' : SITE_URL + u.loc}</loc>${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ''}${GUIDE_IMAGES[u.loc] ? `<image:image><image:loc>${SITE_URL}${GUIDE_IMAGES[u.loc].src}</image:loc></image:image>` : ''}</url>`)
    .join('\n');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${body}\n</urlset>\n`, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
