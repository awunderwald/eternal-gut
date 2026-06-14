/*
 * data.js — Catálogo de animales / Animal catalog
 * -------------------------------------------------
 * Toda la "materia prima" de la app vive aquí. Para agregar un animal nuevo,
 * basta con copiar un bloque y cambiar las URLs y los textos.
 *
 * Todos los medios son de Wikimedia Commons (licencias libres / Creative Commons),
 * por lo que el costo inicial es CERO.
 *   - Imágenes: se piden con Special:FilePath?width=1024 (escalador estable de
 *     Commons), así llegan livianas al celular.
 *   - Videos: versión transcodificada a 480p (más liviana) con el original de
 *     respaldo por si la transcodificación no está disponible.
 *
 * Atribución de cada archivo: ver README.md (sección "Créditos de medios").
 */

const C = "https://upload.wikimedia.org/wikipedia/commons";
const T = C + "/transcoded";
const FP = "https://commons.wikimedia.org/wiki/Special:FilePath";

// Imagen escalada (liviana) a partir del nombre de archivo en Commons.
function img(filename, width = 1024) {
  const enc = encodeURIComponent(filename).replace(/\(/g, "%28").replace(/\)/g, "%29");
  return `${FP}/${enc}?width=${width}`;
}

// Sonido/medio a partir del nombre de archivo (Commons resuelve la redirección).
function snd(filename) {
  const enc = encodeURIComponent(filename).replace(/\(/g, "%28").replace(/\)/g, "%29");
  return `${FP}/${enc}`;
}

// Video: { src: transcode 480p, fallback: original }. La app usa el respaldo
// automáticamente si la versión liviana falla.
function vid(transcodePath, originalPath) {
  return { src: `${T}/${transcodePath}`, fallback: `${C}/${originalPath}` };
}

// Video MP4 (H.264) de una URL absoluta — compatible con iPhone/Safari y Android.
// Fuente premium en hábitat natural (Pexels, licencia libre). Para producción:
// descargar y alojar el archivo en vez de enlazar al CDN.
function mp4(url) {
  return { src: url, fallback: url };
}

