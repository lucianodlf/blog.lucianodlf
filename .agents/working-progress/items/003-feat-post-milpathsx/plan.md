# Plan: Relato técnico del desarrollo de MilPathsX (workflow agéntico + spec-driven + vibe coding)

## Context

Plan previo (`write-relato-tecnico-de-stateless-hare.md`) revisado con comentarios del usuario que corrigen alcance, precisión técnica y mecánica de implementación. Este plan reemplaza al anterior incorporando esas correcciones. El objetivo sigue siendo un post extenso para el blog Hugo (`--verbose`) que relate el proceso de desarrollo de MilPathsX con foco en el workflow agéntico propio, el trabajo con Claude Code CLI, y el spec-driven development.

MilPathsX es una plataforma real de optimización de recorridos de reparto/recolección (origen I+D INGAR, CONICET-UTN; en desarrollo). Combina backoffice desktop, app mobile de conductor y web pública, unidos por un motor de optimización MILP.

**Decisiones ya tomadas (sin cambios):**
- Video: convertir MP4 del reel a H.264 optimizado, subir a GitHub, embeber con `<video src>`.
- Extensión: ~3500-4000 palabras, 1 parte.
- Tono: balanceado producto + proceso. Origen I+D INGAR mencionado por corrección/propiedad intelectual.
- Voz: estilo del post `content/posts/Exploracion Automatizacion Finanzas (p1).md`, castellano rioplatense, sin sobre-adjetivación.

## Cambios incorporados de la revisión del usuario

- El proyecto fuente sobre el que se escribe el post y que contene la raiz de archivos a analizar para extraer mas detalle es: /home/rafiki/Projects/milpathsx

1. **Mecánica de implementación**: el plan debe indicar explícitamente que la escritura se ejecuta con la skill `/blog write` (no como redacción manual). El uso de `mi-voz` no se menciona en el post (ya lo aplica `/blog write` internamente). El uso de `humanizer` sí se menciona brevemente como parte del proceso, ya que también está integrado al workflow de `/blog write`.

2. **Corrección de paths del workflow agéntico** (sección 5 del post, "Specs primero: el ciclo de issues"): el plan original asumía `issues/`, `sessions/` como carpetas sueltas en la raíz del proyecto. Verificado contra el proyecto real: todo vive bajo `.agents/working-progress/` (`WORKFLOW_DIR`), con `issues/todo/`, `issues/done/`, `sessions/<nombre>/{prompt.md,research.md,plan.md,fase-N-plan.md}`, `knowledge/`. Las skills `init-workflow` y `ns` ya están alineadas con esta estructura (usan `WORKFLOW_DIR`), así que no hay nada que corregir ahí — el error estaba en el plan del post, no en las skills. Mencionar también `LAST-STATUS.md` como archivo de traspaso de contexto entre sesiones largas.

3. **Descartar `z-issues-new-tmp`**: confirmado que no existe en disco ni en la documentación vigente (`WORKFLOW.md`); es un artefacto obsoleto mencionado solo en un doc legacy (`dev-workflow.md`). No debe aparecer en el post.

4. **Casos a destacar con más énfasis** en la sección 9 (antes "Cosas con las que me encontré", ahora reforzada con ejemplos concretos):
   - Desarrollo del calendario de planificaciones con drag-and-drop y seguimiento de estado en tiempo real.
   - Comparador de 2 jobs side-by-side con ruteo y mapas.
   - App mobile (hay capturas disponibles para ilustrar).

5. **Sección "El stack de herramientas agénticas" (sección 7)**: formato de lista explícito, una entrada por herramienta/skill/MCP, cada una con link y breve descripción de para qué sirve y su beneficio concreto en el workflow. Herramientas a cubrir con investigación breve previa (para poder sintetizar función + beneficio, no solo copiar la descripción del repo):
   - agentmemory — https://github.com/rohitg00/agentmemory
   - graphify — https://github.com/Graphify-Labs/graphify
   - gitnexus — https://github.com/abhigyanpatwari/GitNexus
   - rtk — https://github.com/rtk-ai/rtk
   - deepwiki — https://deepwiki.com/
   - ponytail — https://github.com/DietrichGebert/ponytail
   - playwright MCP — https://github.com/microsoft/playwright-mcp
   - impeccable — https://github.com/pbakaus/impeccable
   - ui-ux-pro-max — https://github.com/nextlevelbuilder/ui-ux-pro-max-skill

6. **Sanitización reforzada**: ningún dato sensible del proyecto milpathsx en el post — ni `DATABASE_URI`, ni credenciales dev, ni paths absolutos del filesystem local (regla nueva: usar paths relativos o descripciones genéricas en vez de `/home/rafiki/Projects/milpathsx/...`).

## Estructura del post (actualizada)

Frontmatter: title, date 2026-07-24, draft:false, share:true, featured:false, toc:true, tags: [claude, claude-code, vibe-coding, spec-driven, agentes, workflow, mcp, vue, fastapi, milp, optimizacion, milpathsx, ia]

