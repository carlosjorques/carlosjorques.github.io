// @ts-check
import { defineConfig } from 'astro/config';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeSplitReferences from './src/plugins/rehype-split-references.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://carlosjorques.com',
  redirects: {
    '/cases': {
      status: 301,
      destination: '/work/',
    },
    '/cases/embedded-control-system-architecture/': { status: 301, destination: '/work/' },
    '/cases/control-algorithms-and-diagnostics/': { status: 301, destination: '/work/' },
    '/cases/cross-functional-technical-delivery/': { status: 301, destination: '/work/' },
  },
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex, rehypeSplitReferences],
  },
  devToolbar: {
    enabled: false,
  },
});
