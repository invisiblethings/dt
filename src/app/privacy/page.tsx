import Link from 'next/link';
import { Shell } from '@/components/shell';
import { PageHero } from '@/components/page-hero';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Privacy — Nothing Leaves Your Browser | Grid Press',
  description:
    'Grid Press generates puzzles and builds PDFs entirely in your browser. No accounts, no puzzle data sent to a server, and a plain account of what is collected.',
  path: '/privacy',
});

export default function PrivacyPage() {
  return (
    <Shell className="py-10 shelf:py-14">
      <PageHero
        h1="Privacy"
        lede="The short version: your puzzles are made on your own machine and never sent anywhere. The longer version is below, including the parts that are true of any website."
      />

      <div className="prose-press mt-8 max-w-prose">
        <h2>What happens to the puzzles you generate</h2>
        <p>
          Nothing leaves your browser. When you press Generate, JavaScript running on your own
          device builds the puzzles, verifies each one with a solver, and assembles the PDF. The
          download link points at a file held in your browser&rsquo;s memory, not at a server.
        </p>
        <p>
          As a result there is no record anywhere of what you generated — not your difficulty, not
          your puzzle count, not the grids themselves. We could not show you your previous runs if
          you asked, because they were never ours to keep. Closing the tab discards them.
        </p>

        <h2>Accounts and personal data</h2>
        <p>
          There are no accounts, so there is nothing to sign up for and no password to store. We do
          not ask for your name or your email address, there is no newsletter, and there is no form
          on this site that collects personal information. We do not sell or share personal data,
          because we do not have any to sell or share.
        </p>

        <h2>Cookies and local storage</h2>
        <p>
          Grid Press sets no cookies of its own and does not write your settings to local storage.
          Your difficulty and layout choices live in the page while you are on it and are gone when
          you leave.
        </p>

        <h2>Analytics</h2>
        <p>
          This deployment ships with no analytics script, no advertising tags and no third-party
          trackers. If analytics are added later, this page will be updated to say so, what is
          collected, and by whom — before it goes live rather than after.
        </p>

        <h2>Hosting and server logs</h2>
        <p>
          The site is served as static pages from a hosting provider (Vercel). Like essentially
          every web host, the provider records standard request logs — IP address, timestamp, the
          page requested, browser user agent — for delivery and abuse prevention. That is a
          function of being on the internet at all rather than something this site does with your
          data, we do not analyse those logs, and they contain nothing about the puzzles you
          generated, because your puzzles never reach the server.
        </p>

        <h2>Fonts and third-party requests</h2>
        <p>
          The three typefaces used here are served from this site&rsquo;s own domain rather than
          from Google Fonts, so loading a page does not tell a font provider that you visited. The
          PDF library is likewise bundled with the site and loaded from our origin. Browsing Grid
          Press should not cause your browser to contact a third party.
        </p>

        <h2>Children</h2>
        <p>
          The site is suitable for children and collects nothing from anyone, of any age. There is
          no user-generated content, no messaging and no way for a visitor to submit information.
        </p>

        <h2>Changes to this page</h2>
        <p>
          If how the site handles data changes — analytics, an embedded service, anything at all —
          this page changes with it. Last updated 4 February 2026.
        </p>
      </div>

      <p className="mt-10 text-[15px] text-ink-soft">
        More on how the generator works on the{' '}
        <Link href="/about" className="font-medium text-stamp underline underline-offset-2">
          about page
        </Link>
        .
      </p>
    </Shell>
  );
}
