import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE_URL } from '../data/site';
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
export const GET: APIRoute = async () => {
  const posts = (await getCollection('blog')).sort((a, b) => +b.data.pubDate - +a.data.pubDate);
  const items = posts.map((p) => `<item><title>${esc(p.data.title)}</title><link>${SITE_URL}/${p.id}</link><guid>${SITE_URL}/${p.id}</guid><pubDate>${p.data.pubDate.toUTCString()}</pubDate><description>${esc(p.data.description)}</description></item>`).join('\n');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"><channel><title>Pianoforall blog</title><link>${SITE_URL}/blog</link><description>Articles by Robin Hall on learning piano as an adult.</description><language>en</language>
${items}
</channel></rss>`, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
};
