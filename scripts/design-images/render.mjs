// Renders the guide illustrations in scripts/design-images/images.mjs to PNG
// (2x), then make-jpgs.py turns them into 1200x630 JPGs with metadata.
// Usage: node scripts/design-images/render.mjs <outdir>
import { chromium } from '/opt/node22/lib/node_modules/playwright/index.mjs';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import { writeFileSync } from 'node:fs';
import { IMAGES } from './images.mjs';

const out = process.argv[2];
const fonts = pathToFileURL(resolve('public/fonts')).href;
const css = `
@font-face { font-family: Fraunces; src: url(${fonts}/fraunces-latin-wght-normal.woff2) format('woff2'); font-weight: 100 900; }
@font-face { font-family: Inter; src: url(${fonts}/inter-latin-wght-normal.woff2) format('woff2'); font-weight: 100 900; }
:root { --paper:#faf7f2; --card:#fff; --ink:#1b1915; --muted:#6b645a; --brass:#c8962e; --soft:#f4e7c8; --brass-ink:#7a5310; --line:#e6dfd3; --red:#c4553b; --blue:#3d6fa8; }
* { box-sizing: border-box; margin: 0; }
body { width: 1200px; height: 630px; background: var(--paper); font-family: Inter, sans-serif; color: var(--ink); overflow: hidden; position: relative; }
.frame { position: absolute; inset: 0; padding: 56px 64px; display: flex; flex-direction: column; }
.eyebrow { font-weight: 700; letter-spacing: .14em; text-transform: uppercase; font-size: 17px; color: var(--brass-ink); }
h1 { font-family: Fraunces, serif; font-weight: 600; font-size: 58px; line-height: 1.04; letter-spacing: -.01em; margin-top: 12px; }
.sub { font-size: 22px; color: var(--muted); margin-top: 12px; }
.brand { position: absolute; left: 64px; bottom: 40px; font-family: Fraunces, serif; font-weight: 600; font-size: 22px; display: flex; align-items: center; gap: 10px; }
.brand i { width: 30px; height: 30px; border-radius: 7px; background: var(--brass); display: inline-block; position: relative; }
.brand i::after { content: ''; position: absolute; inset: 7px 6px; background: repeating-linear-gradient(90deg, var(--ink) 0 2px, transparent 2px 5px); border-radius: 2px; }
.row { display: flex; gap: 22px; }
.card { background: var(--card); border: 1.5px solid var(--line); border-radius: 18px; padding: 20px 22px; }
.chip { display: inline-block; background: var(--soft); color: var(--brass-ink); font-weight: 700; border-radius: 999px; padding: 6px 14px; font-size: 18px; }
.big { font-family: Fraunces, serif; font-weight: 600; }
`;

const b = await chromium.launch();
const page = await b.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 2 });
for (const img of IMAGES) {
  // Loaded from a file so the local font files are allowed.
  const htmlPath = resolve(out, `${img.file}.html`);
  writeFileSync(htmlPath, `<!doctype html><html><head><meta charset="utf-8"><style>${css}${img.css ?? ''}</style></head><body>${img.html}<div class="brand"><i></i>Pianoforall</div></body></html>`);
  await page.goto(pathToFileURL(htmlPath).href);
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: `${out}/${img.file}.png` });
  console.log('rendered', img.file);
}
await b.close();

writeFileSync(`${out}/manifest.json`, JSON.stringify(IMAGES.map(({ html, css, ...m }) => m), null, 2));
