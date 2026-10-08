// Imports every published post from the current WordPress site into
// src/content/blog as Markdown files with HTML bodies, keeping each post's
// slug so URLs stay identical (pianoforall.com/<slug>). Images are
// downloaded into public/wp-content/uploads so the posts survive WordPress being
// switched off. Re-run any time before launch: `npm run import:blog`.
//
// Usage: node scripts/import-wordpress.mjs [https://pianoforall.com]

import { mkdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const WP = (process.argv[2] || 'https://pianoforall.com').replace(/\/$/, '');
const OUT = 'src/content/blog';
// Images keep their original WordPress paths, so /wp-content/uploads/... URLs
// that other sites and Google Images link to keep working after the switch.
const MEDIA = 'public';
const UA = { 'User-Agent': 'Mozilla/5.0 (pianoforall-migration)' };

const getJSON = async (url) => {
  const r = await fetch(url, { headers: UA });
  if (!r.ok) throw new Error(`${r.status} ${url}`);
  return r.json();
};

const decode = (s = '') =>
  s.replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#039;|&apos;/g, "'")
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ')
    .replace(/&hellip;/g, '…').replace(/&ndash;/g, '–').replace(/&mdash;/g, '—')
    .replace(/&rsquo;/g, '’').replace(/&lsquo;/g, '‘').replace(/&rdquo;/g, '”').replace(/&ldquo;/g, '“');

const yamlStr = (s) => JSON.stringify(s ?? '');

const downloaded = new Map();
async function localise(url) {
  if (downloaded.has(url)) return downloaded.get(url);
  let clean = url.replace(/^\/\//, 'https://').replace('pianoforall8634.live-website.com', 'pianoforall.com');
  const u = new URL(clean);
  const pub = decodeURI(u.pathname);
  const dest = path.join(MEDIA, pub);
  await mkdir(path.dirname(dest), { recursive: true });
  if (!existsSync(dest)) {
    try {
      const r = await fetch(clean, { headers: UA });
      if (!r.ok) throw new Error(String(r.status));
      await writeFile(dest, Buffer.from(await r.arrayBuffer()));
    } catch (e) {
      console.warn(`  ! image failed ${clean}: ${e.message}`);
      downloaded.set(url, url);
      return url;
    }
  }
  downloaded.set(url, pub);
  return pub;
}

function cleanHtml(html) {
  return html
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/\s(class|style|id|data-[\w-]+|decoding|fetchpriority|srcset|sizes)="[^"]*"/gi, '')
    .replace(/<(div|span|section)\b[^>]*>\s*/gi, '').replace(/\s*<\/(div|span|section)>/gi, '')
    .replace(/<h1\b/gi, '<h2').replace(/<\/h1>/gi, '</h2>')
    .replace(/<iframe\b(?![^>]*loading=)/gi, '<iframe loading="lazy"')
    .replace(/<img\b(?![^>]*loading=)/gi, '<img loading="lazy"')
    .replace(/<p>\s*(&nbsp;|\s)*<\/p>/gi, '')
    .replace(/<figure>\s*<\/figure>/gi, '')
    .replace(/https?:\/\/pianoforall8634\.live-website\.com/g, 'https://pianoforall.com')
    // internal links become root-relative so they work on any host
    .replace(/href="https?:\/\/(www\.)?pianoforall\.com(\/[^"]*)?"/g, (_, __, p = '/') => `href="${p.replace(/\/$/, '') || '/'}"`)
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

await mkdir(OUT, { recursive: true });
await mkdir(MEDIA, { recursive: true });

const cats = Object.fromEntries((await getJSON(`${WP}/wp-json/wp/v2/categories?per_page=100`)).map((c) => [c.id, { slug: c.slug, name: decode(c.name) }]));
const tags = Object.fromEntries((await getJSON(`${WP}/wp-json/wp/v2/tags?per_page=100`)).map((t) => [t.id, decode(t.name)]));
const users = Object.fromEntries((await getJSON(`${WP}/wp-json/wp/v2/users?per_page=100`).catch(() => [])).map((u) => [u.id, u.name]));
const posts = await getJSON(`${WP}/wp-json/wp/v2/posts?per_page=100&status=publish&_embed=wp:featuredmedia`);

const index = [];
for (const p of posts) {
  let html = p.content.rendered;
  const imgs = [...html.matchAll(/<img[^>]+src="([^"]+)"/g)].map((m) => m[1]);
  for (const src of imgs) {
    if (/wp-content\/uploads/.test(src)) html = html.split(src).join(await localise(src));
  }
  // Linked files (PDF worksheets etc.) on the old uploads path
  for (const m of [...html.matchAll(/href="([^"]*wp-content\/uploads\/[^"]+)"/g)]) html = html.split(m[1]).join(await localise(m[1]));
  html = cleanHtml(html);
  // WordPress images had no alt text; describe them from the file name until someone writes real alt text.
  html = html.replace(/<img\b(?![^>]*\salt=)([^>]*?)src="([^"]+)"/g, (_, pre, src) => {
    const alt = decodeURI(src).split('/').pop().replace(/\.[a-z]+$/i, '').replace(/-\d+x\d+$/, '').replace(/[-_]+/g, ' ').replace(/\s+\d+$/, '').trim();
    return `<img${pre}alt="${alt}" src="${src}"`;
  });

  const media = p._embedded?.['wp:featuredmedia']?.[0];
  const hero = media?.source_url ? await localise(media.source_url) : undefined;
  const yoast = p.yoast_head_json || {};
  const title = decode(p.title.rendered);
  const description = decode(yoast.description || yoast.og_description || p.excerpt.rendered.replace(/<[^>]+>/g, '').trim()).slice(0, 300);
  const category = cats[p.categories[0]] || { slug: 'learn-piano', name: 'Learn Piano' };
  category.name = category.name.toLowerCase().replace(/(^|\s|&\s)([a-z])/g, (m) => m.toUpperCase());

  const fm = [
    '---',
    `title: ${yamlStr(title)}`,
    `seoTitle: ${yamlStr(decode(yoast.title || '').replace(/\s*-\s*Pianoforall$/, ''))}`,
    `description: ${yamlStr(description)}`,
    `pubDate: ${yamlStr(p.date_gmt + 'Z')}`,
    `updatedDate: ${yamlStr(p.modified_gmt + 'Z')}`,
    `author: ${yamlStr(users[p.author] || 'Robin Hall')}`,
    `category: ${yamlStr(category.slug)}`,
    `categoryName: ${yamlStr(category.name)}`,
    `tags: ${JSON.stringify(p.tags.map((t) => tags[t]).filter(Boolean))}`,
    hero ? `heroImage: ${yamlStr(hero)}` : null,
    hero ? `heroAlt: ${yamlStr(decode(media.alt_text || title))}` : null,
    `wpId: ${p.id}`,
    '---',
    '',
  ].filter((l) => l !== null).join('\n');

  await writeFile(path.join(OUT, `${p.slug}.md`), fm + html + '\n');
  index.push(p.slug);
  console.log(`✓ /${p.slug}  (${imgs.length} images)`);
}
console.log(`\nImported ${index.length} posts, ${downloaded.size} images.`);
