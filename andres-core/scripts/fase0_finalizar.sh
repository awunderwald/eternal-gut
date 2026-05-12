#!/usr/bin/env bash
# fase0_finalizar.sh — Termina Fase 0 con la mínima intervención humana posible.
#
# Lo único que necesita de ti:
#   1. Tener el venv activado y estar parado en ~/Projects/andres-core
#   2. Una API key válida copiada en el portapapeles cuando el script te lo pida
#
# Lo que hace por ti:
#   - Abre la consola de Anthropic en tu navegador.
#   - Te guía para revocar keys viejas y crear una nueva.
#   - Lee la nueva key desde tu portapapeles (pbpaste). Nunca aparece en chat.
#   - La escribe al .env via scripts/set_api_key.py.
#   - Corre health_check.py.
#   - Si falla, reintenta automáticamente (te pide pegar otra key).
#   - Cuando pasa, corre hola_claude.py para que veas a Haiku saludarte.
#   - Hace el commit final de Fase 0.
#   - Te recuerda cómo lanzar Claude Code local para Fase 1.

set -u

PROJECT_DIR="$HOME/Projects/andres-core"

cd "$PROJECT_DIR" || { echo "ERROR: no existe $PROJECT_DIR. Aborto."; exit 1; }

# Activar venv si no está activo
if [ -z "${VIRTUAL_ENV:-}" ]; then
    if [ -f "./venv/bin/activate" ]; then
        # shellcheck disable=SC1091
        source ./venv/bin/activate
    else
        echo "ERROR: no encuentro ./venv. Aborto."
        exit 1
    fi
fi

echo ""
echo "================================================================"
echo "  Andres Core — Fase 0 — script de cierre"
echo "================================================================"
echo ""
echo "Voy a abrir tu navegador en la consola de Anthropic."
echo ""
echo "  1. Revisa la lista de keys."
echo "  2. ELIMINA todas las que tengan 'andres-core' en el nombre o"
echo "     fueron creadas el 12 mayo 2026 (estan comprometidas)."
echo "  3. Crea UNA key nueva. Nombre sugerido: 'andres-core-final'."
echo "  4. Copiala con el boton del portapapeles (Cmd+C)."
echo ""
read -r -p "Presiona ENTER cuando hayas copiado la key nueva (Cmd+C)... " _
open "https://console.anthropic.com/settings/keys" >/dev/null 2>&1 || true

attempt=1
max_attempts=3

while [ "$attempt" -le "$max_attempts" ]; do
    echo ""
    echo "--- Intento $attempt/$max_attempts ---"

    # Escribir la key desde el portapapeles
    if ! python scripts/set_api_key.py; then
        echo ""
        echo "El portapapeles no tiene una key valida."
        if [ "$attempt" -lt "$max_attempts" ]; then
            read -r -p "Copia la key correcta (Cmd+C) y presiona ENTER... " _
            attempt=$((attempt+1))
            continue
        else
            echo "Maximos intentos. Revisa tu key y corre de nuevo: bash scripts/fase0_finalizar.sh"
            exit 1
        fi
    fi

    # Health check
    if python src/health_check.py; then
        echo ""
        echo "OK: los 4 checks pasaron."
        break
    fi

    echo ""
    echo "La key esta bien formada pero Anthropic la rechaza."
    echo "Causas posibles:"
    echo "  - La key esta revocada (acaba de pasar antes en esta sesion)."
    echo "  - El workspace de esa key no tiene acceso API."
    echo "  - Tu cuenta no tiene credito API (verifica en"
    echo "    https://console.anthropic.com/settings/billing)."
    echo ""
    if [ "$attempt" -lt "$max_attempts" ]; then
        echo "Crea OTRA key, copiala (Cmd+C), y presiona ENTER para reintentar."
        read -r _
        attempt=$((attempt+1))
    else
        echo "Maximos intentos. Resuelve el tema de la cuenta y corre de nuevo:"
        echo "  bash scripts/fase0_finalizar.sh"
        exit 1
    fi
done

# Si llegamos aca, la key funciona
echo ""
echo "================================================================"
echo "  Probando: que Haiku te salude"
echo "================================================================"
python src/hola_claude.py

# Commit final de Fase 0
echo ""
echo "================================================================"
echo "  Commit final de Fase 0"
echo "================================================================"
if [ ! -d ".git" ]; then
    git init -q
fi
git add -A 2>/dev/null
if git diff --cached --quiet 2>/dev/null; then
    echo "Nada nuevo que commitear."
else
    git commit -m "feat: complete phase 0 — env, deps, working ANTHROPIC_API_KEY" -q && \
        echo "Commit creado."
fi

echo ""
echo "================================================================"
echo "  Fase 0 — completada"
echo "================================================================"
echo ""
echo "Siguiente paso, cuando quieras empezar Fase 1:"
echo ""
echo "  ~/.local/bin/claude"
echo ""
echo "y le pegas el prompt 'Hola. Soy el Dr. Andres Wunderwald...'"
echo "que esta en tu chat con la sesion web."
echo ""
