---
# Generado por ~/Projects/portfolio (scripts/build.py gplnr). No editar a mano.
title: "gplnr"
summary: "Extensión de VS Code que copia la referencia @archivo#L12-40 de la selección y la deja lista en la terminal, para pasarle contexto exacto a un agente. Un archivo, cero dependencias."
kind: propio
role: "Autor: desarrollo y publicación"
period: "2026"
date: 2026-05-26
status: en uso
featured: false
weight: 6
coverFit: contain
stack: [VS Code Extension API, JavaScript, Node.js, node:test, Open VSX]
links:
  repo: "https://github.com/lucianodlf/gplnr"
  post: "posts/gplnr o Get Path Line Number Reference.md"
---

## Contexto

Trabajo con Claude Code CLI dentro de la terminal integrada de VS Code y necesitaba pasarle al agente una referencia exacta de archivo y líneas (`@src/app.js#L12-40`). El atajo de la extensión oficial de Claude Code abría otra terminal con un `@mention` vacío o lo mandaba a la primera instancia, y no dejaba la referencia en el portapapeles para usarla en otro lado.

Había muchas extensiones que hacían algo parecido, con más opciones de las que necesitaba; preferí construir la mía, chica y precisa: copiar la referencia e insertarla en la terminal activa, sin ejecutarla.

## Qué hice

La desarrollé de punta a punta junto con Claude Code CLI, la publiqué en Open VSX y la uso a diario.

- **Dos verbos, nada más:** con `ctrl+alt+k` copia `@ruta`, `@ruta#L12` o `@ruta#L12-40` según la selección y la inserta en la terminal activa sin ejecutarla; si no hay terminal, solo actualiza el portapapeles y no crea una nueva. Desde la 0.0.2 la terminal recibe el foco para seguir escribiendo.
- **Usar la API en vez de reinventarla:** `activeTerminal`, `sendText(texto, false)` y `asRelativePath` ya resolvían los casos borde (sin terminal, insertar sin ejecutar, archivo fuera del workspace).
- **Menos piezas a propósito:** el primer borrador tenía cinco funciones y quedó en dos: `buildReference`, pura, y `copyReference`, que orquesta portapapeles y terminal. Un solo `extension.js` de 45 líneas, sin TypeScript, sin bundler, sin build step y sin dependencias de runtime.
- **Tests sin levantar VS Code:** la única lógica con ramas (`buildReference`) tiene 5 tests con `node --test`, con un stub mínimo que intercepta `require('vscode')`.
- **Documentar el conflicto en lugar de pelearlo:** el README explica que la extensión de Claude Code registra el mismo atajo y cómo liberarlo con una línea de `keybindings.json`.
- **Publicación:** cuenta de Eclipse, publisher agreement y namespace verificado en Open VSX; cada versión nueva sale con `npx ovsx publish`.

## Resultado

- Publicada en Open VSX (versión 0.0.2, 10/07/2026), con 898 descargas al 17/11/2026.
- La uso en mi flujo diario con Claude Code.
- Límites: con multi-cursor toma solo la selección primaria, y el atajo choca con el de la extensión de Claude Code si no se libera.

## Evidencia

- Extensión en Open VSX: <https://open-vsx.org/extension/lucianodlf/gplnr>
- Código y README: <https://github.com/lucianodlf/gplnr>
- Esquema de formatos hecho con los ejemplos del README, no es una captura.
