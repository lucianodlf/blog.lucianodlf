---
title: "Cómo construí este blog: Hugo, Risotto y un workflow desde Obsidian"
date: 2026-01-23
draft: false
share: true
featured: false
toc: true
tags:
  - Hugo
  - Obsidian
  - Blog
  - Workflow
created: 22-07-2026T17:23
updated: 22-07-2026T18:06
---

Este blog es un sitio estático hecho con [Hugo](https://gohugo.io/), el theme [Risotto](https://github.com/joeroe/risotto) y GitHub Pages para el hosting. Lo que lo hace distinto no es el generador en sí, sino que nunca escribo directamente en el repo: todo el contenido sale de un vault de [Obsidian](https://obsidian.md/) y llega acá mediante un plugin de publicación (Tampoco es que es distinto! esta inspirado en otros cuantos que vi por la red!) (Si lo hace distinto los grandes pequeños detalles que a mi me gusta que tenga, ademas de que lo hice con amor). Este post documenta esa arquitectura completa: cómo está armado el repo, qué hace cada pieza del pipeline de CI, y el flujo exacto que sigo desde que abro Obsidian hasta que el post está online.

> [!NOTE]
> Así se ve un callout de tipo `NOTE` en este blog — funciona igual en Obsidian que acá. Más abajo explico cómo.

## El stack

- **Hugo** generador estático, config y contenido en la raíz del repo.
- **Risotto** como theme, cargado como submódulo git, con la paleta de colores de theme dracula.
- **GitHub Pages** para el hosting, deployado vía GitHub Actions.
- **Pagefind** para la búsqueda — se indexa en CI después del build, con un modal nativo `<dialog>`.
- **Obsidian** para escribir, con el plugin **Enveloppe** para publicar 

Todos los overrides del theme viven en `layouts/` y `static/css/custom.css` en la raíz del repo — nunca se toca nada dentro de `themes/risotto/`, porque es un submódulo y cualquier cambio ahí se pierde en el próximo `git submodule update`. Hugo prioriza automáticamente lo que encuentra en `layouts/` por sobre lo que trae el theme, así que alcanza con crear el mismo archivo en el mismo path relativo para pisarlo.

## El flujo de publicación 

Esta es la parte que realmente importa: cómo un post pasa de ser una nota en Obsidian a estar publicado en la web, sin que yo edite nunca un archivo dentro de `content/posts/` a mano.

### Paso 1: escribir la nota en Obsidian

El post nace como una nota en `Proyectos/blog/posts/<nota>.md` dentro del vault. El frontmatter arranca así:

```yaml
---
title: "Título del post"
date: 2026-07-22
draft: true
share: false
featured: false
toc: false
tags: []
---
```

`draft: true` y `share: false` son las dos banderas que importan acá: mientras estén así, la nota es privada. Escribo, corrijo, dejo el post madurar unos días si hace falta.

### Paso 2: marcar el post como listo

Cuando el post está terminado, cambio dos líneas:

```yaml
draft: false
share: true
```

Nada más. No hay un botón de "publicar" separado — el estado de estas dos claves es el interruptor completo.

### Paso 3: subir con Enveloppe

Con `Ctrl+Shift+P` en Obsidian corro el comando **"Upload all shared notes"** del plugin [Enveloppe](https://ole.dev/docs/enveloppe/). Enveloppe hace dos cosas en un solo paso:

- Sube el `.md` de la nota a `content/posts/` en el repo del blog.
- Sube cualquier imagen adjunta (`![[imagen.png]]` en sintaxis Obsidian) a `static/assets/`.

La config de Enveloppe (upload path, attachment folder, y la clave `share` que decide qué notas subir) está versionada en `.obsidian-backup/enveloppe.json`, así que si reinstalo Obsidian no tengo que reconfigurar nada a mano.

### Paso 4: el problema de los paths de Enveloppe

Acá aparece el único punto de fricción real del pipeline. Obsidian resuelve las rutas de las imágenes a su manera, y el resultado que Enveloppe escribe en el markdown no es el que Hugo espera:

```
Enveloppe escribe:  ![alt](../../static/assets/img.jpg.jpg)
Hugo necesita:      ![alt](../../assets/img.jpg)
```

Dos problemas en un solo string: el path incluye `static/` (que Hugo ya sirve implícitamente desde la raíz, así que sobra), y la extensión queda duplicada por cómo Enveloppe arma el nombre del asset.

<!-- [ORIGINAL DATA] --> El fix es un script bash idempotente, compartido entre CI y desarrollo local, para que el render en mi máquina sea idéntico al que corre en GitHub Actions:

```bash
#!/usr/bin/env bash
# scripts/fix-assets.sh
# Normaliza los paths de assets que genera Enveloppe (Obsidian) al markdown
# que Hugo entiende. Idempotente: correrlo varias veces no cambia el resultado.
set -euo pipefail

cd "$(dirname "$0")/.."

find content/posts -name "*.md" -print0 | xargs -0 sed -i \
  -e 's|\.\./\.\./static/assets/|../../assets/|g' \
  -e 's|\.\./static/assets/|../assets/|g' \
  -e 's/\.png\.png/.png/g' \
  -e 's/\.jpg\.jpg/.jpg/g' \
  -e 's/\.jpeg\.jpeg/.jpeg/g' \
  -e 's/\.gif\.gif/.gif/g' \
  -e 's/\.webp\.webp/.webp/g' \
  -e 's/\.pdf\.pdf/.pdf/g' \
  -e 's/\.mp4\.mp4/.mp4/g'
```

### Paso 5: GitHub Actions hace el resto

Un push a `main` (que es justo lo que hace Enveloppe al subir la nota) dispara el workflow de deploy:

```yaml
# .github/workflows/deploy.yml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          submodules: recursive
          fetch-depth: 0

      - name: Setup Hugo
        uses: peaceiris/actions-hugo@v3
        with:
          hugo-version: "latest"
          extended: true

      - name: Fix asset paths from Enveloppe
        run: ./scripts/fix-assets.sh

      - name: Build
        run: hugo --minify --baseURL "${{ steps.pages.outputs.base_url }}/"

      - name: Index with Pagefind
        run: npx pagefind --site public

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./public
```

Cuatro pasos que importan, en orden: clonar con `submodules: recursive` (así el submódulo de Risotto llega solo, sin un paso manual aparte), correr el mismo `fix-assets.sh` de desarrollo local, buildear con Hugo, e indexar con Pagefind **después** del build — porque Pagefind necesita el HTML ya generado en `public/` para poder indexarlo. El job de `deploy` corre después y sube el artifact a GitHub Pages. 

## Desarrollo local

Para no depender de un push cada vez que quiero ver un cambio, el `Makefile` replica el mismo pipeline en local:

```makefile
# Normaliza paths de assets de Enveloppe (mismo fix que el CI)
fix-assets:
	./scripts/fix-assets.sh

# Desarrollo con búsqueda (Pagefind)
dev: fix-assets
	hugo && npx pagefind --site public && hugo server --renderStaticToDisk

# Solo hugo server (rápido, sin búsqueda)
serve: fix-assets
	hugo server

# Build completo (igual que CI)
build: fix-assets
	hugo --minify

# Limpiar build
clean:
	rm -rf public
```

`make serve` es lo que uso casi siempre: server rápido con live reload, sin indexar Pagefind. `make dev` es la versión completa, útil cuando quiero probar la búsqueda en local — el costo es que `hugo server --renderStaticToDisk` escribe a disco en vez de servir en memoria, así que arranca más lento.

> [!WARNING]
> `make serve` no indexa Pagefind. Si estás probando la búsqueda y no aparecen resultados, no es un bug — corré `make dev` en su lugar.

## Callouts: la misma sintaxis en Obsidian y en la web

Uno de los detalles que más valoro del setup es que los callouts de Obsidian (`> [!NOTE]`, `> [!TIP]`, etc.) se ven casi igual en ambos lugares, sin tener que reescribir nada al publicar. En markdown, un callout es simplemente:

```markdown
> [!WARNING]
> Este es un callout de advertencia.
```

Hugo renderiza eso como un `<blockquote>` común. Un partial de layout (`render-blockquote.html`) lo deja pasar sin tocarlo, y es un pequeño script client-side el que hace la conversión visual:

```js
// static/js/callouts.js
document.querySelectorAll('blockquote').forEach(function (bq) {
  var p = bq.querySelector('p');
  if (!p) return;

  var match = p.textContent.match(/^\[!([A-Za-z]+)\]/);
  if (!match) return;

  var type  = match[1].toLowerCase();
  var icon  = icons[type]  || 'fa-solid fa-circle-info';
  var label = labels[type] || match[1];

  p.innerHTML = p.innerHTML.replace(/^\[![A-Za-z]+\]\s*/, '');

  var div = document.createElement('div');
  div.className = 'callout callout--' + type;
  div.innerHTML =
    '<div class="callout__title">' +
      '<i class="' + icon + '" aria-hidden="true"></i> ' + label +
    '</div>' +
    '<div class="callout__body">' + bq.innerHTML + '</div>';

  bq.parentNode.replaceChild(div, bq);
});
```

El script busca el patrón `[!TIPO]` al inicio del blockquote, lo saca del texto, y arma un `<div class="callout callout--tipo">` con ícono y label en español. Cinco tipos soportados:

| Sintaxis | Resultado | Color |
|----------|-----------|-------|
| `> [!NOTE]` | Nota | cyan |
| `> [!TIP]` | Tip | verde |
| `> [!WARNING]` | Atención | amarillo |
| `> [!CAUTION]` | Precaución | rojo |
| `> [!IMPORTANT]` | Importante | púrpura |

<!-- [PERSONAL EXPERIENCE] --> Escribir en la sintaxis nativa de Obsidian y que se vea razonablemente bien en la web sin pasos extra fue justo el objetivo: cero fricción entre "cómo escribo" y "cómo se publica".

> [!IMPORTANT]
> El parseo es puramente client-side sobre `textContent`, así que si el primer párrafo de tu blockquote no empieza exactamente con `[!TIPO]`, no se convierte — queda como blockquote normal.


## Grandes pequeños detalles que me gustan

- Toogle dark/light y ancho de visualizacion
- keybinding `/ | Ctrl+K` para busquedas
- keybinding `?` para help y navegacion

![asset-20260722174125871.png](../../static/assets/asset-20260722174125871.png.png)

![asset-20260722173933566.png](../../static/assets/asset-20260722173933566.png.png)

## Preguntas frecuentes

### ¿Por qué Obsidian y no escribir directo en el repo?

Porque separa la escritura de la publicación. Puedo tener notas en `draft: true` por semanas, revisarlas, y solo cuando cambio `share: true` esa nota entra al flujo de subida — nunca convive contenido a medio terminar en la rama `main`.

### ¿Por qué un script bash y no un plugin de Hugo para el fix de paths?

Porque el problema no es de Hugo, es de cómo Enveloppe resuelve las rutas de attachments antes de subir. Un `sed` sobre el markdown ya subido es más simple y más fácil de auditar que intentar interceptar el proceso de Enveloppe o escribir una lógica de reescritura de paths en Go dentro de un shortcode.
( probablemente existan otras soluciones, pero por ahora esto es lo que)

### ¿Qué pasa si corro `fix-assets.sh` dos veces sobre el mismo post?

Nada distinto — el script es idempotente. Los patrones de `sed` solo matchean el path "roto" original (`../../static/assets/` o la extensión duplicada); una vez corregido, ninguna de las reglas vuelve a aplicar.

### ¿Necesito indexar Pagefind en cada build local?

No. `make serve` te da un ciclo de feedback rápido para escribir o ajustar estilos. Corré `make dev` únicamente cuando necesites probar el modal de búsqueda en sí.

## Cierre

El diseño completo se apoya en una idea simple: cada pieza hace una sola cosa y el pipeline nunca diverge entre local y CI porque comparten el mismo script de fix de assets. Obsidian resuelve la escritura, Enveloppe resuelve la subida, GitHub Actions resuelve el build y el deploy, y Pagefind resuelve la búsqueda — sin superposición entre capas.

![asset-20260722173713632.png](../../static/assets/asset-20260722173713632.png.png)

