/*
 * app.js — Lógica de la app "Animalitos".
 * ---------------------------------------
 * Vanilla JS, sin dependencias. Maneja: idioma de la app, idioma del texto
 * de conocimiento, navegación entre pantallas, reproductor de video con
 * pausa/repetición/selector de videos, sonido característico, control parental
 * y planes de suscripción (incluido el "Modo Dios" del prototipo).
 *
 * El estado se guarda en localStorage para que se mantenga entre sesiones.
 */

(function () {
  "use strict";

  const LS_KEY = "animalitos.state.v1";
  const FLAGS = { es: "🇪🇸", en: "🇺🇸" };
  const LANG_NAME = { es: "Español", en: "English" };

  // Color temático por grupo (calza con los acentos de la pantalla de inicio).
  // Se usa para teñir suavemente la pantalla de detalle de cada animal.
  const CATEGORY_COLOR = {
    felinos: "#f3a13c",
    granja: "#7fb069",
    oceano: "#4aa6c4",
    sabana: "#e0a73e",
    aves: "#ec8a76",
    bosque: "#8a9a5b",
    selva: "#6aa86f",
    dinosaurios: "#a98bd4",
  };

  // ---------- Estado ----------
  const today = () => new Date().toISOString().slice(0, 10);

  const defaultState = {
    uiLang: detectLang(),
    knowledgeLang: detectLang(),
    planId: "god", // el prototipo arranca en Modo Dios
    replays: { date: today(), used: {} },
    favorites: [], // ids de animales guardados (local, sin cuenta)
    downloaded: [], // ids de grupos descargados para ver sin internet
  };

  const MEDIA_CACHE = "animalitos-media-v1";

  let state = loadState();

  // Vista actual (para re-render al cambiar idioma/plan)
  let view = { screen: "home", categoryId: null, animalId: null, videoIndex: 0 };

  function detectLang() {
    const l = (navigator.language || "es").toLowerCase();
    return l.startsWith("en") ? "en" : "es"; // por defecto español (Chile, etc.)
  }

  function loadState() {
    try {
      const s = JSON.parse(localStorage.getItem(LS_KEY));
      if (!s) return { ...defaultState };
      // reset diario de repeticiones
      if (!s.replays || s.replays.date !== today()) {
        s.replays = { date: today(), used: {} };
      }
      return { ...defaultState, ...s };
    } catch (e) {
      return { ...defaultState };
    }
  }
  function saveState() {
    localStorage.setItem(LS_KEY, JSON.stringify(state));
  }

  // ---------- Helpers ----------
  const $ = (sel) => document.querySelector(sel);
  const $all = (sel) => Array.from(document.querySelectorAll(sel));
  const t = (key) => I18N[state.uiLang][key];
  const plan = () => PLANS[state.planId] || PLANS.god;

  function findCategory(id) {
    return ANIMAL_DATA.categories.find((c) => c.id === id);
  }
  function findAnimal(catId, animalId) {
    const c = findCategory(catId);
    return c && c.animals.find((a) => a.id === animalId);
  }
  // Busca un animal (y su grupo) solo por su id — para la pantalla de favoritos.
  function findAnimalById(animalId) {
    for (const c of ANIMAL_DATA.categories) {
      const a = c.animals.find((x) => x.id === animalId);
      if (a) return { catId: c.id, animal: a };
    }
    return null;
  }

  // ---------- Favoritos (local, sin cuenta) ----------
  function isFav(id) {
    return state.favorites.includes(id);
  }
  function toggleFav(id) {
    if (isFav(id)) state.favorites = state.favorites.filter((x) => x !== id);
    else state.favorites.push(id);
    saveState();
  }
  function updateFavButton() {
    const btn = $("#btn-fav-toggle");
    if (!btn) return;
    btn.textContent = isFav(view.animalId) ? "❤️" : "🤍";
  }

  // ¿Está bloqueada esta categoría según el plan? (por índice o por ser premium)
  function categoryLocked(cat, index) {
    const p = plan();
    if (cat.premium && !p.unlocksPremium) return true;
    if (p.maxCategories !== null && index >= p.maxCategories) return true;
    return false;
  }
  function animalLocked(index) {
    const p = plan();
    return p.maxAnimals !== null && index >= p.maxAnimals;
  }
  function videoLocked(index) {
    const p = plan();
    return p.maxVideos !== null && index >= p.maxVideos;
  }

  // ---------- Aplicar textos estáticos de i18n ----------
  function applyStaticI18n() {
    document.documentElement.lang = state.uiLang;
    $all("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const val = I18N[state.uiLang][key];
      if (typeof val === "string") el.textContent = val;
    });
    $("[data-i18n='planNote']").textContent = t("planNote");
  }

  // ============ PANTALLA: INICIO ============
  function renderHome() {
    const grid = $("#home-grid");
    grid.innerHTML = "";
    ANIMAL_DATA.categories.forEach((cat, i) => {
      const locked = categoryLocked(cat, i);
      const card = document.createElement("button");
      card.className =
        "card category-card" + (locked ? " locked" : "") + (cat.premium ? " premium" : "");
      card.innerHTML = `
        ${cat.premium ? `<span class="premium-tag">👑 ${t("premiumTag")}</span>` : ""}
        <span class="emoji">${cat.icon}</span>
        <span class="label">${cat.name[state.uiLang]}</span>
        ${locked ? `<span class="lock-band">🔒 ${t("lockedShort")}</span>` : ""}
      `;
      card.addEventListener("click", () => {
        if (locked) {
          // Reacción tierna: el animalito te guiña un ojo 😉 y un guiño al engranaje.
          winkAt(card);
          flashParents();
          return;
        }
        openCategory(cat.id);
      });
      grid.appendChild(card);
    });
  }

  // Guiño tierno sobre una tarjeta bloqueada 😉 (sin sonido, suave y breve).
  function winkAt(card) {
    const w = document.createElement("span");
    w.className = "wink";
    w.textContent = "😉";
    card.appendChild(w);
    w.addEventListener("animationend", () => w.remove());
  }

  // Pequeña pista visual: parpadea suavemente el botón de adultos
  function flashParents() {
    const b = $("#btn-parents");
    b.animate(
      [{ transform: "scale(1)" }, { transform: "scale(1.25)" }, { transform: "scale(1)" }],
      { duration: 700, easing: "ease-in-out" }
    );
  }

  // ============ PANTALLA: CATEGORÍA ============
  function openCategory(catId) {
    view = { screen: "category", categoryId: catId, animalId: null, videoIndex: 0 };
    const cat = findCategory(catId);
    $("#category-title").textContent = cat.name[state.uiLang];
    const grid = $("#animal-grid");
    grid.innerHTML = "";
    cat.animals.forEach((animal, i) => {
      const locked = animalLocked(i);
      const card = document.createElement("button");
      card.className = "card animal-card" + (locked ? " locked" : "");
      card.innerHTML = `
        <img src="${animal.image}" alt="${animal.name[state.uiLang]}" loading="lazy" />
        <span class="name-tag">${animal.name[state.uiLang]}</span>
        ${locked ? `<span class="lock-overlay">🔒</span>` : ""}
      `;
      card.addEventListener("click", () => {
        if (locked) {
          flashParents();
          return;
        }
        openAnimal(catId, animal.id);
      });
      grid.appendChild(card);
    });
    updateDownloadBtn(catId);
    showScreen("category");
  }

  // ---------- Descargas offline (F3): cachea los medios del grupo ----------
  function groupMediaUrls(cat) {
    const urls = [];
    cat.animals.forEach((a) => {
      if (a.image) urls.push(a.image);
      if (a.sound) urls.push(a.sound.src);
      a.videos.forEach((v) => urls.push(v.src));
    });
    return urls;
  }
  function updateDownloadBtn(catId) {
    const btn = $("#btn-download");
    if (!("caches" in window)) {
      btn.style.display = "none";
      return;
    }
    btn.style.display = "";
    btn.disabled = false;
    if (state.downloaded.includes(catId)) {
      btn.classList.add("sound");
      btn.textContent = t("downloaded");
    } else {
      btn.classList.remove("sound");
      btn.textContent = t("download");
    }
  }
  async function downloadGroup(catId) {
    const cat = findCategory(catId);
    if (!cat || !("caches" in window) || state.downloaded.includes(catId)) return;
    const btn = $("#btn-download");
    btn.disabled = true;
    btn.textContent = t("downloading");
    try {
      const cache = await caches.open(MEDIA_CACHE);
      const urls = groupMediaUrls(cat);
      // Wikimedia permite CORS; cacheamos solo respuestas correctas (no 429/errores).
      await Promise.allSettled(
        urls.map((u) => fetch(u).then((r) => (r.ok ? cache.put(u, r.clone()) : null)))
      );
      if (!state.downloaded.includes(catId)) state.downloaded.push(catId);
      saveState();
      showToast(t("downloadDone"));
    } catch (e) {
      /* sin conexión o error: el botón vuelve a su estado */
    }
    updateDownloadBtn(catId);
  }

  // ============ PANTALLA: DETALLE DEL ANIMAL ============
  const player = () => $("#player");

  function openAnimal(catId, animalId, origin) {
    const animal = findAnimal(catId, animalId);
    view = { screen: "animal", categoryId: catId, animalId, videoIndex: 0, origin: origin || "category" };

    // Tinte temático suave según el grupo (sabana, océano, bosque…).
    $("#screen-animal").style.setProperty("--theme", CATEGORY_COLOR[catId] || "#7fb069");

    $("#animal-topname").textContent = "";
    $("#animal-name").textContent = animal.name[state.knowledgeLang];

    renderSoundButtons(animal);

    setupVideoDots(animal);
    loadVideo(animal, 0);
    renderFact(animal);
    updateFavButton();
    showScreen("animal");
  }

  function currentAnimal() {
    return findAnimal(view.categoryId, view.animalId);
  }

  function setupVideoDots(animal) {
    const wrap = $("#video-dots");
    wrap.innerHTML = "";
    if (animal.videos.length <= 1) return; // un solo video: no mostramos selector
    animal.videos.forEach((v, i) => {
      const locked = videoLocked(i);
      const dot = document.createElement("button");
      dot.className = "video-dot" + (i === view.videoIndex ? " active" : "") + (locked ? " locked" : "");
      dot.textContent = locked ? "🔒" : i + 1;
      dot.addEventListener("click", () => {
        if (locked) {
          setNote(t("moreVideosInPlan"));
          flashParents();
          return;
        }
        loadVideo(animal, i);
        refreshDots();
      });
      wrap.appendChild(dot);
    });
  }
  function refreshDots() {
    $all("#video-dots .video-dot").forEach((dot, i) => {
      dot.classList.toggle("active", i === view.videoIndex);
    });
  }

  function loadVideo(animal, index) {
    view.videoIndex = index;
    const v = animal.videos[index];
    const pl = player();
    pl.poster = animal.image;
    pl.src = v.src;
    pl.load();
    // Respaldo: si la versión liviana (transcode) falla, usamos el original
    pl.onerror = () => {
      if (pl.src !== v.fallback) {
        pl.src = v.fallback;
        pl.load();
      }
    };
    showBigPlay(true);
    setPlayLabel(false);
    setNote("");
    pl.muted = true; // el video siempre silencioso (el sonido va por separado)
  }

  // ---------- Reproductor: play / pausa / repetir ----------
  function showBigPlay(show) {
    $("#big-play").classList.toggle("hidden", !show);
  }
  function setPlayLabel(playing) {
    const btn = $("#btn-playpause");
    btn.firstChild.textContent = playing ? "⏸️ " : "▶️ ";
    btn.querySelector("span").textContent = playing ? t("pause") : t("play");
  }

  function play() {
    // El video va SIEMPRE silencioso; el sonido del animal se reproduce aparte,
    // con los botones de sonido (independiente del video).
    player().play();
  }
  function togglePlay() {
    const pl = player();
    if (pl.paused) play();
    else pl.pause();
  }

  // repetición sujeta al límite del plan
  function replayKey() {
    return `${view.animalId}:${view.videoIndex}`;
  }
  function replaysLeft() {
    const p = plan();
    if (p.maxReplays === null) return Infinity;
    const used = state.replays.used[replayKey()] || 0;
    return Math.max(0, p.maxReplays - used);
  }
  function doReplay() {
    const p = plan();
    if (p.maxReplays !== null) {
      if (replaysLeft() <= 0) {
        setNote(t("noReplays"));
        return;
      }
      state.replays.used[replayKey()] = (state.replays.used[replayKey()] || 0) + 1;
      saveState();
    }
    const pl = player();
    pl.currentTime = 0;
    play();
    updateReplayNote();
  }
  function updateReplayNote() {
    const left = replaysLeft();
    if (left === Infinity) setNote("");
    else setNote(I18N[state.uiLang].replaysLeft(left));
  }
  function setNote(text) {
    $("#player-note").textContent = text || "";
  }

  // ---------- Sonidos del animal (clips separados, varios por animal) ----------
  let soundAudio = null;
  // Lista de sonidos del animal: soporta `sounds: [...]` o el viejo `sound: {...}`.
  function getSounds(animal) {
    if (animal && Array.isArray(animal.sounds)) return animal.sounds;
    if (animal && animal.sound) return [{ name: { es: "Sonido", en: "Sound" }, src: animal.sound.src }];
    return [];
  }
  // Dibuja un botón por cada sonido del animal (se tocan aparte del video).
  function renderSoundButtons(animal) {
    const wrap = $("#sound-buttons");
    wrap.innerHTML = "";
    getSounds(animal).forEach((s) => {
      const b = document.createElement("button");
      b.className = "pill-btn sound";
      const label = (s.name && (s.name[state.uiLang] || s.name.es)) || t("sound");
      b.innerHTML = `🔊 ${label}`;
      b.addEventListener("click", () => playSrc(s.src));
      wrap.appendChild(b);
    });
  }
  function playSrc(src) {
    stopSound();
    soundAudio = new Audio(src);
    soundAudio.play().catch(() => {});
  }
  function stopSound() {
    if (soundAudio) {
      soundAudio.pause();
      soundAudio = null;
    }
  }

  // ---------- Texto de conocimiento + bandera ----------
  function renderFact(animal) {
    $("#fact-text").textContent = animal.facts[state.knowledgeLang];
    $("#animal-name").textContent = animal.name[state.knowledgeLang];

    const toggle = $("#flag-toggle");
    const canToggle = plan().languageToggle;
    toggle.style.display = canToggle ? "" : "none";
    toggle.innerHTML = `${FLAGS[state.knowledgeLang]} <span class="small">${LANG_NAME[state.knowledgeLang]}</span>`;

    // Fuente del dato (Pacto §4). Marca "por verificar" si aún no está validado.
    const src = (typeof ANIMAL_SOURCES !== "undefined" && ANIMAL_SOURCES[animal.id]) || null;
    const link = $("#fact-source");
    if (src && src.source) {
      link.href = src.source;
      link.textContent = "ⓘ " + t("source") + (src.verified ? "" : " · " + t("unverified"));
      link.style.display = "";
    } else {
      link.style.display = "none";
    }
  }
  function toggleKnowledgeLang() {
    if (!plan().languageToggle) return;
    state.knowledgeLang = state.knowledgeLang === "es" ? "en" : "es";
    saveState();
    const animal = currentAnimal();
    if (animal) renderFact(animal);
  }

  // ============ Navegación entre pantallas ============
  function showScreen(name) {
    if (name !== "animal") {
      player().pause();
      stopSound();
    }
    view.screen = name;
    $all(".screen").forEach((s) => s.classList.remove("active"));
    $("#screen-" + name).classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // ============ PANTALLA: FAVORITOS ============
  function renderFavorites() {
    const grid = $("#favorites-grid");
    grid.innerHTML = "";
    $("#fav-empty").style.display = state.favorites.length ? "none" : "";
    state.favorites.forEach((id) => {
      const found = findAnimalById(id);
      if (!found) return;
      const { catId, animal } = found;
      const card = document.createElement("button");
      card.className = "card animal-card";
      card.innerHTML = `
        <img src="${animal.image}" alt="${animal.name[state.uiLang]}" loading="lazy" />
        <span class="name-tag">${animal.name[state.uiLang]}</span>
      `;
      card.addEventListener("click", () => openAnimal(catId, animal.id, "favorites"));
      grid.appendChild(card);
    });
  }

  // ============ PANTALLA: CRÉDITOS ============
  function renderCredits() {
    const list = $("#credits-list");
    if (list.children.length) return; // se construye una sola vez
    if (typeof ATTRIBUTIONS === "undefined") return;
    ATTRIBUTIONS.forEach((a) => {
      const row = document.createElement("a");
      row.className = "credit-row";
      row.href = a.source;
      row.target = "_blank";
      row.rel = "noopener";
      row.innerHTML = `
        <span class="credit-file">${a.file}</span>
        <span class="credit-meta">${a.author} · ${a.license}</span>
      `;
      list.appendChild(row);
    });
  }

  // ============ PANTALLA: PAYWALL (suscripción simulada) ============
  function renderPaywall() {
    const ben = $("#paywall-benefits");
    ben.innerHTML = "";
    ["paywallB1", "paywallB2", "paywallB3", "paywallB4"].forEach((k) => {
      const li = document.createElement("li");
      li.textContent = "✓ " + t(k);
      ben.appendChild(li);
    });
    const wrap = $("#paywall-plans");
    wrap.innerHTML = "";
    ["monthly", "annual", "lifetime"].forEach((pid) => {
      const p = PLANS[pid];
      const card = document.createElement("button");
      card.className = "paywall-plan" + (pid === "annual" ? " featured" : "");
      card.innerHTML = `
        <span class="pbadge">${p.badge}</span>
        <span class="pinfo">
          <span class="pname">${p.name[state.uiLang]}</span><br/>
          <span class="pdesc">${p.desc[state.uiLang]}</span>
        </span>
        <span class="pprice">${p.price[state.uiLang]}</span>
        <span class="choose">${t("choose")}</span>
      `;
      card.addEventListener("click", () => choosePlan(pid));
      wrap.appendChild(card);
    });
  }
  // Compra simulada: aplica el plan y vuelve al inicio con una confirmación tierna.
  function choosePlan(pid) {
    state.planId = pid;
    saveState();
    showToast(t("purchased"));
    renderHome();
    showScreen("home");
  }
  // Aviso breve y suave (toast).
  function showToast(msg) {
    const el = document.createElement("div");
    el.className = "toast";
    el.textContent = msg;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 2400);
  }

  // ============ Control parental + ajustes ============
  let gateAnswer = 0;
  function openParentGate() {
    const a = 2 + Math.floor(Math.random() * 7);
    const b = 1 + Math.floor(Math.random() * 5);
    gateAnswer = a + b;
    $("#gate-question").textContent = `${a} + ${b} = ?`;
    $("#gate-input").value = "";
    $("#gate-error").textContent = "";
    $("#gate-view").style.display = "";
    $("#settings-view").style.display = "none";
    $("#modal").classList.add("active");
    setTimeout(() => $("#gate-input").focus(), 100);
  }
  function checkGate() {
    if (parseInt($("#gate-input").value, 10) === gateAnswer) {
      openSettings();
    } else {
      $("#gate-error").textContent = t("parentGateError");
      $("#gate-input").value = "";
    }
  }
  function openSettings() {
    $("#gate-view").style.display = "none";
    $("#settings-view").style.display = "";
    renderSettings();
  }
  function closeModal() {
    $("#modal").classList.remove("active");
  }

  function renderSettings() {
    // Idioma de la app
    $all(".lang-row .choice").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.lang === state.uiLang);
    });
    // Planes
    const list = $("#plan-list");
    list.innerHTML = "";
    PLAN_ORDER.forEach((pid) => {
      const p = PLANS[pid];
      const opt = document.createElement("button");
      opt.className = "plan-option" + (pid === state.planId ? " active" : "");
      opt.innerHTML = `
        <span class="pbadge">${p.badge}</span>
        <span class="pinfo">
          <span class="pname">${p.name[state.uiLang]}</span><br/>
          <span class="pdesc">${p.desc[state.uiLang]}</span>
        </span>
        <span class="pprice">${p.price ? p.price[state.uiLang] : ""}</span>
        <span class="pcheck">✓</span>
      `;
      opt.addEventListener("click", () => {
        state.planId = pid;
        // si el plan no permite cambiar idioma de conocimiento, lo igualamos al de la app
        if (!PLANS[pid].languageToggle) state.knowledgeLang = state.uiLang;
        saveState();
        renderSettings();
      });
      list.appendChild(opt);
    });
  }

  function setUiLang(lang) {
    state.uiLang = lang;
    if (!plan().languageToggle) state.knowledgeLang = lang;
    saveState();
    applyStaticI18n();
    renderSettings();
    // Re-render de la pantalla activa
    renderHome();
    if (view.screen === "category" && view.categoryId) {
      const cat = findCategory(view.categoryId);
      $("#category-title").textContent = cat.name[state.uiLang];
      openCategory(view.categoryId);
      showScreen("category");
    }
    if (view.screen === "animal" && view.animalId) {
      const animal = currentAnimal();
      if (animal) renderFact(animal);
    }
  }

  // ============ Conexión de eventos ============
  function wire() {
    $("#btn-parents").addEventListener("click", openParentGate);
    $("#btn-back-home").addEventListener("click", () => showScreen("home"));
    $("#btn-back-cat").addEventListener("click", () => {
      showScreen(view.origin === "favorites" ? "favorites" : "category");
    });
    $("#btn-download").addEventListener("click", () => downloadGroup(view.categoryId));

    // Favoritos
    $("#btn-favorites").addEventListener("click", () => {
      renderFavorites();
      showScreen("favorites");
    });
    $("#btn-back-fav").addEventListener("click", () => showScreen("home"));
    $("#btn-fav-toggle").addEventListener("click", () => {
      toggleFav(view.animalId);
      updateFavButton();
    });

    // Créditos (desde la zona de adultos)
    $("#btn-credits").addEventListener("click", () => {
      closeModal();
      renderCredits();
      showScreen("credits");
    });
    $("#btn-back-credits").addEventListener("click", () => showScreen("home"));

    // Paywall (suscripción simulada, desde la zona de adultos)
    $("#btn-paywall").addEventListener("click", () => {
      closeModal();
      renderPaywall();
      showScreen("paywall");
    });
    $("#btn-back-paywall").addEventListener("click", () => showScreen("home"));
    $("#btn-paywall-later").addEventListener("click", () => showScreen("home"));

    // Reproductor
    $("#big-play").addEventListener("click", togglePlay);
    $("#btn-playpause").addEventListener("click", togglePlay);
    $("#btn-replay").addEventListener("click", doReplay);
    $("#flag-toggle").addEventListener("click", toggleKnowledgeLang);

    const pl = player();
    pl.addEventListener("play", () => {
      showBigPlay(false);
      setPlayLabel(true);
    });
    pl.addEventListener("pause", () => {
      showBigPlay(true);
      setPlayLabel(false);
    });
    pl.addEventListener("ended", () => {
      showBigPlay(true);
      setPlayLabel(false);
    });

    // Modal
    $("#gate-ok").addEventListener("click", checkGate);
    $("#gate-input").addEventListener("keydown", (e) => {
      if (e.key === "Enter") checkGate();
    });
    $("#gate-cancel").addEventListener("click", closeModal);
    $("#settings-close").addEventListener("click", closeModal);
    $("#modal").addEventListener("click", (e) => {
      if (e.target.id === "modal") closeModal();
    });
    $all(".lang-row .choice").forEach((btn) => {
      btn.addEventListener("click", () => setUiLang(btn.dataset.lang));
    });
  }

  // ============ Arranque ============
  function init() {
    applyStaticI18n();
    renderHome();
    wire();

    // Service worker (offline del "cascarón" de la app)
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("sw.js").catch(() => {});
    }
  }

  document.addEventListener("DOMContentLoaded", init);
})();
