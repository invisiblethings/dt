import { defineConfig } from 'astro/config';
import { writeFileSync } from 'node:fs';
import { SITE_URL, PRODUCTS, FEATURES, IS_PREVIEW } from './src/data/site.ts';
import { PATH_REDIRECTS, OLD_HOSTS, GONE } from './src/data/redirects.ts';
import rehypeBlogCleanup from './src/lib/rehype-blog-cleanup.mjs';

// Writes dist/_redirects from src/data/site.ts and src/data/redirects.ts:
// 1. pretty checkout links (/go/...) -> ClickBank, 302 so nobody caches them
// 2. old URLs from other hosts, each sent straight to its final page (no chains)
// 3. old paths on this host
// 4. everything else on the old hosts -> same path here
// Netlify uses the first rule that matches, so order matters.
const redirectsFile = () => ({
  name: 'redirects-file',
  hooks: {
    'astro:build:done': ({ dir }) => {
      const paths = PATH_REDIRECTS.filter(([from]) => FEATURES.freeLessons ? from !== '/free-lessons' : true);
      const abs = (to) => (to.startsWith('http') ? to : SITE_URL + to);
      const lines = [
        '# Generated at build time from src/data/site.ts and src/data/redirects.ts. Do not edit by hand.',
        '', '# Checkout links',
        ...Object.values(PRODUCTS).map((p) => `${p.checkout}  ${p.orderUrl}  302`),
        '', '# Old hosts: changed URLs go straight to their final page',
        ...(IS_PREVIEW ? [] : OLD_HOSTS).flatMap((host) => paths.map(([from, to, code = 301]) => `${host}${from}  ${abs(to)}  ${code}!`)),
        '', '# Old paths on this host',
        ...paths.map(([from, to, code = 301]) => `${from}  ${to}  ${code}`),
        ...GONE.map((g) => `${g}  /404  410`),
        '', '# Old hosts: everything else keeps its path',
        ...(IS_PREVIEW ? [] : OLD_HOSTS).map((host) => `${host}/*  ${SITE_URL}/:splat  301!`),
      ];
      writeFileSync(new URL('_redirects', dir), lines.join('\n') + '\n');
    },
  },
});

// URLs have no trailing slash, matching the old pianoforall.com WordPress
// URLs, so old links map across without an extra hop.
export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'never',
  build: { format: 'file', inlineStylesheets: 'auto' },
  compressHTML: true,
  prefetch: { prefetchAll: false, defaultStrategy: 'hover' },
  image: { responsiveStyles: false },
  integrations: [redirectsFile()],
  markdown: { rehypePlugins: [[rehypeBlogCleanup, { freeLessons: FEATURES.freeLessons, redirects: PATH_REDIRECTS }]] },
});
