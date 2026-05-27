# Asistente de voz con "manos" en el iPhone 16 Pro Max

> Objetivo: hablarle a un asistente y que **ejecute acciones reales dentro del teléfono**
> (mandar WhatsApp, crear recordatorios/eventos, abrir apps, dictar notas, etc.).

---

## 1. Lo que se puede y lo que no (importante)

- **Zapia no se puede "controlar" desde fuera.** Es una app de terceros sin API pública ni
  sistema de extensiones que permita que otra app o un script la manejen. Tampoco se puede
  hacer que Zapia ejecute acciones en tu iPhone: iOS no se lo permite a ninguna app de terceros.
- **iOS es cerrado (sandbox).** A diferencia de Android, ninguna app puede tocar botones,
  navegar el sistema o manejar otras apps por ti. Sin jailbreak no existe el "control total".
- **Lo que SÍ existe, nativo y legal:** la app **Atajos (Shortcuts)** de Apple, que puede
  ejecutar cientos de acciones reales del teléfono y se dispara **por voz con Siri**.

**Conclusión:** no le damos manos a Zapia; construimos **tu propio asistente** con el mismo
resultado (hablas → el iPhone hace), pero con un cerebro que tú controlas. Lo llamaremos
**"Zapia Manos"** (el nombre del atajo lo eliges tú; con ese nombre lo invocas por voz).

---

## 2. Arquitectura

```
   Tu voz  ──►  Siri / Atajo "Zapia Manos"
                      │  (dicta lo que dices y lo manda como texto)
                      ▼
              Cerebro de IA (Claude API)
                      │  devuelve una acción en formato JSON
                      ▼
              El Atajo lee el JSON y ejecuta la acción nativa
              (WhatsApp, Recordatorio, Evento, Abrir app, Nota...)
```

Hay **dos variantes**. Empieza por la A si quieres algo en 10 minutos; pasa a la B cuando
quieras entender lenguaje natural libre.

- **Variante A — Sin IA (solo Atajos + Siri):** rápido, gratis, privado. Frases más rígidas.
- **Variante B — Con IA (Claude API):** entiende lenguaje natural libre y decide la acción.
  Requiere una API key de Anthropic (costo por uso muy bajo).

---

## 3. Variante A — Asistente por voz sin IA (10 minutos)

Esto usa Siri directamente. Muchas acciones ya funcionan sin construir nada:

| Le dices a Siri | Resultado |
|---|---|
| "Envía un WhatsApp a Juan diciendo voy en camino" | Manda el WhatsApp |
| "Recuérdame llamar a la clínica a las 5" | Crea recordatorio |
| "Agenda reunión mañana a las 10" | Crea evento de calendario |
| "Pon un temporizador de 15 minutos" | Inicia temporizador |
| "Abre Instagram" | Abre la app |

Para frases personalizadas o flujos de varios pasos, crea un **Atajo**:

1. Abre la app **Atajos** → toca **+** (nuevo atajo).
2. Añade acciones (busca por nombre en el buscador inferior). Ejemplos útiles:
   - **Enviar mensaje** (WhatsApp/Mensajes), **Crear recordatorio**, **Añadir evento de
     calendario**, **Abrir app**, **Crear nota**, **Reproducir música**, **Controlar Casa**.
3. Ponle nombre al atajo, por ejemplo **"Manda recado"**.
4. Lo invocas diciendo: **"Oye Siri, Manda recado"**.

> El nombre del atajo es la frase de invocación. Elige nombres cortos y claros.

---

## 4. Variante B — Asistente con cerebro de IA (Claude)

Aquí está la magia: **hablas en lenguaje natural** y la IA decide qué acción ejecutar.

### 4.1. Requisitos
- iPhone con la app **Atajos** (viene instalada).
- Una **API key de Anthropic**: crea cuenta en https://console.anthropic.com → *API Keys*.
  Guárdala; la pegarás en el atajo. (El uso típico cuesta centavos al mes.)

### 4.2. El "cerebro": prompt del sistema

La IA recibe lo que dijiste y debe responder **solo** con un JSON de acción. Usa este prompt:

