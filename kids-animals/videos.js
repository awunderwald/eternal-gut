/*
 * videos.js — Videos en MP4 (H.264) por animal, compatibles con iPhone/Safari.
 * --------------------------------------------------------------------------
 * Clips en HÁBITAT NATURAL de Pexels (licencia libre). Reemplazan los WebM
 * (que no se ven en iPhone). El video va silencioso; el sonido va aparte.
 * Para producción: descargar y alojar (y bajar a ~720p los que están en 4K).
 *
 * Si un animal aparece aquí, estos videos tienen prioridad sobre data.js.
 */

function _pexels(url) {
  return { src: url, fallback: url };
}

const ANIMAL_VIDEOS = {
  guepardo: [{ title: { es: "Guepardo en la sabana", en: "Cheetah in the savanna" }, ..._pexels("https://videos.pexels.com/video-files/34833591/14765117_1080_1920_24fps.mp4") }],
  gato: [{ title: { es: "Gato en el pasto", en: "Cat in the grass" }, ..._pexels("https://videos.pexels.com/video-files/3926874/3926874-hd_1920_1080_30fps.mp4") }],
  vaca: [{ title: { es: "Vaca en el campo", en: "Cow in the field" }, ..._pexels("https://videos.pexels.com/video-files/32044008/13659402_1920_1080_60fps.mp4") }],
  caballo: [{ title: { es: "Caballo en libertad", en: "Horse running free" }, ..._pexels("https://videos.pexels.com/video-files/28899321/12509081_1920_1080_60fps.mp4") }],
  pinguino: [{ title: { es: "Pingüinos en la naturaleza", en: "Penguins in nature" }, ..._pexels("https://videos.pexels.com/video-files/13458445/13458445-hd_1920_1080_25fps.mp4") }],
  oso: [{ title: { es: "Oso en el bosque", en: "Bear in the forest" }, ..._pexels("https://videos.pexels.com/video-files/855113/855113-hd_1920_1080_25fps.mp4") }],
  mono: [{ title: { es: "Mono en la selva", en: "Monkey in the jungle" }, ..._pexels("https://videos.pexels.com/video-files/31398496/13396907_2002_1080_60fps.mp4") }],
  guacamayo: [{ title: { es: "Guacamayo volando", en: "Macaw flying" }, ..._pexels("https://videos.pexels.com/video-files/30049204/12889660_3840_2160_60fps.mp4") }],
  buho: [{ title: { es: "Búho en el bosque", en: "Owl in the forest" }, ..._pexels("https://videos.pexels.com/video-files/33404877/14219312_3840_2160_30fps.mp4") }],
  trex: [{ title: { es: "T-Rex", en: "T-Rex" }, ..._pexels("https://videos.pexels.com/video-files/34492572/14614765_1080_1920_30fps.mp4") }],
};
