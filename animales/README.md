# Reino Animal · Animal Kingdom 🦁

Prototipo de aplicación móvil para que niños **menores de 5 años** conozcan los animales,
diseñada para ser gentil con su cerebro: colores pastel suaves, transiciones lentas,
sin parpadeos ni sonidos estridentes, botones grandes.

Es una **aplicación web en un solo archivo** (`index.html`): se abre en el navegador del
celular sin instalar nada y sin costo de servidores ni de contenido.

## Cómo probarla

- Abre `animales/index.html` en el navegador del celular o del computador
  (si el repositorio usa GitHub Pages, queda en `https://<usuario>.github.io/<repo>/animales/`).
- No requiere compilación, servidores ni claves.

## Qué incluye

| Función | Detalle |
|---|---|
| 8 animales | Felinos (león, tigre, guepardo, gato), Safari (elefante, jirafa), Mar y hielo (delfín, pingüino) |
| Foto realista | Casi a pantalla completa; al tocarla suena el sonido característico (rugido, maullido…) |
| 2–3 videos por animal | Con pausa, repetir, y selector 1·2·3 para ir directo al favorito |
| Conocimiento para leer | Peso, tamaño y un dato curioso, pensado para que los papás se lo lean al niño |
| Idioma de la app | Español 🇨🇱 / Inglés 🇺🇸 |
| Idioma del texto de conocimiento | Independiente del idioma de la app (banderita chica junto al texto) |
| Zona de padres | Protegida con puerta parental (mantener presionado 3 segundos) |
| Suscripciones (simuladas) | Gratis, Mensual, Anual, De por vida y **⚡ Modo Dios** |
| Límites por plan | Menos animales, menos videos por animal y tope de reproducciones diarias |

## Modo Dios (estado actual del prototipo)

La app inicia en **Modo Dios**: todo desbloqueado. Desde la zona de padres (⚙️ →
mantener presionado) se puede cambiar a cualquier plan para *simular* sus limitaciones:

- **Gratis**: 2 animales · 1 video por animal · 3 reproducciones al día
- **Mensual**: todos los animales · 2 videos · 10 reproducciones al día
- **Anual**: todo · 3 videos · ilimitado
- **De por vida**: todo desbloqueado para siempre

Cuando se alcanza el límite diario aparece un mensaje gentil ("¡Hasta mañana,
explorador!") en vez de un bloqueo brusco. El conteo se guarda en el dispositivo
(localStorage) y se reinicia cada día.

## Costo cero en contenido

Todas las fotos, sonidos y videos provienen de **Wikimedia Commons** con licencias
libres (Creative Commons o dominio público). Los enlaces de atribución de cada
archivo están dentro de la app, en la zona de padres → "Créditos".

Los videos usan las versiones livianas (480p WebM) que genera Wikimedia, para que
carguen rápido en el celular.

## Limitaciones conocidas del prototipo

- **iPhone antiguos**: los formatos libres WebM/Ogg se reproducen bien en Android y
  en iOS modernos (Safari 17.4+); en iPhones más antiguos algunos videos o sonidos
  pueden no sonar. Para la versión comercial convendría re-codificar a MP4/AAC en un
  CDN propio.
- Los pagos son simulados (no hay pasarela de pago todavía).
- Requiere internet (los medios se cargan desde Wikimedia). Una versión siguiente
  podría descargarlos para uso sin conexión.

## Próximos pasos sugeridos

1. Probarla con niños y ajustar tamaños/sonidos según su reacción.
2. Agregar más animales (la estructura de datos lo hace trivial: un bloque por animal).
3. Narración por voz del dato curioso (texto a voz) para cuando el papá no puede leer.
4. Pasarela de pagos real (Stripe/RevenueCat) y empaquetado como app de tienda
   (Capacitor) cuando el prototipo esté validado.
