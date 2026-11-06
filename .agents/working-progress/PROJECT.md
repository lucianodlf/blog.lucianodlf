---
title: blog-personal
mode: versioned         # versioned | local
session_hours: 8        # horas de una sesión de trabajo típica en este proyecto
decisions: light        # light (una línea en decisions.md) | madr (un archivo por decisión)
created: 2026-11-05
updated: 2026-11-05
---

# blog-personal

## Qué es
Sitio personal de `lucianodlf` en Hugo (tema Risotto, GitHub Pages). Hoy es solo un blog (`--verbose`); se convierte en página personal, portfolio, blog y CV online.

## Para quién y contexto
Sitio propio de Luciano Delfino. La nueva página está en la rama `claude/blissful-meitner-vg30tk`, pendiente de validar y ajustar; hay más cambios pendientes en PR del repo.

## Problemas que resuelve
- Presentar quién es Luciano y cómo trabaja (AI-Augmented, workflow basado en specs) a clientes potenciales y equipos de producto.
- Mostrar proyectos reales con su resultado (home, proyectos, CV online imprimible).
- Publicar escritos técnicos (blog) y facilitar el contacto (mail, LinkedIn, `/links/`).

## Restricciones
- Hugo con layouts propios (la rama `claude/blissful-meitner-vg30tk` quita el tema Risotto); búsqueda con Pagefind; deploy por GitHub Actions a GitHub Pages.
- Contenido escrito en Obsidian y publicado con Enveloppe (ver `CLAUDE.md`).
- Los contratos de JS listados en `CLAUDE.md` (ids y clases) no se rompen.
- Colores solo por tokens (`static/css/tokens.css`), nunca hex en `main.css`.
- Sin emojis ni em-dash; dark por defecto, light con `html.light`.
- WCAG AA como piso; respetar `prefers-reduced-motion`.

## No-objetivos
- No inventar testimonios ni logos de clientes.
- No modificar `themes/risotto/` (mientras exista); los overrides van en `layouts/` y `static/css/`.

## Estructura del producto
<!-- Carpetas principales del repo y qué contienen. Solo lo que no se deduce mirando. -->
Ver `CLAUDE.md` (estructura del repo, flujo de publicación, overrides del theme).

## Convenciones locales
| Módulo | Usa |
|---|---|
<!-- Reemplazos de módulos de la convención WP. Ejemplos:
     | commits | `.agents/working-progress/knowledge/commits-local.md` |
     | registro | `registro-de-sesiones/` (formato propio, no usar log/) |
     Herramientas del proyecto (gitnexus, graphify, MCP) con una línea de cuándo usarlas.
     Si algo debe cumplirse en toda la sesión, va además al CLAUDE.md del proyecto. -->
