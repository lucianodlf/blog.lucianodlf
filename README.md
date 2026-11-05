[![Deploy Hugo site to GitHub Pages](https://github.com/lucianodlf/blog.lucianodlf/actions/workflows/deploy.yml/badge.svg)](https://github.com/lucianodlf/blog.lucianodlf/actions/workflows/deploy.yml)

# lucianodlf -v

Sitio personal y blog de Luciano Delfino (`lucianodlf`): home de marca, blog, proyectos, CV y una página de enlaces.

- **URL**: https://lucianodlf.com.ar/ (enlaces: `/links/`, alias corto `/l/`)
- **Stack**: [Hugo](https://gohugo.io/) con layouts propios (sin theme), design system lucianodlf (IBM Plex, light y dark)
- **Hosting**: GitHub Pages via GitHub Actions
- **Búsqueda**: [Pagefind](https://pagefind.app/), indexado en CI post-build (posts, proyectos y CV)

## Publicación desde Obsidian

El contenido se escribe en un vault de Obsidian y se publica con el plugin [Enveloppe](https://github.com/Enveloppe/obsidian-enveloppe):

1. Escribir el post en el vault (`Proyectos/blog/posts/<nota>.md`) con el frontmatter correspondiente (`title`, `date`, `draft: true`, `share: false`, `tags`, etc.).
2. Cuando el post está listo, pasar a `draft: false` y `share: true`.
3. Desde Obsidian, `Ctrl+Shift+P` → Enveloppe "Upload all shared notes". Esto sube el `.md` a `content/posts/` y las imágenes a `static/assets/` de este repo.
4. Al llegar el push, el workflow de GitHub Actions corrige los paths que genera Enveloppe, hace el build de Hugo, indexa la búsqueda con Pagefind y despliega en GitHub Pages (~2 minutos).

## Contenido editable sin tocar templates

| Qué | Dónde |
| --- | --- |
| Textos de la home (hero, métricas, servicios, cómo trabajo, posts destacados, contacto) | `data/home.yaml` |
| README personal de la home | `content/_index.md` |
| CV web (perfil, skills, experiencia, formación) y trayectoria de la home | `data/cv.yaml` |
| Página de enlaces | `data/links.yaml` |
| Línea de estado, rol, redes, menú | `hugo.toml` (`params.status`, `params.role`, `params.socialLinks`, `menus.main`) |

### Proyectos

Cada proyecto es un page bundle en `content/projects/<slug>/index.md`, con su imagen opcional `cover.png` al lado:

```yaml
---
title: "Nombre"
summary: "Una línea de resumen."
kind: cliente            # cliente | propio
client: "Empresa"        # opcional
role: "Software Engineer" # opcional
period: "04/2026 – 07/2026"
date: 2026-04-01         # ordena
status: finalizado       # en uso | activo | experimental | finalizado
featured: true           # aparece en la home (máximo 3, por weight)
weight: 1
coverLabel: "Nombre"     # texto de la portada generada si no hay cover.*
coverFit: contain        # para íconos cuadrados
stack: [Python, FastAPI]
metrics:
  - { value: "51", label: "issues en 9 fases" }
links:
  repo: "https://github.com/..."
  demo: "https://..."
  post: "posts/<archivo>.md"
---
## Contexto
## Qué hice
## Resultado
```

Sin `cover.*`, la card usa la composición gráfica del design system con `coverLabel`.

### PDF del CV

Si existe `static/cv/luciano-delfino-cv.pdf`, `/cv/` muestra el botón "Descargar PDF". Sin archivo, queda el botón de imprimir (la hoja de impresión fuerza la paleta light y da un CV de 3 páginas).

## Uso

### Requisitos

- [Hugo](https://gohugo.io/installation/) (última versión; extended no es obligatorio)
- Node.js (para Pagefind vía `npx`)

### Comandos (Makefile)

```bash
make serve    # hugo server rápido, sin indexar búsqueda
make dev      # build + pagefind + hugo server (búsqueda funcional en local)
make build    # build de producción (igual que CI), salida en public/
make index    # build + indexar pagefind, sin levantar server
make clean    # borra public/
```

## Agradecimientos

- [Hugo](https://github.com/gohugoio/hugo), generador estático
- [Risotto](https://github.com/joeroe/risotto), el theme que usó este sitio hasta el rediseño de 2026

---

Hecho por [Luciano Delfino](https://github.com/lucianodlf)
