import type { Metadata } from 'next';
import { fontVariables } from '@/lib/fonts';
import { PageFrame } from '@/components/page-frame';
import { getNotFoundMetadata, NotFoundPage } from '@/content/pages/not-found';
import { SITE } from '@/lib/site';
import './globals.css';

/*
 * With no top-level root layout (the (en) and [locale] route groups each
 * define their own — see the "multiple root layouts" pattern), Next falls
 * back to this file for any request that does not match either tree at all,
 * and requires it to carry its own <html>/<body> since no layout will. It
 * also has no layout to inherit `metadataBase` from, so it is set here too.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  ...getNotFoundMetadata('en'),
};

export default function NotFound() {
  return (
    <html lang="en" className={fontVariables}>
      <body className="flex min-h-screen flex-col">
        {/* "/" rather than "/404": no per-locale 404 route exists for the
            language switcher to cross-link to. */}
        <PageFrame locale="en" path="/">
          <NotFoundPage locale="en" />
        </PageFrame>
      </body>
    </html>
  );
}
