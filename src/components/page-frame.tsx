import { SiteHeader } from './site-header';
import { SiteFooter } from './site-footer';
import { getDictionary } from '@/i18n/dictionary';
import type { Locale } from '@/i18n/config';

/**
 * Shared page chrome: skip link, header (with the language switcher and nav)
 * and footer. `path` is the current page's locale-independent logical path
 * (e.g. "/printable-sudoku/easy") — each thin route `page.tsx` knows its own
 * path statically, so it is passed down rather than derived at render time.
 */
export function PageFrame({
  locale,
  path,
  children,
}: {
  locale: Locale;
  path: string;
  children: React.ReactNode;
}) {
  const dict = getDictionary(locale);
  return (
    <>
      <a
        href="#main"
        className="sr-only rounded-press focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:font-mono focus:text-[13px] focus:text-white"
      >
        {dict.skipToContent}
      </a>
      <SiteHeader locale={locale} path={path} dict={dict} />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter locale={locale} dict={dict} />
    </>
  );
}
