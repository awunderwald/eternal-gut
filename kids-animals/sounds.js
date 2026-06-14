/*
 * sounds.js — Sonidos por animal (uno o varios), reproducidos APARTE del video.
 * ---------------------------------------------------------------------------
 * El video va silencioso; estos sonidos se tocan con botones, encima del video
 * o solos. Formatos compatibles con iPhone/Safari (MP3/WAV), auto-hospedados en
 * kids-animals/sounds/ (o enlazados de fuente libre).
 *
 * Origen: Freesound (CC0 / CC BY) y Mixkit (licencia libre). Ver créditos en la
 * pantalla de Créditos y en attributions.js.
 */

const ANIMAL_SOUNDS = {
  leon: [
    { name: { es: "Rugido", en: "Roar" }, src: "sounds/leon.mp3" },
    { name: { es: "Ronroneo", en: "Purr" }, src: "sounds/leon-ronroneo.mp3" },
  ],
  tigre: [
    { name: { es: "Gruñido", en: "Growl" }, src: "https://upload.wikimedia.org/wikipedia/commons/2/29/439280_schots_angry-tiger.wav" },
  ],
  gato: [{ name: { es: "Miau", en: "Meow" }, src: "sounds/gato.mp3" }],
  vaca: [{ name: { es: "Muu", en: "Moo" }, src: "sounds/vaca.mp3" }],
  caballo: [{ name: { es: "Relincho", en: "Neigh" }, src: "sounds/caballo.mp3" }],
  delfin: [{ name: { es: "Chasquidos", en: "Clicks" }, src: "sounds/delfin.mp3" }],
  pinguino: [{ name: { es: "Llamado", en: "Call" }, src: "sounds/pinguino.mp3" }],
  elefante: [{ name: { es: "Barrito", en: "Trumpet" }, src: "sounds/elefante.mp3" }],
  guepardo: [{ name: { es: "Chirrido", en: "Chirp" }, src: "sounds/guepardo.mp3" }],
  guacamayo: [{ name: { es: "Graznido", en: "Squawk" }, src: "sounds/guacamayo.mp3" }],
  oso: [{ name: { es: "Gruñido", en: "Growl" }, src: "sounds/oso.mp3" }],
  mono: [{ name: { es: "Llamado", en: "Call" }, src: "sounds/mono.mp3" }],
  trex: [{ name: { es: "Rugido", en: "Roar" }, src: "sounds/trex.mp3" }],
  // buho: usa su sonido existente (Strix aluco .mp3) vía data.js.
  // jirafa: sin sonido (las jirafas son casi mudas).
};
