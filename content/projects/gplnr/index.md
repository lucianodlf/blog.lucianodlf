---
title: "gplnr"
summary: "Extensión de VS Code que copia la referencia @archivo#L12-40 de la selección y la deja lista en la terminal. Un archivo, cero dependencias."
kind: propio
period: "2026"
date: 2026-05-26
status: en uso
featured: false
weight: 6
coverFit: contain
stack: [VS Code, JavaScript]
links:
  repo: "https://github.com/lucianodlf/gplnr"
  post: "posts/gplnr o Get Path Line Number Reference.md"
---

Get Path Line Number Reference: copia al portapapeles una referencia del tipo `@src/archivo.js#L12-40` (el formato que entiende Claude Code) y la inserta en la terminal integrada sin ejecutarla. Sin TypeScript, sin bundler y sin build step: un `extension.js` de 46 líneas, publicado en Open VSX. El proceso completo está en el post relacionado.
