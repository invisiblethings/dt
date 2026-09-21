import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://brooklynroof.repair',
  integrations: [sitemap()],
  compressHTML: true,
  build: {
    format: 'directory'
  }
});
