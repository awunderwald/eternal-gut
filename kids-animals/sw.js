/*
 * sw.js — Service Worker mínimo.
 * Cachea el "cascarón" de la app (HTML/CSS/JS/icono) para que abra rápido y
 * funcione sin conexión. Los videos/imágenes/sonidos remotos pasan directo a
 * la red (son grandes y vienen de Wikimedia Commons).
 */

const CACHE = "animalitos-shell-v3";
const SHELL = [
  "./",
  "./index.html",
  "./styles.css",
  "./data.js",
  "./i18n.js",
  "./sources.js",
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
  const url = new URL(e.request.url);
  // Solo gestionamos archivos del mismo origen (el cascarón).
  if (url.origin !== self.location.origin) return;
  e.respondWith(
    caches.match(e.request).then((cached) => cached || fetch(e.request))
  );
});
