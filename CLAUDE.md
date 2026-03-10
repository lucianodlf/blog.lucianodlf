# --verbose · Blog Hugo

Blog personal de Luciano Delfino (`lucianodlf`).
URL: https://lucianodlf.github.io/blog.lucianodlf/
Repo: git@github.com:lucianodlf/blog.lucianodlf.git

## Stack

- **Hugo** (extended, latest) — generador estático, sitio en raíz del repo
- **Theme**: Risotto (`themes/risotto/`) — submodule git, paleta dracula
- **Hosting**: GitHub Pages via GitHub Actions (`.github/workflows/deploy.yml`)
- **Búsqueda**: Pagefind — indexado en CI post-build, modal con `<dialog>`
- **Escritura**: Obsidian vault en `/home/rafiki/obsidian/universo.digital/`
- **Publicación**: Plugin Enveloppe en Obsidian (`Ctrl+Shift+P`)
- **Backup vault**: Plugin Obsidian Git (`Ctrl+Shift+S`)

## Estructura del repo

```
hugo.toml                   ← config principal
content/
  _index.md                 ← home page (terminal intro)
  posts/                    ← posts publicados por Enveloppe
static/
  assets/                   ← imágenes subidas por Enveloppe
  css/custom.css            ← overrides del theme (tipografía, dark/light, callouts)
  js/
    keybindings.js          ← búsqueda, scroll, theme toggle
    callouts.js             ← convierte > [!TYPE] a callout boxes
layouts/
  partials/
    head.html               ← override: title fix + scripts
    about.html              ← override: sidebar con keyhints, toggle, featured posts
    footer.html             ← override: últimos 3 posts + search modal
    search.html             ← Pagefind modal + help modal
  _default/
    single.html             ← override: reading time, ToC, tags
    _markup/
      render-blockquote.html ← pass-through (callouts los maneja callouts.js)
.github/workflows/deploy.yml ← build + fix paths Enveloppe + pagefind + deploy
Makefile                    ← comandos de desarrollo local
.agents/                    ← documentación interna
  config/enveloppe.json     ← backup config Enveloppe
  working-progress/blog-plan.md ← plan completo del proyecto
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
- `baseURL = "https://lucianodlf.github.io/blog.lucianodlf/"`
- `title = "lucianodlf --verbose"`
- `[params.about] title = "lucianodlf --verbose"` (sidebar)
- `[markup.highlight] style = "dracula"` (syntax highlighting)
- Taxonomías: tags, categories, series

### Enveloppe (Obsidian)
- Upload path: `content/posts/`
- Attachment folder: `static/assets/`
- Share key: `share`
- Config backup: `.agents/config/enveloppe.json`

### GitHub Actions
- Fix de paths de Enveloppe (relative → Hugo-compatible) con `sed`
- `npx pagefind --site public` para indexar búsqueda
- Submodule risotto se clona automáticamente con `submodules: recursive`

## Convenciones de contenido

### Frontmatter de posts
```yaml
---
title: "Título"
date: YYYY-MM-DD
draft: false
share: true
featured: false     # true = aparece en sidebar como "destacado"
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
| `?` | Popup de ayuda |
| Toggle `⊕` | Cambiar dark/light mode |

## Overrides del theme (no modificar archivos en themes/risotto/)
Todos los overrides van en `layouts/` y `static/css/custom.css`.
Hugo prioriza `layouts/` sobre `themes/risotto/layouts/` automáticamente.

## Pendientes conocidos
- SEO: og:image, favicon (Etapa 5c)
- Comentarios Giscus (Etapa 5d, opcional)
- Dominio personalizado (Etapa 5e, opcional)
- Logo `>` en sidebar: evaluar cambio a emoji o eliminar
- Light mode: paleta en refinamiento (code blocks usan CSS filter como fix temporal)
