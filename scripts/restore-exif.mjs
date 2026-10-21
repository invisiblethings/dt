// After `astro build`, put each project and service photo's original camera metadata (EXIF, including GPS where the
// original had it) back into every WebP size Astro generated. Astro's image pipeline strips metadata on
// re-encode; the owner wants the originals' metadata kept. Sources: src/assets/projects/exif/<photo>.exif,
// raw EXIF copied from the matching CompanyCam original. No pixels are re-encoded.
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const exifDirs = ['src/assets/projects/exif', 'src/assets/services/exif'];
const outDir = 'dist/_astro';

const chunk = (fourcc, data) => {
  const head = Buffer.alloc(8);
  head.write(fourcc, 0, 'ascii');
  head.writeUInt32LE(data.length, 4);
  return Buffer.concat([head, data, data.length % 2 ? Buffer.alloc(1) : Buffer.alloc(0)]);
};

const readChunks = (buf) => {
  const out = [];
  for (let off = 12; off + 8 <= buf.length; ) {
    const size = buf.readUInt32LE(off + 4);
    out.push({ id: buf.toString('ascii', off, off + 4), data: buf.subarray(off + 8, off + 8 + size) });
    off += 8 + size + (size % 2);
  }
  return out;
};

const canvasSize = ({ id, data }) => {
  if (id === 'VP8 ') return [data.readUInt16LE(6) & 0x3fff, data.readUInt16LE(8) & 0x3fff];
  if (id === 'VP8L') {
    const b = data.readUInt32LE(1);
    return [(b & 0x3fff) + 1, ((b >> 14) & 0x3fff) + 1];
  }
  throw new Error(`Unexpected first chunk ${id}`);
};

export const withExif = (webp, tiff) => {
  if (webp.toString('ascii', 0, 4) !== 'RIFF' || webp.toString('ascii', 8, 12) !== 'WEBP') throw new Error('Not a WebP file');
  let chunks = readChunks(webp).filter((c) => c.id !== 'EXIF');
  if (chunks[0].id !== 'VP8X') {
    const [w, h] = canvasSize(chunks[0]);
    const alpha = chunks[0].id === 'VP8L' && (chunks[0].data.readUInt32LE(1) >> 28) & 1;
    const x = Buffer.alloc(10);
    x[0] = alpha ? 0x10 : 0;
    x.writeUIntLE(w - 1, 4, 3);
    x.writeUIntLE(h - 1, 7, 3);
    chunks = [{ id: 'VP8X', data: x }, ...chunks];
  }
  const vp8x = Buffer.from(chunks[0].data);
  vp8x[0] |= 0x08; // EXIF present
  chunks[0] = { id: 'VP8X', data: vp8x };
  const body = Buffer.concat([Buffer.from('WEBP'), ...chunks.map((c) => chunk(c.id, c.data)), chunk('EXIF', tiff)]);
  const head = Buffer.alloc(8);
  head.write('RIFF', 0, 'ascii');
  head.writeUInt32LE(body.length, 4);
  return Buffer.concat([head, body]);
};

const built = readdirSync(outDir).filter((f) => f.endsWith('.webp'));
let count = 0;
for (const [exifDir, file] of exifDirs.flatMap((d) => readdirSync(d).filter((f) => f.endsWith('.exif')).map((f) => [d, f]))) {
  const name = file.replace(/\.exif$/, '');
  let tiff = readFileSync(join(exifDir, file));
  if (tiff.toString('ascii', 0, 6) === 'Exif\0\0') tiff = tiff.subarray(6); // WebP stores the TIFF block without the JPEG prefix
  for (const out of built.filter((f) => f.startsWith(`${name}.`))) {
    const p = join(outDir, out);
    writeFileSync(p, withExif(readFileSync(p), tiff));
    count++;
  }
}
console.log(`restore-exif: original metadata written to ${count} images`);
