/// <reference types="vitest" />
/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

import { defineConfig, splitVendorChunkPlugin } from 'vite';
import react from '@vitejs/plugin-react';
// import svgr from 'vite-plugin-svgr';
import compression from 'vite-plugin-compression';
import webfontDownload from 'vite-plugin-webfont-dl';
import { ViteMinifyPlugin } from 'vite-plugin-minify';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    splitVendorChunkPlugin(),
    react(),
    webfontDownload(),
    ViteMinifyPlugin({}),
    compression({
      algorithm: 'brotliCompress',
      ext: '.js,.css,.html,.svg',
    }),
  ],
  server: {
    port: 1010,
  },
  build: {
    outDir: './dist',
    chunkSizeWarningLimit: 1500,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    exclude: ['node_modules', 'dist', '.idea', '.git', '.cache'],
  },
});
