var CACHE = 'ksfe-v1';
var ASSETS = [
  '/ksfe-calculator/',
  '/ksfe-calculator/index.html',
  '/ksfe-calculator/style.css',
  '/ksfe-calculator/ui.js',
  '/ksfe-calculator/calculations.js',
  '/ksfe-calculator/malayalam.js',
  '/ksfe-calculator/manifest.json',
  '/ksfe-calculator/favicon.svg',
  '/ksfe-calculator/icon-192.svg',
  '/ksfe-calculator/icon-512.svg',
];

// Install — cache all static assets
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE).then(function(c) { return c.addAll(ASSETS); })
  );
  self.skipWaiting();
});

// Activate — delete old caches
self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(k) { return k !== CACHE; })
            .map(function(k) { return caches.delete(k); })
      );
    })
  );
  self.clients.claim();
});

// Fetch — cache-first, fall back to network, update cache in background
self.addEventListener('fetch', function(e) {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(function(cached) {
      var network = fetch(e.request).then(function(res) {
        if (res && res.ok) {
          var clone = res.clone();
          caches.open(CACHE).then(function(c) { c.put(e.request, clone); });
        }
        return res;
      });
      return cached || network;
    })
  );
});
