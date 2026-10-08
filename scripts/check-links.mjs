// Post-build QA: every internal link and asset in dist/ must resolve to a
// built file or a redirect in netlify.toml. Also checks each indexable page
// has exactly one <h1>, a title, a meta description and a canonical tag,
// and that every JSON-LD block parses.
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import path from 'node:path';

const DIST = 'dist';
const files = [];
const walk = (d) => readdirSync(d).forEach((f) => { const p = path.join(d, f); statSync(p).isDirectory() ? walk(p) : files.push(p); });
walk(DIST);

// Redirects are generated into dist/_redirects at build time.
const redirects = readFileSync(path.join(DIST, '_redirects'), 'utf8').split('\n').map((l) => l.trim().split(/\s+/)[0]).filter((f) => f && f.startsWith('/'));
const isRedirect = (u) => redirects.some((r) => (r.endsWith('/*') ? u.startsWith(r.slice(0, -1)) : r === u));
const resolves = (u) => {
  const clean = decodeURI(u.split('#')[0].split('?')[0]);
  if (clean === '/' || clean === '') return true;
  const p = path.join(DIST, clean);
  return existsSync(p) && statSync(p).isFile() || existsSync(p + '.html') || existsSync(path.join(p, 'index.html')) || isRedirect(clean);
};

let errors = 0, pages = 0;
const titles = new Map(), descs = new Map();
for (const f of files.filter((f) => f.endsWith('.html'))) {
  const html = readFileSync(f, 'utf8');
  const rel = '/' + path.relative(DIST, f).replace(/\.html$/, '').replace(/(^|\/)index$/, '');
  pages++;
  for (const m of html.matchAll(/(?:href|src)="(\/[^"]*)"/g)) {
    if (!resolves(m[1])) { console.log(`✗ ${rel} -> ${m[1]}`); errors++; }
  }
  for (const m of html.matchAll(/srcset="([^"]+)"/g)) for (const part of m[1].split(',')) { const u = part.trim().split(' ')[0]; if (u.startsWith('/') && !resolves(u)) { console.log(`✗ ${rel} srcset ${u}`); errors++; } }
  const noindex = /name="robots" content="noindex/.test(html);
  const h1 = (html.match(/<h1[\s>]/g) || []).length;
  if (h1 !== 1) { console.log(`! ${rel}: ${h1} h1 tags`); errors++; }
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1];
  const desc = html.match(/<meta name="description" content="([^"]*)"/)?.[1];
  if (!noindex) {
    if (!title || !desc || !/rel="canonical"/.test(html)) { console.log(`! ${rel}: missing title/description/canonical`); errors++; }
    if (title && title.length > 70) console.log(`  (long title ${title.length}) ${rel}: ${title}`);
    if (desc && (desc.length > 165 || desc.length < 70)) console.log(`  (description ${desc.length} chars) ${rel}`);
    if (titles.has(title)) { console.log(`! duplicate title ${rel} & ${titles.get(title)}`); errors++; } else titles.set(title, rel);
    if (descs.has(desc)) { console.log(`! duplicate description ${rel} & ${descs.get(desc)}`); errors++; } else descs.set(desc, rel);
  }
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(m[1]); } catch { console.log(`! ${rel}: invalid JSON-LD`); errors++; }
  }
  for (const m of html.matchAll(/<img\b[^>]*>/g)) if (!/\salt(\s|=|>|\/)/.test(m[0])) { console.log(`! ${rel}: img without alt`); errors++; }
}
console.log(`\n${pages} pages checked, ${errors} problem(s).`);
process.exit(errors ? 1 : 0);
