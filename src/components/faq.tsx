import type { FaqItem } from '@/lib/seo';

/**
 * Answers are rendered in the server HTML (inside <details open by default on
 * the markup level via plain text) so crawlers see them without running JS.
 */
export function Faq({ items, heading, id = 'faq' }: { items: FaqItem[]; heading: string; id?: string }) {
  return (
    <section aria-labelledby={`${id}-heading`} className="mt-16">
      <h2 id={`${id}-heading`} className="mb-6 font-display text-[24px] font-bold">
        {heading}
      </h2>
      <div className="press-card divide-y divide-line">
        {items.map((item) => (
          <details key={item.question} className="group px-5 py-4 open:pb-5" name={id}>
            <summary className="cursor-pointer list-none font-display text-[15.5px] font-bold text-ink marker:hidden [&::-webkit-details-marker]:hidden">
              <span className="mr-2 font-mono text-[13px] text-stamp group-open:hidden" aria-hidden="true">
                +
              </span>
              <span className="mr-2 hidden font-mono text-[13px] text-stamp group-open:inline" aria-hidden="true">
                –
              </span>
              {item.question}
            </summary>
            <p className="mb-0 mt-2.5 pl-6 text-[14.5px] leading-relaxed text-ink-soft">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
