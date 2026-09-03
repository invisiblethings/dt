import Link from 'next/link';

export interface Crumb {
  name: string;
  path: string;
}

/** Visible breadcrumb trail. The matching BreadcrumbList JSON-LD is emitted by the page. */
export function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11.5px] text-ink-soft">
        {trail.map((crumb, i) => {
          const last = i === trail.length - 1;
          return (
            <li key={crumb.path} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page" className="text-ink">
                  {crumb.name}
                </span>
              ) : (
                <Link href={crumb.path} className="text-ink-soft no-underline hover:text-stamp hover:underline">
                  {crumb.name}
                </Link>
              )}
              {!last && <span aria-hidden="true">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
