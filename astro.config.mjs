// @ts-check
import { defineConfig } from 'astro/config';

// Les Calades: a static site, French first, with every page also in English.
export default defineConfig({
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'en'],
    routing: { prefixDefaultLocale: true, redirectToDefaultLocale: true },
  },
  trailingSlash: 'always',
  build: { format: 'directory' },
});
