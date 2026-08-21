// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://carlosjorques.github.io',
  redirects: {
    '/cases': {
      status: 301,
      destination: '/work/',
    },
    '/cases/embedded-control-system-architecture/': { status: 301, destination: '/work/' },
    '/cases/control-algorithms-and-diagnostics/': { status: 301, destination: '/work/' },
    '/cases/cross-functional-technical-delivery/': { status: 301, destination: '/work/' },
  },
  devToolbar: {
    enabled: false,
  },
});
