"""Smoke test: llama a Claude Haiku 4.5 y muestra la respuesta.

Sirve como prueba de que toda la cadena de setup funciona:
- venv activado
- dependencias instaladas
- .env con ANTHROPIC_API_KEY presente
- conexión saliente a api.anthropic.com OK

Uso:
    source venv/bin/activate
    python src/hola_claude.py
"""

from __future__ import annotations

import os
import sys

from anthropic import Anthropic
from dotenv import load_dotenv

MODEL = "claude-haiku-4-5"

PROMPT = (
    "Saluda al Dr. Andrés Wunderwald en español chileno, en 2 frases breves. "
    "Confirma que estás vivo y mencionas tu nombre de modelo."
)


def main() -> int:
    load_dotenv()

    api_key = os.getenv("ANTHROPIC_API_KEY")
    if not api_key or api_key.startswith("sk-ant-REEMPLAZAR"):
        print(
            "ERROR: ANTHROPIC_API_KEY no está configurada en .env.\n"
            "Copia .env.example a .env y pega tu API key real.",
            file=sys.stderr,
        )
        return 1

    client = Anthropic(api_key=api_key)

    response = client.messages.create(
        model=MODEL,
        max_tokens=300,
        messages=[{"role": "user", "content": PROMPT}],
    )

    text = "".join(
        block.text for block in response.content if getattr(block, "type", None) == "text"
    )

    print(f"--- Modelo: {response.model} ---")
    print(text.strip())
    print("--- Tokens:", response.usage.input_tokens, "in /", response.usage.output_tokens, "out ---")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
