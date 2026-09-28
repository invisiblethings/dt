'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { localizedPath, type Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionary';

/*
 * Derives its own dictionary from `locale` rather than receiving one as a
 * prop: this is a Client Component, and several Dictionary branches (e.g.
 * footer.copyright) hold functions, which cannot cross the server/client
 * boundary as serialized props.
 */
export function NavLinks({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const dict = getDictionary(locale);

  const NAV = [
    { path: '/', label: dict.nav.generator },
    { path: '/printable-sudoku', label: dict.nav.byDifficulty },
    { path: '/printable-sudoku-with-answers', label: dict.nav.withAnswers },
    { path: '/sudoku-answers', label: dict.nav.answerLookup },
    { path: '/guides', label: dict.nav.guides },
  ];

  return (
    <nav aria-label={dict.nav.ariaLabel}>
      <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[12.5px]">
        {NAV.map((item) => {
          const href = localizedPath(locale, item.path);
          // Prefix-match on segment boundaries only, so /printable-sudoku-with-answers
          // does not light up the /printable-sudoku link as well.
          const active = pathname === href || (href !== '/' && pathname.startsWith(`${href}/`));
          return (
            <li key={item.path}>
              <Link
                href={href}
                aria-current={active ? 'page' : undefined}
                className={
                  active
                    ? 'border-b-2 border-stamp pb-0.5 text-ink no-underline'
                    : 'border-b-2 border-transparent pb-0.5 text-ink-soft no-underline hover:text-ink'
                }
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
