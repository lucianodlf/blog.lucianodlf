#!/usr/bin/env bash
# Normaliza los paths de assets que genera Enveloppe (Obsidian) al markdown
# que Hugo entiende. Idempotente: correrlo varias veces no cambia el resultado.
#
# Enveloppe escribe:  ![alt](../../static/assets/img.jpg.jpg)
# Hugo necesita:      ![alt](../../assets/img.jpg)
#
# Fuente unica de verdad: lo usa tanto el Makefile (dev local) como
# .github/workflows/deploy.yml (build en CI), para que local y la web
# rendericen identico.
set -euo pipefail

cd "$(dirname "$0")/.."

find content/posts -name "*.md" -print0 | xargs -0 sed -i \
  -e 's|\.\./\.\./static/assets/|../../assets/|g' \
  -e 's|\.\./static/assets/|../assets/|g' \
  -e 's/\.png\.png/.png/g' \
  -e 's/\.jpg\.jpg/.jpg/g' \
  -e 's/\.jpeg\.jpeg/.jpeg/g' \
  -e 's/\.gif\.gif/.gif/g' \
  -e 's/\.webp\.webp/.webp/g' \
  -e 's/\.pdf\.pdf/.pdf/g' \
  -e 's/\.mp4\.mp4/.mp4/g'
