# ADR 0001 — Stack inicial

- **Estado:** Aceptado
- **Fecha:** 2026-05-12
- **Decididor:** Dr. Andrés Wunderwald
- **Fase:** 0

## Contexto

Necesitamos congelar el stack base para Fase 0 antes de instalar dependencias,
de forma que las fases siguientes (1 a 9) tengan un piso estable y cualquier
cambio sea una decisión consciente registrada en otro ADR.

## Decisión

| Capa | Tecnología elegida |
|---|---|
| Lenguaje | Python 3.11+ |
| LLM principal | Claude Sonnet 4.6 (`claude-sonnet-4-6`) |
| LLM rápido | Claude Haiku 4.5 (`claude-haiku-4-5`) |
| LLM auxiliar barato | OpenAI GPT-4o-mini |
| Embeddings | OpenAI `text-embedding-3-small` |
| Framework agéntico | Anthropic SDK directo + tool use nativo |
| Multi-agente | Clase `Agent` propia + state machine (sin LangGraph) |
| Backend HTTP | FastAPI + Uvicorn |
| Persistencia | Supabase (Postgres + pgvector) |
| Cifrado app-level | `cryptography` (Fernet/AES-256) |
| Cola async | Redis + RQ |
| Browser automation | Playwright (Fase 6) |
| Voice STT/TTS | Whisper + ElevenLabs (Fase 7+) |
| Telefonía | Twilio + Vapi (Fase 7+) |
| Hosting dev | macOS local |
| Hosting prod | VPS Hostinger |
| Observabilidad | structlog + Langfuse free tier |

## Justificación

- **Anthropic SDK directo** en vez de LangGraph / CrewAI / AutoGen:
  control total sobre tool use, sin overhead de abstracciones que después
  hay que pelear cuando aparecen casos no previstos. El proyecto necesita
  orquestación específica (silos compartimentados + permisos A/B/C) que no
  encaja bien con los flujos pre-armados de esos frameworks.
- **Supabase** ya está conectado y tiene pgvector. Postgres es estándar.
- **Cifrado app-level** sobre lo que ya da Supabase porque hay silos
  (`pacientes`, `legal`, `personal_intimo`) con obligación legal y ética
  de no depender exclusivamente del cifrado del proveedor.
- **Sonnet 4.6 + Haiku 4.5**: ya están en uso. Sonnet para razonamiento
  serio, Haiku para clasificación / extracción rutinaria (barato, rápido).

## Consecuencias

### Positivas

- Stack mínimo y conocido. Cada pieza es estándar de mercado.
- Sin lock-in agresivo: si mañana cambiamos de provider, los wrappers en
  `src/llm/` aíslan los SDK.

### Negativas / aceptadas

- Implementamos a mano cosas que LangGraph daría gratis (state machine de
  multi-agente, retry, tracing). Lo aceptamos porque control > velocidad
  inicial en este proyecto.
- Mantener cifrado app-level requiere disciplina: cada función que escribe
  en silos sensibles debe pasar por el wrapper de cifrado.

## Alternativas consideradas

- **LangGraph:** descartado. Overhead, opiniones fuertes sobre estructura de
  agentes que chocan con compartimentación por silos.
- **CrewAI:** descartado. Maduro pero la abstracción de "roles" no encaja
  con el modelo silo + meta-agente.
- **n8n como orquestador principal:** descartado. Lo seguimos usando para lo
  que ya funciona (WhatsApp Business / ManyChat existente), pero NO como
  cerebro del sistema. El cerebro va en Python.
