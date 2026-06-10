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

  // ---------- Estado ----------
  const today = () => new Date().toISOString().slice(0, 10);

  const defaultState = {
    uiLang: detectLang(),
    knowledgeLang: detectLang(),
    planId: "god", // el prototipo arranca en Modo Dios
    replays: { date: today(), used: {} },
  };

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
    showScreen("category");
  }

  // ============ PANTALLA: DETALLE DEL ANIMAL ============
  const player = () => $("#player");

  function openAnimal(catId, animalId) {
    const animal = findAnimal(catId, animalId);
    view = { screen: "animal", categoryId: catId, animalId, videoIndex: 0 };

    $("#animal-topname").textContent = "";
    $("#animal-name").textContent = animal.name[state.knowledgeLang];

    // Botón de sonido solo si hay clip dedicado
    $("#btn-sound").style.display = animal.sound ? "" : "none";

    setupVideoDots(animal);
    loadVideo(animal, 0);
    renderFact(animal);
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
  }

  // ---------- Reproductor: play / pause / repetir ----------
  function showBigPlay(show) {
    $("#big-play").classList.toggle("hidden", !show);
  }
  function setPlayLabel(playing) {
    const btn = $("#btn-playpause");
    btn.firstChild.textContent = playing ? "⏸️ " : "▶️ ";
    btn.querySelector("span").textContent = playing ? t("pause") : t("play");
  }

  function play() {
    stopSound();
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

  // ---------- Sonido característico (clip separado) ----------
  let soundAudio = null;
  function playSound() {
    const animal = currentAnimal();
    if (!animal || !animal.sound) return;
    player().pause();
    stopSound();
    soundAudio = new Audio(animal.sound.src);
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
      showScreen("category");
    });

    // Reproductor
    $("#big-play").addEventListener("click", togglePlay);
    $("#btn-playpause").addEventListener("click", togglePlay);
    $("#btn-replay").addEventListener("click", doReplay);
    $("#btn-sound").addEventListener("click", playSound);
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
