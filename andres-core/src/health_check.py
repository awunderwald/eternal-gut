"""Health check del ambiente Andrés Core.

Verifica que la base está sana antes de avanzar a fases siguientes:
1. Python >= 3.11
2. venv activado (sys.prefix != sys.base_prefix)
3. Variables CRÍTICAS de .env presentes y no son placeholders
4. Conexión a Anthropic API funcional (mensaje de 1 token)

Uso:
    source venv/bin/activate
    python src/health_check.py

Sale con código 0 si todo OK, 1 si algún check falla.
"""

from __future__ import annotations

import os
import sys

from dotenv import load_dotenv

OK = "[OK]"
FAIL = "[FAIL]"

# Variables consideradas CRÍTICAS en Fase 0.
# Las demás de .env.example son aspiracionales para fases futuras.
CRITICAL_ENV_VARS: tuple[str, ...] = ("ANTHROPIC_API_KEY",)

PLACEHOLDERS = ("REEMPLAZAR", "sk-ant-REEMPLAZAR", "sk-REEMPLAZAR", "")


def _check_python_version() -> tuple[bool, str]:
    major, minor = sys.version_info[:2]
    if (major, minor) >= (3, 11):
        return True, f"Python {major}.{minor} ≥ 3.11"
    return False, f"Python {major}.{minor} < 3.11 — actualiza con `brew install python@3.12`"


def _check_venv_active() -> tuple[bool, str]:
    in_venv = sys.prefix != getattr(sys, "base_prefix", sys.prefix)
    if in_venv:
        return True, f"venv activo: {sys.prefix}"
    return False, "venv NO activado. Corre `source venv/bin/activate` primero."


def _check_env_vars() -> tuple[bool, str]:
    missing: list[str] = []
    placeholder: list[str] = []
    for name in CRITICAL_ENV_VARS:
        value = os.getenv(name)
        if value is None:
            missing.append(name)
            continue
        if value.strip() in PLACEHOLDERS or "REEMPLAZAR" in value:
            placeholder.append(name)

    if missing:
        return False, f"Variables faltantes en .env: {', '.join(missing)}"
    if placeholder:
        return False, (
            f"Variables con placeholder (sin valor real): {', '.join(placeholder)}. "
            "Edita .env y pega tu API key real."
        )
    return True, f"Variables críticas presentes: {', '.join(CRITICAL_ENV_VARS)}"


def _check_anthropic_call() -> tuple[bool, str]:
    try:
        from anthropic import Anthropic
    except ImportError as exc:
        return False, f"Paquete `anthropic` no instalado: {exc}"

    try:
        client = Anthropic()  # toma ANTHROPIC_API_KEY del env
        response = client.messages.create(
            model="claude-haiku-4-5",
            max_tokens=10,
            messages=[{"role": "user", "content": "Di 'ok' y nada más."}],
        )
        text = "".join(
            b.text for b in response.content if getattr(b, "type", None) == "text"
        ).strip()
        return True, f"Anthropic API OK — modelo respondió: {text!r}"
    except Exception as exc:  # noqa: BLE001
        return False, f"Llamada a Anthropic falló: {type(exc).__name__}: {exc}"


def main() -> int:
    load_dotenv()

    checks = [
        ("Python version", _check_python_version),
        ("venv activo", _check_venv_active),
        ("Variables de entorno críticas", _check_env_vars),
        ("Conexión Anthropic API", _check_anthropic_call),
    ]

    all_ok = True
    for label, fn in checks:
        ok, msg = fn()
        prefix = OK if ok else FAIL
        print(f"{prefix} {label}: {msg}")
        all_ok = all_ok and ok

    print()
    if all_ok:
        print("Todo en orden. Puedes avanzar a Fase 1.")
        return 0
    print("Hay checks fallidos. Resuélvelos antes de seguir.")
    return 1


if __name__ == "__main__":
    raise SystemExit(main())
