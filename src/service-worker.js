importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox) {
  console.log(`Workbox berhasil dimuat`);
}
else {
  console.log(`Workbox gagal dimuat`);
}

workbox.precaching.precacheAndRoute([
    { url: '/index.html', revision: '1' },
    { url: '/nav.html', revision: '1' },
    { url: '/manifest.json', revision: '1' },,
    { url: '/css/styles.css', revision: '1' },
    { url: '/css/main.css', revision: '1' },
    { url: '/tailwind.css', revision: '1' },
    { url: '/css/fonts/lpmq.otf', revision: '1' },
    { url: '/css/fonts/lpmq.woff', revision: '1' },
    { url: '/js/darkmode.js', revision: '1' },
    { url: '/js/loading.js', revision: '1' },
    { url: '/js/main.js', revision: '1' },
    { url: '/js/nav.js', revision: '1' },
    { url: '/images/icon.jpg', revision: '1' },
    { url: '/images/bg.jpg', revision: '1' },
    { url: '/images/android-icon-192x192.png', revision: '1' },
    { url: '/images/favicon-96x96.png', revision: '1' },
    { url: '/images/asmaul.png', revision: '1' },
    { url: 'https://unpkg.com/typewriter-effect@latest/dist/core.js', revision: '1' },
    { url: '/images/baca.png', revision: '1' },
    { url: '/images/doa.png', revision: '1' },
    { url: '/images/harian.png', revision: '1' },
], {
    ignoreUrlParametersMatching: [/.*/]
});

workbox.routing.registerRoute(
  new RegExp('https://api.quran.sutanlab.id/surah/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'alquran-apps',
        plugins: [
          new workbox.cacheableResponse.Plugin({
            statuses: [200],
          }),
          new workbox.expiration.Plugin({
            maxAgeSeconds: 60 * 60 * 24 * 365,
            maxEntries: 30,
          }),
        ],
    })
);

workbox.routing.registerRoute(
  new RegExp('https://islamic-api-zhirrr.vercel.app/api/doaharian'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'doa',
        plugins: [
          new workbox.cacheableResponse.Plugin({
            statuses: [200],
          }),
          new workbox.expiration.Plugin({
            maxAgeSeconds: 60 * 60 * 24 * 365,
            maxEntries: 30,
          }),
        ],
    })
);

workbox.routing.registerRoute(
  new RegExp('https://islamic-api-zhirrr.vercel.app/api/asmaulhusna'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'asmaul',
        plugins: [
          new workbox.cacheableResponse.Plugin({
            statuses: [200],
          }),
          new workbox.expiration.Plugin({
            maxAgeSeconds: 60 * 60 * 24 * 365,
            maxEntries: 30,
          }),
        ],
    })
);

workbox.routing.registerRoute(
  new RegExp('https://fonts.googleapis.com/'),
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'google-fonts-stylesheets',
      plugins: [
          new workbox.expiration.Plugin({
            maxAgeSeconds: 60 * 60 * 24 * 365, //1 years
            maxEntries: 30,
          }),
        ],
    })
);

workbox.routing.registerRoute(
  new RegExp('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css'),
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'font-awesome',
      plugins: [
          new workbox.expiration.Plugin({
            maxAgeSeconds: 60 * 60 * 24 * 365, //1 years
            maxEntries: 30,
          }),
        ],
    })
);
