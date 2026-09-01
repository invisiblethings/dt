import type { MetadataRoute } from 'next';
import { ROUTES, absoluteUrl } from '@/lib/site';

/** Generated from the route list in src/lib/site.ts — add a page there and it appears here. */
// Emitted at build time into the static export.
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ROUTES.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
