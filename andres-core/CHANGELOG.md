# Changelog

Formato basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/).
Versionado: durante Fase 0–4 no se etiquetan releases. Tras Fase 5 se empieza
con SemVer.

---

## [Unreleased]

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

#### Notes

- Toda nueva tool del agente (cuando empecemos a crearlas en Fase 3) entra en
  `current_level = 'A'` por defecto. Sin excepciones.
- Supabase / agentes / lógica de permisos NO se tocan en esta fase.