1. **Vista previa** — video reel embebido + 2-3 screenshots del backoffice.
2. **Qué es MilPathsX y por qué lo cuento** — los dos mundos (backoffice + mobile), ciclo de 5 pasos, motor MILP, origen I+D INGAR. Por qué el relato es sobre el proceso, no solo el producto.
3. **La premisa: desarrollar con un agente sin perder el hilo** — vibe coding en serio, mantener contexto entre sesiones, qué es "spec-driven" acá.
4. **El workflow de sesiones** — `/init-workflow`, `/ns`, `/ip`; estructura de sesión (`prompt.md`, `research.md`, `plan.md`, `fase-N-plan.md`, `roadmap.md`); diagrama mermaid del ciclo de vida de sesión.
5. **Specs primero: el ciclo de issues** — carpeta `issues/` con `todo/` y `done/` bajo el directorio de trabajo agéntico del proyecto (paths relativos, no absolutos); roadmap como fuente de verdad; 57 issues en 9 fases; criterios de aceptación antes de código; `LAST-STATUS.md` como mecanismo de traspaso de contexto entre sesiones largas.
6. **Cosecha de conocimiento** — carpeta `knowledge/`: extraer decisiones/workarounds/lógica de negocio al cerrar issues; ejemplo real (método de auditoría UI/UX, ciclo de vida de jobs).
7. **El stack de herramientas agénticas** — lista formateada, una entrada por herramienta, con link + descripción breve de función y beneficio en el workflow (ver lista de la sección "Cambios incorporados" punto 5 arriba). Incluir también CLAUDE.md/CLAUDE.local.md como reglas duras (sin exponer contenido sensible) y `.mcp.json` mencionado solo conceptualmente (sin snippets con credenciales).
8. **Spec-driven en la práctica: el design system** — PRODUCT.md por dominio (backoffice, mobile), migración de stack de UI como caso de spec grande, auditoría UI/UX con impeccable.
9. **Cosas con las que me encontré** — fricciones honestas: código desactualizado y verificación manual, ponytail vs sobre-ingeniería, consumo de tokens, impacto de cambios en migraciones. Casos destacados con más detalle: calendario de planificaciones drag-and-drop con estado en tiempo real, comparador de jobs side-by-side con mapas, app mobile (con capturas).
10. **El motor de optimización** — breve, sin detalles del modelo ni código (propiedad intelectual sensible, desarrollado por equipo especialista de tesis). Mención del propio aporte: proceso de I+D asistido para probar alternativas, heurística propia como mock rápido y luego alternativa más rápida al MILP exacto, jobs vía ARQ, comparación de resultados. Mostrar que no todo es "vibe": hay núcleo determinista y matemático.
11. **Conclusión** — qué funcionó del proceso agéntico, dónde el agente aporta y dónde no, delegar vs decidir. Estado del proyecto (en desarrollo, I+D).

## Assets (verificados, sin cambios respecto al plan previo)

| Asset | Tratamiento |
|---|---|
| Reel MP4 | Convertir a H.264 con ffmpeg, subir a GitHub, embeber `<video>` |
| Screenshots backoffice | 3-4 representativos: tablero planificaciones, card COMPLETADO, card PLANIFICADO |
| Screenshots mobile | Si están disponibles, para ilustrar el caso destacado de la app mobile |
| Escenas JSX del reel | Solo mención textual |

ffmpeg disponible. rsvg-convert/inkscape/gifski no disponibles.

## Entregables concretos para la implementación

1. **Convertir y ubicar el video**: `ffmpeg -i <reel> -c:v libx264 -crf 28 -preset slow -movflags +faststart -an <output>`. Verificar peso menor al original. No commitear el MP4 al repo del blog; el usuario lo sube a GitHub y provee la URL — dejar placeholder marcado en el post hasta reemplazo.
2. **Copiar screenshots seleccionados** a `static/assets/` (convención Enveloppe o nombre descriptivo); referenciar con `../../assets/<file>.png`.
3. **Ejecutar la skill `/blog write`** para generar el post en `content/posts/Desarrollo agentico MilPathsX.md` (o nombre que confirme el usuario), pasándole la estructura de arriba como brief. `/blog write` aplica internamente el perfil de voz y el paso de humanización — no se invoca `mi-voz` por separado, y `humanizer` se menciona brevemente en el post como parte de ese proceso, sin más detalle.
4. Incluir en el post: 1-2 diagramas mermaid (ciclo de sesión, ciclo de vida de issue), bloques de código no sensibles extraídos de las specs (estructura de `sessions/`, tabla de estados de issue), la lista de herramientas con links y descripciones (sección 7).
5. **Sanitización final**: revisar que no haya paths absolutos del filesystem local, credenciales, URIs de base de datos, ni datos sensibles de milpathsx. Reemplazar cualquier path absoluto por relativo o descripción genérica.
6. Reportar al usuario: peso final del video, screenshots elegidos, conteo de palabras, URL-placeholder del video pendiente de reemplazo.

## Verificación end-to-end

- `cd /home/rafiki/Projects/blog-personal && make dev` y revisar el post renderizado: frontmatter parsea, mermaid renderiza, imágenes cargan desde `static/assets/`, ToC aparece (toc:true), highlight dracula en bloques de código.
- Verificar que el `<video>` embed sigue la sintaxis del post de ejemplo.
- Revisar ausencia de emojis fuera de diagramas mermaid, ausencia de em-dashes (regla CLAUDE.md global), ausencia de paths absolutos.
- Confirmar que ningún dato sensible de milpathsx (URIs, credenciales, paths absolutos, detalles del modelo MILP) aparece en el post.
- Confirmar que no se fabrican métricas de negocio/adopción no verificadas.

## Notas de riesgo (sin cambios de fondo, reforzadas)

- Proyecto privado: no exponer secretos ni paths absolutos del filesystem.
- No fabricar métricas de negocio/adopción.
- Video no se commitea al repo del blog, vive como attachment de GitHub.
- `z-issues-new-tmp` no existe y no debe mencionarse; confirmado como artefacto obsoleto de un doc legacy interno de milpathsx, no de las skills del sistema.
