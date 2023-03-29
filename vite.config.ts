/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig, splitVendorChunkPlugin } from 'vite';
import react from '@vitejs/plugin-react';
import compression from 'vite-plugin-compression';
import webfontDownload from 'vite-plugin-webfont-dl';
import { createHtmlPlugin } from 'vite-plugin-html';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    splitVendorChunkPlugin(),
    react(),
    webfontDownload(),
    createHtmlPlugin({ minify: true }),
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