```text
Eres el cerebro de un asistente de voz en un iPhone. El usuario te habla en español.
Tu trabajo es convertir lo que dice en UNA acción ejecutable. Responde EXCLUSIVAMENTE
con un objeto JSON válido, sin texto adicional, sin explicaciones, sin markdown.

Acciones disponibles (campo "accion"):
- "whatsapp"     -> campos: "contacto" (string), "mensaje" (string)
- "recordatorio" -> campos: "texto" (string), "fecha" (string natural, ej "hoy 17:00")
- "evento"       -> campos: "titulo" (string), "inicio" (string natural)
- "abrir_app"    -> campos: "app" (string, nombre de la app)
- "nota"         -> campos: "texto" (string)
- "buscar"       -> campos: "consulta" (string)   // buscar en internet
- "decir"        -> campos: "texto" (string)      // solo responder en voz, sin acción
- "desconocido"  -> campos: "texto" (string)      // no entendiste; pide aclaración

Reglas:
- Si falta un dato esencial (ej. el contacto), usa "decir" pidiendo el dato que falta.
- No inventes números de teléfono ni contactos.
- Devuelve solo el JSON. Ejemplo:
{"accion":"whatsapp","contacto":"María","mensaje":"Llego en 10 minutos"}
```

### 4.3. Construir el atajo (paso a paso)

Abre **Atajos → +** y añade estas acciones en orden:

1. **Dictar texto** (Dictate Text). → Guarda en variable `Voz`.
   *(Opcional: en su lugar usa "Texto del atajo" si lo invocas por Siri y ya te escucha.)*
2. **Obtener contenido de URL** (Get Contents of URL). Configúralo así:
   - **URL:** `https://api.anthropic.com/v1/messages`
   - **Método:** `POST`
   - **Cabeceras (Headers):**
     - `x-api-key` = *TU_API_KEY*
     - `anthropic-version` = `2023-06-01`
     - `content-type` = `application/json`
   - **Cuerpo de la solicitud:** `JSON`, con esta estructura:
     ```json
     {
       "model": "claude-haiku-4-5-20251001",
       "max_tokens": 300,
       "system": "<<PEGA AQUÍ EL PROMPT DEL SISTEMA DE 4.2>>",
       "messages": [
         { "role": "user", "content": "<<Variable: Voz>>" }
       ]
     }
     ```
     *(En el campo `content` inserta la variable `Voz`. El `model` Haiku es rápido y barato;
     si quieres más precisión usa `claude-sonnet-4-6`.)*
3. **Obtener valor del diccionario** (Get Dictionary Value):
   - Obtén la clave `content` → luego el primer ítem → su clave `text`.
   - Eso te da el JSON que devolvió la IA. Guárdalo en variable `Accion`.
4. **Obtener diccionario de entrada** (Get Dictionary from Input) sobre `Accion` para
   parsearlo como diccionario.
5. **Obtener valor del diccionario** → clave `accion`. Guárdalo en variable `Tipo`.
6. **Si (If)** según `Tipo`, crea una rama por cada acción:
   - `whatsapp` → **Enviar mensaje** usando claves `contacto` y `mensaje`.
   - `recordatorio` → **Crear recordatorio** con `texto` y `fecha`.
   - `evento` → **Añadir evento de calendario** con `titulo` e `inicio`.
   - `abrir_app` → **Abrir app** con `app`.
   - `nota` → **Crear nota** con `texto`.
   - `buscar` → **Buscar en la web** / **Mostrar página web** con `consulta`.
   - `decir` / `desconocido` → **Hablar texto** (Speak Text) con `texto`.
7. Nombra el atajo **"Zapia Manos"** (o el nombre que quieras invocar).

### 4.4. Cómo usarlo
Di: **"Oye Siri, Zapia Manos"** → habla normal:
*"mándale un WhatsApp a María que llego en diez minutos"* → se envía solo.

> Consejo: añade el atajo a la **pantalla de inicio** o al **botón de Acción** del iPhone 16
> Pro Max (Ajustes → Botón de Acción → Atajo) para lanzarlo con una pulsación.

---

## 5. Seguridad y privacidad
- Tu API key vive **solo dentro del atajo**, en tu teléfono. No la compartas ni la subas a
  ningún repositorio.
- Con la Variante A (sin IA) nada sale de tu teléfono.
- Con la Variante B, el **texto** de tu petición viaja a la API de Anthropic para interpretarlo.
  No envíes datos sensibles que no quieras procesar en la nube.

---

## 6. Limitaciones honestas
- No es "control total del teléfono": solo puede hacer lo que **Atajos** permite (que es mucho,
  pero no todo). No puede, por ejemplo, tocar botones dentro de apps de terceros arbitrarias.
- No interactúa con Zapia. Es tu propio asistente equivalente.
- Las acciones que mandan mensajes pueden pedir confirmación la primera vez (es Apple
  protegiéndote); puedes ajustar eso en los ajustes del atajo.

---

## 7. Próximos pasos sugeridos
- Empieza con la **Variante A** para validar el flujo de voz.
- Cuando funcione, súbete a la **Variante B** con Claude para lenguaje natural libre.
- Pídeme y te genero el **JSON exacto del cuerpo** ya con tu prompt incrustado, o más
  ramas de acciones (Uber, Spotify, HomeKit, enviar correo, etc.).
```
