/*
 * data.js — Catálogo de animales / Animal catalog
 * -------------------------------------------------
 * Toda la "materia prima" de la app vive aquí. Para agregar un animal nuevo,
 * basta con copiar un bloque y cambiar las URLs y los textos.
 *
 * Todos los medios son de Wikimedia Commons (licencias libres / Creative Commons),
 * por lo que el costo inicial es CERO. Los videos usan la versión transcodificada
 * a 480p (más liviana para celulares) y guardan el original como respaldo.
 *
 * Atribución de cada archivo: ver README.md (sección "Créditos de medios").
 */

const C = "https://upload.wikimedia.org/wikipedia/commons";
const T = C + "/transcoded";

// Helper para no repetir tanta URL: { src: transcode 480p, fallback: original }
function vid(transcodePath, originalPath) {
  return { src: `${T}/${transcodePath}`, fallback: `${C}/${originalPath}` };
}

const ANIMAL_DATA = {
  categories: [
    {
      id: "felinos",
      icon: "🐯",
      name: { es: "Felinos", en: "Big Cats" },
      premium: false, // disponible incluso en el plan gratis
      animals: [
        // ---------------------------- LEÓN / LION ----------------------------
        {
          id: "leon",
          name: { es: "León", en: "Lion" },
          image: `${C}/7/73/Lion_waiting_in_Namibia.jpg`,
          // El león no tiene clip de rugido aislado en nuestro set; usa el audio del video.
          sound: null,
          facts: {
            es: "El león vive en África. Vive en familias llamadas manadas. Su rugido se escucha hasta 8 kilómetros de distancia. Come carne y puede pesar como 190 kilos, ¡igual que tres niños grandes juntos!",
            en: "The lion lives in Africa. It lives in families called prides. Its roar can be heard up to 8 kilometers away. It eats meat and can weigh about 190 kilograms — as much as three big kids together!",
          },
          videos: [
            {
              title: { es: "El león descansa", en: "The lion rests" },
              ...vid(
                "5/5d/Lion_%28Panthera_leo%29.webm/Lion_%28Panthera_leo%29.webm.480p.vp9.webm",
                "5/5d/Lion_%28Panthera_leo%29.webm"
              ),
            },
            {
              title: { es: "Leones en grupo", en: "Lions together" },
              ...vid(
                "7/72/Lions_%28Panthera_leo%29.webm/Lions_%28Panthera_leo%29.webm.480p.vp9.webm",
                "7/72/Lions_%28Panthera_leo%29.webm"
              ),
            },
          ],
        },

        // ---------------------------- TIGRE / TIGER ----------------------------
        {
          id: "tigre",
          name: { es: "Tigre", en: "Tiger" },
          image: `${C}/c/c6/Siberian_Tiger_sf.jpg`,
          sound: { src: `${C}/2/29/439280_schots_angry-tiger.wav` },
          facts: {
            es: "El tigre es el felino más grande del mundo. ¡Le encanta nadar! Sus rayas son únicas, como nuestras huellas digitales: no hay dos tigres iguales. Puede medir 3 metros de largo.",
            en: "The tiger is the largest cat in the world. It loves to swim! Its stripes are unique, like our fingerprints — no two tigers are the same. It can be 3 meters long.",
          },
          videos: [
            {
              title: { es: "El tigre camina", en: "The tiger walks" },
              ...vid(
                "8/89/Walking_Tiger_in_Zoo.webm/Walking_Tiger_in_Zoo.webm.480p.vp9.webm",
                "8/89/Walking_Tiger_in_Zoo.webm"
              ),
            },
            {
              title: { es: "El tigre habla", en: "The tiger calls" },
              ...vid(
                "4/42/Sumatran_tiger_%28Panthera_tigris_sumatrae%29_vocalising.webm/Sumatran_tiger_%28Panthera_tigris_sumatrae%29_vocalising.webm.480p.vp9.webm",
                "4/42/Sumatran_tiger_%28Panthera_tigris_sumatrae%29_vocalising.webm"
              ),
            },
            {
              title: { es: "Tigre en el zoológico", en: "Tiger at the zoo" },
              ...vid(
                "d/dd/Malayan_tiger_%28Panthera_tigris_jacksoni%29_in_a_zoo.webm/Malayan_tiger_%28Panthera_tigris_jacksoni%29_in_a_zoo.webm.480p.vp9.webm",
                "d/dd/Malayan_tiger_%28Panthera_tigris_jacksoni%29_in_a_zoo.webm"
              ),
            },
          ],
        },

        // ------------------------- GUEPARDO / CHEETAH -------------------------
        {
          id: "guepardo",
          name: { es: "Guepardo", en: "Cheetah" },
          image: `${C}/a/ac/Cheetah_portrait_Whipsnade_Zoo.jpg`,
          sound: null, // el guepardo "trina" como un pajarito; usa el audio del video
          facts: {
            es: "El guepardo es el animal terrestre más rápido. ¡Corre a 100 kilómetros por hora! No ruge: hace un sonido suave como un pajarito. Sus manchas negras lo ayudan a esconderse en el pasto.",
            en: "The cheetah is the fastest land animal. It runs at 100 kilometers per hour! It doesn't roar — it chirps softly like a little bird. Its black spots help it hide in the grass.",
          },
          videos: [
            {
              title: { es: "El guepardo corre", en: "The cheetah runs" },
              ...vid(
                "3/35/Rozi_the_cheetah_running_at_the_Cincinnati_Zoo.webm/Rozi_the_cheetah_running_at_the_Cincinnati_Zoo.webm.480p.vp9.webm",
                "3/35/Rozi_the_cheetah_running_at_the_Cincinnati_Zoo.webm"
              ),
            },
            {
              title: { es: "Guepardo en la naturaleza", en: "Cheetah in the wild" },
              ...vid(
                "b/b2/Cheetah%2C_Madikwe.webm/Cheetah%2C_Madikwe.webm.480p.vp9.webm",
                "b/b2/Cheetah%2C_Madikwe.webm"
              ),
            },
          ],
        },

        // ---------------------------- GATO / CAT ----------------------------
        {
          id: "gato",
          name: { es: "Gato", en: "Cat" },
          image: `${C}/3/3a/Cat03.jpg`,
          sound: { src: `${C}/6/62/Meow.ogg` },
          facts: {
            es: "El gato es un felino pequeño que vive con las personas. Duerme hasta 16 horas al día. Ronronea cuando está feliz y dice 'miau' para hablar con nosotros.",
            en: "The cat is a small feline that lives with people. It sleeps up to 16 hours a day. It purrs when it's happy and says 'meow' to talk to us.",
          },
          videos: [
            {
              title: { es: "El gato toma agua", en: "The cat drinks water" },
              ...vid(
                "a/ac/Cat_lapping_water_off_ground_in_slow_motion.gk.webm/Cat_lapping_water_off_ground_in_slow_motion.gk.webm.480p.vp9.webm",
                "a/ac/Cat_lapping_water_off_ground_in_slow_motion.gk.webm"
              ),
            },
            {
              title: { es: "El gato amasa", en: "The cat kneads" },
              ...vid(
                "d/d0/Cat_kneading_and_sucking_blanket.webm/Cat_kneading_and_sucking_blanket.webm.480p.vp9.webm",
                "d/d0/Cat_kneading_and_sucking_blanket.webm"
              ),
            },
          ],
        },
      ],
    },

    // Categorías futuras: se muestran como "próximamente / premium" para
    // demostrar el modelo de suscripción (más planes = más contenido).
    {
      id: "granja",
      icon: "🐮",
      name: { es: "Animales de granja", en: "Farm Animals" },
      premium: true,
      comingSoon: true,
      animals: [],
    },
    {
      id: "oceano",
      icon: "🐳",
      name: { es: "Animales del océano", en: "Ocean Animals" },
      premium: true,
      comingSoon: true,
      animals: [],
    },
  ],
};
