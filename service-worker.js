const CACHE_NAME = 'jojo-brain-v0.3.0';
const APP_SHELL = [
  './','./index.html','./styles.css','./config.js','./graph-data.js','./neural-engine.js','./app.js',
  './manifest.webmanifest','./offline.html','./assets/icons/favicon.svg','./assets/icons/icon-192.png',
  './assets/icons/icon-512.png','./assets/icons/maskable-192.png','./assets/icons/maskable-512.png','./assets/icons/apple-touch-icon.png'
];
self.addEventListener('install', (event) => { event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))); self.skipWaiting(); });
self.addEventListener('activate', (event) => { event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (request.mode === 'navigate') {
    event.respondWith(fetch(request).then((response) => { const copy = response.clone(); caches.open(CACHE_NAME).then((cache) => cache.put(request, copy)); return response; }).catch(async () => (await caches.match(request)) || (await caches.match('./index.html')) || caches.match('./offline.html')));
    return;
  }
  event.respondWith(caches.match(request).then((cached) => cached || fetch(request).then((response) => { if (response.ok) { const copy = response.clone(); caches.open(CACHE_NAME).then((cache) => cache.put(request, copy)); } return response; })));
});
