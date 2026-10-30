// @ts-check
import { defineConfig } from 'astro/config';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeSplitReferences from './src/plugins/rehype-split-references.mjs';
import rehypeWrapTables from './src/plugins/rehype-wrap-tables.mjs';
import rehypeMidArticleNote from './src/plugins/rehype-mid-article-note.mjs';
import rehypeImageSize from './src/plugins/rehype-image-size.mjs';
import unlinkUnpublishedWriting from './src/integrations/unlink-unpublished-writing.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://carlosjorques.com',
  integrations: [unlinkUnpublishedWriting()],
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
    rehypePlugins: [rehypeKatex, rehypeWrapTables, rehypeSplitReferences, rehypeMidArticleNote, rehypeImageSize],
  },
  devToolbar: {
    enabled: false,
  },
});
