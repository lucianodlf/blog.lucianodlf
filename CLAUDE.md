# --verbose · Blog Hugo

Sitio personal y blog de Luciano Delfino (`lucianodlf`): home de marca, blog, proyectos, CV y página de enlaces.
URL: https://lucianodlf.is-a.dev/ (enlaces: `/links/`, alias `/l/`)
Repo: git@github.com:lucianodlf/blog.lucianodlf.git

## Stack

- **Hugo** (latest) — generador estático, sitio en raíz del repo
- **Layouts propios** (sin theme; Risotto se quitó en el rediseño `feat-brand-redesign`)
- **Design system lucianodlf**: IBM Plex Sans/Mono, verde + neutros cálidos + acento ámbar, dark por defecto y light con `html.light`
- **Hosting**: GitHub Pages via GitHub Actions (`.github/workflows/deploy.yml`)
- **Búsqueda**: Pagefind — indexado en CI post-build, modal con `<dialog>`
- **Escritura**: Obsidian vault en `/home/rafiki/obsidian/universo.digital/`
- **Publicación**: Plugin Enveloppe en Obsidian (`Ctrl+Shift+P`)
- **Backup vault**: Plugin Obsidian Git (`Ctrl+Shift+S`)

## Estructura del repo

```
hugo.toml                   ← config (menú, params.status/role/socialLinks, highlight con clases)
content/
  _index.md                 ← README personal de la home (bloque text)
  posts/                    ← posts publicados por Enveloppe
  projects/<slug>/index.md  ← page bundles de proyectos (+ cover.png opcional)
  cv.md                     ← type: cv (datos en data/cv.yaml)
  links.md                  ← type: links, alias /l/ (datos en data/links.yaml)
data/
  home.yaml                 ← textos de la home
  cv.yaml                   ← CV web + trayectoria de la home
  links.yaml                ← página de enlaces
static/
  assets/                   ← imágenes subidas por Enveloppe
  css/tokens.css            ← tokens del DS (dark en :root, light en html.light)
  css/main.css              ← base, shell, componentes, páginas, @media print
  css/chroma.css            ← resaltado de código por tokens
  css/links.css             ← solo /links/ (standalone)
  js/
    keybindings.js          ← búsqueda, ayuda, scroll, wide, theme toggle, botones del header
    callouts.js             ← convierte > [!TYPE] a callout boxes
    tables.js               ← scroll horizontal + toggle markdown crudo
    mermaid.js              ← mermaid con colores desde tokens
  favicon.svg, *.png, img/og-default.png
layouts/
  _default/baseof.html      ← shell: skip link, header, main, footer
  _default/single.html      ← post: meta, wide toggle, ToC lateral/details, prev/next, autor
  _default/list.html        ← blog agrupado por año
  _default/terms.html, taxonomy.html
  index.html                ← home de marca
  projects/list.html, single.html
  cv/single.html
  links/single.html         ← standalone (sin baseof)
  404.html
  partials/head.html, header.html, footer.html, search.html, fmt-date.html
  partials/components/      ← card-post, card-project, post-row, chip, stat, cover-svg, author-card, page-title, status-pill, eyebrow
  _default/_markup/         ← render hooks (callouts, mermaid)
.github/workflows/deploy.yml ← fix paths Enveloppe + hugo build + pagefind + deploy
Makefile                    ← comandos de desarrollo local
docs/feat-brand-redesign/   ← propuesta, research y roadmap del rediseño
.obsidian-backup/enveloppe.json ← backup config Enveloppe (versionado)
.agents/                    ← documentación interna (no versionado, ver .gitignore)
```

## Flujo de publicación

```
1. Escribir post en Obsidian: Proyectos/blog/posts/<nota>.md
   Frontmatter: title, date, draft: true, share: false, featured: false, toc: false, tags: []
2. Cuando listo: draft: false, share: true
3. Ctrl+Shift+P → Enveloppe "Upload all shared notes"
   - Sube .md a content/posts/
   - Sube imágenes a static/assets/
4. GitHub Actions: fix paths → pagefind index → hugo build → deploy
5. Blog actualizado en ~2 minutos
```

## Flujo de desarrollo local

```bash
make serve    # hugo server rápido (sin búsqueda)
make dev      # hugo + pagefind + hugo server --renderStaticToDisk
make build    # solo build
make clean    # limpiar public/
```

## Configuraciones importantes

