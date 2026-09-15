import Link from 'next/link';
import { NavLinks } from './nav-links';
import { LanguageSwitcher } from './language-switcher';
import { SITE, SITE_L10N } from '@/lib/site';
import { localizedPath, type Locale } from '@/i18n/config';
import type { Dictionary } from '@/i18n/dictionary';

export function SiteHeader({ locale, path, dict }: { locale: Locale; path: string; dict: Dictionary }) {
  return (
    <>
      <div className="ticket-strip" aria-hidden="true" />
      <header className="border-b border-line/70">
        <div className="mx-auto flex max-w-shell flex-col gap-3 px-6 pb-3 pt-4 shelf:flex-row shelf:items-center shelf:justify-end">
          <LanguageSwitcher locale={locale} path={path} ariaLabel={dict.languageSwitcher.ariaLabel} />
        </div>
        <div className="mx-auto flex max-w-shell flex-col gap-4 px-6 pb-6 pt-2 shelf:flex-row shelf:items-center shelf:justify-between">
          <Link href={localizedPath(locale, '/')} className="group inline-flex flex-col no-underline">
            <span className="font-display text-[clamp(20px,4.6vw,25px)] font-bold leading-none tracking-[0.4px] text-ink">
              {SITE.wordmark.lead} <span className="text-stamp">{SITE.wordmark.accent}</span>
            </span>
            <span className="mt-1.5 font-mono text-[11px] tracking-[0.3px] text-ink-soft">
              {SITE_L10N[locale].tagline}
            </span>
          </Link>
          <NavLinks locale={locale} />
        </div>
      </header>
    </>
  );
}
