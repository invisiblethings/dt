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
