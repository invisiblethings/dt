// Adds intrinsic width/height to blog <img> tags that lack them (prevents
// layout shift) and corrects a few poor alt texts. Safe to re-run; the
// WordPress importer calls the same logic for new posts.
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import sharp from 'sharp';
const ALT_FIXES = {
  'Pianoforall learn monnlight sonata beethoven': 'Beethoven’s Moonlight Sonata',
  'Franz Listz': 'Franz Liszt',
  'Pianoforall rethink your mindset': 'Rethinking your mindset about learning piano',
  'Pianoforall Chronotype': 'Chronotype animals: bear, lion, wolf and dolphin',
};
const dir = 'src/content/blog';
for (const f of readdirSync(dir).filter((f) => f.endsWith('.md'))) {
  let s = readFileSync(`${dir}/${f}`, 'utf8');
  const before = s;
  for (const [a, b] of Object.entries(ALT_FIXES)) s = s.split(`alt="${a}"`).join(`alt="${b}"`);
  const tags = [...s.matchAll(/<img\b[^>]*>/g)].map((m) => m[0]).filter((t) => !/\swidth=/.test(t));
  for (const t of tags) {
    const src = t.match(/src="([^"]+)"/)?.[1];
    if (!src?.startsWith('/')) continue;
    try {
      const { width, height } = await sharp(`public${decodeURI(src)}`).metadata();
      s = s.replace(t, t.replace('<img', `<img width="${width}" height="${height}"`));
    } catch (e) { console.warn('skip', src, e.message); }
  }
  if (s !== before) { writeFileSync(`${dir}/${f}`, s); console.log('updated', f); }
}
