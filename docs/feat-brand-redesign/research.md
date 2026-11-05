# feat-brand-redesign · research

## 1. Estado actual del sitio

### Stack y build

- Hugo extended (CI usa `latest` vía `peaceiris/actions-hugo@v3`), theme Risotto como submodule (`themes/risotto`, commit `1e25757`).
- Deploy: `.github/workflows/deploy.yml` → `scripts/fix-assets.sh` → `hugo --minify --baseURL <pages url>` → `npx pagefind --site public` → GitHub Pages.
- Dominio real: `https://lucianodlf.github.io/blog.lucianodlf/` y `https://lucianodlf.com.ar` responden 301 hacia `https://lucianodlf.is-a.dev/` (verificado con curl el 2026-11-04). El repo en GitHub tiene `homepage = https://lucianodlf.is-a.dev/`. `hugo.toml` y `CLAUDE.md` todavía dicen `lucianodlf.github.io/blog.lucianodlf`.
- No hay `hugo` instalado en el contenedor de esta sesión; la sesión de implementación tiene que instalar Hugo extended y tener `npx` para Pagefind.

### Layout heredado de Risotto

`themes/risotto/layouts/_default/baseof.html`:

```
.page (grid, max-width 64rem)
  header.page__header   → partials/header.html (logo = .Site.Title + menú main)
  section.page__body    → block "main"
  section.page__aside   → partials/about.html + block "aside"   (sidebar sticky 15rem)
  footer.page__footer   → partials/footer.html
```

- CSS del theme: `css/palettes/dracula.css` (variables base16) + `css/risotto.css` (colours, typography, layout, header, logo, about, footer). Todo monoespaciado.
- `colours.css` mapea base16 a `--bg --off-bg --inner-bg --fg --off-fg --muted --link --hover --highlight --logo`.

### Overrides propios (`layouts/`)

| Archivo | Qué hace hoy |
| --- | --- |
| `partials/head.html` | anti-flash de tema (`html.light`, `html.wide` desde localStorage), title, OG, FontAwesome 6.6.0 y Academicons 1.9.4 (cdnjs), carga palette + risotto.css + custom.css, favicons condicionales, scripts `callouts.js`, `keybindings.js`, `tables.js`, `mermaid.js` |
| `partials/about.html` | sidebar: avatar, título, descripción, social links, keyhints (`/`, Ctrl+K, `?`), botones `#theme-toggle` y `#wide-toggle`, lista de `featured: true` como `$ cat destacados.txt` |
| `partials/footer.html` | incluye `search.html`, últimos 3 posts como `$ ls -t posts/ \| head -3`, copyright |
| `partials/search.html` | Pagefind UI en `<dialog id="search-modal">` y ayuda en `<dialog id="help-modal">` |
| `_default/single.html` | título, body (`.content__body`), tags; aside con fecha, reading time y ToC si `toc: true` |
| `projects/list.html` | grid de cards desde `data/projects.json` (imagen cuadrada + nombre) |
| `_markup/render-blockquote.html` | GFM alerts → `.callout.callout--<type>` con ícono FA |
| `_markup/render-codeblock-mermaid.html` | `<pre class="mermaid">` |

El listado de posts (`/posts/`) usa `themes/risotto/layouts/_default/list.html` (lista `<ul>` de títulos), porque `layouts/post/list.html` del theme es para el tipo `post` y el contenido es `posts`.

### JS y sus contratos con el DOM (no romper)

| Script | Depende de |
| --- | --- |
| `keybindings.js` | `#theme-toggle`, `#wide-toggle`, `#search-modal`, `#help-modal`, `.pagefind-ui__result`, clases `html.light` y `html.wide`, `localStorage` keys `theme` y `wide`, clase `.kb-selected` |
| `tables.js` | `.content__body table` (wrappea en `.table-wrap`, agrega `.table-toggle` y `.table-raw`) |
| `callouts.js` | cualquier `blockquote` con `[!TYPE]` → `.callout.callout--<type>` |
| `mermaid.js` | `.mermaid`, `html.light`; colores dracula hardcodeados en `themeVariables` |
| `head.html` inline | `html.light`, `html.wide` |

