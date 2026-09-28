/**
 * Font loading, shared between the `(en)` and `[locale]` root layouts.
 *
 * next/font calls must happen at module scope, and with two separate root
 * layouts (one per locale group — see the "Multiple root layouts" pattern in
 * the Next.js docs) each layout needs the same font objects rather than
 * loading its own copy. Importing this module from both keeps it to one
 * network request per font family regardless of how many root layouts exist.
 */
import { Roboto_Slab, Inter, IBM_Plex_Mono } from 'next/font/google';

export const slab = Roboto_Slab({
  subsets: ['latin'],
  weight: ['500', '700'],
  display: 'swap',
  variable: '--font-slab',
});

export const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-sans',
});

export const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-mono',
});

export const fontVariables = `${slab.variable} ${inter.variable} ${mono.variable}`;
