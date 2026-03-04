import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  i18n: {
    defaultLocale: 'nl',
    locales: ['nl', 'de'],
    routing: {
      prefixDefaultLocale: true,
    },
  },
});
