import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VitePWA({
      manifest: {
        name: 'SLM Forum & Chat',
        short_name: 'SLM Forum',
        theme_color: '#ffffff',
        start_url: '.',
        icons: [
          {
            purpose: 'any',
            sizes: '192x192',
            src: 'manifest-icon-192.maskable.png',
            type: 'image/png',
          },
          {
            purpose: 'maskable',
            sizes: '192x192',
            src: 'manifest-icon-192.maskable.png',
            type: 'image/png',
          },
          {
            purpose: 'any',
            sizes: '512x512',
            src: 'manifest-icon-512.maskable.png',
            type: 'image/png',
          },
          {
            purpose: 'maskable',
            sizes: '512x512',
            src: 'manifest-icon-512.maskable.png',
            type: 'image/png',
          },
        ],
      },
      registerType: 'autoUpdate',
      workbox: {
        cleanupOutdatedCaches: true,
        globPatterns: ['assets/**', 'index.html', 'manifest.webmanifest'],
        runtimeCaching: [
          {
            handler: 'NetworkFirst',
            urlPattern: /^http?.*/,
          },
        ],
      },
    }),
    vue(),
  ],
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
      '/socket.io': {
        target: 'http://localhost:3000',
      },
    },
  },
});
