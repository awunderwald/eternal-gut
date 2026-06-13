# CLAUDE.md — Proyecto "Animalitos" 🦁

> Este archivo es la fuente de verdad del proyecto. Léelo completo antes de
> trabajar. Define qué construimos, las decisiones ya cerradas, el cumplimiento
> legal, el stack, el esquema de contenido, el plan por fases y la forma de
> trabajo. Todo lo que se haga aquí se rige por este archivo.

---

## 1. Qué construimos

**Animalitos** es una app **suave y gentil** para que **niños menores de 5 años**
conozcan el reino animal. Cada animal tiene: una **foto realista grande**, uno o
más **videos** (con pausa y repetición), su **sonido característico**, su **nombre**
y un **dato** sencillo para que **mamá o papá se lo lean**.

- Diseñada para ser **gentil con el cerebro del niño**: ritmo calmo, colores
  pastel, transiciones lentas, sin parpadeos ni sonidos bruscos, botones grandes.
- **Bilingüe**: idioma de la app (ES/EN, autodetectado por región; por defecto
  español) **independiente** del idioma del texto de conocimiento (se cambia con
  una banderita 🇪🇸/🇺🇸).
- Monetización por **suscripción**: mensual, anual y de por vida. El prototipo
  incluye un **"Modo Dios"** que desbloquea todo y permite previsualizar cómo se
  ve cada plan (con y sin suscripción).

---

## 2. Pacto de Honestidad Radical

1. **Nunca inventes.** Si no sabes algo, dilo. Etiqueta afirmaciones delicadas
   como **[DATO REAL + fuente]** o **[NO SÉ]**. Para conclusiones razonadas usa
   **[INTERPRETACIÓN]**.
2. **No simules que algo funciona.** Si no lo probaste, dilo. Reporta fallos con
   su salida real.
3. **Levanta conflictos, no los resuelvas en silencio.** Si una decisión choca
   con una política o con este archivo, pregúntalo.
4. **Contenido educativo verificable.** Cada dato de un animal debe tender a
   tener **fuente** y marca de **verificado**. Lo no verificado se marca como tal.
5. **Prefiere preguntar a suponer.** Muchas preguntas valen más que un supuesto
   equivocado.

---

## 3. Decisiones cerradas (no reabrir sin aviso)

| # | Decisión | Detalle |
|---|----------|---------|
| D1 | **Sin cuenta** | La app **no** tiene login ni registro. No se recolectan datos personales del niño. Favoritos/listas se guardan **localmente** en el dispositivo. |
| D2 | **Público: niños** | Audiencia declarada = **niños** (incluye <5). Se cumple la Google Play Families Policy completa. |
| D3 | **Sin publicidad** | Cero anuncios de terceros. Monetización **solo por suscripción**. |
| D4 | **Suscripciones** | Mensual, anual y de por vida vía **Google Play Billing** (Android) y **StoreKit** (iOS), **detrás de control parental**. El prototipo simula los planes + "Modo Dios". |
| D5 | **Offline-first** | El contenido debe poder verse sin internet (descarga gestionada de medios). |
| D6 | **Multiplataforma con Capacitor** | Un solo código web → **Google Play + App Store**. Reusa el prototipo PWA. |
| D7 | **Medios libres** | Imágenes/videos/sonidos con licencia libre (Creative Commons, Wikimedia Commons). Pantalla de **atribuciones** obligatoria. |
| D8 | **Control parental** | Ajustes, planes y cualquier compra van detrás de una **pantalla de edad neutral** (ej. resolver una suma). |
| D9 | **Diseño gentil** | Pasteles cálidos, formas redondeadas, transiciones lentas, respeta `prefers-reduced-motion`. |

---

## 4. Cumplimiento (resumen operativo)

> Investigación con fuentes vigentes (corte ene-2026; reverificar antes de publicar).

- **No recolectar datos personales del niño** = camino más limpio. Como D1 es
  "sin cuenta", esto se cumple por diseño. [INTERPRETACIÓN]
