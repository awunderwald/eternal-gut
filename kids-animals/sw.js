/*
 * sw.js — Service Worker mínimo.
 * Cachea el "cascarón" de la app (HTML/CSS/JS/icono) para que abra rápido y
 * funcione sin conexión. Los videos/imágenes/sonidos remotos pasan directo a
 * la red (son grandes y vienen de Wikimedia Commons).
 */

const CACHE = "animalitos-shell-v5";
const SHELL = [
  "./",
  "./index.html",
  "./styles.css",
  "./data.js",
  "./i18n.js",
  "./sources.js",
  "./sounds.js",
  "./videos.js",
  "./attributions.js",
  "./app.js",
  "./manifest.webmanifest",
  "./icons/icon.svg",
  "./icons/icon-512.png",
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)));
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  // Las peticiones de rango (streaming de video) van directo al navegador:
  // el SW no debe entrometerse o el video puede no reproducir/saltar en iOS.
  if (e.request.headers.has("range")) return;
  // Cache-first para el resto (cascarón + medios descargados), así un grupo
  // descargado funciona sin internet. Si no está en caché, va a la red.
  e.respondWith(
    caches.match(e.request, { ignoreVary: true }).then((cached) => cached || fetch(e.request))
  );
});
