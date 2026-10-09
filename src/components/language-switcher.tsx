import Link from 'next/link';
import { LOCALES, LOCALE_NAMES, localizedPath, type Locale } from '@/i18n/config';

/**
 * Cross-links the current page to its equivalent in every other locale.
 * Because URL path *segments* are not translated (see `src/i18n/config.ts`),
 * this is always the same logical page in another language — never a
 * language-specific homepage fallback. Relative paths (not the absolute
 * hreflang URLs from `alternateLinks`) so Next can prefetch them normally.
 */
export function LanguageSwitcher({
  locale,
  path,
  ariaLabel,
}: {
  locale: Locale;
  /** Locale-independent logical path, e.g. "/printable-sudoku/easy". */
  path: string;
  ariaLabel: string;
}) {
  return (
    <nav aria-label={ariaLabel}>
      <ul className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11.5px]">
        {LOCALES.map((l) => {
          const active = l === locale;
          return (
            <li key={l}>
              {active ? (
                <span aria-current="page" className="font-semibold text-ink">
                  {LOCALE_NAMES[l]}
                </span>
              ) : (
                <Link
                  href={localizedPath(l, path)}
                  lang={l}
                  className="text-ink-soft no-underline hover:text-stamp hover:underline"
                >
                  {LOCALE_NAMES[l]}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
