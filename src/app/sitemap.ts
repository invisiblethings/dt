import type { MetadataRoute } from 'next';
import { ROUTES, absoluteUrl, alternateLinks } from '@/lib/site';
import { LOCALES } from '@/i18n/config';

/**
 * Generated from the route list in src/lib/site.ts — add a page there and it
 * appears here in every locale, each entry cross-linked to its translations
 * via `alternates.languages` (the same hreflang set every page's `<head>`
 * carries).
 */
// Emitted at build time into the static export.
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ROUTES.flatMap((route) =>
    LOCALES.map((locale) => ({
      url: absoluteUrl(route.path, locale),
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: { languages: alternateLinks(route.path) },
    })),
  );
}
