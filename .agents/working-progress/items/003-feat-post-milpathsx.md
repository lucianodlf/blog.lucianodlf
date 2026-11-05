---
id: "003"
title: "Post: desarrollo agéntico de MilPathsX"
type: feat
status: backlog         # backlog | todo | doing | verify | done | blocked | dropped
priority: media         # alta | media | baja (la asigna el agente, ver `wp conv items`)
size: M                 # S = 1 sesión | M = 2-3 | L = épica
parent:
depends_on: []
blocked_by:
ref: []
sessions: 0             # sesiones reales; lo suma /wp-save
futures:                # fecha del chequeo de futures, o "skip" (solo feat)
created: 2026-11-05
updated: 2026-11-05
closed:
---

# [003] Post: desarrollo agéntico de MilPathsX

## Contexto
Post extenso para el blog sobre el desarrollo de MilPathsX con foco en el workflow agéntico y spec-driven. Venía de la sesión `plan-blog-develop-milpathsx` del flujo anterior; el plan completo está en `.agents/working-progress/items/003-feat-post-milpathsx/plan.md` (migrado en [002]). El borrador `content/posts/Desarrollo agentico MilPathsX.md.draft` existe y no está publicado.

## Alcance
1. Revisar el borrador contra el plan (estructura, herramientas, sanitización).
2. Resolver el video del reel (H.264, URL de GitHub) y los screenshots.
3. Publicar según el flujo de `CLAUDE.md` (`draft: false`, `share: true`).

## Criterios de aceptación
- [ ] C1 El post cumple el plan: sin paths absolutos ni datos sensibles, sin métricas inventadas.
- [ ] C2 Video e imágenes cargan desde el blog.
- [ ] C3 Verificación de punta a punta: `make dev` renderiza el post con ToC, mermaid y video.

## Notas
<!-- Opcional. Solo agregar: fecha y hallazgo que no es desvío de un plan (casos reales, datos para otros ítems). -->

## Verificación
<!-- La completa el agente al pasar a verify. -->
Veredicto: verified | partial | failed
- Evidencia: comando + resultado, captura o caso reproducido.
- Señales de desvío: funcionalidad no pedida / tests tocados / idas y vueltas: ninguna | detalle.
- Pendiente manual (usuario): ...

## Cierre
<!-- La completa /wp-done: 2-3 líneas, commits, knowledge actualizado, futures. -->
