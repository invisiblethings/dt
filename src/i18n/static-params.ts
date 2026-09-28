import { notFound } from 'next/navigation';
import { PREFIXED_LOCALES, isLocale, type Locale } from './config';

/** `generateStaticParams` for any route under `src/app/[locale]/**`. */
export function localeStaticParams() {
  return PREFIXED_LOCALES.map((locale) => ({ locale }));
}

/**
 * Narrows a route param to `Locale`, guarding against an invalid value. In the
 * static export every page under `[locale]` is restricted to `de`/`fr`/`es`
 * by `generateStaticParams` + `dynamicParams = false`, so this only matters
 * in dev mode.
 */
export function requireLocale(value: string): Locale {
  if (!isLocale(value) || value === 'en') notFound();
  return value;
}