`html.wide .page { max-width: 90rem }` en `custom.css` es lo que hace el toggle `w`. El nuevo layout tiene que mantener un contenedor que reaccione a `html.wide`.

### Estilos propios (`static/css/custom.css`, ~10 KB)

JetBrains Mono global, light mode como override de variables base16, filtro CSS `invert + hue-rotate` sobre bloques de código en light (parche temporal declarado en CLAUDE.md), estilos de modales, Pagefind, callouts (borde izquierdo de color), avatar circular, tags, tablas, project cards.

### Syntax highlighting

`[markup.highlight] style = "dracula", noClasses = true`: estilos inline en cada token. Por eso light necesita el filtro CSS. Para un tema por modo hay que pasar a `noClasses = false` y generar CSS de Chroma por tema.

### Contenido

| Post | Fecha | featured | toc | Notas |
| --- | --- | --- | --- | --- |
| Cómo construí este blog | 2026-01-23 | no | sí | write-up técnico |
| No soy "Yo" quien escribe | 2026-03-25 | **sí** | no | escrito/poema |
| Automatizar el registro de gastos (p1) | 2026-03-26 | no | sí | relacionado con repo `ia-update-gestion-personal` |
| gplnr: Get Path Line Number Reference | 2026-05-26 | **sí** | no | relacionado con repo `gplnr` |
| Benchmarking de modelos de visión con Ollama | 2026-07-21 | no | sí | relacionado con el trabajo en Innovat |
| Conciencia y Destino - Reflexión Casa XI | 2026-07-30 | **sí** | no | frontmatter `author: Julian Cardoso Correa` y `source:` externo; el título dice "Casa XI" y el archivo "Casa XII" |
| Desarrollo agentico MilPathsX (`.md.draft`) | 2026-07-24 | no | sí | `share: false`, no publicado |

Home (`content/_index.md`): bloque `bash` con `$ whoami (Anātman)` y `$ cat readme.txt`, texto poético y una fila de emojis.

`data/projects.json`: Este blog, gplnr, Automatización Gastos, NotesMD (`github.com/lucianodlf/notesmd`), MiTarasca (demo).

### Repos públicos verificados (`gh api search/repositories user:lucianodlf`, 2026-11-04)

| Repo | Público | Homepage / descripción |
| --- | --- | --- |
| `mitarasca` | sí | `https://mitarasca.demo.lucianodlf.com.ar` (responde 200). "Finanzas personales local-first: movimientos, deudas y cuotas en un SQLite tuyo. Web, CLI y MCP." |
| `gplnr` | sí | simple vscode ext "Get Path Line Number Reference" |
| `ia-update-gestion-personal` | sí | Integración telegram+n8n para automatizar update de cuentas personales |
| `blog.lucianodlf` | sí | `https://lucianodlf.is-a.dev/` |
| `summary-gitlab-issues` | sí | changelog desde issues de GitLab con Gemini |
| `n8n-shbase` | sí | template n8n self-hosted |
| `dotfiles` | sí | |
| `minguitod` | **privado** | continuación de NotesMD |
| `notesmd` | **no aparece** | el link de `data/projects.json` y de `cv-docencia` probablemente está roto |

El CV base enlaza `github.com/lucianodlf/minguitod`, que es privado: un visitante ve 404.

### Imágenes disponibles

`static/img/avatar.jpg` (944x1104), `static/img/projects/` (mitarasca 1024², gplnr-icon 1024², automatizar-gastos 1722x723, notesmd 344x302, `hugo-blog.png` es en realidad un JPEG idéntico en tamaño al avatar). `static/assets/` tiene las imágenes de posts subidas por Enveloppe.

## 2. Design system lucianodlf (resumen operativo)

Fuente: artifact `1Cb555udMz1t4gBdSJczcs`, `project/tokens.json` y `project/README.md`.

### Color

