self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const cacheNames = await caches.keys();
    await Promise.all(cacheNames.map(cacheName => caches.delete(cacheName)));
    await self.registration.unregister();
    const windows = await self.clients.matchAll({ type: 'window' });
    await Promise.all(windows.map(windowClient => windowClient.navigate(windowClient.url)));
  })());
});
