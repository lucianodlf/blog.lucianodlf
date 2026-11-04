# feat-brand-redesign · roadmap

Implementación de `plan.md` en fases. Cada fase termina con build limpio, revisión en ambos temas y un commit. Marcar `[x]` al completar.

Verificación común a todas las fases (abreviada **VC**):

- `hugo --minify` sin errores ni warnings nuevos; `npx pagefind --site public` indexa.
- Capturas con Playwright a 375, 768 y 1280px, en dark y light, de las páginas tocadas.
- Checklist de JS (`plan.md` §3.7): `/`, Ctrl+K, flechas, Enter, Esc, `?`, `gg`, `G`, `w`, toggle de tema y su persistencia.
- Sin scroll horizontal a 320px.

---

## Fase 0 · Preparación

- [x] Instalar Hugo y verificar `npx pagefind`. Hugo v0.169.0 (no extended, vía `go install`; GitHub releases bloqueado en el contenedor). No hace falta extended: no hay SCSS y WebP funciona.
- [x] `git submodule update --init --recursive` (y en Fase 8, submodule eliminado).
- [ ] Capturas "antes": no se tomaron (build "antes" en `/tmp` sin capturas). Se tomaron capturas "después" en 320/375/768/1280, dark y light.
- [x] Decisiones D1 a D15 resueltas con autonomía delegada por el usuario (ver "Decisiones tomadas" al final).
- [ ] D15: tokens candidatos aplicados en `static/css/tokens.css`; el artifact del DS no se modificó (pendiente).

**Hecho cuando:** hay build local idéntico al de producción y las decisiones están anotadas.

## Fase 1 · Fundaciones visuales

- [x] `static/css/tokens.css` desde `tokens.json` del DS (dark en `:root`, light en `html.light`), más espaciado, radios, fuentes, medidas.
- [x] `head.html`: IBM Plex (Sans 400/400i/600, Mono 400/500/600) con preconnect; quitar JetBrains Mono, dracula y risotto.css; cargar `tokens.css`, `main.css`, `chroma.css`.
- [x] `main.css` base: reset mínimo, tipografía (§4.2), links, listas, `hr`, `kbd`, foco, skip link, reduced motion.
- [x] Migrar de `custom.css` a `main.css`: modales, Pagefind, tablas, tags, `.kb-selected`, wide. Borrar `custom.css`.
- [x] Callouts nuevos (§4.5) sin cambiar selectores.
- [x] `hugo.toml`: `noClasses = false`; `chroma.css` por tokens (§4.6); quitar el filtro de light.
- [x] `mermaid.js`: `themeVariables` desde variables CSS para ambos temas.

**Hecho cuando:** los 6 posts publicados se leen bien en ambos temas, con código, tablas, callouts y mermaid correctos (VC). El layout todavía puede ser el de Risotto.

## Fase 2 · Shell (header, footer, contenedor)

- [x] `layouts/_default/baseof.html` propio: skip link, header, `main`, footer; contenedor que responde a `html.wide`.
- [x] `partials/header.html`: wordmark con cursor, nav desde `[[menus.main]]`, búsqueda, `#theme-toggle`, `?`; versión mobile en dos filas.
- [x] `hugo.toml`: `[[menus.main]]` Blog, Proyectos, CV; `params.status`; copyright sin emoji; `baseURL` al dominio real.
- [x] Si D4 = sí: botones de búsqueda y ayuda con listeners en `keybindings.js` (llamar a `openSearch` y `toggleHelp` existentes).
- [x] `partials/footer.html` nuevo (§5.2), conservando `search.html` y `ls -t posts/`.
- [x] Restyle de los modales de búsqueda y ayuda (§5.3).
- [x] Favicon (SVG + PNG) y og:image por defecto (§4.9); meta description por página.

**Hecho cuando:** todas las páginas existentes usan el shell nuevo, sin sidebar, y el VC pasa completo.

## Fase 3 · Blog

- [x] Componentes `card-post`, `chip`, `eyebrow`.
- [x] `/posts/`: título con cursor, bajada, chips de tags, destacado, lista por año (§6.2).
- [x] Post: header con metadatos y `#wide-toggle`, ToC lateral sticky o `<details>` en mobile, prev/next, card de autor, crédito para `author`/`source` (§6.3).
- [x] `terms.html` y `taxonomy.html` (§6.7).
- [x] `404.html`.

**Hecho cuando:** blog, posts, tags y 404 pasan VC; `tables.js` sigue encontrando `.content__body table`.

## Fase 4 · Proyectos

