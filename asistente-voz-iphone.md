# "Zapia Manos" — asistente de voz que ejecuta y aprende en tu iPhone 16 Pro Max

> Versión **lista para usar**. Hablas → la IA decide la acción → tu iPhone la ejecuta.
> Y **aprende**: recuerda tus contactos, manías y preferencias entre usos.

---

## 0. Lo que recibes
Un atajo de **6 pasos**. La inteligencia está en la IA (Claude), no en el atajo, por eso es
corto pero "hace de todo":

- **Manos universales:** la IA responde con una **URL/esquema** y el atajo solo la abre.
  Eso cubre WhatsApp, llamadas, SMS, correo, mapas/ubicaciones, Spotify, abrir cualquier app
  y búsquedas en internet — sin programar una rama por cada cosa.
- **Acciones del sistema:** recordatorios, eventos de calendario y notas (3 ramas simples).
- **Aprende:** lee una nota llamada `Zapia Memoria` y la IA puede reescribirla para recordar.

> ⚠️ No puedo entregarte un `.shortcut` de "un toque": esos archivos van firmados y se arman
> dentro de la app Atajos. Pero abajo tienes **todo el texto para copiar y pegar**; armarlo
> toma ~5 minutos y queda permanente.

---

## 1. Antes de empezar (2 minutos)
1. **API key de Anthropic:** entra a https://console.anthropic.com → *API Keys* → crea una.
   Cópiala (empieza por `sk-ant-...`). Cuesta centavos al mes con uso normal.
2. **Crea la nota de memoria:** abre **Notas**, crea una nota cuyo **título/primera línea**
   sea exactamente `Zapia Memoria` y escribe debajo lo que quieras que sepa de ti, por ejemplo:
   ```
   Zapia Memoria
   Me llamo Andrés. Mi esposa es Carla (WhatsApp +569XXXXXXXX).
   Trabajo en la clínica de lunes a viernes. Prefiero respuestas cortas.
   ```
   (Si la dejas casi vacía, igual aprenderá sola con el uso.)

---

## 2. El cerebro: prompt del sistema (copiar tal cual)

Pega este texto en el campo `system` del cuerpo JSON (paso 3 del atajo):

```text
Eres "Zapia Manos", el cerebro de un asistente de voz en un iPhone. El usuario te habla en
español. Recibes su MEMORIA (lo que sabes de él) y su PETICION. Devuelves SOLO un objeto JSON
valido (sin markdown, sin texto extra) con esta forma:

{
  "respuesta": "frase corta para decir en voz",
  "accion": { ... } | null,
  "memoria": "texto COMPLETO actualizado de la memoria" | null
}

El campo "accion" puede ser uno de:
- {"tipo":"url","valor":"<URL o esquema a abrir>"}
- {"tipo":"recordatorio","texto":"...","fecha":"hoy 17:00"}
- {"tipo":"evento","titulo":"...","inicio":"manana 10:00"}
- {"tipo":"nota","texto":"..."}
- null  (cuando solo hay que responder o falta un dato)

Esquemas/URLs que puedes usar en "url":
- WhatsApp:  https://wa.me/<numero_sin_signos>?text=<mensaje_url_encoded>
- Llamar:    tel:<numero>
- SMS:       sms:<numero>&body=<texto>
- Correo:    mailto:<email>?subject=<asunto>&body=<cuerpo>
- Mapas:     https://maps.apple.com/?q=<lugar>
- Buscar:    https://www.google.com/search?q=<consulta>
- Spotify:   https://open.spotify.com/search/<consulta>
- Abrir app: usa su esquema (instagram://, music://, etc.) si lo conoces.

Reglas:
- No inventes numeros ni correos. Si no tienes el contacto en la MEMORIA, pon "accion":null
  y en "respuesta" pide el dato que falta.
- Si el usuario te da un dato nuevo y util (un contacto, una preferencia, su horario),
  devuelvelo en "memoria" reescribiendo el texto completo (memoria anterior + lo nuevo).
  Si no hay nada que aprender, "memoria":null.
- Codifica correctamente los textos dentro de las URLs (espacios y acentos).
- Sé breve en "respuesta".
```

---

## 3. Construir el atajo (paso a paso)

Abre **Atajos → +** y añade estas acciones EN ORDEN:

**Paso 1 — Pedir lo que dices**
- Acción **Dictar texto** (Dictate Text). → se guarda como variable; renómbrala `Voz`.

**Paso 2 — Leer la memoria**
- Usaremos un archivo de texto en iCloud Drive (permite sobrescritura limpia).
- Acción **Obtener archivo** (Get File) → ruta `ZapiaMemoria.txt` en *Atajos* (iCloud).
  Activa **"Si no se encuentra, no detener"** (o envuélvelo en un *Si* que tolere el vacío).
