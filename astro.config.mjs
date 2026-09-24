// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  // 1. رابط حسابك على GitHub Pages
  site: 'https://ForContactEmad.github.io',

  // 2. اسم المستودع الخاص بك على GitHub (مسبوقاً بـ /)
  base: '/App-Builders',

  integrations: [sitemap()],
  vite: {
    plugins: [
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.svg', 'icon-192.png', 'icon-512.png'],
        manifest: {
          name: 'app-builder',
          short_name: 'AB',
          description: 'طوّر تطبيقك من الفكرة إلى النشر بمساعدة الذكاء الاصطناعي',
          lang: 'ar',
          dir: 'rtl',
          theme_color: '#0ea5e9',
          background_color: '#ffffff',
          display: 'standalone',
          // يفضل استخدام القرابة لـ base حتى يعمل التطبيق كـ PWA بشكل صحيح على GitHub Pages
          start_url: './',
          icons: [
            { src: 'icon-192.png', sizes: '192x192', type: 'image/png' },
            { src: 'icon-512.png', sizes: '512x512', type: 'image/png' },
            {
              src: 'icon-512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any maskable',
            },
          ],
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,svg,png,woff2}'],
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'google-fonts',
                expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
              },
            },
          ],
        },
      }),
    ],
  },
});