/* O BoraDiploma Faculdade mudou para https://faculdade.boradiploma.com.br
   Este service worker apaga a copia antiga guardada no aparelho e se desliga. */
self.addEventListener('install', function () { self.skipWaiting(); });
self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) { return Promise.all(keys.map(function (k) { return caches.delete(k); })); })
      .then(function () { return self.registration.unregister(); })
      .then(function () { return self.clients.matchAll({ type: 'window' }); })
      .then(function (lista) { lista.forEach(function (c) { try { c.navigate(c.url); } catch (e) {} }); })
  );
});