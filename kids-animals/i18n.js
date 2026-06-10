/*
 * i18n.js — Textos de la interfaz (ES/EN) y definición de planes.
 * ----------------------------------------------------------------
 * - I18N: textos del "chrome" de la app (botones, títulos, avisos).
 * - PLANS: planes de suscripción del prototipo. El "Modo Dios" desbloquea todo.
 */

const I18N = {
  es: {
    appName: "Animalitos",
    tagline: "Conoce el reino animal",
    chooseCategory: "Elige un grupo",
    comingSoon: "Próximamente",
    locked: "🔒 Disponible en otro plan",
    tapToMeet: "Toca al animal para conocerlo",
    play: "Reproducir",
    pause: "Pausa",
    replay: "Ver de nuevo",
    sound: "Sonido",
    video: "Video",
    back: "Volver",
    knowledgeIn: "Leer en",
    // Parent area
    parents: "Para mamá y papá",
    parentGateTitle: "Zona de adultos",
    parentGatePrompt: "Para continuar, resuelve:",
    parentGateError: "Respuesta incorrecta, intenta de nuevo",
    appLanguage: "Idioma de la app",
    plan: "Plan de suscripción (prototipo)",
    planNote:
      "En el prototipo puedes cambiar de plan para ver cómo cambia el contenido disponible.",
    close: "Cerrar",
    replaysLeft: (n) => `Te quedan ${n} repeticiones hoy`,
    noReplays: "Llegaste al límite de hoy en este plan 🙂",
    upgradeMore: "Otros planes muestran más animales",
    moreVideosInPlan: "Más videos disponibles en planes superiores",
  },
  en: {
    appName: "Little Animals",
    tagline: "Meet the animal kingdom",
    chooseCategory: "Choose a group",
    comingSoon: "Coming soon",
    locked: "🔒 Available in another plan",
    tapToMeet: "Tap the animal to meet it",
    play: "Play",
    pause: "Pause",
    replay: "Watch again",
    sound: "Sound",
    video: "Video",
    back: "Back",
    knowledgeIn: "Read in",
    parents: "For grown-ups",
    parentGateTitle: "Grown-up zone",
    parentGatePrompt: "To continue, solve:",
    parentGateError: "Wrong answer, try again",
    appLanguage: "App language",
    plan: "Subscription plan (prototype)",
    planNote:
      "In this prototype you can switch plans to see how the available content changes.",
    close: "Close",
    replaysLeft: (n) => `${n} replays left today`,
    noReplays: "You reached today's limit on this plan 🙂",
    upgradeMore: "Other plans show more animals",
    moreVideosInPlan: "More videos available in higher plans",
  },
};

/*
 * Planes de suscripción.
 * null = ilimitado / sin restricción.
 *   maxCategories      → cuántos grupos puede abrir
 *   maxAnimals         → cuántos animales por grupo
 *   maxVideos          → cuántos videos por animal
 *   maxReplays         → repeticiones por video al día (null = infinito)
 *   languageToggle     → puede cambiar el idioma del texto de conocimiento
 *   unlocksPremium     → desbloquea categorías premium
 */
const PLANS = {
  god: {
    id: "god",
    badge: "👑",
    name: { es: "Modo Dios", en: "God Mode" },
    desc: { es: "Todo desbloqueado (prototipo)", en: "Everything unlocked (prototype)" },
    maxCategories: null,
    maxAnimals: null,
    maxVideos: null,
    maxReplays: null,
    languageToggle: true,
    unlocksPremium: true,
  },
  free: {
    id: "free",
    badge: "🆓",
    name: { es: "Gratis", en: "Free" },
    desc: { es: "1 grupo · 2 animales · 1 video", en: "1 group · 2 animals · 1 video" },
    maxCategories: 1,
    maxAnimals: 2,
    maxVideos: 1,
    maxReplays: 3,
    languageToggle: false,
    unlocksPremium: false,
  },
  monthly: {
    id: "monthly",
    badge: "📅",
    name: { es: "Mensual", en: "Monthly" },
    desc: { es: "Todos los animales · 2 videos", en: "All animals · 2 videos" },
    maxCategories: 1,
    maxAnimals: null,
    maxVideos: 2,
    maxReplays: null,
    languageToggle: true,
    unlocksPremium: false,
  },
  annual: {
    id: "annual",
    badge: "🗓️",
    name: { es: "Anual", en: "Annual" },
    desc: { es: "Todo + grupos premium", en: "Everything + premium groups" },
    maxCategories: null,
    maxAnimals: null,
    maxVideos: null,
    maxReplays: null,
    languageToggle: true,
    unlocksPremium: true,
  },
  lifetime: {
    id: "lifetime",
    badge: "♾️",
    name: { es: "De por vida", en: "Lifetime" },
    desc: { es: "Acceso total para siempre", en: "Full access forever" },
    maxCategories: null,
    maxAnimals: null,
    maxVideos: null,
    maxReplays: null,
    languageToggle: true,
    unlocksPremium: true,
  },
};

// Orden en que se muestran los planes en el panel de adultos.
const PLAN_ORDER = ["god", "free", "monthly", "annual", "lifetime"];
