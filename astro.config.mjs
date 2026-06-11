import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://chrisconen.dev',
  integrations: [sitemap()],
  build: {
    // Keep all styles in external files so the Content-Security-Policy
    // can stay strict (no 'unsafe-inline'). See public/_headers.
    inlineStylesheets: 'never',
  },
});
