/// <reference types="vite/client" />

import { defineConfig, splitVendorChunkPlugin } from 'vite';
import react from '@vitejs/plugin-react';
import million from 'million/compiler';
import compression from 'vite-plugin-compression';
import webfontDownload from 'vite-plugin-webfont-dl';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import { createHtmlPlugin } from 'vite-plugin-html';

export default defineConfig({
  plugins: [
    million.vite({ auto: true }),
    splitVendorChunkPlugin(),
    react(),
    webfontDownload(
      [
        'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;700&display=swap',
      ],
      {
        injectAsStyleTag: true,
        minifyCss: true,
        async: true,
        cache: true,
        proxy: false,
      },
    ),
    createHtmlPlugin({ minify: true }),
    compression({
      algorithm: 'brotliCompress',
      ext: '.br',
    }),
    ViteImageOptimizer({
      test: /\.(jpg|png|webp|svg)$/i,
      exclude: undefined,
      include: undefined,
      includePublic: true,
      logStats: true,
      svg: {
        multipass: true,
        plugins: [
          {
            name: 'preset-default',
            params: {
              overrides: {
                cleanupNumericValues: false,
                removeViewBox: false,
              },
              cleanupIDs: {
                minify: false,
                remove: false,
              },
              convertPathData: false,
            },
          },
          'sortAttrs',
          {
            name: 'addAttributesToSVGElement',
            params: {
              attributes: [{ xmlns: 'http://www.w3.org/2000/svg' }],
            },
          },
        ],
      },
      png: {
        quality: 100,
      },
      jpg: {
        quality: 100,
      },
      webp: {
        lossless: true,
      },
    }),
  ],
  server: {
    port: 1010,
  },
  build: {
    outDir: './dist',
    chunkSizeWarningLimit: 1500,
  },
});
