# ADR 0002 — Nombre del proyecto: Dante

- **Estado:** Aceptado
- **Fecha:** 2026-05-15
- **Decididor:** Dr. Andrés Wunderwald
- **Reemplaza:** Nombre provisorio "Andrés Core"

## Contexto

Hasta el 15 mayo 2026 el proyecto se llamó "Andrés Core" como nombre
provisorio. Estaba marcado como pendiente en §12 del PROYECTO.md.

Tras la sesión donde quedó decidido (a) que el sistema es una extensión
de Andrés-persona-completa y no Andrés-doctor, (b) que la personalidad
operativa es de tipo *Samantha* (Her, 2013) sin componente romántico,
y (c) que la voz es el canal principal — se requiere un nombre propio
que NO se confunda con el dueño y que tenga peso simbólico.

## Decisión

- **Nombre del proyecto:** **Dante**
- **Voz canónica del agente:** **Dantev1**
  (futuras voces, si se entrenan variantes: Dantev2, Dantev3, ...)

## Justificación [INFERENCIA del decididor]

- Nombre corto, memorable, pronunciable en español e inglés.
- Tiene peso literario (Dante Alighieri, *La Divina Comedia* — guía
  por mundos complejos), congruente con un agente que navega los
  mundos personales del usuario.
- No se confunde con "Andrés" — el agente tiene identidad propia,
  no es un clon del usuario.
- Versionar la voz como `Dantev1` permite iterar el modelo de voz
  sin renombrar el sistema entero.

## Consecuencias

### Cambios inmediatos (esta sesión)

- `PROYECTO.md`: título, §1 Visión, §11 Decisiones, §12 Pendientes
  (marcar como cerrado), §14 Glosario.
- `README.md`: título y header.
- Este ADR.

### Cambios diferidos

- **Renombrar el directorio** `andres-core/` → `dante/` queda pendiente.
  Hacerlo ahora rompe el `git pull` del usuario y obliga a mover
  manualmente su `.env` (que no está en git). Mejor hacerlo cuando
  Fase 0 esté cerrada y el usuario tenga un commit limpio.
- **Renombrar el repo** (si aplica) — pendiente.
- **Branding visible al usuario** (si en el futuro hay UI web/voz que
  diga "Hola, soy ..."): debe decir **"Dante"**, no "Andrés Core" ni
  "el agente".

## Alternativas consideradas

Sol, Iris, Vera, Nova, Maia (propuestas en sesión anterior). Descartadas
en favor de Dante por la combinación de peso simbólico + claridad de
identidad separada del usuario.
