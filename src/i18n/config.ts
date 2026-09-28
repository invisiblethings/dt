/**
 * Locale configuration — the single place that names which languages exist.
 *
 * English is unprefixed at the root (`/`, `/printable-sudoku/easy`, ...) and
 * lives in the `(en)` route group, because those URLs are already indexed and
 * verified in Search Console; moving them under `/en/` would mean losing that
 * history for no benefit. German, French and Spanish are prefixed
 * (`/de/...`, `/fr/...`, `/es/...`) and live under the `[locale]` dynamic
 * segment. Both route trees render the same shared page components — see
 * `src/content/pages/*` — parameterised by `locale`.
 *
 * URL path segments themselves (`printable-sudoku`, `sudoku-answers`, ...)
 * stay in English across every locale. Localising the slugs too is a
 * legitimate next step but a materially bigger one — it needs a per-locale
 * slug map, cross-locale hreflang pairing by meaning rather than by path, and
 * redirects if a slug is ever renamed — so it has been left out of this pass.
 */

export const LOCALES = ['en', 'de', 'fr', 'es'] as const;
export type Locale = (typeof LOCALES)[number];

/** Locales that live under a `/xx/` prefix — every locale except English. */
export const PREFIXED_LOCALES = LOCALES.filter((l): l is Exclude<Locale, 'en'> => l !== 'en');

export const DEFAULT_LOCALE: Locale = 'en';

export const LOCALE_NAMES: Record<Locale, string> = {
  en: 'English',
  de: 'Deutsch',
  fr: 'Français',
  es: 'Español',
};

/** BCP 47 tag used for `<html lang>`, hreflang and Open Graph locale. */
export const LOCALE_TAGS: Record<Locale, string> = {
  en: 'en',
  de: 'de',
  fr: 'fr',
  es: 'es',
};

export const OG_LOCALES: Record<Locale, string> = {
  en: 'en_US',
  de: 'de_DE',
  fr: 'fr_FR',
  es: 'es_ES',
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/** Prefixes a path with the locale, except English which stays unprefixed. */
export function localizedPath(locale: Locale, path: string): string {
  const clean = path === '/' ? '' : path;
  return locale === DEFAULT_LOCALE ? clean || '/' : `/${locale}${clean || ''}` || `/${locale}`;
}
