// @ts-check
import { defineConfig } from 'astro/config';

// Les Calades: a static site, French at the root, every page also in English under /en/.
export default defineConfig({
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  trailingSlash: 'always',
  build: { format: 'directory' },
});
