// XML sitemap built from the actual pages. Excludes noindex pages (404,
// thin categories) so the sitemap only lists canonical, indexable URLs.
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE_URL } from '../data/site';
import { GUIDES } from '../data/guides';
import { CLASSICS } from '../data/classics';

const BUILD = new Date().toISOString().slice(0, 10);

export const GET: APIRoute = async () => {
  const posts = await getCollection('blog');
  const cats = [...new Set(posts.map((p) => p.data.category))].filter((c) => posts.filter((p) => p.data.category === c).length >= 3);
  const urls: { loc: string; lastmod?: string }[] = [
    ...['/', '/course', '/how-it-works', '/classics-by-ear', '/pricing', '/free-lessons', '/reviews', '/about', '/faq', '/compare', '/learn', '/start', '/blog', '/contact', '/gift', '/refund-policy', '/affiliate-program', '/privacy-policy', '/terms-of-use'].map((loc) => ({ loc, lastmod: BUILD })),
    ...CLASSICS.map((c) => ({ loc: c.product.url, lastmod: BUILD })),
    ...GUIDES.map((g) => ({ loc: g.href, lastmod: BUILD })),
    ...cats.map((c) => ({ loc: `/category/${c}` })),
    ...posts.filter((p) => !p.data.noindex).map((p) => ({ loc: `/${p.id}`, lastmod: (p.data.updatedDate ?? p.data.pubDate).toISOString().slice(0, 10) })),
  ];
  const seen = new Set<string>();
  const body = urls
    .filter((u) => (seen.has(u.loc) ? false : (seen.add(u.loc), true)))
    .map((u) => `  <url><loc>${u.loc === '/' ? SITE_URL + '/' : SITE_URL + u.loc}</loc>${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ''}</url>`)
    .join('\n');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
