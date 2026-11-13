#!/usr/bin/env bash
# Copia el CV base más reciente (mayor -v#-) al nombre fijo que usa el sitio.
# Origen configurable con CV_SRC_DIR.
set -euo pipefail

cd "$(dirname "$0")/.."

SRC_DIR="${CV_SRC_DIR:-$HOME/Projects/desarrollo-profesional/mi-profile/cv/output}"
DEST="static/files/Luciano-Delfino-CV-latest-base.pdf"

latest=$(ls "$SRC_DIR"/Luciano-Delfino-CV-v[0-9]*-base.pdf 2>/dev/null | sort -V | tail -1)
if [ -z "$latest" ]; then
  echo "No se encontró ningún Luciano-Delfino-CV-v#-base.pdf en $SRC_DIR" >&2
  exit 1
fi

mkdir -p "$(dirname "$DEST")"
cp "$latest" "$DEST"
echo "$latest -> $DEST"
