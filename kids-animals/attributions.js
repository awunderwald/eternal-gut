/* attributions.js — Créditos de medios (Wikimedia/Pexels/Freesound/Mixkit). */
const ATTRIBUTIONS = [
  {
    "file": "Lion waiting in Namibia.jpg",
    "author": "Kevin Pluck",
    "license": "CC BY 2.0",
    "source": "https://commons.wikimedia.org/wiki/File:Lion_waiting_in_Namibia.jpg"
  },
  {
    "file": "Siberian Tiger sf.jpg",
    "author": "Brocken Inaglory",
    "license": "CC BY-SA 3.0",
    "source": "https://commons.wikimedia.org/wiki/File:Siberian_Tiger_sf.jpg"
  },
  {
    "file": "Cheetah portrait Whipsnade Zoo.jpg",
    "author": "William Warby",
    "license": "CC BY 2.0",
    "source": "https://commons.wikimedia.org/wiki/File:Cheetah_portrait_Whipsnade_Zoo.jpg"
  },
  {
    "file": "Cat03.jpg",
    "author": "Fir0002",
    "license": "GFDL 1.2",
    "source": "https://commons.wikimedia.org/wiki/File:Cat03.jpg"
  },
  {
    "file": "Cow female black white.jpg",
    "author": "Keith Weller/USDA",
    "license": "Public domain",
    "source": "https://commons.wikimedia.org/wiki/File:Cow_female_black_white.jpg"
  },
  {
    "file": "010 Atlantic bottlenose dolphin jumping at Pelican point Photo by Giles Laurent.jpg",
    "author": "Giles Laurent",
    "license": "CC BY-SA 4.0",
    "source": "https://commons.wikimedia.org/wiki/File:010_Atlantic_bottlenose_dolphin_jumping_at_Pelican_point_Photo_by_Giles_Laurent.jpg"
  },
  {
    "file": "African elephant front view portrait.jpg",
    "author": "Timothy Akolamazima",
    "license": "CC BY-SA 4.0",
    "source": "https://commons.wikimedia.org/wiki/File:African_elephant_front_view_portrait.jpg"
  },
  {
    "file": "Scarlet macaw (Ara macao cyanopterus) Copan.jpg",
    "author": "Charles J. Sharp",
    "license": "CC BY-SA 4.0",
    "source": "https://commons.wikimedia.org/wiki/File:Scarlet_macaw_%28Ara_macao_cyanopterus%29_Copan.jpg"
  },
  {
    "file": "Portrait of a Brown Bear - panoramio.jpg",
    "author": "Jens Cederskjold",
    "license": "CC BY 3.0",
    "source": "https://commons.wikimedia.org/wiki/File:Portrait_of_a_Brown_Bear_-_panoramio.jpg"
  },
  {
    "file": "Rhesus macaque Macaca mulatta DSC 0184.jpg",
    "author": "Amlanaditya",
    "license": "CC BY-SA 4.0",
    "source": "https://commons.wikimedia.org/wiki/File:Rhesus_macaque_Macaca_mulatta_DSC_0184.jpg"
  },
  {
    "file": "Tyrannosaurus Rex (Zhengzhou).jpg",
    "author": "Gary Todd",
    "license": "CC0",
    "source": "https://commons.wikimedia.org/wiki/File:Tyrannosaurus_Rex_%28Zhengzhou%29.jpg"
  },
  {
    "file": "Lion (Panthera leo).webm",
    "author": "Bernard DUPONT",
    "license": "CC BY-SA 2.0",
    "source": "https://commons.wikimedia.org/wiki/File:Lion_%28Panthera_leo%29.webm"
  },
  {
    "file": "Lions (Panthera leo).webm",
    "author": "Bernard DUPONT",
    "license": "CC BY-SA 2.0",
    "source": "https://commons.wikimedia.org/wiki/File:Lions_%28Panthera_leo%29.webm"
  },
  {
    "file": "Walking Tiger in Zoo.webm",
    "author": "Path slopu",
    "license": "CC BY-SA 4.0",
    "source": "https://commons.wikimedia.org/wiki/File:Walking_Tiger_in_Zoo.webm"
  },
  {
    "file": "Sumatran tiger (Panthera tigris sumatrae) vocalising.webm",
    "author": "Brian Gratwicke",
    "license": "CC BY 2.0",
    "source": "https://commons.wikimedia.org/wiki/File:Sumatran_tiger_%28Panthera_tigris_sumatrae%29_vocalising.webm"
  },
  {
    "file": "Malayan tiger (Panthera tigris jacksoni) in a zoo.webm",
    "author": "Artezoid",
    "license": "CC BY 3.0",
    "source": "https://commons.wikimedia.org/wiki/File:Malayan_tiger_%28Panthera_tigris_jacksoni%29_in_a_zoo.webm"
  },
  {
    "file": "Rozi the cheetah running at the Cincinnati Zoo.webm",
    "author": "HAV0Xunderscore",
    "license": "CC0",
    "source": "https://commons.wikimedia.org/wiki/File:Rozi_the_cheetah_running_at_the_Cincinnati_Zoo.webm"
  },
  {
    "file": "Cheetah, Madikwe.webm",
    "author": "https://www.flickr.com/photos/flowcomm/",
    "license": "CC BY 2.0",
    "source": "https://commons.wikimedia.org/wiki/File:Cheetah%2C_Madikwe.webm"
  },
  {
    "file": "Cat lapping water off ground in slow motion.gk.webm",
    "author": "Grendelkhan",
    "license": "CC BY-SA 4.0",
    "source": "https://commons.wikimedia.org/wiki/File:Cat_lapping_water_off_ground_in_slow_motion.gk.webm"
  },
  {
    "file": "Cat kneading and sucking blanket.webm",
    "author": "Watchduck You can name the author as \"T. Piesk\", \"Tilman Piesk\" or \"Watchduck\".",
    "license": "CC BY-SA 4.0",
    "source": "https://commons.wikimedia.org/wiki/File:Cat_kneading_and_sucking_blanket.webm"
  },
  {
    "file": "Cow crosses cattle grid.webm",
    "author": "Luke Byers",
    "license": "CC BY 3.0",
    "source": "https://commons.wikimedia.org/wiki/File:Cow_crosses_cattle_grid.webm"
  },
  {
    "file": "053 Pod of Spinner dolphins swimming in the Indian ocean Video by Giles Laurent.webm",
    "author": "Giles Laurent",
    "license": "CC BY-SA 4.0",
    "source": "https://commons.wikimedia.org/wiki/File:053_Pod_of_Spinner_dolphins_swimming_in_the_Indian_ocean_Video_by_Giles_Laurent.webm"
  },
  {
    "file": "Bathing the elephant.webm",
    "author": "Ajeeshkumar4u",
    "license": "CC BY-SA 4.0",
    "source": "https://commons.wikimedia.org/wiki/File:Bathing_the_elephant.webm"
  },
  {
    "file": "Ara macao 01.ogv",
    "author": "MatthiasKabel",
    "license": "CC BY-SA 3.0",
    "source": "https://commons.wikimedia.org/wiki/File:Ara_macao_01.ogv"
  },
  {
    "file": "Brown Bear (Ursus arctos).webm",
    "author": "U.S. Fish and Wildlife Service, National Conservation Training Center (USFWS/NCTC)",
    "license": "Public domain",
    "source": "https://commons.wikimedia.org/wiki/File:Brown_Bear_%28Ursus_arctos%29.webm"
  },
  {
    "file": "Baby monkey drinking water.webm",
    "author": "Kuldeepburjbhalaike",
    "license": "CC BY-SA 4.0",
    "source": "https://commons.wikimedia.org/wiki/File:Baby_monkey_drinking_water.webm"
  },
  {
    "file": "Trex animatronic.webm",
    "author": "DSwissK",
    "license": "CC BY-SA 4.0",
    "source": "https://commons.wikimedia.org/wiki/File:Trex_animatronic.webm"
  },
  {
    "file": "439280 schots angry-tiger.wav",
    "author": "schots",
    "license": "CC0",
    "source": "https://commons.wikimedia.org/wiki/File:439280_schots_angry-tiger.wav"
  },
  {
    "file": "Meow.ogg",
    "author": "The original uploader was Dcrosby at English Wikipedia .",
    "license": "CC BY-SA 3.0",
    "source": "https://commons.wikimedia.org/wiki/File:Meow.ogg"
  },
  {
    "file": "Single Cow Moo.ogg",
    "author": "MichaeltheFox8621",
    "license": "CC BY-SA 4.0",
    "source": "https://commons.wikimedia.org/wiki/File:Single_Cow_Moo.ogg"
  },
  {
    "file": "Elephant voice - trumpeting.ogg",
    "author": "தகவலுழவன்",
    "license": "CC0",
    "source": "https://commons.wikimedia.org/wiki/File:Elephant_voice_-_trumpeting.ogg"
  },
  {
    "file": "Bear growl.ogg",
    "author": "Shizhao",
    "license": "CC BY 3.0",
    "source": "https://commons.wikimedia.org/wiki/File:Bear_growl.ogg"
  },
  {
    "file": "Dusky-leaf-monkey-call-kaeng-krachan.ogg",
    "author": "Rushenb",
    "license": "CC BY-SA 4.0",
    "source": "https://commons.wikimedia.org/wiki/File:Dusky-leaf-monkey-call-kaeng-krachan.ogg"
  },
  {
    "file": "White horse portrait.jpg",
    "author": "Saffron Blaze",
    "license": "CC BY-SA 3.0",
    "source": "https://commons.wikimedia.org/wiki/File:White_horse_portrait.jpg"
  },
  {
    "file": "Spheniscus demersus (portrait).jpg",
    "author": "Hans Hillewaert",
    "license": "CC BY-SA 3.0",
    "source": "https://commons.wikimedia.org/wiki/File:Spheniscus_demersus_%28portrait%29.jpg"
  },
  {
    "file": "006 Giraffe portrait in the Lake Manyara National Park Photo by Giles Laurent.jpg",
    "author": "Giles Laurent",
    "license": "CC BY-SA 4.0",
    "source": "https://commons.wikimedia.org/wiki/File:006_Giraffe_portrait_in_the_Lake_Manyara_National_Park_Photo_by_Giles_Laurent.jpg"
  },
  {
    "file": "Burrowing Owl Portrait (6777953881).jpg",
    "author": "Andy Morffew from Itchen Abbas, Hampshire, UK",
    "license": "CC BY 2.0",
    "source": "https://commons.wikimedia.org/wiki/File:Burrowing_Owl_Portrait_%286777953881%29.jpg"
  },
  {
    "file": "Horses running in a pasture.webm",
    "author": "Field of Dreams",
    "license": "CC BY 3.0",
    "source": "https://commons.wikimedia.org/wiki/File:Horses_running_in_a_pasture.webm"
  },
  {
    "file": "African penguins walking.webm",
    "author": "L. Shyamal",
    "license": "CC BY-SA 4.0",
    "source": "https://commons.wikimedia.org/wiki/File:African_penguins_walking.webm"
  },
  {
    "file": "Juvenile Giraffe - walking - Malawi - 2018 Aug.webm",
    "author": "Nesnad",
    "license": "CC BY-SA 4.0",
    "source": "https://commons.wikimedia.org/wiki/File:Juvenile_Giraffe_-_walking_-_Malawi_-_2018_Aug.webm"
  },
  {
    "file": "Little Owl,South Hebron.webm",
    "author": "بدارين",
    "license": "CC BY-SA 3.0",
    "source": "https://commons.wikimedia.org/wiki/File:Little_Owl%2CSouth_Hebron.webm"
  },
  {
    "file": "Wiehern.ogg",
    "author": "Hü .",
    "license": "Public domain",
    "source": "https://commons.wikimedia.org/wiki/File:Wiehern.ogg"
  },
  {
    "file": "20091121 Little Penguin calls at St Kilda Breakwater.ogg",
    "author": "Mikeybear",
    "license": "CC BY 3.0",
    "source": "https://commons.wikimedia.org/wiki/File:20091121_Little_Penguin_calls_at_St_Kilda_Breakwater.ogg"
  },
  {
    "file": "Strix aluco - Tawny Owl XC563348.mp3",
    "author": "Alvaro Ortiz Troncoso",
    "license": "CC BY-SA 4.0",
    "source": "https://commons.wikimedia.org/wiki/File:Strix_aluco_-_Tawny_Owl_XC563348.mp3"
  },
  {
    "file": "León en la sabana — video (Pexels)",
    "author": "Bharath Kumar Venkatesh",
    "license": "Pexels License",
    "source": "https://www.pexels.com/video/majestic-lion-strolling-in-african-savanna-30393112/"
  },
  {
    "file": "Tigre en la selva — video (Pexels)",
    "author": "Pexels",
    "license": "Pexels License",
    "source": "https://www.pexels.com/video/majestic-bengal-tiger-in-indian-jungle-31635739/"
  },
  {
    "file": "Elefante en la sabana — video (Pexels)",
    "author": "Pexels",
    "license": "Pexels License",
    "source": "https://www.pexels.com/video/majestic-elephant-walking-in-african-savanna-31378767/"
  },
  {
    "file": "Jirafa salvaje — video (Pexels)",
    "author": "Pexels",
    "license": "Pexels License",
    "source": "https://www.pexels.com/video/giraffe-in-the-wild-5214219/"
  },
  {
    "file": "Delfines en el mar — video (Pexels)",
    "author": "JIUN-JE LIN",
    "license": "Pexels License",
    "source": "https://www.pexels.com/video/a-group-of-dolphins-swimming-in-the-ocean-28224356/"
  },
  {
    "file": "Gato — sonido (Freesound)",
    "author": "Lukey1028",
    "license": "CC0",
    "source": "https://freesound.org/s/732519/"
  },
  {
    "file": "Vaca — sonido (Freesound)",
    "author": "spurioustransients",
    "license": "CC0",
    "source": "https://freesound.org/s/513557/"
  },
  {
    "file": "Caballo — sonido (Freesound)",
    "author": "TheKingOfGeeks360",
    "license": "CC0",
    "source": "https://freesound.org/s/777763/"
  },
  {
    "file": "Pingüino — sonido (Freesound)",
    "author": "hackerb9",
    "license": "CC BY",
    "source": "https://freesound.org/s/110116/"
  },
  {
    "file": "Elefante — sonido (Freesound)",
    "author": "vintprox",
    "license": "CC0",
    "source": "https://freesound.org/s/854137/"
  },
  {
    "file": "Guacamayo — sonido (Freesound)",
    "author": "Breviceps",
    "license": "CC0",
    "source": "https://freesound.org/s/535815/"
  },
  {
    "file": "Oso — sonido (Freesound)",
    "author": "Piddipop",
    "license": "CC0",
    "source": "https://freesound.org/s/728102/"
  },
  {
    "file": "Mono — sonido (Freesound)",
    "author": "soundbytez",
    "license": "CC BY",
    "source": "https://freesound.org/s/99453/"
  },
  {
    "file": "T-Rex — sonido (Freesound)",
    "author": "Logicogonist",
    "license": "CC0",
    "source": "https://freesound.org/s/810951/"
  },
  {
    "file": "Guepardo — sonido (Freesound)",
    "author": "BalancedEnergy10",
    "license": "CC0",
    "source": "https://freesound.org/s/265541/"
  },
  {
    "file": "Delfín — sonido (Freesound)",
    "author": "Mastersoundboy2005",
    "license": "CC0",
    "source": "https://freesound.org/s/737276/"
  },
  {
    "file": "Jirafa — sonido (Freesound)",
    "author": "rebecca.valdez3",
    "license": "CC BY 3.0",
    "source": "https://freesound.org/s/393354/"
  },
  {
    "file": "Guepardo — video (Pexels)",
    "author": "Pexels",
    "license": "Pexels License",
    "source": "https://www.pexels.com/video/34833591/"
  },
  {
    "file": "Gato — video (Pexels)",
    "author": "Pexels",
    "license": "Pexels License",
    "source": "https://www.pexels.com/video/3926874/"
  },
  {
    "file": "Vaca — video (Pexels)",
    "author": "Pexels",
    "license": "Pexels License",
    "source": "https://www.pexels.com/video/32044008/"
  },
  {
    "file": "Caballo — video (Pexels)",
    "author": "Pexels",
    "license": "Pexels License",
    "source": "https://www.pexels.com/video/28899321/"
  },
  {
    "file": "Pingüino — video (Pexels)",
    "author": "Pexels",
    "license": "Pexels License",
    "source": "https://www.pexels.com/video/13458445/"
  },
  {
    "file": "Oso — video (Pexels)",
    "author": "Pexels",
    "license": "Pexels License",
    "source": "https://www.pexels.com/video/855113/"
  },
  {
    "file": "Mono — video (Pexels)",
    "author": "Pexels",
    "license": "Pexels License",
    "source": "https://www.pexels.com/video/31398496/"
  },
  {
    "file": "Guacamayo — video (Pexels)",
    "author": "Pexels",
    "license": "Pexels License",
    "source": "https://www.pexels.com/video/30049204/"
  },
  {
    "file": "Búho — video (Pexels)",
    "author": "Pexels",
    "license": "Pexels License",
    "source": "https://www.pexels.com/video/33404877/"
  },
  {
    "file": "T-Rex — video (Pexels)",
    "author": "Pexels",
    "license": "Pexels License",
    "source": "https://www.pexels.com/video/34492572/"
  },
  {
    "file": "Leopardo — video (Pexels)",
    "author": "Simone Dinoia",
    "license": "Pexels License",
    "source": "https://www.pexels.com/video/30972326/"
  },
  {
    "file": "Leopardo — sonido (Freesound)",
    "author": "messo1997",
    "license": "CC0",
    "source": "https://freesound.org/s/683661/"
  },
  {
    "file": "Jaguar — video (Pexels)",
    "author": "Jari Lobo",
    "license": "Pexels License",
    "source": "https://www.pexels.com/video/19210129/"
  },
  {
    "file": "Jaguar — sonido (Freesound)",
    "author": "Lewis.B.M",
    "license": "CC0",
    "source": "https://freesound.org/s/571287/"
  },
  {
    "file": "Puma — video (Pexels)",
    "author": "Nicky Pe",
    "license": "Pexels License",
    "source": "https://www.pexels.com/video/11038543/"
  },
  {
    "file": "Puma — sonido (Freesound)",
    "author": "XHwZQ6GV",
    "license": "CC BY",
    "source": "https://freesound.org/s/536331/"
  },
  {
    "file": "Oveja — video (Pexels)",
    "author": "Evgeny Karev",
    "license": "Pexels License",
    "source": "https://www.pexels.com/video/32992989/"
  },
  {
    "file": "Oveja — sonido (Freesound)",
    "author": "SergioJbs",
    "license": "CC0",
    "source": "https://freesound.org/s/669872/"
  },
  {
    "file": "Cerdo — video (Pexels)",
    "author": "Magda Ehlers",
    "license": "Pexels License",
    "source": "https://www.pexels.com/video/3765312/"
  },
  {
    "file": "Cerdo — sonido (Freesound)",
    "author": "TheKingOfGeeks360",
    "license": "CC0",
    "source": "https://freesound.org/s/842313/"
  },
  {
    "file": "Gallina — video (Pexels)",
    "author": "Engin Altundağ",
    "license": "Pexels License",
    "source": "https://www.pexels.com/video/3370949/"
  },
  {
    "file": "Gallina — sonido (Freesound)",
    "author": "TheKingOfGeeks360",
    "license": "CC0",
    "source": "https://freesound.org/s/735767/"
  },
  {
    "file": "Pato — video (Pexels)",
    "author": "utopia 36",
    "license": "Pexels License",
    "source": "https://www.pexels.com/video/17533494/"
  },
  {
    "file": "Pato — sonido (Freesound)",
    "author": "OwennewO",
    "license": "CC0",
    "source": "https://freesound.org/s/719108/"
  },
  {
    "file": "Conejo — video (Pexels)",
    "author": "Efrem  Efre",
    "license": "Pexels License",
    "source": "https://www.pexels.com/video/31875420/"
  },
  {
    "file": "Conejo — sonido (Freesound)",
    "author": "policemouse67",
    "license": "CC0",
    "source": "https://freesound.org/s/697093/"
  },
  {
    "file": "Cebra — video (Pexels)",
    "author": "Magda Ehlers",
    "license": "Pexels License",
    "source": "https://www.pexels.com/video/6821205/"
  },
  {
    "file": "Cebra — sonido (Freesound)",
    "author": "TheKingOfGeeks360",
    "license": "CC0",
    "source": "https://freesound.org/s/850661/"
  },
  {
    "file": "Rinoceronte — video (Pexels)",
    "author": "Magda Ehlers",
    "license": "Pexels License",
    "source": "https://www.pexels.com/video/19806859/"
  },
  {
    "file": "Rinoceronte — sonido (Freesound)",
    "author": "bevibeldesign",
    "license": "CC0",
    "source": "https://freesound.org/s/350421/"
  },
  {
    "file": "Hipopótamo — video (Pexels)",
    "author": "Floating Rabbit",
    "license": "Pexels License",
    "source": "https://www.pexels.com/video/32861840/"
  },
  {
    "file": "Hipopótamo — sonido (Freesound)",
    "author": "LukeIRL",
    "license": "CC BY",
    "source": "https://freesound.org/s/176103/"
  },
  {
    "file": "Suricata — video (Pexels)",
    "author": "Brixiv",
    "license": "Pexels License",
    "source": "https://www.pexels.com/video/26575569/"
  },
  {
    "file": "Ballena — video (Pexels)",
    "author": "Logan Voss",
    "license": "Pexels License",
    "source": "https://www.pexels.com/video/27941813/"
  },
  {
    "file": "Ballena — sonido (Freesound)",
    "author": "RebekahDay",
    "license": "CC0",
    "source": "https://freesound.org/s/171945/"
  },
  {
    "file": "Tortuga marina — video (Pexels)",
    "author": "JUN HO LEE",
    "license": "Pexels License",
    "source": "https://www.pexels.com/video/35569887/"
  },
  {
    "file": "Tortuga marina — sonido (Freesound)",
    "author": "DeqstersLab",
    "license": "CC BY",
    "source": "https://freesound.org/s/848187/"
  },
  {
    "file": "Tiburón — video (Pexels)",
    "author": "Leo Salom",
    "license": "Pexels License",
    "source": "https://www.pexels.com/video/7997370/"
  },
  {
    "file": "Pulpo — video (Pexels)",
    "author": "JUN HO LEE",
    "license": "Pexels License",
    "source": "https://www.pexels.com/video/34105982/"
  },
  {
    "file": "Pulpo — sonido (Freesound)",
    "author": "hotpin7",
    "license": "CC0",
    "source": "https://freesound.org/s/840042/"
  },
  {
    "file": "Águila — video (Pexels)",
    "author": "Manoo Media",
    "license": "Pexels License",
    "source": "https://www.pexels.com/video/26673863/"
  },
  {
    "file": "Águila — sonido (Freesound)",
    "author": "mokasza",
    "license": "CC BY",
    "source": "https://freesound.org/s/810192/"
  },
  {
    "file": "Flamenco — video (Pexels)",
    "author": "Dominik Gryzbon",
    "license": "Pexels License",
    "source": "https://www.pexels.com/video/30219093/"
  },
  {
    "file": "Flamenco — sonido (Freesound)",
    "author": "soundbytez",
    "license": "CC BY",
    "source": "https://freesound.org/s/111039/"
  },
  {
    "file": "Tucán — video (Pexels)",
    "author": "Steven HAuse",
    "license": "Pexels License",
    "source": "https://www.pexels.com/video/13898921/"
  },
  {
    "file": "Tucán — sonido (Freesound)",
    "author": "soundbytez",
    "license": "CC BY",
    "source": "https://freesound.org/s/97389/"
  },
  {
    "file": "Lobo — video (Pexels)",
    "author": "K",
    "license": "Pexels License",
    "source": "https://www.pexels.com/video/6093232/"
  },
  {
    "file": "Lobo — sonido (Freesound)",
    "author": "BrainClaim",
    "license": "CC0",
    "source": "https://freesound.org/s/267179/"
  },
  {
    "file": "Zorro — video (Pexels)",
    "author": "Dustin Hays",
    "license": "Pexels License",
    "source": "https://www.pexels.com/video/35628259/"
  },
  {
    "file": "Zorro — sonido (Freesound)",
    "author": "InspectorJ",
    "license": "CC BY",
    "source": "https://freesound.org/s/485009/"
  },
  {
    "file": "Ciervo — video (Pexels)",
    "author": "Townsend Walton",
    "license": "Pexels License",
    "source": "https://www.pexels.com/video/17994257/"
  },
  {
    "file": "Ciervo — sonido (Freesound)",
    "author": "ferventtorpor",
    "license": "CC0",
    "source": "https://freesound.org/s/696775/"
  },
  {
    "file": "Ardilla — video (Pexels)",
    "author": "Amazing3D",
    "license": "Pexels License",
    "source": "https://www.pexels.com/video/17109821/"
  },
  {
    "file": "Ardilla — sonido (Freesound)",
    "author": "TRP",
    "license": "CC0",
    "source": "https://freesound.org/s/574380/"
  },
  {
    "file": "Gorila — video (Pexels)",
    "author": "Nicky Pe",
    "license": "Pexels License",
    "source": "https://www.pexels.com/video/30606781/"
  },
  {
    "file": "Gorila — sonido (Freesound)",
    "author": "kfledman",
    "license": "CC0",
    "source": "https://freesound.org/s/205891/"
  },
  {
    "file": "Perezoso — video (Pexels)",
    "author": "Steven HAuse",
    "license": "Pexels License",
    "source": "https://www.pexels.com/video/13899315/"
  }
];
