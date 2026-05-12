# PROYECTO: "Andrés Core" — Sistema Operativo Personal con IA

> **Documento maestro v2.0.** Esta es la biblia del proyecto. Cualquier sesión de Claude Code debe leer este archivo PRIMERO antes de hacer cualquier cosa.
> **Mantenido por:** Dr. Andrés Wunderwald Yáñez
> **Última actualización:** 11 mayo 2026
> **Pacto activo:** Honestidad Radical (toda afirmación etiquetada [DATO REAL]/[INFERENCIA]/[CÁLCULO]/[NO SÉ])

---

## 1. Visión

Construir **"Andrés Core"**: un sistema operativo personal con IA que actúa como un *Andrés Wunderwald con esteroides*. Un agente que vive con él 24/7, ingiere todo lo que él dice/escribe/recibe a lo largo del día, entiende sus compromisos antes de que él los recuerde, y actúa proactivamente para ahorrarle tiempo —dentro de límites de autonomía que él controla quirúrgicamente.

**Fusiona en un solo cerebro:**
- Lo que hoy hace OpenClaw (intake de pacientes vía WhatsApp/ManyChat)
- Asistente clínico (literatura, dx diferencial, reviews PRISMA, informes)
- Asistente personal (transcripciones del día, recordatorios, agendamientos externos)
- Asistente administrativo (Santa Catalina, precios, post-venta)
- Asistente ejecutivo (mail, calendario, navegación web, llamadas)

**No es:** un chatbot, un workflow de n8n, ni un wrapper de Claude API. Es un **sistema con memoria persistente, compartimentos por contexto, capacidad de actuar autónomamente, y un protocolo de gobernanza de permisos.**

## 2. Principios de diseño (no negociables)

1. **Compartimentación por defecto.** Cada silo de contexto (pacientes, personal/familia, legal, negocios, admin) tiene memoria separada. Solo el meta-agente supervisor (invocado explícitamente por Andrés) puede cruzar silos.

2. **Autonomía gradual y reversible.** Cada acción del agente vive en uno de tres niveles: A (pregunta siempre), B (libre si reversible, pregunta si irreversible), C (libre total). El usuario puede promover/degradar permisos individualmente o en grupo, en cualquier momento. Sistema completamente reversible.

3. **Honestidad radical interna.** El agente etiqueta sus propias afirmaciones [DATO REAL]/[INFERENCIA]/[CÁLCULO]/[NO SÉ] cuando responde al usuario. Sin inventar fuentes, sin alucinar números.

4. **Trazabilidad total.** Cada acción del agente queda en un `action_log` con input, output, resultado, aprobación humana si la hubo, y timestamp. Auditable a perpetuidad.

5. **Cifrado de datos sensibles en reposo.** Memoria de pacientes, legal e íntimo cifrada con AES-256 a nivel aplicación, no solo Supabase default.

6. **Conservadurismo en producción.** Toda nueva tool entra en nivel A. Promoción solo manual. Errores degradan automáticamente.

## 3. Fuentes de ingesta

| Fuente | Volumen estimado | Método de captura | Estado |
|---|---|---|---|
| **Plaud AI** | ~16 hrs audio/día → transcripción + summary | Webhook Zapier (Fase 1) → OpenPlaud self-hosted (Fase 4) | Por integrar |
| **WhatsApp pacientes** | [NO SÉ] vol. actual | n8n + WhatsApp Business existente | Ya conectado |
| **Gmail** | [NO SÉ] vol. | MCP Gmail (ya disponible) + IMAP polling | Ya conectado |
| **Google Calendar** | Bajo | MCP Calendar (ya disponible) | Ya conectado |
| **Google Drive** | Variable | MCP Drive + webhook on change | Ya conectado |
| **Notion** | Variable | MCP Notion | Ya conectado |
| **Manual via app** | Variable | CLI / web UI / WhatsApp al agente directo | Por construir |

## 4. Compartimentos (silos) de memoria

| Silo | Contenido | Acceso por defecto |
|---|---|---|
| `pacientes` | Conversaciones clínicas, historias, fichas, fotos, dx | Agente Clínico + Triador |
| `personal_familia` | Rafaela, co-parenting, pareja, amistades | Agente Personal |
| `legal` | USACH, SSDR, Contraloría, abogados, SERNAC | Agente Legal/Admin |
| `negocios` | LuminaDerm, libros, Simbiosis Lab IA, INAPI | Agente Negocios |
| `admin_clinico` | Agenda Santa Catalina, precios, sobrecupos | Agente Admin |
| `personal_intimo` | Salud propia, finanzas personales, temas privados | Solo meta-agente con auth doble |
| `meta_supervisor` | Visión cruzada de todos los silos | Solo invocado explícitamente por Andrés |

## 5. Arquitectura técnica