- **No transmitir identificadores** desde niños/edad desconocida: AAID, SIM
  Serial, Build Serial, BSSID, MAC, SSID, IMEI, IMSI. [DATO REAL — [Play: Data practices](https://support.google.com/googleplay/android-developer/answer/11043825?hl=en)]
- **Sin SDKs no aptos para niños** salvo tras pantalla de edad neutral. [DATO REAL — [Play: Families Policies](https://support.google.com/googleplay/android-developer/answer/9893335?hl=en)]
- **Anuncios**: ninguno (D3). Si algún día hubiera, solo **Families Self-Certified
  Ads SDKs**. [DATO REAL — [Play: Target audience](https://support.google.com/googleplay/android-developer/answer/9867159?hl=en)]
- **Play Console**: declarar audiencia = niños en *App content → Target audience
  and content*; requiere antes declarar anuncios (no), instrucciones de acceso y
  **política de privacidad**. Completar cuestionario **IARC** y **Data safety**.
  [DATO REAL — [Play: Target audience](https://support.google.com/googleplay/android-developer/answer/9867159?hl=en)]
- **Coherencia de ficha**: gráficos infantiles + audiencia infantil deben ser
  consistentes para no arriesgar rechazo. [DATO REAL — Families Policies]
- **Marco legal**: **COPPA** (EE.UU., <13: consentimiento parental verificable si
  se recolectan datos — aquí no se recolectan) [DATO REAL — [FTC](https://www.ftc.gov/business-guidance/privacy-security/verifiable-parental-consent-childrens-online-privacy-rule)]; **GDPR-K** (UE, Art. 8:
  16, bajable a 13) [DATO REAL — [Clarip](https://www.clarip.com/data-privacy/gdpr-child-consent/)].
- **Compras**: Play Billing / StoreKit están atadas a la cuenta del SO del adulto,
  no a una cuenta de la app → compatible con "sin cuenta". Deben ir tras control
  parental. [INTERPRETACIÓN]

---

## 5. Stack y arquitectura

- **Frontend**: PWA en **HTML/CSS/JS vanilla** (sin framework). Ligero, rápido,
  fácil de mantener. Vive en `kids-animals/`.
- **Empaque nativo**: **Capacitor** (webDir = `kids-animals`). Genera proyectos
  Android (Gradle/Kotlin) e iOS (Xcode/Swift) que envuelven la web.
- **Catálogo de contenido**: `kids-animals/data.js` (ver §6). Editable sin tocar
  lógica.
- **Estado local**: `localStorage` (idioma, plan, favoritos, repeticiones). Sin
  servidor, sin cuenta.
- **Plugins nativos previstos**:
  - Suscripciones: plugin de **in-app purchases / RevenueCat** o Play Billing +
    StoreKit. [VERIFICAR plugin vigente al implementar]
  - **Descargas offline**: `@capacitor/filesystem` + gestión tipo WorkManager.
  - **Google Cast** a TV (Android) / AirPlay (iOS). [VERIFICAR plugin]
- **Sin Firebase / sin analytics que recolecten datos del niño.** Si se necesita
  métrica, usar **app set ID** y nunca AAID. [DATO REAL — Play: Data practices]

> ⚠️ **Este entorno de nube NO compila apps nativas** (no hay Android SDK/Xcode).
> El empaque y las pruebas en dispositivo se hacen en la **máquina local** del
> desarrollador. Ver `SETUP.md`.

---

## 6. Esquema del catálogo de contenido

En `data.js`, `ANIMAL_DATA.categories[]`:

```js
{
  id: "felinos",
  icon: "🐯",
  name: { es: "Felinos", en: "Big Cats" },
  premium: false,            // true = requiere suscripción (ej. dinosaurios)
  color: "#f3a13c",          // paleta/acento del grupo (tinte de la pantalla)
  animals: [ /* ... */ ]
}
```

Cada animal:

```js
{
  id: "leon",
  name: { es: "León", en: "Lion" },
  image: img("Lion waiting in Namibia.jpg"),   // foto realista (escalada)
  sound: { src: "..." } | null,                 // sonido característico (opcional)
  facts: { es: "…", en: "…" },                  // dato para que los papás lean
  // PENDIENTE (Pacto §4): fuente + verificación del dato
  // factSource: "https://…", verified: false,
  videos: [
    { title: { es: "…", en: "…" }, src: "<480p>", fallback: "<original>" }
  ]
}
```

- **Medios**: imágenes vía `Special:FilePath?width=1024`; videos vía transcode
  480p de Commons con `fallback` al original. Todo CC (ver créditos en README).
- **Offline**: en la fase de descargas, los medios se copian al `filesystem` y
  `data.js` apunta a rutas locales cuando estén disponibles.
- **TODO de honestidad**: agregar `factSource` y `verified` a cada dato; los datos
  actuales son redactados por el autor y **aún no están verificados con fuente**.

---

## 7. Plan por fases (ajustado: **sin** fase de cuenta)

Cada fase: objetivo · entregable verificable · criterio de "terminado".

- **F1 — Prototipo PWA ✅ HECHO**
  Navegación (grupos → animales → detalle), reproductor con pausa/repetir/
  selector de videos, sonidos, bilingüe (app + ficha), planes simulados con
  "Modo Dios", grupo premium "Dinosaurios" (T-Rex bloqueado con guiño), diseño
  gentil. *Terminado*: corre en navegador móvil; medios CC verificados.
- **F2 — Empaque Capacitor (Android primero)**
  Envolver la PWA, correr en emulador/dispositivo Android. *Terminado*: APK/AAB
  de debug instala y abre la app en un teléfono real.
- **F3 — Descargas offline**
  Descargar un grupo y reproducir **sin internet**. *Terminado*: en modo avión,
  un grupo descargado funciona completo.
- **F4 — Suscripciones**
  Play Billing/StoreKit (mensual/anual/lifetime) tras control parental + paywall
  de mínima fricción. *Terminado*: compra de prueba (sandbox) desbloquea premium.
- **F5 — Google Cast / AirPlay a TV**
  Enviar el video a la tele. *Terminado*: un video se reproduce en una TV real.
- **F6 — Pulido + tienda**
  Accesibilidad, pantalla de **atribuciones/créditos**, política de privacidad,
  IARC, Data safety, íconos/splash. *Terminado*: checklist de Play Console verde.
- **F7 — Publicación**
  Google Play (US$25 único) → luego App Store (US$99/año). *Terminado*: app en
  revisión / publicada.

---

## 8. Forma de trabajo

- **Rama de desarrollo**: `claude/animal-learning-app-lgis3p`. No empujar a otra
  rama sin permiso. PR en **borrador** hacia `main`.
- **No tocar** la landing page existente `index.html` (producto distinto: Eternal
  Gut). La app vive en `kids-animals/`.
- **Verificar antes de afirmar** que algo funciona (servir, probar URLs, etc.).
- **Commits** claros y descriptivos. Confirmar/empujar solo cuando se pida o sea
  el cierre natural de una tarea.
- **Antes de escribir código de una fase nueva grande**, presentar el enfoque y
  esperar aprobación (coherente con el Pacto).

---

## 9. Decisiones tomadas + propuestas por confirmar

Resueltas en sesión (jun-2026). Las marcadas [PROPUESTA] son valores por defecto
que puedes ajustar cuando quieras.

1. **`appId`**: `com.animalitos.kids` [PROPUESTA — cambiar si defines marca/dominio].
2. **Precios** (en `i18n.js → PLANS.price`) [PROPUESTA]:
   - Mensual **US$2,99/mes** · Anual **US$19,99/año** · De por vida **US$39,99**.
   - Prueba gratis: pendiente de definir (sugerido 7 días en el plan anual).
3. **Verificación de datos**: fuente por animal = **Wikipedia de la especie**
   (`sources.js`); todos los datos marcados **`verified: false`** hasta revisión
   humana. La ficha muestra el enlace de fuente con la marca "dato por verificar".
4. **MVP**: el catálogo actual (**8 grupos · 15 animales**) sirve como lanzamiento
   mínimo. Ampliar grupos/animales es incremental.
5. **Plataforma**: **Android primero** (Play, US$25 único) y **luego iPhone**
   (App Store, US$99/año). Capacitor mantiene ambos listos desde un solo código.
6. **Idiomas**: **ES/EN** al inicio. Sumar otro idioma = agregar la clave en
   `data.js`/`i18n.js`.
