# Product

<!-- impeccable:product-schema 1 -->

> Escrito durante una pasada de impeccable con autonomía delegada por el usuario: los hechos salen de `CLAUDE.md`, `data/*.yaml` y `docs/feat-brand-redesign/`. Lo marcado como (inferido) no fue confirmado en entrevista.

## Platform

web

## Users

- Clientes potenciales y equipos de producto que evalúan contratar a Luciano para desarrollo backend/full stack, integraciones, Odoo o automatización con IA (home, proyectos, CV).
- Lectores técnicos del blog: write-ups, benchmarks y notas personales (posts).
- Contactos que llegan desde redes o una tarjeta: `/links/` (alias `/l/`).

## Product Purpose

Sitio personal y blog de Luciano Delfino (`lucianodlf`): presentar quién es y cómo trabaja, mostrar proyectos reales con su resultado, publicar escritos y facilitar el contacto (mail, LinkedIn).

## Positioning

Ingeniero de software con trayectoria en IT desde 2006 que trabaja AI-Augmented con un workflow propio basado en specs (investigación, plan, implementación, validación) y lo demuestra con casos concretos (AppLogistic entregado en 2 de 3 meses).

## Operating Context

- Contenido escrito en Obsidian y publicado con Enveloppe; deploy por GitHub Actions a GitHub Pages.
- Navegación por teclado como rasgo del sitio: `/`, Ctrl+K, `gg`, `G`, `w`, `?`.
- Dark por defecto, light con `html.light`. El CV se imprime desde el navegador (3 páginas A4).

## Capabilities and Constraints

- Hugo con layouts propios, sin theme. Búsqueda con Pagefind.
- Contratos de JS listados en `CLAUDE.md` (ids y clases) no se rompen.
- Colores solo por tokens (`static/css/tokens.css`), nunca hex en `main.css`.

## Brand Commitments

- Design system lucianodlf (artifact `1Cb555udMz1t4gBdSJczcs`): IBM Plex Sans/Mono, verde + neutros cálidos, ámbar solo como acento.
- Voz de terminal: wordmark `lucianodlf_ -v`, cursor `_` en ámbar, comandos como anotaciones.
- Sin emojis ni em-dash, bordes antes que sombras.
- Neón sutil y difuso pedido por el usuario (2026-11-05): el cursor ámbar y el fósforo del hero.

## Evidence on Hand

- Métricas y textos reales en `data/home.yaml` y `data/cv.yaml`; proyectos en `content/projects/`.
- Sin testimonios ni logos de clientes: no inventarlos.

## Product Principles

1. Mostrar con evidencia concreta (métricas, proyectos, posts), no con adjetivos.
2. El sitio también es un ejemplo del oficio: rápido, accesible, navegable por teclado.
3. La voz técnica es identidad, no disfraz: el monoespaciado es para comandos, datos y código.

## Accessibility & Inclusion

WCAG AA como piso (Lighthouse 100 en accesibilidad en la verificación previa); `prefers-reduced-motion` respetado (inferido como requisito a mantener).
