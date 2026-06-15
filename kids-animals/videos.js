/* videos.js — Videos MP4 (Pexels, libre) por animal. ANIMAL_VIDEOS tiene prioridad sobre data.js. */
const ANIMAL_VIDEOS = {
  "guepardo": [
    {
      "title": {
        "es": "Guepardo en la sabana",
        "en": "Cheetah in the savanna"
      },
      "src": "https://videos.pexels.com/video-files/34833591/14765117_1080_1920_24fps.mp4",
      "fallback": "https://videos.pexels.com/video-files/34833591/14765117_1080_1920_24fps.mp4"
    }
  ],
  "gato": [
    {
      "title": {
        "es": "Gato en el pasto",
        "en": "Cat in the grass"
      },
      "src": "https://videos.pexels.com/video-files/3926874/3926874-hd_1920_1080_30fps.mp4",
      "fallback": "https://videos.pexels.com/video-files/3926874/3926874-hd_1920_1080_30fps.mp4"
    }
  ],
  "vaca": [
    {
      "title": {
        "es": "Vaca en el campo",
        "en": "Cow in the field"
      },
      "src": "https://videos.pexels.com/video-files/32044008/13659402_1920_1080_60fps.mp4",
      "fallback": "https://videos.pexels.com/video-files/32044008/13659402_1920_1080_60fps.mp4"
    }
  ],
  "caballo": [
    {
      "title": {
        "es": "Caballo en libertad",
        "en": "Horse running free"
      },
      "src": "https://videos.pexels.com/video-files/28899321/12509081_1920_1080_60fps.mp4",
      "fallback": "https://videos.pexels.com/video-files/28899321/12509081_1920_1080_60fps.mp4"
    }
  ],
  "pinguino": [
    {
      "title": {
        "es": "Pingüinos en la naturaleza",
        "en": "Penguins in nature"
      },
      "src": "https://videos.pexels.com/video-files/13458445/13458445-hd_1920_1080_25fps.mp4",
      "fallback": "https://videos.pexels.com/video-files/13458445/13458445-hd_1920_1080_25fps.mp4"
    }
  ],
  "oso": [
    {
      "title": {
        "es": "Oso en el bosque",
        "en": "Bear in the forest"
      },
      "src": "https://videos.pexels.com/video-files/855113/855113-hd_1920_1080_25fps.mp4",
      "fallback": "https://videos.pexels.com/video-files/855113/855113-hd_1920_1080_25fps.mp4"
    }
  ],
  "mono": [
    {
      "title": {
        "es": "Mono en la selva",
        "en": "Monkey in the jungle"
      },
      "src": "https://videos.pexels.com/video-files/31398496/13396907_2002_1080_60fps.mp4",
      "fallback": "https://videos.pexels.com/video-files/31398496/13396907_2002_1080_60fps.mp4"
    }
  ],
  "guacamayo": [
    {
      "title": {
        "es": "Guacamayo volando",
        "en": "Macaw flying"
      },
      "src": "https://videos.pexels.com/video-files/30049204/12889660_3840_2160_60fps.mp4",
      "fallback": "https://videos.pexels.com/video-files/30049204/12889660_3840_2160_60fps.mp4"
    }
  ],
  "buho": [
    {
      "title": {
        "es": "Búho en el bosque",
        "en": "Owl in the forest"
      },
      "src": "https://videos.pexels.com/video-files/33404877/14219312_3840_2160_30fps.mp4",
      "fallback": "https://videos.pexels.com/video-files/33404877/14219312_3840_2160_30fps.mp4"
    }
  ],
  "trex": [
    {
      "title": {
        "es": "T-Rex",
        "en": "T-Rex"
      },
      "src": "https://videos.pexels.com/video-files/34492572/14614765_1080_1920_30fps.mp4",
      "fallback": "https://videos.pexels.com/video-files/34492572/14614765_1080_1920_30fps.mp4"
    }
  ],
  "leopardo": [
    {
      "title": {
        "es": "Leopardo",
        "en": "Leopard"
      },
      "src": "https://videos.pexels.com/video-files/30972326/13240132_1280_720_30fps.mp4",
      "fallback": "https://videos.pexels.com/video-files/30972326/13240132_1280_720_30fps.mp4"
    }
  ],
  "jaguar": [
    {
      "title": {
        "es": "Jaguar",
        "en": "Jaguar"
      },
      "src": "https://videos.pexels.com/video-files/19210129/19210129-hd_1280_720_30fps.mp4",
      "fallback": "https://videos.pexels.com/video-files/19210129/19210129-hd_1280_720_30fps.mp4"
    }
  ],
  "puma": [
    {
      "title": {
        "es": "Puma",
        "en": "Puma"
      },
      "src": "https://videos.pexels.com/video-files/11038543/11038543-hd_1280_720_25fps.mp4",
      "fallback": "https://videos.pexels.com/video-files/11038543/11038543-hd_1280_720_25fps.mp4"
    }
  ],
  "oveja": [
    {
      "title": {
        "es": "Oveja",
        "en": "Sheep"
      },
      "src": "https://videos.pexels.com/video-files/32992989/14062854_1280_720_30fps.mp4",
      "fallback": "https://videos.pexels.com/video-files/32992989/14062854_1280_720_30fps.mp4"
    }
  ],
  "cerdo": [
    {
      "title": {
        "es": "Cerdo",
        "en": "Pig"
      },
      "src": "https://videos.pexels.com/video-files/3765312/3765312-hd_1280_720_30fps.mp4",
      "fallback": "https://videos.pexels.com/video-files/3765312/3765312-hd_1280_720_30fps.mp4"
    }
  ],
  "gallina": [
    {
      "title": {
        "es": "Gallina",
        "en": "Hen"
      },
      "src": "https://videos.pexels.com/video-files/3370949/3370949-hd_1280_720_50fps.mp4",
      "fallback": "https://videos.pexels.com/video-files/3370949/3370949-hd_1280_720_50fps.mp4"
    }
  ],
  "pato": [
    {
      "title": {
        "es": "Pato",
        "en": "Duck"
      },
      "src": "https://videos.pexels.com/video-files/17533494/17533494-hd_1366_720_24fps.mp4",
      "fallback": "https://videos.pexels.com/video-files/17533494/17533494-hd_1366_720_24fps.mp4"
    }
  ],
  "conejo": [
    {
      "title": {
        "es": "Conejo",
        "en": "Rabbit"
      },
      "src": "https://videos.pexels.com/video-files/31875420/13577892_1280_720_25fps.mp4",
      "fallback": "https://videos.pexels.com/video-files/31875420/13577892_1280_720_25fps.mp4"
    }
  ],
  "cebra": [
    {
      "title": {
        "es": "Cebra",
        "en": "Zebra"
      },
      "src": "https://videos.pexels.com/video-files/6821205/6821205-hd_1280_720_30fps.mp4",
      "fallback": "https://videos.pexels.com/video-files/6821205/6821205-hd_1280_720_30fps.mp4"
    }
  ],
  "rinoceronte": [
    {
      "title": {
        "es": "Rinoceronte",
        "en": "Rhino"
      },
      "src": "https://videos.pexels.com/video-files/19806859/19806859-hd_1312_720_60fps.mp4",
      "fallback": "https://videos.pexels.com/video-files/19806859/19806859-hd_1312_720_60fps.mp4"
    }
  ],
  "hipopotamo": [
    {
      "title": {
        "es": "Hipopótamo",
        "en": "Hippo"
      },
      "src": "https://videos.pexels.com/video-files/32861840/14006863_1280_720_24fps.mp4",
      "fallback": "https://videos.pexels.com/video-files/32861840/14006863_1280_720_24fps.mp4"
    }
  ],
  "suricata": [
    {
      "title": {
        "es": "Suricata",
        "en": "Meerkat"
      },
      "src": "https://videos.pexels.com/video-files/26575569/11962845_1280_720_24fps.mp4",
      "fallback": "https://videos.pexels.com/video-files/26575569/11962845_1280_720_24fps.mp4"
    }
  ],
  "ballena": [
    {
      "title": {
        "es": "Ballena",
        "en": "Whale"
      },
      "src": "https://videos.pexels.com/video-files/27941813/12270176_1280_720_30fps.mp4",
      "fallback": "https://videos.pexels.com/video-files/27941813/12270176_1280_720_30fps.mp4"
    }
  ],
  "tortuga": [
    {
      "title": {
        "es": "Tortuga marina",
        "en": "Sea turtle"
      },
      "src": "https://videos.pexels.com/video-files/35569887/15071945_1280_720_60fps.mp4",
      "fallback": "https://videos.pexels.com/video-files/35569887/15071945_1280_720_60fps.mp4"
    }
  ],
  "tiburon": [
    {
      "title": {
        "es": "Tiburón",
        "en": "Shark"
      },
      "src": "https://videos.pexels.com/video-files/7997370/7997370-hd_1280_720_30fps.mp4",
      "fallback": "https://videos.pexels.com/video-files/7997370/7997370-hd_1280_720_30fps.mp4"
    }
  ],
  "pulpo": [
    {
      "title": {
        "es": "Pulpo",
        "en": "Octopus"
      },
      "src": "https://videos.pexels.com/video-files/34105982/14464940_1280_720_60fps.mp4",
      "fallback": "https://videos.pexels.com/video-files/34105982/14464940_1280_720_60fps.mp4"
    }
  ],
  "aguila": [
    {
      "title": {
        "es": "Águila",
        "en": "Eagle"
      },
      "src": "https://videos.pexels.com/video-files/26673863/11987023_1280_720_30fps.mp4",
      "fallback": "https://videos.pexels.com/video-files/26673863/11987023_1280_720_30fps.mp4"
    }
  ],
  "flamenco": [
    {
      "title": {
        "es": "Flamenco",
        "en": "Flamingo"
      },
      "src": "https://videos.pexels.com/video-files/30219093/12956214_1280_720_24fps.mp4",
      "fallback": "https://videos.pexels.com/video-files/30219093/12956214_1280_720_24fps.mp4"
    }
  ],
  "tucan": [
    {
      "title": {
        "es": "Tucán",
        "en": "Toucan"
      },
      "src": "https://videos.pexels.com/video-files/13898921/13898921-hd_1280_720_30fps.mp4",
      "fallback": "https://videos.pexels.com/video-files/13898921/13898921-hd_1280_720_30fps.mp4"
    }
  ],
  "lobo": [
    {
      "title": {
        "es": "Lobo",
        "en": "Wolf"
      },
      "src": "https://videos.pexels.com/video-files/6093232/6093232-hd_1280_720_24fps.mp4",
      "fallback": "https://videos.pexels.com/video-files/6093232/6093232-hd_1280_720_24fps.mp4"
    }
  ],
  "zorro": [
    {
      "title": {
        "es": "Zorro",
        "en": "Fox"
      },
      "src": "https://videos.pexels.com/video-files/35628259/15098796_1280_720_30fps.mp4",
      "fallback": "https://videos.pexels.com/video-files/35628259/15098796_1280_720_30fps.mp4"
    }
  ],
  "ciervo": [
    {
      "title": {
        "es": "Ciervo",
        "en": "Deer"
      },
      "src": "https://videos.pexels.com/video-files/17994257/17994257-hd_1280_720_30fps.mp4",
      "fallback": "https://videos.pexels.com/video-files/17994257/17994257-hd_1280_720_30fps.mp4"
    }
  ],
  "ardilla": [
    {
      "title": {
        "es": "Ardilla",
        "en": "Squirrel"
      },
      "src": "https://videos.pexels.com/video-files/17109821/17109821-hd_1280_720_30fps.mp4",
      "fallback": "https://videos.pexels.com/video-files/17109821/17109821-hd_1280_720_30fps.mp4"
    }
  ],
  "gorila": [
    {
      "title": {
        "es": "Gorila",
        "en": "Gorilla"
      },
      "src": "https://videos.pexels.com/video-files/30606781/13104646_1280_720_25fps.mp4",
      "fallback": "https://videos.pexels.com/video-files/30606781/13104646_1280_720_25fps.mp4"
    }
  ],
  "perezoso": [
    {
      "title": {
        "es": "Perezoso",
        "en": "Sloth"
      },
      "src": "https://videos.pexels.com/video-files/13899315/13899315-hd_1280_720_30fps.mp4",
      "fallback": "https://videos.pexels.com/video-files/13899315/13899315-hd_1280_720_30fps.mp4"
    }
  ]
};
