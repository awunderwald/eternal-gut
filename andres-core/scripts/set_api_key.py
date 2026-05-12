"""Lee una API key desde el portapapeles del Mac (pbpaste) y la escribe al .env.

Uso:
    1. Copia tu API key real al portapapeles (Cmd+C desde el navegador).
    2. En Terminal, en la raíz del proyecto:
           python scripts/set_api_key.py
    3. El script valida el formato, escribe la key al .env, y muestra solo
       los primeros 13 y últimos 4 caracteres — la key nunca aparece
       completa en pantalla.

Nunca pega la key al chat / a un git commit / a cualquier lugar visible.
"""

from __future__ import annotations

import shutil
import subprocess
import sys
from pathlib import Path

EXPECTED_PREFIX = "sk-ant-api03-"
ENV_PATH = Path(__file__).resolve().parent.parent / ".env"


def read_clipboard() -> str:
    if shutil.which("pbpaste") is None:
        sys.exit("ERROR: 'pbpaste' no existe. Este script funciona solo en macOS.")
    result = subprocess.run(["pbpaste"], capture_output=True, text=True, check=False)
    return result.stdout.strip()


def update_env(key: str) -> None:
    if not ENV_PATH.exists():
        sys.exit(f"ERROR: {ENV_PATH} no existe. Corre primero: cp .env.example .env")

    lines = ENV_PATH.read_text().splitlines(keepends=True)
    out: list[str] = []
    replaced = False
    for line in lines:
        if line.startswith("ANTHROPIC_API_KEY="):
            out.append(f"ANTHROPIC_API_KEY={key}\n")
            replaced = True
        else:
            out.append(line)
    if not replaced:
        out.insert(0, f"ANTHROPIC_API_KEY={key}\n")
    ENV_PATH.write_text("".join(out))


def main() -> int:
    key = read_clipboard()
    if not key:
        print("ERROR: el portapapeles está vacío.")
        print("Copia la API key desde el navegador (Cmd+C) y vuelve a correr este script.")
        return 1

    if not key.startswith(EXPECTED_PREFIX):
        print(
            f"ERROR: el portapapeles no tiene una API key válida.\n"
            f"  Largo: {len(key)} caracteres\n"
            f"  Empieza con: {key[:13]!r}\n"
            f"  Esperaba que empezara con: {EXPECTED_PREFIX!r}\n\n"
            "Anda a https://console.anthropic.com/settings/keys, crea una key nueva\n"
            "(las API keys empiezan con 'sk-ant-api03-'), cópiala con Cmd+C, y\n"
            "vuelve a correr este script."
        )
        return 1

    update_env(key)
    print(
        f"OK: .env actualizado.\n"
        f"  Largo: {len(key)} caracteres\n"
        f"  Empieza con: {key[:13]!r}\n"
        f"  Termina con: {key[-4:]!r}\n\n"
        "Siguiente paso: python src/health_check.py"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
