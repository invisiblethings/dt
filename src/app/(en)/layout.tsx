import type { Metadata, Viewport } from 'next';
import { fontVariables } from '@/lib/fonts';
import { SITE, SITE_L10N } from '@/lib/site';
import '../globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  // Every page sets an absolute title via pageMetadata(); this is the fallback.
  // There is no "%s | Printable Sudoku" template on purpose — the brand name is
  // the primary keyword, so appending it to each title would just repeat it.
  title: 'Free Printable Sudoku — Download Puzzle PDFs',
  description: SITE_L10N.en.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  publisher: SITE.name,
  formatDetection: { telephone: false, address: false, email: false },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
};

export const viewport: Viewport = {
  themeColor: '#EDEAE0',
  width: 'device-width',
  initialScale: 1,
};

export default function EnglishRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontVariables}>
      <body className="flex min-h-screen flex-col">{children}</body>
    </html>
  );
}
