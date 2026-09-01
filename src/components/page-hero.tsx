export function PageHero({
  h1,
  lede,
  eyebrow,
}: {
  h1: string;
  lede: string;
  eyebrow?: string;
}) {
  return (
    <div className="max-w-[62ch]">
      {eyebrow && (
        <p className="mb-3 font-mono text-[11.5px] uppercase tracking-[1px] text-stamp">{eyebrow}</p>
      )}
      <h1 className="m-0 font-display text-[clamp(28px,4.6vw,40px)] font-bold leading-[1.15] text-ink">
        {h1}
      </h1>
      <p className="mt-4 text-[17px] leading-relaxed text-ink-soft">{lede}</p>
    </div>
  );
}
