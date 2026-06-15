/* extra.js — Animales nuevos (núcleo: id, nombre, foto, dato). Se fusionan en los grupos en app.js. Video y sonido vienen de videos.js/sounds.js por id. */
const EXTRA_ANIMALS = {
  "felinos": [
    {
      "id": "leopardo",
      "name": {
        "es": "Leopardo",
        "en": "Leopard"
      },
      "image": "https://images.pexels.com/videos/30972326/africa-african-leopard-amboseli-animal-30972326.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200",
      "facts": {
        "es": "El leopardo trepa árboles y sube a sus presas para comer tranquilo. Sus manchas parecen rosas, llamadas rosetas. Es silencioso y caza de noche.",
        "en": "The leopard climbs trees and hauls its prey up to eat in peace. Its spots look like little roses, called rosettes. It is quiet and hunts at night."
      }
    },
    {
      "id": "jaguar",
      "name": {
        "es": "Jaguar",
        "en": "Jaguar"
      },
      "image": "https://images.pexels.com/videos/19210129/animal-jaguar-19210129.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200",
      "facts": {
        "es": "El jaguar es el felino más grande de América. Le gusta el agua y nada muy bien. Su mordida es tan fuerte que rompe caparazones.",
        "en": "The jaguar is the largest cat in the Americas. It loves water and swims very well. Its bite is strong enough to crack shells."
      }
    },
    {
      "id": "puma",
      "name": {
        "es": "Puma",
        "en": "Puma"
      },
      "image": "https://images.pexels.com/videos/11038543/carnivore-cougar-dangerous-predator-11038543.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200",
      "facts": {
        "es": "El puma también se llama león de montaña. Salta muy alto y corre rápido. Vive desde las montañas hasta los bosques.",
        "en": "The puma is also called a mountain lion. It jumps very high and runs fast. It lives from the mountains to the forests."
      }
    }
  ],
  "granja": [
    {
      "id": "oveja",
      "name": {
        "es": "Oveja",
        "en": "Sheep"
      },
      "image": "https://images.pexels.com/videos/32992989/4k-drone-footage-sheeps-32992989.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200",
      "facts": {
        "es": "La oveja nos da lana para abrigarnos. Vive en grupo, llamado rebaño, y come pasto. Dice 'beee'.",
        "en": "The sheep gives us wool to keep warm. It lives in a group called a flock and eats grass. It says 'baa'."
      }
    },
    {
      "id": "cerdo",
      "name": {
        "es": "Cerdo",
        "en": "Pig"
      },
      "image": "https://images.pexels.com/videos/3765312/animals-cute-cute-animals-dirty-3765312.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200",
      "facts": {
        "es": "El cerdo es muy inteligente y curioso. Se revuelca en el barro para refrescarse. Dice 'oink'.",
        "en": "The pig is very smart and curious. It rolls in mud to cool down. It says 'oink'."
      }
    },
    {
      "id": "gallina",
      "name": {
        "es": "Gallina",
        "en": "Hen"
      },
      "image": "https://images.pexels.com/videos/3370949/free-video-3370949.jpg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200",
      "facts": {
        "es": "La gallina pone huevos y cuida a sus pollitos. Escarba la tierra buscando semillas. Dice 'cocorocó'.",
        "en": "The hen lays eggs and looks after her chicks. She scratches the ground for seeds. She says 'cluck'."
      }
    },
    {
      "id": "pato",
      "name": {
        "es": "Pato",
        "en": "Duck"
      },
      "image": "https://images.pexels.com/videos/17533494/pexels-photo-17533494.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200",
      "facts": {
        "es": "El pato nada en el agua y tiene patas con membranas, como aletas. Sus plumas no se mojan. Dice 'cuac'.",
        "en": "The duck swims in water and has webbed feet like flippers. Its feathers stay dry. It says 'quack'."
      }
    },
    {
      "id": "conejo",
      "name": {
        "es": "Conejo",
        "en": "Rabbit"
      },
      "image": "https://images.pexels.com/videos/31875420/rabbit-31875420.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200",
      "facts": {
        "es": "El conejo salta rápido y mueve la naricita. Le encantan el pasto y las zanahorias. Vive en madrigueras bajo tierra.",
        "en": "The rabbit hops fast and wiggles its little nose. It loves grass and carrots. It lives in burrows underground."
      }
    }
  ],
  "sabana": [
    {
      "id": "cebra",
      "name": {
        "es": "Cebra",
        "en": "Zebra"
      },
      "image": "https://images.pexels.com/videos/6821205/meeting-nature-nature-photography-talk-6821205.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200",
      "facts": {
        "es": "La cebra tiene rayas blancas y negras únicas, como una huella. Vive en la sabana en grupo. Corre para escapar de los leones.",
        "en": "The zebra has unique black-and-white stripes, like a fingerprint. It lives on the savanna in herds. It runs to escape lions."
      }
    },
    {
      "id": "rinoceronte",
      "name": {
        "es": "Rinoceronte",
        "en": "Rhino"
      },
      "image": "https://images.pexels.com/videos/19806859/pexels-photo-19806859.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200",
      "facts": {
        "es": "El rinoceronte es grande y fuerte, con uno o dos cuernos. Le gusta el barro para protegerse del sol. Come pasto.",
        "en": "The rhino is big and strong, with one or two horns. It likes mud to protect itself from the sun. It eats grass."
      }
    },
    {
      "id": "hipopotamo",
      "name": {
        "es": "Hipopótamo",
        "en": "Hippo"
      },
      "image": "https://images.pexels.com/videos/32861840/4k-nature-video-africa-wildlife-hippopotamus-lowerzambezinationalpark-32861840.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200",
      "facts": {
        "es": "El hipopótamo pasa el día en el agua para refrescarse. ¡Abre una boca enorme! De noche sale a comer pasto.",
        "en": "The hippo spends the day in water to stay cool. It opens a huge mouth! At night it comes out to eat grass."
      }
    },
    {
      "id": "suricata",
      "name": {
        "es": "Suricata",
        "en": "Meerkat"
      },
      "image": "https://images.pexels.com/videos/26575569/animal-animal-video-meerkat-meerkat-video-26575569.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200",
      "facts": {
        "es": "La suricata se para en dos patitas para vigilar. Vive en familia en túneles bajo la arena. Cuida a todos del peligro.",
        "en": "The meerkat stands on two little legs to keep watch. It lives in a family in tunnels under the sand. It guards everyone."
      }
    }
  ],
  "oceano": [
    {
      "id": "ballena",
      "name": {
        "es": "Ballena",
        "en": "Whale"
      },
      "image": "https://images.pexels.com/videos/27941813/aerial-animals-cabo-cabo-mexico-27941813.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200",
      "facts": {
        "es": "La ballena es el animal más grande del mundo. Respira por un agujero en su lomo. Canta canciones bajo el agua.",
        "en": "The whale is the biggest animal in the world. It breathes through a hole on its back. It sings songs underwater."
      }
    },
    {
      "id": "tortuga",
      "name": {
        "es": "Tortuga marina",
        "en": "Sea turtle"
      },
      "image": "https://images.pexels.com/videos/35569887/pexels-photo-35569887.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200",
      "facts": {
        "es": "La tortuga marina nada por todo el océano. Lleva su casa en el caparazón. Pone sus huevos en la arena de la playa.",
        "en": "The sea turtle swims across the whole ocean. It carries its house on its shell. It lays its eggs in the beach sand."
      }
    },
    {
      "id": "tiburon",
      "name": {
        "es": "Tiburón",
        "en": "Shark"
      },
      "image": "https://images.pexels.com/videos/7997370/pexels-photo-7997370.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200",
      "facts": {
        "es": "El tiburón es un gran nadador del mar. Tiene muchos dientes y muy buen olfato. Existe desde antes que los dinosaurios.",
        "en": "The shark is a great swimmer of the sea. It has many teeth and a great sense of smell. It existed even before the dinosaurs."
      }
    },
    {
      "id": "pulpo",
      "name": {
        "es": "Pulpo",
        "en": "Octopus"
      },
      "image": "https://images.pexels.com/videos/34105982/aquarium-coral-garden-discovery-dive-adventure-octopus-34105982.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200",
      "facts": {
        "es": "El pulpo tiene ocho brazos y es muy listo. Cambia de color para esconderse. ¡Pasa por huecos muy pequeños!",
        "en": "The octopus has eight arms and is very clever. It changes color to hide. It can squeeze through tiny gaps!"
      }
    }
  ],
  "aves": [
    {
      "id": "aguila",
      "name": {
        "es": "Águila",
        "en": "Eagle"
      },
      "image": "https://images.pexels.com/videos/26673863/bird-flying-eagles-26673863.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200",
      "facts": {
        "es": "El águila vuela muy alto y ve de lejísimos. Con sus garras fuertes atrapa peces y conejos. Hace su nido en lo alto.",
        "en": "The eagle flies very high and sees from far away. With its strong talons it catches fish and rabbits. It nests up high."
      }
    },
    {
      "id": "flamenco",
      "name": {
        "es": "Flamenco",
        "en": "Flamingo"
      },
      "image": "https://images.pexels.com/videos/30219093/background-trees-boat-caribbean-flamingo-30219093.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200",
      "facts": {
        "es": "El flamenco es rosado y se para en una sola pata. Vive en lagunas y come camaroncitos; por eso es rosa.",
        "en": "The flamingo is pink and stands on one leg. It lives in lagoons and eats tiny shrimp, which is why it is pink."
      }
    },
    {
      "id": "tucan",
      "name": {
        "es": "Tucán",
        "en": "Toucan"
      },
      "image": "https://images.pexels.com/videos/13898921/beak-bird-feathers-orange-13898921.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200",
      "facts": {
        "es": "El tucán tiene un pico enorme y colorido, pero muy liviano. Vive en la selva y come frutas. Salta entre los árboles.",
        "en": "The toucan has a huge, colorful beak that is very light. It lives in the jungle and eats fruit. It hops between trees."
      }
    }
  ],
  "bosque": [
    {
      "id": "lobo",
      "name": {
        "es": "Lobo",
        "en": "Wolf"
      },
      "image": "https://images.pexels.com/videos/6093232/pexels-photo-6093232.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200",
      "facts": {
        "es": "El lobo vive y caza en familia, llamada manada. Aúlla para hablar con los suyos. Es el abuelo salvaje de los perros.",
        "en": "The wolf lives and hunts in a family called a pack. It howls to talk to its family. It is the wild grandparent of dogs."
      }
    },
    {
      "id": "zorro",
      "name": {
        "es": "Zorro",
        "en": "Fox"
      },
      "image": "https://images.pexels.com/videos/35628259/adirondack-park-adirondacks-american-wildlife-forest-35628259.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200",
      "facts": {
        "es": "El zorro es astuto y tiene una cola peludita y grande. Oye tan bien que escucha animalitos bajo la nieve.",
        "en": "The fox is clever and has a big, fluffy tail. It hears so well it can hear little animals under the snow."
      }
    },
    {
      "id": "ciervo",
      "name": {
        "es": "Ciervo",
        "en": "Deer"
      },
      "image": "https://images.pexels.com/videos/17994257/deer-deers-fawn-mother-and-baby-17994257.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200",
      "facts": {
        "es": "El ciervo corre y salta por el bosque. Los machos tienen astas que crecen cada año. Come hojas y pasto.",
        "en": "The deer runs and leaps through the forest. The males have antlers that grow every year. It eats leaves and grass."
      }
    },
    {
      "id": "ardilla",
      "name": {
        "es": "Ardilla",
        "en": "Squirrel"
      },
      "image": "https://images.pexels.com/videos/17109821/squirrel-17109821.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200",
      "facts": {
        "es": "La ardilla trepa árboles a toda velocidad. Guarda nueces para el invierno y a veces olvida dónde. Su cola la equilibra.",
        "en": "The squirrel climbs trees super fast. It stores nuts for winter and sometimes forgets where. Its tail helps it balance."
      }
    }
  ],
  "selva": [
    {
      "id": "gorila",
      "name": {
        "es": "Gorila",
        "en": "Gorilla"
      },
      "image": "https://images.pexels.com/videos/30606781/ape-gorilla-silverback-wildlife-30606781.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200",
      "facts": {
        "es": "El gorila es el mono más grande y muy gentil. Vive en familia y se golpea el pecho para saludar. Come hojas y frutas.",
        "en": "The gorilla is the biggest ape and very gentle. It lives in a family and beats its chest to say hello. It eats leaves and fruit."
      }
    },
    {
      "id": "perezoso",
      "name": {
        "es": "Perezoso",
        "en": "Sloth"
      },
      "image": "https://images.pexels.com/videos/13899315/animals-climb-cute-sloth-13899315.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200",
      "facts": {
        "es": "El perezoso se mueve muy lento y duerme casi todo el día. Cuelga de los árboles con sus garras. ¡Hasta nada despacito!",
        "en": "The sloth moves very slowly and sleeps almost all day. It hangs from trees with its claws. It even swims slowly!"
      }
    }
  ]
};
