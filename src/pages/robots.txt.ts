import type { APIRoute } from 'astro';
import { SITE_URL } from '../data/site';
// AI crawlers are allowed: being cited in AI answers is a goal for this site.
export const GET: APIRoute = () => new Response(`User-agent: *
Allow: /
Disallow: /go/

Sitemap: ${SITE_URL}/sitemap.xml
`, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
