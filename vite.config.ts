/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import million from 'million/compiler';
import compression from 'vite-plugin-compression';
import webfontDownload from 'vite-plugin-webfont-dl';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import { createHtmlPlugin } from 'vite-plugin-html';
import removeConsole from 'vite-plugin-remove-console';
import path from 'path';

export default defineConfig({
  plugins: [
    million.vite({ auto: true }),
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
    removeConsole(),
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
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@contexts': path.resolve(__dirname, 'src/contexts'),
      '@store': path.resolve(__dirname, 'src/store'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@services': path.resolve(__dirname, 'src/services'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@utils': path.resolve(__dirname, 'src/utils'),
    },
  },
  server: {
    port: 1010,
  },
  esbuild: {
    drop: ['console', 'debugger'],
  },
  build: {
    outDir: './dist',
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // if (id.includes('commonjsHelpers')) return 'commonjsHelpers';
          if (id.includes('node_modules')) return 'vendor';
        },
      },
    },
  },
});
