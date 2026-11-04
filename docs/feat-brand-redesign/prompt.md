# feat-brand-redesign · prompt

Sesión: `feat-brand-redesign`. Rama de trabajo: `claude/blissful-meitner-vg30tk`.
Fecha: 2026-11-04.

## Pedido (resumen del usuario)

1. Comprender el proyecto `blog.lucianodlf` en profundidad y proponer cambios **estéticos y de layout**, sin tocar funcionalidad (cambio de tema, keybindings, búsqueda, wide toggle, callouts, tablas, mermaid).
2. Adaptar el estilo al design system personal **lucianodlf** en ambos temas (light y dark). No solo tokens y fuentes: estilo visual completo, esquinas levemente redondeadas, lectura limpia y clara.
3. Convertir el sitio en una página de presentación de marca personal con: home, posts destacados, blog, sección de proyectos y CV completo. Referencia estructural (no visual): https://www.adityabawankule.io/
4. Usar el material de perfil entregado para escribir textos y armar contenido (CV base, CV docencia, LinkedIn unificado, mensaje BIORG). La frase final de BIORG es la más relevante para la propuesta de valor. Las experiencias más completas están en LinkedIn.
5. Crear una página tipo linktree (va a tener su propia URL, todo bajo el dominio personal) con el mismo design system. Referencia estructural: https://linktr.ee/ecosistema.nuomi (sin el botón de Linktree arriba a la izquierda).
6. Autonomía total y creatividad de especialista en diseño y marca personal. **En esta sesión solo se traza la propuesta completa**; la implementación de punta a punta se hace en otra sesión.

## Fuentes

- Design system: https://claude.ai/artifact/1Cb555udMz1t4gBdSJczcs (`project/README.md`, `project/tokens.json`, `project/components/Cover/preview.html`).
- Material de perfil (subido por el usuario, no versionado en este repo): `cv-base.es.md` (v1, 2026-11-04), `cv-docencia.es.md` (v3), `linkedin-unificado.md` (02/11/26), `mensaje-red-biorg.md` (versión final 04/11/2026).
- Repo: `hugo.toml`, `layouts/`, `static/`, `content/`, `data/projects.json`, `BRAND.md`, `VOICE.md`, theme `themes/risotto` (commit `1e25757`).

## Archivos de esta sesión

- `research.md`: análisis del estado actual, design system, referencias e inventario de contenido.
- `plan.md`: la propuesta completa (arquitectura, lenguaje visual, especificación por página, textos).
- `roadmap.md`: fases de implementación con TODOs y criterios de aceptación.

Al retomar: leer `estado.md` (estado actual), luego `plan.md` y `roadmap.md`.

Nota: estos documentos viven en `docs/` (versionado) y no en `.agents/working-progress/` (ignorado por git) para que la sesión de implementación, local o en la nube, los tenga en el clon.
