/*
 * sources.js — Fuentes y verificación de los datos de cada animal.
 * ----------------------------------------------------------------
 * Pacto de Honestidad §4: cada dato debe tender a tener fuente y marca de
 * verificación. Los textos actuales fueron redactados por el autor y AÚN NO
 * están verificados contra la fuente (verified: false). La fuente apunta a una
 * referencia confiable (Wikipedia de la especie) para revisarlos.
 */

const ANIMAL_SOURCES = {
  leon:      { source: "https://es.wikipedia.org/wiki/Panthera_leo",            verified: false },
  tigre:     { source: "https://es.wikipedia.org/wiki/Panthera_tigris",         verified: false },
  guepardo:  { source: "https://es.wikipedia.org/wiki/Acinonyx_jubatus",        verified: false },
  gato:      { source: "https://es.wikipedia.org/wiki/Felis_silvestris_catus",  verified: false },
  vaca:      { source: "https://es.wikipedia.org/wiki/Bos_taurus",              verified: false },
  delfin:    { source: "https://es.wikipedia.org/wiki/Tursiops_truncatus",      verified: false },
  elefante:  { source: "https://es.wikipedia.org/wiki/Loxodonta",               verified: false },
  guacamayo: { source: "https://es.wikipedia.org/wiki/Ara_macao",               verified: false },
  oso:       { source: "https://es.wikipedia.org/wiki/Ursus_arctos",            verified: false },
  mono:      { source: "https://es.wikipedia.org/wiki/Macaca_mulatta",          verified: false },
  caballo:   { source: "https://es.wikipedia.org/wiki/Equus_ferus_caballus",    verified: false },
  pinguino:  { source: "https://es.wikipedia.org/wiki/Spheniscidae",            verified: false },
  jirafa:    { source: "https://es.wikipedia.org/wiki/Giraffa",                 verified: false },
  buho:      { source: "https://es.wikipedia.org/wiki/Strigidae",               verified: false },
  trex:      { source: "https://es.wikipedia.org/wiki/Tyrannosaurus_rex",       verified: false },
};
