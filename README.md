[![Deploy Hugo site to GitHub Pages](https://github.com/lucianodlf/blog.lucianodlf/actions/workflows/deploy.yml/badge.svg)](https://github.com/lucianodlf/blog.lucianodlf/actions/workflows/deploy.yml)

# blog (WIP)

Blog personal de Luciano Delfino (`lucianodlf`).

- **URL**: https://lucianodlf.github.io/blog.lucianodlf/
- **Stack**: [Hugo](https://gohugo.io/) (extended) + theme [Risotto](https://github.com/joeroe/risotto) (submodule, paleta dracula)
- **Hosting**: GitHub Pages via GitHub Actions
- **Búsqueda**: [Pagefind](https://pagefind.app/), indexado en CI post-build

## Publicación desde Obsidian

El contenido se escribe en un vault de Obsidian y se publica con el plugin [Enveloppe](https://github.com/Enveloppe/obsidian-enveloppe):

1. Escribir el post en el vault (`Proyectos/blog/posts/<nota>.md`) con el frontmatter correspondiente (`title`, `date`, `draft: true`, `share: false`, `tags`, etc.).
2. Cuando el post está listo, pasar a `draft: false` y `share: true`.
3. Desde Obsidian, `Ctrl+Shift+P` → Enveloppe "Upload all shared notes". Esto sube el `.md` a `content/posts/` y las imágenes a `static/assets/` de este repo.
4. Al llegar el push, el workflow de GitHub Actions corrige los paths que genera Enveloppe, indexa la búsqueda con Pagefind, hace el build de Hugo y despliega en GitHub Pages (~2 minutos).

## Proyectos destacados

La sección de proyectos (`/projects`) se alimenta de `data/projects.json`, renderizado por `layouts/projects/list.html`. Para agregar un proyecto, sumar un objeto al array `items`:

```json
{
  "name": "Nombre del proyecto",
  "link": "https://github.com/usuario/repo",
  "image": "img/projects/mi-proyecto.png",
  "visible": true
}
```

- `image` es opcional (si falta, se muestra un ícono de carpeta como fallback); si se define, el archivo va en `static/`.
- `visible: false` oculta el proyecto sin borrarlo del JSON.
- `columns` en la raíz del JSON controla la cantidad de columnas del grid.

## Uso

### Clonar

```bash
git clone --recurse-submodules git@github.com:lucianodlf/blog.lucianodlf.git
cd blog.lucianodlf
```

Si ya clonaste sin `--recurse-submodules`, traer el theme con:

```bash
git submodule update --init --recursive
```

### Requisitos

- [Hugo extended](https://gohugo.io/installation/) (última versión)
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

- [Hugo](https://github.com/gohugoio/hugo) — generador estático
- [Risotto](https://github.com/joeroe/risotto) — theme

---

Hecho con ❤️ por [Luciano Delfino](https://github.com/lucianodlf)