```
┌─────────────────────────────────────────────────────────────────┐
│                       CAPA DE INGESTA                            │
│  Plaud  │  WhatsApp  │  Gmail  │  Calendar  │  Drive  │  Manual │
└────────────────────────┬────────────────────────────────────────┘
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                  CLASIFICADOR DE CONTEXTO                        │
│  Cada chunk → (silo, importancia, tipo, entidades, timestamp)   │
│  LLM: Claude Haiku 4.5  (barato, rápido, suficiente)             │
└────────────────────────┬────────────────────────────────────────┘
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                  ENRUTADOR A SILOS                               │
│  pacientes │ personal │ legal │ negocios │ admin │ íntimo       │
│  Cada silo: tabla propia + embeddings en pgvector aislado       │
└────────────────────────┬────────────────────────────────────────┘
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                  EXTRACTOR DE TAREAS                             │
│  Detecta en transcripciones: compromisos, recordatorios,        │
│  decisiones, info nueva sobre personas, todos                    │
│  → genera "candidatos a acción" en cola                         │
└────────────────────────┬────────────────────────────────────────┘
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                  ORQUESTADOR DE AGENTES                          │
│  Triador │ Clínico │ Personal │ Legal │ Negocios │ Admin        │
│  LLM: Claude Sonnet 4.6 (calidad) + Haiku para rutinas          │
└────────────────────────┬────────────────────────────────────────┘
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                  CAPA DE TOOLS (con permisos A/B/C)              │
│  comunicar │ agendar │ browser │ llamar │ buscar │ recordar     │
└────────────────────────┬────────────────────────────────────────┘
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                  INTERFAZ AL USUARIO                             │
│  • Reporte diario (mañana + noche)                              │
│  • Alertas tiempo real (Telegram + WhatsApp "Cachito")           │
│  • Chat directo con el agente (WhatsApp, CLI, web mini-UI)      │
│  • Dashboard de permisos y log de acciones                       │
└─────────────────────────────────────────────────────────────────┘
```

## 6. Stack tecnológico (decidido)

| Capa | Tecnología | Justificación |
|---|---|---|
| Lenguaje | Python 3.11+ | SDK Anthropic maduro |
| LLM principal | Claude Sonnet 4.6 + Haiku 4.5 | [DATO REAL] Ya en uso |
| LLM auxiliar | GPT-4o-mini (OpenAI) | Tareas baratas, ya en uso |
| Embeddings | OpenAI `text-embedding-3-small` | Económico, suficiente |
| Framework agéntico | **Anthropic SDK directo + tool use nativo** | Sin overhead inicial |
| Multi-agente | **Clase `Agent` propia + state machine** | Control total, no LangGraph |
| Backend | FastAPI | Estándar Python |
| Base de datos | Supabase (PostgreSQL + pgvector) | [DATO REAL] Ya conectado |
| Cifrado app-level | `cryptography` (Fernet/AES-256) | Sobre lo que da Supabase |
| Cola de trabajos | Redis + RQ (en VPS) | Procesamiento async |
| Ingesta Plaud | Zapier → webhook (Fase 1) → OpenPlaud self-hosted (Fase 4) | Migración planeada |
| Browser automation | Playwright (Python) + Browserbase si cloud | [DATO REAL] Tasa éxito ~60-80% en sitios chilenos |
| Voice TTS/STT | Whisper (entrada) + ElevenLabs (salida) | Calidad alta |
| Telefonía | Twilio + Vapi (orquestación) | Estándar de mercado |
| Hosting dev | macOS local | Aprender operándolo |
| Hosting prod | VPS Hostinger | Ya pagado |
| Reverse proxy | nginx + Let's Encrypt | Estándar |
| Control versiones | Git + GitHub privado | Para Claude Code |
| Observabilidad | Logs JSON estructurados + Langfuse free | Trazar agente |
| Front existente preservado | n8n + ManyChat | No romper lo que funciona |

## 7. Sistema de permisos — diseño detallado

### 7.1 Tres niveles

- **Nivel A (Aprueba siempre):** Antes de ejecutar la tool, el agente te manda un mensaje con: qué va a hacer, por qué, qué espera de resultado. Tú apruebas/rechazas. Sin tu aprobación NO actúa.
- **Nivel B (Actúa si reversible):** El agente actúa autónomamente si la acción es reversible (crear borrador de mail, agregar nota a Notion, crear recordatorio, etc.). Si es irreversible (enviar mail, agendar, llamar, comprar, transferir), pide aprobación como en A.
- **Nivel C (Actúa libre):** Total autonomía dentro del scope de la tool. Solo recibes log post-hoc.

### 7.2 Tabla `tool_permissions`

