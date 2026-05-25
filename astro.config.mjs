// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://carlosjorques.github.io',
  base: '/carlosjorques',
  devToolbar: {
    enabled: false,
  },
});
