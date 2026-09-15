/**
 * Single source of truth for the site's identity, locale variants, and route
 * list.
 *
 * The default below is the production origin. Override it with
 * `NEXT_PUBLIC_SITE_URL` (no trailing slash) under Netlify → Site
 * configuration → Environment variables if the site ever moves again. Either
 * way it drives canonicals, Open Graph URLs, sitemap entries and the footer
 * printed inside generated PDFs — it is the only place the origin is written
 * down.
 */

import { DEFAULT_LOCALE, LOCALES, LOCALE_TAGS, OG_LOCALES, localizedPath, type Locale } from '@/i18n/config';

const RAW_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://printablesudoku.org';

export const SITE = {
  /** The brand name is a proper noun and stays the same in every language. */
  name: 'Printable Sudoku',
  /** Uppercase lockup used in the header and at the top of every PDF page. */
  wordmark: { lead: 'PRINTABLE', accent: 'SUDOKU' },
  /** Used in the PDF footer and other short labels. */
  shortDomain: RAW_URL.replace(/^https?:\/\//, '').replace(/\/$/, ''),
  url: RAW_URL.replace(/\/$/, ''),
} as const;

/** Tagline and meta description, translated per locale. */
export const SITE_L10N: Record<Locale, { tagline: string; description: string }> = {
  en: {
    tagline: 'free sudoku sheets, set to order and ready to print',
    description:
      'Generate free printable sudoku puzzles and download them as a print-ready PDF — pick a difficulty, choose 1, 2, 4 or 6 puzzles per page, and add a full answer key.',
  },
  de: {
    tagline: 'kostenlose Sudoku-Blätter, nach Maß gesetzt und druckfertig',
    description:
      'Erstelle kostenlose Sudoku-Rätsel zum Ausdrucken und lade sie als druckfertiges PDF herunter — wähle einen Schwierigkeitsgrad, 1, 2, 4 oder 6 Rätsel pro Seite, und füge einen vollständigen Lösungsschlüssel hinzu.',
  },
  fr: {
    tagline: 'grilles de sudoku gratuites, composées sur mesure et prêtes à imprimer',
    description:
      'Générez des grilles de sudoku à imprimer gratuitement et téléchargez-les en PDF prêt à imprimer — choisissez un niveau de difficulté, 1, 2, 4 ou 6 grilles par page, et ajoutez un corrigé complet.',
  },
  es: {
    tagline: 'hojas de sudoku gratis, compuestas a medida y listas para imprimir',
    description:
      'Genera sudokus gratis para imprimir y descárgalos en un PDF listo para la impresora — elige una dificultad, 1, 2, 4 o 6 sudokus por página, y añade las soluciones completas.',
  },
};

/**
 * Absolute URL for a logical, locale-independent path (e.g. "/printable-sudoku/easy"),
 * in the given locale. English is unprefixed; every other locale gets a "/xx" prefix.
 */
export function absoluteUrl(path: string, locale: Locale = DEFAULT_LOCALE): string {
  const localized = localizedPath(locale, path);
  return localized === '/' ? SITE.url : `${SITE.url}${localized}`;
}

/**
 * The same logical path in every locale, keyed by hreflang tag, plus
 * "x-default" pointing at the English version. Used for `<link rel="alternate"
 * hreflang>` tags and the sitemap, and by the language switcher in the header.
 */
export function alternateLinks(path: string): Record<string, string> {
  const links: Record<string, string> = {};
  for (const locale of LOCALES) links[LOCALE_TAGS[locale]] = absoluteUrl(path, locale);
  links['x-default'] = absoluteUrl(path, DEFAULT_LOCALE);
  return links;
}

export { OG_LOCALES };

/**
 * Every indexable route, as a locale-independent logical path. The sitemap and
 * the language switcher expand each of these into one URL per locale.
 */
export const ROUTES = [
  { path: '/', priority: 1.0, changeFrequency: 'weekly' as const },
  { path: '/printable-sudoku', priority: 0.9, changeFrequency: 'weekly' as const },
  { path: '/printable-sudoku/easy', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/printable-sudoku/medium', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/printable-sudoku/hard', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/printable-sudoku/expert', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/printable-sudoku-with-answers', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/printable-sudoku-4-per-page', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/sudoku-answers', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/guides', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/guides/how-to-solve-sudoku', priority: 0.7, changeFrequency: 'yearly' as const },
  { path: '/guides/sudoku-solving-techniques', priority: 0.7, changeFrequency: 'yearly' as const },
  { path: '/guides/how-to-print-sudoku-puzzles', priority: 0.6, changeFrequency: 'yearly' as const },
  { path: '/about', priority: 0.4, changeFrequency: 'yearly' as const },
  { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' as const },
];
