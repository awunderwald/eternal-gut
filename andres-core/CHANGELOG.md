# Changelog

Formato basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/).
Versionado: durante Fase 0–4 no se etiquetan releases. Tras Fase 5 se empieza
con SemVer.

---

## [Unreleased]

### Naming — proyecto renombrado a "Dante" (15 mayo 2026)

- **Nombre del proyecto:** `Andrés Core` → **`Dante`**.
- **Voz canónica del agente:** **`Dantev1`** (versionable: futuras voces
  serán Dantev2, Dantev3, ...).
- ADR 0002 (`docs/decisiones/0002-naming-dante.md`) registra la decisión.
- `PROYECTO.md` y `README.md` actualizados.
- Directorio `andres-core/` **NO renombrado todavía** — esperar a Fase 0
  cerrada para evitar romper el `git pull` y el `.env` del usuario.

### Fase 0 — Setup ambiente (12 mayo 2026)

#### Added

- `PROYECTO.md` v2.0 — documento maestro del proyecto.
- Estructura de carpetas `src/{agents,memory,rag,tools,llm,permissions}`,
  `tests/`, `docs/decisiones/`, `scripts/`.
- `requirements.txt` con dependencias base: anthropic, openai, python-dotenv,
  supabase, fastapi, uvicorn, pydantic, cryptography, redis, rq, httpx,
  tenacity, structlog.
- `.env.example` con TODAS las variables previstas (Anthropic, OpenAI,
  Supabase, cifrado, Redis, FastAPI, Telegram, WABA, Plaud/Zapier, Google,
  Notion, Twilio/Vapi, ElevenLabs, Browserbase, Langfuse).
- `.gitignore` estricto (excluye `.env`, `venv/`, transcripciones crudas,
  audio, credenciales).
- `README.md` con instrucciones de setup local paso a paso.
- `src/hola_claude.py` — smoke test que llama a Claude Haiku 4.5.
- `src/health_check.py` — verifica Python ≥ 3.11, venv activado, variables
  críticas presentes, conexión Anthropic funcional.
- `docs/decisiones/0001-stack-inicial.md` — ADR que fija el stack
  (Python + Anthropic SDK directo + Supabase + Redis + FastAPI).

- `scripts/set_api_key.py` — lee API key desde `pbpaste` (portapapeles macOS),
  valida prefijo `sk-ant-api03-`, y escribe a `.env` sin exponer la key en
  pantalla. Workaround para evitar problemas de escape de shell con `!r`
  en zsh (que dispara history expansion).

#### Estado de Fase 0 al cierre de sesión web (12 mayo 2026)

Completado en el Mac del usuario (`~/Projects/andres-core/`):

- [x] Homebrew + Python 3.12 instalados.
- [x] venv creado y activado.
- [x] Dependencias instaladas via `pip install -r requirements.txt`.
- [x] `.env` creado con `ANTHROPIC_API_KEY` (formato `sk-ant-api03-...`,
      108 caracteres).
- [x] `health_check.py` pasa los 3 primeros checks: Python, venv, env vars.

**Pendiente / bloqueado:**

- [ ] Check #4 de `health_check.py` (conexión Anthropic) falla con
      `AuthenticationError 401: Invalid authentication credentials`.
      Diagnóstico provisorio: la key actual fue revocada o pertenece a un
      workspace sin acceso API. Usuario reporta tener crédito API activo.
      Resolver en sesión de Claude Code local.
- [ ] `hola_claude.py` ejecutado con éxito.
- [ ] Commit inicial del proyecto en repo propio.

#### Incidentes de seguridad (sesión 12 mayo 2026)

Durante el setup, **3 API keys de Anthropic** fueron expuestas en el chat
de la sesión web (que es un canal logueado y no privado). Acciones:

1. Usuario debe verificar en https://console.anthropic.com/settings/keys
   que **todas** las keys creadas el 12 mayo 2026 están eliminadas/
   revocadas, salvo a lo más una activa.
2. Pacto duro a futuro: **ninguna key se pega jamás en chat**. El flujo
   canónico es `python scripts/set_api_key.py`, que lee desde portapapeles.
3. `PROYECTO.md` actualizado con regla explícita en §13 Convenciones.

#### Handoff a Claude Code local

La sesión web alcanzó sus límites prácticos (cada acción requería
copy-paste manual entre dos sistemas). Continuación del trabajo se
transfiere a Claude Code local (`~/.local/bin/claude`), que tiene
acceso directo a los archivos del Mac y puede:

- Diagnosticar y resolver el fallo de autenticación con Anthropic.
- Leer la key del portapapeles via `pbpaste` sin exponerla.
- Correr scripts y commitear directamente.

#### Notes

- Toda nueva tool del agente (cuando empecemos a crearlas en Fase 3) entra en
  `current_level = 'A'` por defecto. Sin excepciones.
- Supabase / agentes / lógica de permisos NO se tocan en esta fase.
