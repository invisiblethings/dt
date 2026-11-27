# Sitewide Organization schema for Pianoers.com

## Install (5 minutes)
1. **Upload the logo.**
   - Ghost Admin → open any draft post → add an image card → upload `pianoers-logo-square.png`.
   - Right-click the image → **Copy image address**, then delete the draft.
   - You don't need to publish anything: the file stays on the server.
2. **Check the logo URL.**
   - If the copied address is exactly `https://pianoers.com/content/images/2026/11/pianoers-logo-square.png`, there's nothing to change.
   - If it's different (Ghost adds `-1` when a file with the same name exists, or the month differs), replace that URL in the two places it appears in `organization-schema.html`.
3. **Add the schema.** Ghost Admin → Settings → Code injection → **Site header**: paste `organization-schema.html` below anything already there, then **Save**.
4. **Test it.**
   - Open https://search.google.com/test/rich-results and test `https://pianoers.com/`. It should show **Organization** with no errors.
   - Also test the page in https://validator.schema.org.
5. **Ask Google to recrawl.** In Search Console, request indexing for the homepage.

## What it says
- **Who you are:** Pianoers.com (also "Pianoers"), founded 2021, based in the US, serving a worldwide audience.
- **People:**
  - Founder Richard Abraham ("Founder and chief reviewer")
  - Katarina ("Lead piano teacher")
  - Each links to their author page.
- **Contact:** hello@pianoers.com, plus the contact page.
- **Profiles (sameAs):** Facebook and YouTube.
- **How you publish:** the About page, as publishing principles.

## Notes
- **Ghost's own schema** still adds a simple "publisher" block on every page. Google combines them; nothing conflicts.
- **New social profiles** (Instagram, Pinterest and so on): add the URL to `sameAs`, nothing else.
- **No credentials for Katarina** are in the schema yet. Once the About page and her author bio agree (MTNA, Music Teachers National Association), a `memberOf` line can be added.
- **This is a manual copy.** If you edit the schema later, edit it in Ghost.

## Test results (10 Nov 2026)

**Passed**
- **On every page tested:** the Organization schema is live on the homepage, About, /best-digital-piano/ and /hover-chords/.
- **Exact match:** the live copy is identical to this file.
- **Valid:** every JSON-LD block on those pages parses.
- **Logo:** loads at the expected URL (200, PNG, 800 × 800).
- **Links:** the Facebook, YouTube, author, contact and About URLs all resolve.
- **Hover Chords:** both buttons and the schema now point to the Web Store listing, with no placeholder left.

**Fixed**
1. **Founder's name.** The sitewide schema said "Richard Abraham"; his author page and the About page schema say "Richard J. Abraham". The schema now uses "Richard J. Abraham".
   - **Action:** replace the Site header block with the updated `organization-schema.html`.
2. **Second Organization on the About page.** The About page's own code injection had an AboutPage block with a separate Organization in it:
   - named "Pianoers", not "Pianoers.com"
   - no `@id`
   - different job titles

   Google could read that as a second organization. `about-page-schema.html` replaces it. It points to the sitewide organization (`#organization`) and keeps Katarina's details (University of Missouri, MTNA, her Online Piano Teachers profile) on her `#katarina` entry.
   - **Action:** About page → Settings → Code injection → Post header. Replace the AboutPage block there with `about-page-schema.html`.

**Still to fix on the About page text:** it says Katarina "has been a member of the National Association of Music Teachers since 1995". Her bio and the schema say MTNA (Music Teachers National Association), and 1995 is before she started teaching in 2001. Change the sentence to match, for example "is a member of the Music Teachers National Association (MTNA)".
