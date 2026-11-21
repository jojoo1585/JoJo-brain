const RELEASE = '0.4.0';
const CACHE_NAME = `jojo-brain-v${RELEASE}`;
const V = `?v=${RELEASE}`;
const APP_SHELL = [
  './', './index.html', `./styles.css${V}`, `./config.js${V}`, `./graph-data.js${V}`,
  `./neural-engine.js${V}`, `./app.js${V}`, `./manifest.webmanifest${V}`,
  './offline.html', `./assets/icons/favicon.svg${V}`, `./assets/icons/icon-192.png${V}`,
  `./assets/icons/icon-512.png${V}`, `./assets/icons/maskable-192.png${V}`,
  `./assets/icons/maskable-512.png${V}`, `./assets/icons/apple-touch-icon.png${V}`
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key.startsWith('jojo-brain-') && key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
      .then(() => self.clients.matchAll({ type: 'window', includeUncontrolled: true }))
      .then((clients) => clients.forEach((client) => client.postMessage({ type: 'JOJO_UPDATED', version: RELEASE })))
  );
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request, { cache: 'no-store' })
        .then((response) => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put('./index.html', copy));
          }
          return response;
        })
        .catch(async () => (await caches.match('./index.html')) || (await caches.match('./')) || caches.match('./offline.html'))
    );
    return;
  }

  /* Versioned URLs make a mixed old-HTML/new-JS shell impossible during an upgrade. */
  event.respondWith(
    caches.match(request).then((cached) => cached || fetch(request).then((response) => {
      if (response.ok && url.searchParams.get('v') === RELEASE) {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
      }
      return response;
    }))
  );
});
