# feat-brand-redesign · estado para retomar

Actualizado: 2026-11-04. Rama: `claude/blissful-meitner-vg30tk` (sin PR, sin merge a `main`).

## Dónde quedó

Plan implementado completo (fases 0 a 8 de `roadmap.md`). El sitio buildea limpio con Hugo 0.169 sin theme, Pagefind indexa 16 páginas (posts, proyectos, CV).

- Textos de home (`data/home.yaml`), CV (`data/cv.yaml`) y proyectos (`content/projects/*/index.md`) reescritos desde los originales: CV base v1 (2026-11-04) y LinkedIn unificado (02/11/26). Esos archivos fuente no están versionados en este repo.
- Design system (artifact `https://claude.ai/artifact/1Cb555udMz1t4gBdSJczcs`) en tokens v2; `static/css/tokens.css` alineado a mano.
- CV impreso desde el navegador: 3 páginas A4 (oculta stack, modalidad, proyectos y experiencias complementarias).

## Verificado

- Atajos y contratos de JS: `/`, Ctrl+K, flechas, Enter, Esc, `?`, `w`, `gg`, `G`, toggle de tema con persistencia, botones del header, tablas, callouts, mermaid (ambos temas).
- Sin scroll horizontal a 320, 375, 768 y 1280 px, dark y light.
- axe: 0 violaciones de layout. Lighthouse 12.2.1: 100 en accesibilidad, buenas prácticas y SEO (home, CV, links); post de benchmark 98 por su markdown.
- 404, alias `/l/`, sitemap sin `/links/`, favicon, og:image, RSS. Repos enlazados públicos (API de GitHub).
- Comparación visual: `antes-despues.png`.

## Pendiente

1. Lectura final de textos por el usuario (home, CV, proyectos).
2. PDF del CV en `static/cv/luciano-delfino-cv.pdf` (generar con `python3 mi-profile/build/cv.py mi-profile/cv/cv-base.es.md --aire=1.5`); el botón aparece solo si existe.
3. Merge a `main` (dispara el deploy) y verificar el sitio publicado.
4. Opcionales: og:image por post, QR de `/links/`, Giscus.
5. Post de benchmark: `heading-order` y una celda de encabezado vacía (se corrige en Obsidian).

## Para retomar

Leer `prompt.md`, `plan.md`, `roadmap.md` y este archivo. Build local: `make dev` (Hugo y Node). En un contenedor sin Hugo: `CGO_ENABLED=0 go install github.com/gohugoio/hugo@latest`.