### hugo.toml
- `baseURL = "https://lucianodlf.is-a.dev/"` (CI pasa `--baseURL` igual)
- `title = "lucianodlf -v"`, `locale = "es"`
- `[[menus.main]]`: Blog, Proyectos, CV
- `params.status`, `params.role`, `params.description`, `params.socialLinks`
- `[markup.highlight] noClasses = false` (colores en `static/css/chroma.css`)
- Taxonomías: tags, categories, series

### Enveloppe (Obsidian)
- Upload path: `content/posts/`
- Attachment folder: `static/assets/`
- Share key: `share`
- Config backup: `.obsidian-backup/enveloppe.json`

### GitHub Actions
- Fix de paths de Enveloppe (relative → Hugo-compatible) con `scripts/fix-assets.sh`
- `npx pagefind --site public` para indexar búsqueda (solo páginas con `data-pagefind-body`: posts, proyectos, CV)

## Convenciones de contenido

### Frontmatter de posts
```yaml
---
title: "Título"
date: YYYY-MM-DD
draft: false
share: true
featured: false     # true = destacado en el índice del blog
toc: false          # true = genera tabla de contenidos en sidebar
tags: []
---
```

### Callout boxes (funciona igual en Obsidian y en el blog)
```markdown
> [!NOTE]     → Nota (cyan)
> [!TIP]      → Tip (verde)
> [!WARNING]  → Atención (amarillo)
> [!CAUTION]  → Precaución (rojo)
> [!IMPORTANT] → Importante (púrpura)
```

### Imágenes
- Obsidian: `![[imagen.png]]`
- Attachment Management guarda en: `posts/assets/<NombreNota>/imagen.png`
- Enveloppe sube a: `static/assets/imagen.png`
- GitHub Action corrige el path en el markdown antes del build

## Keybindings del blog (usuario final)
| Tecla | Acción |
|-------|--------|
| `/` o `Ctrl+K` | Abrir búsqueda |
| `↓` / `↑` | Navegar resultados |
| `Enter` | Abrir resultado |
| `gg` | Scroll al inicio |
| `G` | Scroll al final |
| `w` | Ancho completo del post (toggle) |
| `?` | Popup de ayuda |
| Botones del header | Buscar, cambiar dark/light, ayuda (también en mobile) |

## Contratos de JS (no romper al tocar el DOM)
`#theme-toggle`, `#wide-toggle`, `#search-modal`, `#help-modal`, `#search-open`, `#help-open`, `html.light`, `html.wide`, `.content__body table`, `.kb-selected`, `.pagefind-ui__result`, `.mermaid`, `.callout*`.
Colores siempre por tokens (`var(--primary)`, etc.); nunca hex en `main.css`.
Reglas del DS: sin emojis ni em-dash, bordes antes que sombras, sin gradientes, ámbar solo como acento.
Extensión local de tokens (no está en el DS): `--glow-primary`, `--glow-accent`, `--glow-ambient`, `--ease-out` y `--measure: 39rem`. El neón (cursor `.cursor--neon`, fósforo del hero, glow en hover) es un pedido explícito del usuario.
Títulos de sección: `.section__heading` / `.page-head__heading` con el comando como `.prompt` en la misma línea (no eyebrow encima).
Impeccable (skill de diseño) se instala en `.claude/` (no versionado): `npx impeccable install -y --providers=claude --scope=project`. Contexto de producto en `PRODUCT.md`.

## Workflow de trabajo
Directorio: `.agents/working-progress` (sobreescribible con `WORKFLOW_DIR` en `.env`)
Sesiones: `init` · `feat-[nombre]` · `feat-[nombre]-[issue]` · `fix-[nombre]` · `refactor-[nombre]`
Archivos por sesión: `prompt.md` · `research.md` · `plan.md` · `fase-N-plan.md` · `roadmap.md`
Nueva sesión: `/ns` — crea subdirectorio y `prompt.md`
Al retomar: leer `prompt.md` y `plan.md` de la sesión activa
TODOs: editar directamente el archivo de plan marcando `[x]`
No incluir credenciales ni datos sensibles en documentos de trabajo
Guía completa: `.agents/working-progress/WORKFLOW.md` (leer solo si hay dudas sobre el proceso)
Al iniciar sesión nueva (sin contexto de trabajo activo): sugerir al usuario ejecutar `/ns` para crear la sesión.

## Pendientes conocidos
- Comentarios Giscus (opcional)
- PDF del CV en `static/cv/luciano-delfino-cv.pdf` (el botón aparece solo si existe)
- Si cambia el DS (artifact `1Cb555udMz1t4gBdSJczcs`), regenerar a mano `static/css/tokens.css` (hoy DS v2 + extensión glow)
- Llevar los tokens glow y la medida 39rem al DS si se adoptan
- og:image por post (opcional)
