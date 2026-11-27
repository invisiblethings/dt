# Privacy Policy and Cookie Policy: how to publish

Both pages are written for what pianoers.com does today (checked on the live site, 9 Oct 2026). Claspo is not mentioned.

## 1. Fill in one thing

In `privacy-policy.html`, find the yellow **[YOUR FULL NAME OR COMPANY NAME]** (it appears twice) and decide what goes there: the person or company that runs the site. Nothing else needs your details; the contact address is info@pianoers.com, which was already on your old policies.

## 2. Paste each page

1. Open `privacy-policy.html` in your browser.
2. Delete the blue "Before you paste" box (or just don't select it), then select everything from "Last updated" to the final "Questions…" line, and copy.
3. Ghost Admin → **Pages** → **Privacy Policy** → click in the body, select all (Ctrl/Cmd + A), delete, and paste. Headings, lists, links and tables come across as normal content.
4. The page title is already "Privacy Policy" (Ghost shows it as the H1), so the body starts with the date. This also removes the duplicate H1 the audit found.
5. Page settings (gear icon) → Meta data → paste the meta description below. Click **Update**.
6. Repeat for `cookie-policy.html` and the page **Cookie Policy**.

Meta descriptions:

- Privacy Policy: `How Pianoers.com collects, uses and protects your data, including analytics, newsletter sign-ups and affiliate links, and your rights.`
- Cookie Policy: `Which cookies and similar technologies Pianoers.com uses, for analytics, videos and affiliate links, and how to control them.`

## 3. Check these statements are true for you

The policies say the following. Change the text if any of it is wrong.

- The site shows no third-party ads.
- Newsletter and sign-in emails go out through an email delivery service (Ghost's default setup).
- Server logs are kept for a short time, then deleted.
- You reply to privacy requests within 30 days.
- The Google tag in Tag Manager includes only Google Analytics 4 and Google's conversion measurement (the `_gcl_au` cookie). If it also runs Google Ads remarketing, say so in both policies.

## 4. Two things the policy can't fix

- **No cookie banner.** The Cookie Policy says so plainly. For visitors in the EU and UK, Google Analytics and the Google conversion cookies normally need their consent first. If a lot of your readers are there, add a consent tool (or use Tag Manager's Consent Mode) and update the "How to control cookies" section. Until then the page is accurate, but it doesn't make those cookies compliant.
- **YouTube embeds set cookies as soon as the page loads.** Ghost's YouTube card can use youtube-nocookie.com, which sets no cookies until the video is played.
- **Newsletter emails** need a postal address in the footer (US CAN-SPAM). Add it in Ghost Admin → Settings → Newsletters → Footer.

This is a careful plain-English draft based on how the site works, not legal advice. If you sell products, take payments, or have many EU/UK readers, have a lawyer read it once.
