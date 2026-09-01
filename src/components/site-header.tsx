import Link from 'next/link';
import { NavLinks } from './nav-links';
import { SITE } from '@/lib/site';

export function SiteHeader() {
  return (
    <>
      <div className="ticket-strip" aria-hidden="true" />
      <header className="border-b border-line/70">
        <div className="mx-auto flex max-w-shell flex-col gap-4 px-6 py-6 shelf:flex-row shelf:items-center shelf:justify-between">
          <Link href="/" className="group inline-flex flex-col no-underline">
            <span className="font-display text-[clamp(20px,4.6vw,25px)] font-bold leading-none tracking-[0.4px] text-ink">
              {SITE.wordmark.lead} <span className="text-stamp">{SITE.wordmark.accent}</span>
            </span>
            <span className="mt-1.5 font-mono text-[11px] tracking-[0.3px] text-ink-soft">
              {SITE.tagline}
            </span>
          </Link>
          <NavLinks />
        </div>
      </header>
    </>
  );
}
