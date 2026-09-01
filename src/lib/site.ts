/**
 * Single source of truth for the site's identity and route list.
 *
 * `NEXT_PUBLIC_SITE_URL` should be set to the production origin (no trailing
 * slash) in Vercel's project settings — it drives canonicals, Open Graph URLs
 * and sitemap entries.
 */

const RAW_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://gridpress.app';

export const SITE = {
  name: 'Grid Press',
  /** Used in the PDF footer and other short labels. */
  shortDomain: RAW_URL.replace(/^https?:\/\//, '').replace(/\/$/, ''),
  url: RAW_URL.replace(/\/$/, ''),
  tagline: 'printable sudoku, set like a press run',
  description:
    'Generate free printable sudoku puzzles and download them as a print-ready PDF — pick a difficulty, choose 1, 2, 4 or 6 puzzles per page, and add a full answer key.',
  twitter: '@gridpress',
  locale: 'en_US',
} as const;

export function absoluteUrl(path: string): string {
  if (path === '/') return SITE.url;
  return `${SITE.url}${path.startsWith('/') ? path : `/${path}`}`;
}

/** Every indexable route, in the order they should appear in the sitemap. */
export const ROUTES = [
  { path: '/', priority: 1.0, changeFrequency: 'weekly' as const },
  { path: '/printable-sudoku', priority: 0.9, changeFrequency: 'weekly' as const },
  { path: '/printable-sudoku/easy', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/printable-sudoku/medium', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/printable-sudoku/hard', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/printable-sudoku/expert', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/printable-sudoku-with-answers', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/printable-sudoku-4-per-page', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/guides', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/guides/how-to-solve-sudoku', priority: 0.7, changeFrequency: 'yearly' as const },
  { path: '/guides/sudoku-solving-techniques', priority: 0.7, changeFrequency: 'yearly' as const },
  { path: '/guides/how-to-print-sudoku-puzzles', priority: 0.6, changeFrequency: 'yearly' as const },
  { path: '/about', priority: 0.4, changeFrequency: 'yearly' as const },
  { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' as const },
];