- [x] Componentes `card-project`, `stat`, `cover-svg` (composición del DS parametrizada con título).
- [x] Bundles `content/projects/<slug>/index.md` con el contenido de `plan.md` §6.4 (textos desde LinkedIn unificado; links solo verificados).
- [x] `layouts/projects/list.html` (clientes / propios) y `single.html` (caso).
- [x] Migrar imágenes existentes a los bundles; covers generados para clientes.
- [x] Borrar `data/projects.json`; actualizar README (sección "Proyectos destacados").

**Hecho cuando:** `/projects/` y cada detalle pasan VC y no hay links rotos (verificar con curl).

## Fase 5 · CV

- [x] `data/cv.yaml` desde LinkedIn unificado + estructura del CV base (sin teléfono).
- [x] `content/cv.md` + layout `cv` (§6.5) con índice sticky y timeline.
- [x] `print.css` (paleta light forzada, sin nav, sin ligaduras, `break-inside: avoid`).
- [ ] PDF en `static/cv/`: botón condicionado implementado; falta el archivo (generarlo con `cv.py`). Mientras tanto, botón de imprimir.

**Hecho cuando:** `/cv/` pasa VC y la vista de impresión de Chromium (Playwright `page.pdf()`) da un documento limpio de 2 a 3 páginas.

## Fase 6 · Home

- [x] `data/home.yaml` (hero, métricas, servicios, workflow, trayectoria).
- [x] `layouts/index.html` con las 9 secciones de §6.1; README personal desde `content/_index.md`.
- [x] Hero con composición del DS + avatar; versión mobile.
- [ ] Revisión de textos con la voz del usuario (D10): textos escritos desde CV/LinkedIn/BIORG, pendiente de validación.

**Hecho cuando:** la home pasa VC y cada sección enlaza a su destino.

## Fase 7 · Página de enlaces

- [x] `data/links.yaml` + `content/links.md` (`type: links`, alias `/l/` según D5).
- [x] `layouts/links/single.html` standalone + `static/css/links.css`.
- [x] Posts automáticos (últimos 2), `#theme-toggle`, anti-flash.
- [x] Excluir de Pagefind.
- [ ] Opcional: QR SVG (no hecho).

**Hecho cuando:** `/links/` pasa VC a 375px como caso principal y funciona sin el resto del CSS del sitio.

## Fase 8 · Cierre

- [x] D6: atributos de Pagefind en todos los tipos a la vez; probar búsqueda de un post, un proyecto y el CV.
- [x] D7/D8: quitar submodule Risotto y Academicons si el build sigue limpio; borrar `about.html`.
- [x] axe-core 4.10 (wcag2a, wcag2aa, best-practice) en home, blog, post, proyectos, proyecto, CV, links y tags, ambos temas: 0 violaciones de layout. Quedan 2 del markdown del post de benchmark (`heading-order`, `empty-table-header`). Lighthouse no se corrió.
- [x] Capturas "después" (sin comparación: no hay "antes").
- [x] Actualizar `README.md` y `CLAUDE.md` (URL, estructura, CSS, paleta, pendientes resueltos).
- [x] Push a la rama. PR: no (no se pidió).

---

## Decisiones tomadas (2026-11-04, implementación)

| # | Decisión |
| --- | --- |
| D1 | Dark por defecto; light con `html.light`. Impresión fuerza light. |
| D2 | Fila de emojis quitada del README de la home; el texto se mantiene (con typos corregidos). |
| D3 | Sin PDF en el repo por ahora; botón condicionado + impresión del navegador (3 páginas A4). |
| D4 | Sí: botones Buscar y `?` en el header (`#search-open`, `#help-open`). |
| D5 | `/links/` + alias `/l/`. |
| D6 | Sí: `data-pagefind-body` en posts, proyectos y CV (16 páginas indexadas). |
| D7 | Sí: submodule Risotto eliminado; build limpio sin theme. |
| D8 | Sí: Academicons eliminado. |
| D9 | No por ahora (og:image por defecto generado). |
| D10 | Métricas: 2006, +20, 2 de 3, 7. Servicios: 6 de LinkedIn. Textos pendientes de validar. |
| D11 | No se tocó el contenido de Obsidian; los tags se muestran en minúscula en templates. |
| D12 | MinguitoD, NotesMD, summary-gitlab-issues y n8n-shbase no se listan. |
| D13 | Post de MilPathsX sigue en draft; AppLogistic sin link a post. |
| D14 | Home destaca gplnr, Benchmarking y Cómo construí este blog (`data/home.yaml`, `featuredPosts`); `featured` del frontmatter se usa en el índice del blog. |
| D15 | Tokens candidatos aplicados en el sitio; actualizar el artifact del DS queda pendiente. |