| Token | Light (principal) | Dark (técnico) | Uso |
| --- | --- | --- | --- |
| `background` | `#f7f5ec` | `#09120e` | fondo de página |
| `surface` | `#fdfcf7` | `#111e19` | cards, paneles |
| `border` | `#dad8cd` | `#24312c` | divisores, decorativo (1.3 a 1.4:1) |
| `text` | `#111e19` | `#edebe4` | texto principal |
| `muted` | `#53615c` | `#84938d` | secundario, metadatos |
| `primary` | `#2a7449` | `#68b986` | links, títulos de sección, botones, foco |
| `on-primary` | `{surface}` | `{background}` | texto sobre relleno primary |
| `primary-soft` | `#c5e8d0` | (pendiente, hereda) | fondo de chips, texto en `text` |
| `primary-deep` | (pendiente, hereda) | `#3a8357` | solo dark: bordes, fondos, decoración |
| `accent` | `#965719` | `#e4ac59` | ámbar, solo acento puntual (cursor `_`) |
| `qr-ink` / `qr-ground` | `{text}` / `{surface}` | `{surface}` / `{text}` | QR siempre oscuro sobre claro |

Huecos del DS que afectan al sitio:

1. `primary-soft` no tiene valor dark: en dark `#c5e8d0` sería un bloque claro brillante. Hay que definirlo.
2. No hay tokens semánticos para callouts (nota, tip, atención, precaución, importante). La precaución necesita un rojo que hoy no existe.
3. No hay tokens de sombra (consistente con "bordes antes que sombras") ni de motion.

### Tipografía

- IBM Plex Sans (400, 600) para todo el texto: `display` 40/44 600 -0.01em, `heading-1` 28/34 600, `heading-2` 20/28 600, `body` 16/24 400, `small` 14/20 400.
- IBM Plex Mono (400, 500, 600) para wordmark (32/36 600), `code` 14/20 400, `label` 12/16 500 +0.04em.
- Google Fonts. Sin ligaduras en documentos para imprimir.

### Forma

- Espaciado base 4px: `space-1` 4, `space-2` 8, `space-4` 16, `space-8` 32.
- Radios: `radius-sm` 4 (tags, chips, code inline), `radius-md` 8 (cards, botones, terminal), `radius-full` (avatar, pills).
- Bordes antes que sombras. Sin gradientes. Foco: anillo sólido 2px `primary`, offset 2px.

### Marca y voz

- Sin logo gráfico. Wordmark: `lucianodlf` en Plex Mono 600 color `text` + cursor `_` en `accent`. En el sitio puede llevar el flag: `lucianodlf -v`.
- Motivo terminal en títulos y detalles (`$ whoami`, `ls -t posts/ | head -3`), no en párrafos.
- Español, primera persona, resultados concretos, sin emojis ni em-dash, `|` o `·` como separadores.
- Portada del DS: composición geométrica sobre `background`: losa `primary` alta que sangra por arriba, bloque `text` con grilla de puntos calada (paso 32px, r 2px), barra `accent` 32x8 (el cursor), banda `primary-soft` abajo, esquinas `radius-md`. Es el activo visual más fuerte del sistema y se reutiliza en el hero y en el og:image.

## 3. Referencias estructurales

### adityabawankule.io (analizado el 2026-11-04)

- Nav superior con muchas secciones (Home, About, Projects, Tools, Guides, Blog, Thoughts, Uses, Play, Resume, Contact, Support).
- Home: hero (nombre, línea de rol "AI Software Engineer · Ex-Meta · Seattle", intro, bio corta, fila de CTAs) → temas → últimos posts (3 cards con fecha e imagen + "View all") → proyectos (4 cards con tags + "View all") → tools → juegos.
- Blog: título con punto final ("Blog."), subtítulo de una línea, accesos por tema, lista vertical de cards (imagen, fecha, título, extracto, tags), sin paginación.
- Projects: grid de cards (imagen, fecha, título, 1 a 2 frases, tags) con página de detalle por proyecto.
- Resume: título + resumen, contacto, botón Download PDF, franja de 4 métricas, experiencia en orden inverso con expandir detalles, skills agrupadas por categoría entre corchetes, educación, certificaciones.
- About: intro, qué construyo, cómo trabajo, background, contacto, FAQ.
- Footer: nombre + tagline, nav repetida, línea de estado "All systems operational", redes.