```sql
CREATE TABLE tool_permissions (
    tool_name TEXT PRIMARY KEY,
    description TEXT NOT NULL,
    silo_scope TEXT NOT NULL,            -- 'pacientes' | 'personal' | '*' etc.
    current_level CHAR(1) NOT NULL DEFAULT 'A',
    is_reversible BOOLEAN NOT NULL,
    success_count INT DEFAULT 0,
    failure_count INT DEFAULT 0,
    manual_corrections INT DEFAULT 0,
    last_used_at TIMESTAMPTZ,
    last_level_change_at TIMESTAMPTZ DEFAULT NOW(),
    last_level_change_reason TEXT,
    last_level_change_by TEXT             -- 'user' | 'auto_degradation'
);
```

### 7.3 Reglas de movimiento de nivel

| Transición | Regla |
|---|---|
| A → B | Solo manual del usuario. Agente puede *sugerir* tras N aprobaciones consecutivas exitosas |
| B → C | Solo manual del usuario. Decisión consciente |
| C → B | Automático tras 1 error o corrección manual; o manual |
| B → A | Automático tras 2 errores consecutivos; o manual |
| Cualquiera → A | Comando manual "modo paranoia" lo lleva todo a A |

### 7.4 Comandos de usuario para gestionar permisos

```
> sube enviar_email_paciente a B
> baja todas las tools de browser a A
> modo paranoia
> sugerencias de promoción
> log de últimas 50 acciones
> log de tool enviar_email_paciente últimos 7 días
```

## 8. Tools previstas (nivel inicial = A para todas)

### Comunicación
- `enviar_email` (Gmail) — irreversible
- `responder_whatsapp_paciente` — irreversible
- `crear_draft_email` — reversible
- `enviar_alerta_cachito` (Telegram + WhatsApp Defaia) — irreversible

### Agenda
- `consultar_calendario` — read-only, puede ir directo a C
- `crear_evento_calendario` — irreversible (puede chocar con otros)
- `modificar_evento_calendario` — irreversible
- `consultar_agenda_santa_catalina` — read-only

### Tareas / memoria
- `crear_recordatorio` — reversible
- `agregar_nota_notion` — reversible
- `actualizar_paciente_memoria` — reversible (soft-delete)

### Browser automation
- `agendar_hora_externa` (dentista, peluquería, gym) — irreversible
- `comprar_online` — irreversible (alto riesgo)
- `consultar_web` (precios, info pública) — reversible

### Telefonía (Fase 7+)
- `llamar_voz_generica` — irreversible
- `llamar_voz_clonada` — irreversible (alto riesgo legal)

### Investigación / RAG
- `buscar_biblioteca_clinica` — read-only
- `buscar_web_pubmed` — read-only
- `generar_review_prisma` — read-only

## 9. Roadmap por fases

### Fase 0 — Setup ambiente (1-2 horas)
Python venv, git, llaves API, `hola_claude.py`, estructura de carpetas.

### Fase 1 — MVP: agente conversacional con memoria por silo (1-2 sesiones)
- CLI por terminal (no WhatsApp aún)
- Tablas Supabase: `silos`, `entidades`, `chunks`, `embeddings`, `action_log`
- Cifrado app-level configurado
- System prompts base por silo
- Solo nivel A para todo

### Fase 2 — Ingesta Plaud vía Zapier (1 sesión)
- Endpoint FastAPI que recibe webhook Zapier
- Pipeline: chunk → clasificar silo → embedding → guardar
- Agente puede responder preguntas sobre transcripciones del día
- Reporte diario automático por email/Telegram

### Fase 3 — Sistema de permisos completo + primeras tools (2 sesiones)
- Tabla `tool_permissions` operativa
- Lógica de promoción/degradación
- Comandos manuales para gestionar permisos
- Tools iniciales: `crear_recordatorio`, `crear_draft_email`, `consultar_calendario`
- Toda tool entra en A

### Fase 4 — Multi-agente orquestado (2-3 sesiones)
- Router de contexto
- Agentes especializados con system prompts propios
- Handoff entre silos
- Migración Plaud Zapier → OpenPlaud self-hosted

### Fase 5 — Tools de comunicación y agenda (2 sesiones)
- `enviar_email`, `responder_whatsapp_paciente`, `crear_evento_calendario`
- Integración con n8n + WhatsApp Business existente (sucesor OpenClaw)
- Reporte diario AM/PM

### Fase 6 — Browser automation (2-3 sesiones)
- Playwright integrado
- Casos de uso: agendar hora externa, consultar precios, comprar online
- Empezar con páginas chilenas conocidas

### Fase 7 — Voice (entrante + saliente genérica) (2-3 sesiones, opcional)
- Llamada entrante: tú llamas al agente, le hablas, te responde
- Llamada saliente con voz genérica del "asistente del Dr. Wunderwald"
- Twilio + Vapi + ElevenLabs

