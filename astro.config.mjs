import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// NOTE: @astrojs/sitemap is re-enabled once the full site (multiple pages) is built out.
export default defineConfig({
  site: 'https://alterphaseroofing.com',
  integrations: [tailwind()],
});
