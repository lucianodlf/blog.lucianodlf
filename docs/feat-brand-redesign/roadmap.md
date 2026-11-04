# feat-brand-redesign · roadmap

Implementación de `plan.md` en fases. Cada fase termina con build limpio, revisión en ambos temas y un commit. Marcar `[x]` al completar.

Verificación común a todas las fases (abreviada **VC**):

- `hugo --minify` sin errores ni warnings nuevos; `npx pagefind --site public` indexa.
- Capturas con Playwright a 375, 768 y 1280px, en dark y light, de las páginas tocadas.
- Checklist de JS (`plan.md` §3.7): `/`, Ctrl+K, flechas, Enter, Esc, `?`, `gg`, `G`, `w`, toggle de tema y su persistencia.
- Sin scroll horizontal a 320px.

---

## Fase 0 · Preparación

- [ ] Instalar Hugo extended (misma versión que resuelva `latest` en CI; anotarla) y verificar `npx pagefind`.
- [ ] `git submodule update --init --recursive`.
- [ ] Capturas "antes" de home, `/posts/`, un post con tabla, callouts, código y ToC (Benchmarking Ollama), `/projects/`, en ambos temas. Guardarlas fuera del repo.
- [ ] Resolver con el usuario las decisiones D1 a D15 (`plan.md` §11) y anotar la respuesta al lado de cada una.
- [ ] Si D15 = sí: actualizar el artifact del DS (tokens nuevos) y leer `project/tokens.json` de nuevo.

**Hecho cuando:** hay build local idéntico al de producción y las decisiones están anotadas.

## Fase 1 · Fundaciones visuales

- [ ] `static/css/tokens.css` desde `tokens.json` del DS (dark en `:root`, light en `html.light`), más espaciado, radios, fuentes, medidas.
- [ ] `head.html`: IBM Plex (Sans 400/400i/600, Mono 400/500/600) con preconnect; quitar JetBrains Mono, dracula y risotto.css; cargar `tokens.css`, `main.css`, `chroma.css`.
- [ ] `main.css` base: reset mínimo, tipografía (§4.2), links, listas, `hr`, `kbd`, foco, skip link, reduced motion.
- [ ] Migrar de `custom.css` a `main.css`: modales, Pagefind, tablas, tags, `.kb-selected`, wide. Borrar `custom.css`.
- [ ] Callouts nuevos (§4.5) sin cambiar selectores.
- [ ] `hugo.toml`: `noClasses = false`; `chroma.css` por tokens (§4.6); quitar el filtro de light.
- [ ] `mermaid.js`: `themeVariables` desde variables CSS para ambos temas.

**Hecho cuando:** los 6 posts publicados se leen bien en ambos temas, con código, tablas, callouts y mermaid correctos (VC). El layout todavía puede ser el de Risotto.

## Fase 2 · Shell (header, footer, contenedor)

- [ ] `layouts/_default/baseof.html` propio: skip link, header, `main`, footer; contenedor que responde a `html.wide`.
- [ ] `partials/header.html`: wordmark con cursor, nav desde `[[menus.main]]`, búsqueda, `#theme-toggle`, `?`; versión mobile en dos filas.
- [ ] `hugo.toml`: `[[menus.main]]` Blog, Proyectos, CV; `params.status`; copyright sin emoji; `baseURL` al dominio real.
- [ ] Si D4 = sí: botones de búsqueda y ayuda con listeners en `keybindings.js` (llamar a `openSearch` y `toggleHelp` existentes).
- [ ] `partials/footer.html` nuevo (§5.2), conservando `search.html` y `ls -t posts/`.
- [ ] Restyle de los modales de búsqueda y ayuda (§5.3).
- [ ] Favicon (SVG + PNG) y og:image por defecto (§4.9); meta description por página.

**Hecho cuando:** todas las páginas existentes usan el shell nuevo, sin sidebar, y el VC pasa completo.

## Fase 3 · Blog

- [ ] Componentes `card-post`, `chip`, `eyebrow`.
- [ ] `/posts/`: título con cursor, bajada, chips de tags, destacado, lista por año (§6.2).
- [ ] Post: header con metadatos y `#wide-toggle`, ToC lateral sticky o `<details>` en mobile, prev/next, card de autor, crédito para `author`/`source` (§6.3).
- [ ] `terms.html` y `taxonomy.html` (§6.7).
- [ ] `404.html`.

**Hecho cuando:** blog, posts, tags y 404 pasan VC; `tables.js` sigue encontrando `.content__body table`.

## Fase 4 · Proyectos

- [ ] Componentes `card-project`, `stat`, `cover-svg` (composición del DS parametrizada con título).
- [ ] Bundles `content/projects/<slug>/index.md` con el contenido de `plan.md` §6.4 (textos desde LinkedIn unificado; links solo verificados).
- [ ] `layouts/projects/list.html` (clientes / propios) y `single.html` (caso).
- [ ] Migrar imágenes existentes a los bundles; covers generados para clientes.
- [ ] Borrar `data/projects.json`; actualizar README (sección "Proyectos destacados").

**Hecho cuando:** `/projects/` y cada detalle pasan VC y no hay links rotos (verificar con curl).

## Fase 5 · CV

- [ ] `data/cv.yaml` desde LinkedIn unificado + estructura del CV base (sin teléfono).
- [ ] `content/cv.md` + layout `cv` (§6.5) con índice sticky y timeline.
- [ ] `print.css` (paleta light forzada, sin nav, sin ligaduras, `break-inside: avoid`).
- [ ] PDF en `static/cv/` si D3 lo define; botón condicionado a que exista.

**Hecho cuando:** `/cv/` pasa VC y la vista de impresión de Chromium (Playwright `page.pdf()`) da un documento limpio de 2 a 3 páginas.

## Fase 6 · Home

- [ ] `data/home.yaml` (hero, métricas, servicios, workflow, trayectoria).
- [ ] `layouts/index.html` con las 9 secciones de §6.1; README personal desde `content/_index.md`.
- [ ] Hero con composición del DS + avatar; versión mobile.
- [ ] Revisión de textos con la voz del usuario (D10).

**Hecho cuando:** la home pasa VC y cada sección enlaza a su destino.

## Fase 7 · Página de enlaces

- [ ] `data/links.yaml` + `content/links.md` (`type: links`, alias `/l/` según D5).
- [ ] `layouts/links/single.html` standalone + `static/css/links.css`.
- [ ] Posts automáticos (últimos 2), `#theme-toggle`, anti-flash.
- [ ] Excluir de Pagefind.
- [ ] Opcional: QR SVG con tokens `qr-ink`/`qr-ground`.

**Hecho cuando:** `/links/` pasa VC a 375px como caso principal y funciona sin el resto del CSS del sitio.

## Fase 8 · Cierre

- [ ] D6: atributos de Pagefind en todos los tipos a la vez; probar búsqueda de un post, un proyecto y el CV.
- [ ] D7/D8: quitar submodule Risotto y Academicons si el build sigue limpio; borrar `about.html`.
- [ ] Lighthouse (accesibilidad ≥ 95) y axe en home, post, CV y links, ambos temas.
- [ ] Capturas "después" y comparación con las de Fase 0.
- [ ] Actualizar `README.md` y `CLAUDE.md` (URL, estructura, CSS, paleta, pendientes resueltos).
- [ ] Push a la rama y PR (solo si el usuario lo pide).
