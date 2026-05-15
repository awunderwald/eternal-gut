# Dante

> Sistema operativo personal con IA para el Dr. Andrés Wunderwald.
> Voz canónica del agente: **Dantev1**.
> **La biblia del proyecto está en [`PROYECTO.md`](./PROYECTO.md). Léela primero.**
>
> *Nombre histórico: "Andrés Core" (hasta 15 mayo 2026, ver ADR 0002).
> El directorio del proyecto sigue llamándose `andres-core/` por ahora —
> rename pendiente a `dante/` cuando sea seguro hacerlo.*

Pacto activo: **Honestidad Radical** — toda afirmación etiquetada
`[DATO REAL]` / `[INFERENCIA]` / `[CÁLCULO]` / `[NO SÉ]`.

---

## Estado actual

**Fase 0** — setup de ambiente. Sin lógica de agentes todavía.

## Requisitos

- macOS (desarrollo) / Linux (producción VPS)
- Python ≥ 3.11
- Git
- Una `ANTHROPIC_API_KEY` válida (https://console.anthropic.com)

## Setup local (primera vez)

```bash
# 1. Clonar / entrar al proyecto
cd ~/Projects/andres-core

# 2. Crear venv
python3 -m venv venv

# 3. Activar venv (cada vez que abras terminal nuevo)
source venv/bin/activate

# 4. Instalar dependencias
pip install --upgrade pip
pip install -r requirements.txt

# 5. Configurar secretos
cp .env.example .env
# → edita .env con tu editor favorito y pega tu ANTHROPIC_API_KEY

# 6. Verificar que toda la cadena funciona
python src/health_check.py

# 7. Saludar a Claude Haiku
python src/hola_claude.py
```

## Estructura

```
andres-core/
├── PROYECTO.md              ← biblia del proyecto (leer SIEMPRE primero)
├── README.md                ← este archivo
├── CHANGELOG.md             ← log humano-legible de cambios
├── requirements.txt
├── .env.example             ← plantilla, sin secretos
├── .gitignore
├── docs/
│   └── decisiones/          ← ADRs (Architecture Decision Records)
├── scripts/                 ← utilidades operativas
├── src/
│   ├── hola_claude.py       ← smoke test Anthropic
│   ├── health_check.py      ← verifica setup completo
│   ├── agents/              ← (Fase 1+) clase Agent y prompts por silo
│   │   └── prompts/
│   ├── memory/              ← (Fase 1+) silos + embeddings
│   ├── rag/                 ← (Fase 1+) recuperación contextual
│   ├── tools/               ← (Fase 3+) tools con permisos A/B/C
│   ├── llm/                 ← wrappers de Anthropic / OpenAI
│   └── permissions/         ← (Fase 3+) sistema A/B/C
└── tests/
```

## Convenciones

- **UI / logs / respuestas al usuario:** español chileno.
- **Código y nombres:** inglés.
- **Commits:** convencionales en inglés (`feat:`, `fix:`, `chore:`, `docs:`).
- **Secretos:** sólo en `.env`. Nunca en código. Nunca commiteados.
- **Decisiones técnicas nuevas:** ADR en `docs/decisiones/NNNN-titulo.md`
  ANTES de implementar.
- **Nuevas tools del agente:** entran en `current_level = 'A'`. Siempre.

## Próximos pasos

- [ ] Pegar `ANTHROPIC_API_KEY` real en `.env`
- [ ] `python src/health_check.py` debe pasar todos los checks
- [ ] `python src/hola_claude.py` debe imprimir respuesta de Haiku en español
      chileno
- [ ] Avanzar a **Fase 1** — agente conversacional con memoria por silo
      (ver §9 de `PROYECTO.md`)

## Riesgos legales / éticos

Resumen en §10 de `PROYECTO.md`. Antes de Fase 2 (ingesta Plaud) se requiere
asesoría legal sobre grabación 16h/día.