Qué tomar: el ritmo de la home (hero fuerte y secciones con "ver todo"), cards consistentes con metadatos, el CV web con PDF y métricas, la línea de estado en el footer, títulos cortos con remate tipográfico. Qué no tomar: la cantidad de secciones (para este perfil alcanzan cinco), la estética neón/gaming, el chat con IA.

### linktr.ee/ecosistema.nuomi

Columna centrada: avatar redondo → nombre → bio de una línea → bloques por sección con encabezado ("Sobre NUoMI", "REDES", "NOTICIAS") → botones de ancho completo con miniatura o ícono a la izquierda, texto centrado y menú `⋮` a la derecha → fila de íconos sociales → footer de la plataforma. El usuario tachó el botón de Linktree arriba a la izquierda: no se replica. El botón de compartir (arriba a la derecha) es funcionalidad nueva: queda como opcional.

## 4. Inventario de contenido de perfil

### Propuesta de valor (fuente: `mensaje-red-biorg.md`, versión final 04/11/2026)

> "Mi nombre es Luciano Delfino y trabajo en IT, desarrollando software para ayudar a las personas a resolver problemas, convertir ideas en procesos y herramientas simples que aporten claridad."

Criterios acordados en esa sesión: sí "ayudando a personas", "ideas y procesos", "herramientas simples", "claridad"; no "ganar tiempo", "a su medida", "vivir en planillas y papel"; pocas "y" encadenadas.

### Titulares disponibles

- CV base: "Software Engineer | Backend & Full Stack".
- LinkedIn (02/11/26): "Software Engineer | Backend & Full Stack | AI-Augmented | Llevo la información dispersa de empresas, emprendimientos y personas a sistemas que se usan".
- Portada del DS: "Software Engineer | Backend & Full Stack | AI-Augmented".
- CV docencia: "Analista de Sistemas y Software Engineer | Capacitación y mentoría técnica".

### Datos defendibles para métricas (todos del CV base o LinkedIn)

- IT desde 2006, desarrollo de software desde 2016.
- Más de 20 clientes en implementaciones (EMSER).
- AppLogistic: 51 issues en 9 fases; alcance de tres meses entregado en dos; MILP del escenario más grande: de no encontrar solución en 20 minutos a una válida en 10.
- Innovat: benchmark de 7 modelos OCR.
- Fenix App: identificación de morosos, notificaciones y recuentos de stock de horas a minutos.

### Experiencia (versión más completa: LinkedIn unificado)

Orden inverso: Poliédrica (07/2026 a 10/2026), AppLogistic INGAR (04/2026 a 07/2026), Innovat INGAR (07/2024 a 07/2026), Independiente (01/2021 a actualidad), Fenix App (11/2022 a 12/2023), ANCA freelance UDR Web UI (04/2022 a 07/2022), DataLab Center (08/2019 a 03/2020), ANCA (03/2016 a 12/2018), EMSER (06/2008 a 10/2013), Raúl Torres Hogar (01/2006 a 05/2008). Complementarias: Voluntariado Asociación SER, Kuamar (01/2019 a 07/2019); viaje en bicicleta reclinada Santa Fe a Antofagasta (02/2014 a 09/2014).

Educación: Analista de Sistemas en Computación, ICOP N.º 4021, 2006 a 2009, trabajo final ERP distinguido (2011). Certificaciones: Análisis y Diseño OO (ICOP, 2008), Google IT Automation with Python (Coursera, 2023), Testing QA Manual/Ágil (UTN, 2023), Getting Started with Google Cloud (Cloud Skills Boost). Idiomas: español nativo; inglés con comprensión auditiva y lectura técnica intermedias, escritura y conversación básicas.

### Servicios ("En qué te puedo ayudar hoy", LinkedIn Independiente)

Desarrollo backend y full stack de sistemas internos y de gestión · Integración entre plataformas (ERP, ecommerce, APIs) · Implementación y adaptación de Odoo · Automatización de procesos y workflows, con IA cuando aporta valor y validación humana · Relevamiento y análisis funcional antes de escribir código · Soporte y mantenimiento evolutivo. El CV docencia agrega capacitación de usuarios y mentoría técnica.

### Datos que NO van a la web

- Teléfono (está en CV docencia): no publicar.
- Montos, nombres de personas de clientes o información interna que no figure ya en LinkedIn.
