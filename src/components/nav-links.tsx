'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV = [
  { href: '/', label: 'Generator' },
  { href: '/printable-sudoku', label: 'By difficulty' },
  { href: '/printable-sudoku-with-answers', label: 'With answers' },
  { href: '/guides', label: 'Guides' },
];

export function NavLinks() {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary">
      <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[12.5px]">
        {NAV.map((item) => {
          // Prefix-match on segment boundaries only, so /printable-sudoku-with-answers
          // does not light up the /printable-sudoku link as well.
          const active =
            pathname === item.href ||
            (item.href !== '/' && pathname.startsWith(`${item.href}/`));
          return (
            <li key={item.href}>
              <Link
                href={item.href}
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