### Fase 8 — Voice clonada (opcional, evaluar tras Fase 7)
- Solo después de evaluar resultados de Fase 7
- Decisión legal explícita
- Casos de uso muy acotados

### Fase 9 — Deploy producción full (1-2 sesiones)
- Todo en VPS Hostinger
- nginx + Let's Encrypt
- Monitoring + backups automáticos
- Migración completa de OpenClaw → Andrés Core

## 10. Riesgos legales y éticos identificados

| Riesgo | Mitigación |
|---|---|
| Grabación Plaud captura conversaciones de terceros sin consentimiento | Asesoría legal antes de Fase 2; consentimientos clínicos actualizados; silos cifrados |
| Conversaciones abogado-cliente grabadas → privilegio comprometido | Política: NO grabar reuniones con Reyes Zúñiga / Bandelli con Plaud |
| Datos de salud de pacientes en sistema multi-uso | Silo `pacientes` cifrado app-level; access logs auditables |
| Voz clonada → posible delito de estafa si genera perjuicio | Fase 8 condicional; evaluación legal previa explícita |
| Agente envía mail incorrecto a paciente | Sistema permisos A/B/C; toda tool de comunicación a paciente entra en A; degradación automática |
| Browser automation hace compra incorrecta | Tool en A indefinidamente; aprobación humana antes de checkout |

## 11. Decisiones tomadas

| Decisión | Elegido | Justificación |
|---|---|---|
| Sistema único o múltiple | Único cerebro fusionado | Decisión usuario |
| Compartimentación | Sí, por silos | Decisión usuario |
| Modelo de autonomía | A/B/C reversible granular | Decisión usuario |
| Voice clonada | Posible Fase 8, no MVP | Decisión usuario |
| Plaud integration path | Zapier → OpenPlaud (migración) | [INFERENCIA] Mejor balance velocidad/control |
| OpenClaw existente | Migrar progresivamente al nuevo sistema | Fusión total |

## 12. Pendientes que dependen del usuario

- **[NO SÉ]** Volumen real de mensajes WhatsApp / mes en OpenClaw actual
- **[NO SÉ]** Volumen Anthropic API actual mensual
- **[NO SÉ]** Especificaciones VPS Hostinger (RAM/CPU/OS) → Claude Code consultará por SSH en Fase 9
- **[PENDIENTE]** Nombre definitivo del proyecto (provisorio: "Andrés Core")
- **[PENDIENTE]** Asesoría legal sobre grabación Plaud 16hr/día — Andrés debe consultar con abogado
- **[PENDIENTE]** Lista exacta de páginas web donde el agente debe poder agendar (Fase 6)
- **[PENDIENTE]** Tier de presupuesto inicial — recomendado Tier 2 ($50-70/mes)

## 13. Convenciones

- **UI/logs/respuestas al usuario:** español chileno
- **Código y nombres:** inglés
- **Commits:** convencionales en inglés
- **System prompts:** versionados en `/src/agents/prompts/*.md`
- **Secretos:** `.env`, nunca en código, nunca commited. **Nunca pegar API
  keys, contraseñas ni passphrases en chats con agentes** (Claude.ai web,
  Claude Code, etc.) — los chats son canales logueados. Para actualizar
  `ANTHROPIC_API_KEY`, usar `python scripts/set_api_key.py`, que lee del
  portapapeles del Mac sin pasar por chat.
- **Decisiones técnicas nuevas:** ADR en `/docs/decisiones/NNNN-titulo.md`

## 14. Glosario

- **Andrés Core:** este proyecto (nombre provisorio)
- **OpenClaw:** sistema actual (intake pacientes) — se migra progresivamente
- **Plaud:** dispositivo wearable de grabación + transcripción con AI; fuente principal de ingesta
- **Cachito:** keyword de alerta clínica urgente
- **Defaia:** community manager (@defaia.cl)
- **Silo:** compartimento de contexto con memoria propia
- **Tool:** función que el agente puede ejecutar
- **Nivel A/B/C:** sistema de permisos de autonomía
- **Meta-agente:** agente supervisor con acceso cruzado, solo invocado explícitamente
- **WABA:** WhatsApp Business API
- **MCP:** Model Context Protocol

---

## Instrucciones para CUALQUIER sesión de Claude Code

1. **LEE ESTE ARCHIVO PRIMERO. Siempre.**
2. Antes de proponer código, identifica en qué fase del roadmap estamos.
3. Si algo contradice este documento, **detente y pregunta a Andrés**.
4. Mantén el Pacto de Honestidad Radical en TODA respuesta.
5. Cada decisión técnica nueva → ADR en `/docs/decisiones/`.
6. Toda nueva tool entra en `current_level = 'A'`. SIEMPRE.
7. Cambios sustanciales → propone actualizar este archivo al final.
