import Link from 'next/link';
import { NavLinks } from './nav-links';

export function SiteHeader() {
  return (
    <>
      <div className="ticket-strip" aria-hidden="true" />
      <header className="border-b border-line/70">
        <div className="mx-auto flex max-w-shell flex-col gap-4 px-6 py-6 shelf:flex-row shelf:items-center shelf:justify-between">
          <Link href="/" className="group inline-flex flex-col no-underline">
            <span className="font-display text-[26px] font-bold leading-none tracking-[0.5px] text-ink">
              GRID <span className="text-stamp">PRESS</span>
            </span>
            <span className="mt-1.5 font-mono text-[11px] tracking-[0.3px] text-ink-soft">
              printable sudoku, set like a press run
            </span>
          </Link>
          <NavLinks />
        </div>
      </header>
    </>
  );
}
