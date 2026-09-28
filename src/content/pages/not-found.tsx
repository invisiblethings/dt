import Link from 'next/link';
import { Shell } from '@/components/shell';
import { PreviewSheet } from '@/components/preview-sheet';
import { getDictionary } from '@/i18n/dictionary';
import { SAMPLE_PUZZLES } from '@/lib/samples';
import { localizedPath, type Locale } from '@/i18n/config';
import { pageMetadata } from '@/lib/seo';

export function getNotFoundMetadata(locale: Locale) {
  const dict = getDictionary(locale);
  return pageMetadata({
    title: dict.notFound.pageTitle,
    description: dict.notFound.lede,
    path: '/404',
    locale,
    noIndex: true,
  });
}

export function NotFoundPage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const t = dict.notFound;
  const L = (path: string) => localizedPath(locale, path);
  const LINKS = [
    { href: L('/'), label: t.generatorLink },
    { href: L('/printable-sudoku'), label: t.byDifficultyLink },
    { href: L('/printable-sudoku-with-answers'), label: t.withAnswersLink },
    { href: L('/guides'), label: t.guidesLink },
  ];

  return (
    <Shell className="py-14">
      <div className="grid items-start gap-12 shelf:grid-cols-[minmax(0,1fr)_360px]">
        <div className="max-w-prose">
          <p className="m-0 font-mono text-[11.5px] uppercase tracking-[1px] text-stamp">{t.eyebrow}</p>
          <h1 className="mb-0 mt-3 font-display text-[clamp(28px,4.6vw,40px)] font-bold leading-[1.15]">
            {t.h1}
          </h1>
          <p className="mt-4 text-[17px] leading-relaxed text-ink-soft">{t.lede}</p>

          <h2 className="mb-3 mt-10 font-display text-[18px] font-bold">{t.tryThese}</h2>
          <ul className="list-none space-y-2.5 p-0">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[15px] font-medium text-stamp underline underline-offset-2 hover:text-stamp-dark"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex justify-center">
          <PreviewSheet
            cells={SAMPLE_PUZZLES.easy.clues}
            code={SAMPLE_PUZZLES.easy.code}
            difficulty="easy"
            clueCount={SAMPLE_PUZZLES.easy.clueCount}
            locale={locale}
            status={t.status}
          />
        </div>
      </div>
    </Shell>
  );
}