- Renombra el resultado `Memoria`. (La primera vez estará vacío y se irá llenando solo.)

**Paso 3 — Preguntar a la IA**
- Acción **Obtener contenido de URL** (Get Contents of URL):
  - **URL:** `https://api.anthropic.com/v1/messages`
  - **Método:** `POST`
  - **Encabezados:**
    - `x-api-key` = *TU_API_KEY*
    - `anthropic-version` = `2023-06-01`
    - `content-type` = `application/json`
  - **Cuerpo de la solicitud:** tipo **JSON**, con esta estructura (inserta las variables
    `Voz` y `Memoria` donde se indica):
    ```json
    {
      "model": "claude-haiku-4-5-20251001",
      "max_tokens": 500,
      "system": "<<PEGA AQUÍ EL PROMPT DE LA SECCIÓN 2>>",
      "messages": [
        {
          "role": "user",
          "content": "MEMORIA:\n[Variable: Memoria]\n\nPETICION:\n[Variable: Voz]"
        }
      ]
    }
    ```

**Paso 4 — Extraer la respuesta de la IA**
- **Obtener valor del diccionario** → clave `content`.
- **Obtener elemento de lista** → *Primer elemento*.
- **Obtener valor del diccionario** → clave `text`. (Esto es el JSON que armó la IA.)
- **Obtener diccionario de la entrada** (Get Dictionary from Input) para parsearlo.
  Renómbralo `Plan`.

**Paso 5 — Aprender (actualizar memoria si la IA lo pide)**
- **Obtener valor del diccionario** de `Plan` → clave `memoria`. → variable `MemNueva`.
- **Si** `MemNueva` *tiene algún valor*:
  - Acción **Guardar archivo** (Save File): contenido `MemNueva`, ruta
    `ZapiaMemoria.txt` en *Atajos* (iCloud), y **desactiva "Preguntar dónde guardar"** y
    **activa "Sobrescribir si existe"**. Así la memoria queda reemplazada por la versión
    completa y actualizada que devolvió la IA (sin duplicar).

**Paso 6 — Ejecutar la acción y responder**
- **Obtener valor del diccionario** de `Plan` → clave `respuesta`. → **Hablar texto**.
- **Obtener valor del diccionario** de `Plan` → clave `accion`. → variable `Accion`.
- **Obtener valor del diccionario** de `Accion` → clave `tipo`. → variable `Tipo`.
- **Si** `Tipo` = `url`: obtén `valor` → **Abrir URLs**.
- **Si no, si** `Tipo` = `recordatorio`: obtén `texto` y `fecha` → **Crear recordatorio**.
- **Si no, si** `Tipo` = `evento`: obtén `titulo` e `inicio` → **Añadir evento de calendario**.
- **Si no, si** `Tipo` = `nota`: obtén `texto` → **Crear nota**.
- (Si `accion` es null, no hace nada más: ya respondió por voz.)

Por último: **renombra el atajo** `Zapia Manos`.

---

## 4. Usarlo
- Por voz: **"Oye Siri, Zapia Manos"** → habla normal:
  *"mándale un WhatsApp a Carla que llego en 10"* → se abre WhatsApp con el mensaje listo.
- Un toque: añádelo al **Botón de Acción** del iPhone 16 Pro Max
  (*Ajustes → Botón de Acción → Atajo → Zapia Manos*) o a la pantalla de inicio.

**Ejemplos que ya entiende:**
| Le dices | Hace |
|---|---|
| "llama a Carla" | abre `tel:` con su número de la memoria |
| "recuérdame tomar el remedio a las 9" | crea recordatorio |
| "agenda control con paciente mañana 11" | crea evento |
| "busca dosis de magnesio glicinato" | abre la búsqueda |
| "pon música de Bad Bunny" | abre Spotify en esa búsqueda |
| "mi secretaria es Pamela, +569..." | lo **aprende** en la memoria |

---

## 5. Seguridad
- La API key vive **solo dentro del atajo**, en tu teléfono. No la subas a ningún repo.
- En cada uso, tu **memoria + petición** viajan a la API de Anthropic para interpretarse.
  No guardes en la memoria datos que no quieras procesar en la nube.

---

## 6. Límites honestos
- No es control total del iPhone: hace lo que **Atajos** y los **esquemas de URL** permiten
  (que es muchísimo), pero no puede tocar botones dentro de apps de terceros arbitrarias.
- No interactúa con la app Zapia; es tu asistente propio y equivalente.
- La primera vez, algunas acciones (mandar, abrir) pueden pedir confirmación: es iOS
  protegiéndote. Puedes ajustarlo en los ajustes del atajo.

---

## 7. ¿Quieres que lo amplíe?
Pídeme y agrego ramas: enviar **correo con Gmail**, **Uber**, **HomeKit** (luces/escenas),
respuestas más largas, o un modo "conversación" que encadene varias acciones seguidas.
