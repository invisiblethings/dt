import { defineConfig } from 'astro/config';
import { SITE_URL } from './src/data/site.ts';

// URLs have no trailing slash, matching the existing pianoforall.com
// WordPress URLs, so old links resolve without an extra redirect hop.
export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'never',
  build: { format: 'file', inlineStylesheets: 'auto' },
  compressHTML: true,
  prefetch: { prefetchAll: false, defaultStrategy: 'hover' },
  image: { responsiveStyles: false },
});
