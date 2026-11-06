---
id: "004"
title: "Ajustes de home y CV: servicios con skills, CV colapsable, contacto con íconos y /pbcard"
type: feat
status: verify          # backlog | todo | doing | verify | done | blocked | dropped
priority: alta          # alta | media | baja (la asigna el agente, ver `wp conv items`)
size: M                 # S = 1 sesión | M = 2-3 | L = épica
parent: "001"
depends_on: []
blocked_by:
ref: []
sessions: 0             # sesiones reales; lo suma /wp-save
futures:                # fecha del chequeo de futures, o "skip" (solo feat)
created: 2026-11-05
updated: 2026-11-05
closed:
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
- [ ] C6 El usuario elige variante de servicios, lead y ubicación del readme.

## Fuera de alcance
- Aplicar el lead nuevo y mover el readme.txt (esperan decisión).
- Íconos en las tarjetas de servicios.

## Notas
- 2026-11-05: la línea del timeline estaba mal porque `ol[class] { padding: 0 }` gana en especificidad a `.timeline`; se usa `ol.timeline`.

## Verificación
Veredicto: partial
- Evidencia: `hugo` compila; `public/pbcard/index.html` generado; capturas con Chrome headless de `/` y `/cv/` (servicios en grilla 3x3, contacto con íconos, experiencias colapsadas con fade, línea alineada).
- Señales de desvío: se reemplazó la sección de servicios anterior (lista "manpage") por las tarjetas nuevas.
- Pendiente manual (usuario): probar click de expandir/colapsar en el CV, elegir variantes (C6), revisar WhatsApp público.

## Cierre
<!-- La completa /wp-done: 2-3 líneas, commits, knowledge actualizado, futures. -->
