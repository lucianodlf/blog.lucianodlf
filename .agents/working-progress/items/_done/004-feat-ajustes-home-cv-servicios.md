---
id: "004"
title: "Ajustes de home y CV: servicios con skills, CV colapsable, contacto con íconos y /pbcard"
type: feat
status: done            # backlog | todo | doing | verify | done | blocked | dropped
priority: alta          # alta | media | baja (la asigna el agente, ver `wp conv items`)
size: M                 # S = 1 sesión | M = 2-3 | L = épica
parent: "001"
depends_on: []
blocked_by:
ref: []
sessions: 0             # sesiones reales; lo suma /wp-save
futures: 2026-11-06     # fecha del chequeo de futures, o "skip" (solo feat)
created: 2026-11-05
updated: 2026-11-06
closed: 2026-11-06
---

# [004] Ajustes de home y CV: servicios con skills, CV colapsable, contacto con íconos y /pbcard

## Contexto
Primera ronda de ajustes sobre el rediseño integrado en [001]: el QR de las tarjetas apunta a `/pbcard`, que no existía; el home y el CV mostraban métricas que por ahora no se quieren; faltaba una sección de servicios con skills enlazada desde el menú, y la línea del timeline del CV caía sobre el texto.

## Alcance
1. Alias `/pbcard/` hacia `/links/` (`content/links.md`).
2. Ocultar métricas en home y CV (no las de proyectos).
3. Sección Servicios en el home (`#servicios`, menú "Servicios"), tarjetas con skills; 4 variantes de textos en `data/services.yaml`.
4. Home: quitar el botón "CV completo"; contacto con íconos circulares (email, LinkedIn, WhatsApp).
5. CV: "Descargar en PDF" como enlace de texto, sin el link de LinkedIn; experiencias colapsables con vista previa difuminada; arreglo de la línea del timeline.
6. Propuestas sin aplicar: 3 leads del home, recomendación de dónde ubicar el readme.txt (`inputs/propuestas.md`).

## Criterios de aceptación
- [x] C1 `/pbcard/` redirige a `/links/` en local.
- [x] C2 Métricas ocultas en home y CV; visibles en proyectos.
- [x] C3 Servicios en el home con skills, menú con ancla y scroll suave.
- [x] C4 Contacto con tres íconos circulares; sin botón "CV completo" en el hero.
- [x] C5 CV: enlace "Descargar en PDF", experiencias colapsables, línea del timeline alineada con los puntos.
- [x] C6 El usuario elige variante de servicios, lead y ubicación del readme.

## Fuera de alcance
- Elegir la variante final de servicios (el usuario aún no las revisó completas).
- Íconos en las tarjetas de servicios.

## Notas
- 2026-11-05: la línea del timeline estaba mal porque `ol[class] { padding: 0 }` gana en especificidad a `.timeline`; se usa `ol.timeline`.

- 2026-11-06: aplicado el lead L3 (`data/home.yaml`); el readme.txt se movió del home a la cabecera de `/posts/` (`content/posts/_index.md`, `layouts/_default/list.html`); nueva foto de perfil en `static/img/avatar.jpg` (recorte cuadrado 640x640 de `_scratch/Screenshot_2026-11-06_12-22-05.png`), usada en hero, `/links/` y tarjeta de autor; el avatar del hero pasó de 128x150 a 128x128 en `cover-svg.html`.
- 2026-11-06: ajustes a las 4 variantes de servicios: intro de A sin "desde...hasta"; "Implementaciones" general (Odoo como skill, sin "19") e incluye puesta en marcha y soporte; "Estructura técnica" pasó a "Administración de sistemas" (C: `sysadmin`; D: "Acompañar" pasó a "Implementar"); fuera "Specs", "Criterios de aceptación", "Open Library" y "Google Books".

## Verificación
Veredicto: partial
- Evidencia: `hugo` compila; `public/pbcard/index.html` generado; capturas con Chrome headless de `/` y `/cv/` (servicios en grilla 3x3, contacto con íconos, experiencias colapsadas con fade, línea alineada).
- Señales de desvío: se reemplazó la sección de servicios anterior (lista "manpage") por las tarjetas nuevas.
- Pendiente manual (usuario): probar click de expandir/colapsar en el CV, elegir variantes (C6), revisar WhatsApp público.

## Cierre
Se entregó el alias `/pbcard/`, métricas ocultas en home y CV, sección Servicios con skills (4 variantes en `data/services.yaml`), contacto con íconos, CV con experiencias colapsables y timeline alineado, lead L3, readme en `/posts/` y nueva foto de perfil.
Commits: 4d4cc4c (con trailer); sin trailer pero del mismo trabajo: 643db84, be01eb0, 246fcfe, e34916a.
Knowledge: una línea en `.agents/working-progress/knowledge/design.md` (especificidad de `ol.timeline`).
Futures: nada.