const ANIMAL_DATA = {
  categories: [
    // ============================ FELINOS ============================
    {
      id: "felinos",
      icon: "🐯",
      name: { es: "Felinos", en: "Big Cats" },
      premium: false,
      animals: [
        {
          id: "leon",
          name: { es: "León", en: "Lion" },
          image: img("Lion waiting in Namibia.jpg"),
          sound: { src: "sounds/leon.mp3" },
          facts: {
            es: "El león vive en África. Vive en familias llamadas manadas. Su rugido se escucha hasta 8 kilómetros de distancia. Come carne y puede pesar como 190 kilos, ¡igual que tres niños grandes juntos!",
            en: "The lion lives in Africa. It lives in families called prides. Its roar can be heard up to 8 kilometers away. It eats meat and can weigh about 190 kilograms — as much as three big kids together!",
          },
          videos: [
            {
              title: { es: "León en la sabana", en: "Lion in the savanna" },
              ...mp4("https://videos.pexels.com/video-files/30393112/13025095_1080_1920_24fps.mp4"),
            },
          ],
        },
        {
          id: "tigre",
          name: { es: "Tigre", en: "Tiger" },
          image: img("Siberian Tiger sf.jpg"),
          sound: { src: `${C}/2/29/439280_schots_angry-tiger.wav` },
          facts: {
            es: "El tigre es el felino más grande del mundo. ¡Le encanta nadar! Sus rayas son únicas, como nuestras huellas digitales: no hay dos tigres iguales. Puede medir 3 metros de largo.",
            en: "The tiger is the largest cat in the world. It loves to swim! Its stripes are unique, like our fingerprints — no two tigers are the same. It can be 3 meters long.",
          },
          videos: [
            {
              title: { es: "Tigre en la selva", en: "Tiger in the jungle" },
              ...mp4("https://videos.pexels.com/video-files/31635739/13478216_1080_1920_24fps.mp4"),
            },
          ],
        },
        {
          id: "guepardo",
          name: { es: "Guepardo", en: "Cheetah" },
          image: img("Cheetah portrait Whipsnade Zoo.jpg"),
          sound: null,
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
        {
          id: "gato",
          name: { es: "Gato", en: "Cat" },
          image: img("Cat03.jpg"),
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

    // ============================ GRANJA ============================
    {
      id: "granja",
      icon: "🐮",
      name: { es: "Granja", en: "Farm" },
      premium: false,
      animals: [
        {
          id: "vaca",
          name: { es: "Vaca", en: "Cow" },
          image: img("Cow female black white.jpg"),
          sound: { src: `${C}/a/a5/Single_Cow_Moo.ogg` },
          facts: {
            es: "La vaca vive en la granja y nos da leche. Come pasto todo el día y tiene cuatro estómagos para digerirlo. Dice 'muu' y reconoce a sus amigas.",
            en: "The cow lives on the farm and gives us milk. It eats grass all day and has four stomachs to digest it. It says 'moo' and recognizes its friends.",
          },
          videos: [
            {
              title: { es: "La vaca camina", en: "The cow walks" },
              ...vid(
                "1/15/Cow_crosses_cattle_grid.webm/Cow_crosses_cattle_grid.webm.480p.vp9.webm",
                "1/15/Cow_crosses_cattle_grid.webm"
              ),
            },
          ],
        },
        {
          id: "caballo",
          name: { es: "Caballo", en: "Horse" },
          image: img("White horse portrait.jpg"),
          sound: { src: snd("Wiehern.ogg") },
          facts: {
            es: "El caballo es fuerte y veloz, y puede dormir de pie. Hace miles de años ayuda a las personas a viajar y trabajar. Cuando saluda relincha: '¡iiih!'.",
            en: "The horse is strong and fast, and can sleep standing up. For thousands of years it has helped people travel and work. When it greets you it neighs!",
          },
          videos: [
            {
              title: { es: "El caballo corre", en: "The horse runs" },
              ...vid(
                "a/af/Horses_running_in_a_pasture.webm/Horses_running_in_a_pasture.webm.480p.vp9.webm",
                "a/af/Horses_running_in_a_pasture.webm"
              ),
            },
          ],
        },
      ],
    },

    // ============================ OCÉANO ============================
    {
      id: "oceano",
      icon: "🐬",
      name: { es: "Océano", en: "Ocean" },
      premium: false,
      animals: [
        {
          id: "delfin",
          name: { es: "Delfín", en: "Dolphin" },
          image: img("010 Atlantic bottlenose dolphin jumping at Pelican point Photo by Giles Laurent.jpg"),
          sound: null,
          facts: {
            es: "El delfín es muy inteligente y vive en el mar. Respira aire por un agujero en su cabeza. Le encanta saltar y jugar, y habla con silbidos y chasquidos.",
            en: "The dolphin is very smart and lives in the sea. It breathes air through a hole on its head. It loves to jump and play, and talks with whistles and clicks.",
          },
          videos: [
            {
              title: { es: "Delfines en el mar", en: "Dolphins in the ocean" },
              ...mp4("https://videos.pexels.com/video-files/28224356/12333240_1920_1080_30fps.mp4"),
            },
          ],
        },
        {
          id: "pinguino",
          name: { es: "Pingüino", en: "Penguin" },
          image: img("Spheniscus demersus (portrait).jpg"),
          sound: { src: snd("20091121 Little Penguin calls at St Kilda Breakwater.ogg") },
          facts: {
            es: "El pingüino es un ave que no vuela, pero ¡nada como un campeón! Vive donde hace frío y se desliza sobre su pancita en el hielo. Cuida a sus bebés en grupo.",
            en: "The penguin is a bird that can't fly, but swims like a champion! It lives where it's cold and slides on its belly over the ice. It cares for its babies in a group.",
          },
          videos: [
            {
              title: { es: "Pingüinos caminando", en: "Penguins walking" },
              ...vid(
                "e/ec/African_penguins_walking.webm/African_penguins_walking.webm.480p.vp9.webm",
                "e/ec/African_penguins_walking.webm"
              ),
            },
          ],
        },
      ],
    },

    // ============================ SABANA ============================
    {
      id: "sabana",
      icon: "🐘",
      name: { es: "Sabana", en: "Savanna" },
      premium: false,
      animals: [
        {
          id: "elefante",
          name: { es: "Elefante", en: "Elephant" },
          image: img("African elephant front view portrait.jpg"),
          sound: { src: `${C}/4/40/Elephant_voice_-_trumpeting.ogg` },
          facts: {
            es: "El elefante es el animal terrestre más grande. Usa su trompa como una mano para tomar comida y agua. Sus orejas grandes lo ayudan a refrescarse. ¡Tiene muy buena memoria!",
            en: "The elephant is the largest land animal. It uses its trunk like a hand to grab food and water. Its big ears help it cool down. It has a great memory!",
          },
          videos: [
            {
              title: { es: "Elefante en la sabana", en: "Elephant in the savanna" },
              ...mp4("https://videos.pexels.com/video-files/31378767/13389721_1080_1920_30fps.mp4"),
            },
          ],
        },
        {
          id: "jirafa",
          name: { es: "Jirafa", en: "Giraffe" },
          image: img("006 Giraffe portrait in the Lake Manyara National Park Photo by Giles Laurent.jpg"),
          sound: null,
          facts: {
            es: "La jirafa es el animal más alto del mundo. Su cuello larguísimo le ayuda a comer hojas de los árboles altos. ¡Su lengua es azul y muy larga!",
            en: "The giraffe is the tallest animal in the world. Its very long neck helps it eat leaves from tall trees. Its tongue is blue and very long!",
          },
          videos: [
            {
              title: { es: "Jirafa salvaje", en: "Giraffe in the wild" },
              ...mp4("https://videos.pexels.com/video-files/5214219/5214219-hd_1920_1080_25fps.mp4"),
            },
          ],
        },
      ],
    },

    // ============================= AVES =============================
    {
      id: "aves",
      icon: "🦜",
      name: { es: "Aves", en: "Birds" },
      premium: false,
      animals: [
        {
          id: "guacamayo",
          name: { es: "Guacamayo", en: "Macaw" },
          image: img("Scarlet macaw (Ara macao cyanopterus) Copan.jpg"),
          sound: null,
          facts: {
            es: "El guacamayo es un loro de colores brillantes que vive en la selva. ¡Puede aprender a imitar nuestra voz! Usa su pico fuerte para abrir semillas y nueces.",
            en: "The macaw is a brightly colored parrot that lives in the jungle. It can learn to copy our voice! It uses its strong beak to crack seeds and nuts.",
          },
          videos: [
            {
              title: { es: "El guacamayo", en: "The macaw" },
              ...vid(
                "6/60/Ara_macao_01.ogv/Ara_macao_01.ogv.480p.vp9.webm",
                "6/60/Ara_macao_01.ogv"
              ),
            },
          ],
        },
        {
          id: "buho",
          name: { es: "Búho", en: "Owl" },
          image: img("Burrowing Owl Portrait (6777953881).jpg"),
          sound: { src: snd("Strix aluco - Tawny Owl XC563348.mp3") },
          facts: {
            es: "El búho puede girar su cabeza casi por completo para mirar atrás. Ve muy bien de noche y vuela en silencio. Dice 'uh-uh' cuando llama.",
            en: "The owl can turn its head almost all the way around to look behind. It sees very well at night and flies silently. It says 'hoo-hoo' when it calls.",
          },
          videos: [
            {
              title: { es: "El búho", en: "The owl" },
              ...vid(
                "c/c1/Little_Owl%2CSouth_Hebron.webm/Little_Owl%2CSouth_Hebron.webm.480p.vp9.webm",
                "c/c1/Little_Owl%2CSouth_Hebron.webm"
              ),
            },
          ],
        },
      ],
    },

    // ============================ BOSQUE ============================
    {
      id: "bosque",
      icon: "🐻",
      name: { es: "Bosque", en: "Forest" },
      premium: false,
      animals: [
        {
          id: "oso",
          name: { es: "Oso", en: "Bear" },
          image: img("Portrait of a Brown Bear - panoramio.jpg"),
          sound: { src: `${C}/4/4e/Bear_growl.ogg` },
          facts: {
            es: "El oso es grande y fuerte, y le encanta la miel y los pescados. En invierno duerme muchos meses: eso se llama hibernar. ¡Puede pararse en dos patas!",
            en: "The bear is big and strong, and loves honey and fish. In winter it sleeps for many months — that's called hibernating. It can stand on two legs!",
          },
          videos: [
            {
              title: { es: "El oso pardo", en: "The brown bear" },
              ...vid(
                "5/5a/Brown_Bear_%28Ursus_arctos%29.webm/Brown_Bear_%28Ursus_arctos%29.webm.480p.vp9.webm",
                "5/5a/Brown_Bear_%28Ursus_arctos%29.webm"
              ),
            },
          ],
        },
      ],
    },

    // ============================= SELVA =============================
    {
      id: "selva",
      icon: "🐒",
      name: { es: "Selva", en: "Jungle" },
      premium: false,
      animals: [
        {
          id: "mono",
          name: { es: "Mono", en: "Monkey" },
          image: img("Rhesus macaque Macaca mulatta DSC 0184.jpg"),
          sound: { src: `${C}/f/f3/Dusky-leaf-monkey-call-kaeng-krachan.ogg` },
          facts: {
            es: "El mono vive en los árboles y usa sus manos y su cola para trepar. Le encantan las frutas. Vive en familia y le gusta jugar, igual que tú.",
            en: "The monkey lives in the trees and uses its hands and tail to climb. It loves fruit. It lives in a family and likes to play, just like you.",
          },
          videos: [
            {
              title: { es: "Monito tomando agua", en: "Baby monkey drinking" },
              ...vid(
                "c/c4/Baby_monkey_drinking_water.webm/Baby_monkey_drinking_water.webm.480p.vp9.webm",
                "c/c4/Baby_monkey_drinking_water.webm"
              ),
            },
          ],
        },
      ],
    },

    // ========================= DINOSAURIOS =========================
    // Grupo PREMIUM: se muestra siempre con el T-Rex visible. Sin suscripción
    // aparece con la cinta amable "Bloqueado"; con suscripción (Modo Dios,
    // Anual o De por vida) se abre y muestra al T-Rex.
    {
      id: "dinosaurios",
      icon: "🦖",
      name: { es: "Dinosaurios", en: "Dinosaurs" },
      premium: true,
      animals: [
        {
          id: "trex",
          name: { es: "Tiranosaurio Rex", en: "Tyrannosaurus Rex" },
          image: img("Tyrannosaurus Rex (Zhengzhou).jpg"),
          sound: null,
          facts: {
            es: "El Tiranosaurio Rex vivió hace 66 millones de años. Era uno de los dinosaurios más grandes que comían carne. ¡Sus dientes eran del tamaño de un plátano! Hoy solo quedan sus huesos.",
            en: "Tyrannosaurus Rex lived 66 million years ago. It was one of the biggest meat-eating dinosaurs. Its teeth were as big as a banana! Today only its bones remain.",
          },
          videos: [
            {
              title: { es: "T-Rex en movimiento", en: "T-Rex moving" },
              ...vid(
                "b/be/Trex_animatronic.webm/Trex_animatronic.webm.480p.vp9.webm",
                "b/be/Trex_animatronic.webm"
              ),
            },
          ],
        },
      ],
    },
  ],
};
