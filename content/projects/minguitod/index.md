---
# Generado por ~/Projects/portfolio (scripts/build.py minguitod). No editar a mano.
title: "MinguitoD"
summary: "Notas en Markdown con la agilidad de Google Keep: local-first, offline, con enlaces entre notas compatibles con Obsidian y export a archivos .md."
kind: propio
role: "Autor: producto, diseño y desarrollo"
period: "2026"
date: 2026-11-17
status: en desarrollo
featured: false
weight: 4
coverFit: contain
stack: [Next.js, React, TypeScript, CodeMirror, Zustand, markdown-it, Fuse.js, IndexedDB, Tailwind, shadcn/ui, Jest, Testing Library, GitHub Actions, AWS CDK]
links:
  repo: "https://github.com/lucianodlf/minguitod"
  demo: "https://minguitod.demo.lucianodlf.com.ar"
---

## Contexto

Una app para notas rápidas que toma la agilidad de Google Keep (capturar, fijar, colorear, archivar, tildar checklists) y le suma lo que a Keep le falta: Markdown real, enlaces entre notas compatibles con Obsidian y export a archivos `.md`. El objetivo es abrir, anotar y cerrar en menos de cinco segundos sin que nada se pierda.

Es local-first: las notas viven en el navegador (IndexedDB), funciona offline y se instala como app, sin backend ni cuenta. Empezó como NotesMD y la usé también para explorar React y el desarrollo con agentes de IA.

## Qué hice

Lo diseñé y desarrollé de punta a punta, del producto y el sistema de diseño a la infraestructura de despliegue.

- **Captura estilo Keep:** captura rápida inline que guarda al salir, ocho colores de papelito, fijar, archivar y papelera restaurable que se vacía sola a los siete días, con Deshacer en cada acción.
- **Markdown de verdad:** un único parser (markdown-it con `html: false`) con plugins propios para checklists clicables, etiquetas `#tag` y `[[wikilinks]]` con backlinks y creación de la nota destino si no existe.
- **Editor con autocompletado:** CodeMirror 6 sugiere notas al escribir `[[`, etiquetas con `#` y comandos con `/` (checklist, tabla, código, fecha y plantillas).
- **Portabilidad:** export a ZIP de Markdown con frontmatter compatible con Obsidian, respaldo JSON e import de `.json`, `.md` y `.zip` con merge por fecha. Búsqueda fuzzy con Fuse.js sobre título, etiquetas y contenido.
- **Sistema de diseño propio ("Papelitos"):** tokens para tema claro "papel de diario" y oscuro "foto de noche", ocho colores de nota con contraste verificado y una identidad que homenajea a Minguito Tinguitella, el personaje que llevaba papelitos anotados en los bolsillos.
- **Accesibilidad:** contraste WCAG AA en los dos temas, todo operable con teclado y respeto de `prefers-reduced-motion`.
- **Ingeniería:** CI en GitHub Actions (lint, typecheck, tests y build, con las acciones fijadas por SHA) e infraestructura como código con AWS CDK: S3 privado con CloudFront, certificado ACM, presupuesto y rol OIDC para el deploy.

## Resultado

- App completa, con el deploy en AWS escrito como código (CDK) y validado con `synth` en CI.
- 92 casos de test con Jest y Testing Library sobre los módulos de dominio y componentes.
- Límites: sin sync entre dispositivos (diferido) y sin adjuntos por decisión de producto.

## Evidencia

- Capturas con notas de demo inventadas.
- Sistema de diseño documentado en `DESIGN.md` del repo.
- Repo y demo enlazados en la ficha.
