# 🦁 Animalitos — prototipo

App **suave y gentil** para que niños menores de 5 años conozcan el reino animal.
Cada animal tiene una **foto grande y realista**, **videos** (con pausa y repetición),
su **sonido característico**, su **nombre** y un **dato** para que mamá y papá lo lean.

Es una **PWA** (aplicación web instalable): funciona en cualquier celular desde el
navegador, se puede "agregar a la pantalla de inicio" y no cuesta nada alojarla
(por ejemplo, GitHub Pages). Más adelante se puede empaquetar como app nativa
(Android/iOS) con Capacitor sin reescribir nada.

## ▶️ Cómo probarla

Necesita servirse por HTTP (no abriendo el archivo directo) por el service worker:

```bash
cd kids-animals
python3 -m http.server 8080
# Abre http://localhost:8080 en el celular o el navegador
```

> En un celular real: abre la URL y usa "Agregar a pantalla de inicio" para
> verla a pantalla completa, como una app.

## 🎛️ Qué incluye el prototipo

- **Pantallas:** Inicio (grupos) → Animales → Detalle del animal.
- **8 grupos:**
  - 🐯 **Felinos** (grupo estrella, 4 animales): 🦁 León, 🐯 Tigre, 🐆 Guepardo, 🐱 Gato.
  - 🐮 **Granja**: Vaca · 🐬 **Océano**: Delfín · 🐘 **Sabana**: Elefante ·
    🦜 **Aves**: Guacamayo · 🐻 **Bosque**: Oso · 🐒 **Selva**: Mono (un animal por grupo).
  - 🦖 **Dinosaurios** (grupo **premium**): el T-Rex se ve siempre, pero sin
    suscripción aparece con una cinta amable **"Bloqueado"** (letras blancas
    sobre rojo). Con Modo Dios / Anual / De por vida se desbloquea y se abre.
  Cada animal trae foto realista, video(s) y dato bilingüe; varios incluyen
  además su **sonido característico** (tigre, gato, vaca, elefante, oso, mono).
- **Reproductor gentil:** botón grande de play, **pausa**, **"ver de nuevo"** y
  selector de videos (1, 2, 3…). Sin reproducción automática ni sonidos bruscos.
- **Dos idiomas independientes:**
  - *Idioma de la app* (todo el texto de botones/títulos). Se detecta solo según
    el país/idioma del teléfono; por defecto **español**.
  - *Idioma del dato* (el conocimiento): se cambia con una **banderita** 🇪🇸/🇺🇸
    en la tarjeta del animal, sin cambiar el idioma de la app.
- **Modelo de suscripción (simulado):**
  - 👑 **Modo Dios** — todo desbloqueado, incluido el grupo premium (así arranca el prototipo).
  - 🆓 **Gratis** — 2 grupos, 2 animales, 1 video, 3 repeticiones/día, sin premium ni cambio de idioma del dato.
  - 📅 **Mensual** — todos los grupos no-premium, 2 videos por animal.
  - 🗓️ **Anual** y ♾️ **De por vida** — todo + grupos **premium** (dinosaurios).

  Se cambia de plan en la **zona de adultos** (engranaje ⚙️ → resolver una suma
  sencilla = control parental). Al cambiar de plan se ve **en vivo** cómo se
  bloquean/desbloquean grupos, animales, videos e idiomas — por ejemplo, el
  grupo Dinosaurios muestra cómo se vería **con** y **sin** suscripción.
- **Diseño para cerebros pequeños:** colores pastel cálidos, formas redondeadas,
  tipografía grande, transiciones lentas, botones grandes y sin parpadeos.

## 🧩 Cómo agregar o cambiar animales

Todo el contenido vive en **`data.js`**. Para sumar un animal, copia un bloque
existente y cambia:

- `name` (es/en), `image` (URL de la foto),
- `facts` (es/en) — el texto que leen los papás,
- `videos[]` — cada video con `src` (versión liviana 480p) y `fallback` (original),
- `sound` (opcional) — clip del sonido característico.

Para agregar un **grupo nuevo** (granja, océano, aves…), agrega una categoría en
`ANIMAL_DATA.categories`. Ya están de ejemplo "Animales de granja" y "Océano"
marcados como *premium / próximamente* para mostrar el modelo de negocio.

## 💸 Costo inicial = $0 (medios libres)

Todas las imágenes, videos y sonidos vienen de **Wikimedia Commons** con licencias
libres (Creative Commons / dominio público). Los videos usan la versión
**transcodificada a 480p** de Commons para que carguen rápido en datos móviles.

### Créditos de medios (Wikimedia Commons)

| Animal | Archivo |
|---|---|
| Foto León | `Lion waiting in Namibia.jpg` |
| Video León | `Lion (Panthera leo).webm`, `Lions (Panthera leo).webm` |
| Foto Tigre | `Siberian Tiger sf.jpg` |
| Video Tigre | `Walking Tiger in Zoo.webm`, `Sumatran tiger ... vocalising.webm`, `Malayan tiger ... in a zoo.webm` |
| Sonido Tigre | `439280 schots angry-tiger.wav` |
| Foto Guepardo | `Cheetah portrait Whipsnade Zoo.jpg` |
| Video Guepardo | `Rozi the cheetah running at the Cincinnati Zoo.webm`, `Cheetah, Madikwe.webm` |
| Foto Gato | `Cat03.jpg` |
| Video Gato | `Cat lapping water off ground in slow motion.gk.webm`, `Cat kneading and sucking blanket.webm` |
| Sonido Gato | `Meow.ogg` |
| Vaca | `Cow female black white.jpg`, `Cow crosses cattle grid.webm`, `Single Cow Moo.ogg` |
| Delfín | `010 Atlantic bottlenose dolphin jumping ... Giles Laurent.jpg`, `053 Pod of Spinner dolphins ... Giles Laurent.webm` |
| Elefante | `African elephant front view portrait.jpg`, `Bathing the elephant.webm`, `Elephant voice - trumpeting.ogg` |
| Guacamayo | `Scarlet macaw (Ara macao cyanopterus) Copan.jpg`, `Ara macao 01.ogv` |
| Oso | `Portrait of a Brown Bear - panoramio.jpg`, `Brown Bear (Ursus arctos).webm`, `Bear growl.ogg` |
| Mono | `Rhesus macaque Macaca mulatta DSC 0184.jpg`, `Baby monkey drinking water.webm`, `Dusky-leaf-monkey-call-kaeng-krachan.ogg` |
| T-Rex (premium) | `Tyrannosaurus Rex (Zhengzhou).jpg`, `Trex animatronic.webm` |

> Para producción conviene **descargar y alojar** los archivos (o usar un CDN
> propio) y mostrar la atribución de cada autor según su licencia, en lugar de
> enlazar directo a Commons.

## 🚀 Siguientes pasos (ver `CLAUDE.md` y `SETUP.md` en la raíz)

Decisiones cerradas: **sin cuenta** (cero datos personales del niño), **app para
niños**, **sin anuncios**, monetización **solo por suscripción** tras control
parental, **offline-first**, y empaque **multiplataforma con Capacitor**
(Google Play + App Store).

1. **F2** — Empaquetar con Capacitor y correr en un teléfono Android (`SETUP.md`).
2. **F3** — Descargas offline de medios (ver un grupo sin internet).
3. **F4** — Suscripciones (Play Billing / StoreKit) mensual/anual/lifetime, tras control parental.
4. **F5** — Google Cast / AirPlay a la TV.
5. **F6** — Pulido, pantalla de **atribuciones**, política de privacidad, IARC y Data safety para publicar.
