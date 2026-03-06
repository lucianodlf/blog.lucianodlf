# Plan de Proyecto: Blog con Obsidian + Hugo + GitHub Pages

> Documento de referencia para trabajar con Claude Code CLI.  
> Stack elegido: **Hugo + Enveloppe + Obsidian Git + GitHub Actions**

---

## Contexto del proyecto

- Vault de Obsidian existente con wikilinks activos globalmente (`[[...]]`)
- Plugin **Attachment Management** activo: las imágenes se guardan en `assets/<NombreNota>/` al nivel de la nota
- Wikilinks se mantienen en todo el vault — **no se desactivan**
- Contenido del blog organizado en un subdirectorio específico dentro del vault
- Deploy gratuito en GitHub Pages vía GitHub Actions
- Objetivo: escribir/editar `.md` en Obsidian → push → blog actualizado automáticamente

---

## Análisis de themes seleccionados

### 🥇 Recomendación principal: **Congo**
- GitHub: https://github.com/jpanther/congo
- Múltiples color schemes intercambiables sin tocar CSS (Tailwind CSS 3.0)
- Dark mode auto-switch con toggle manual
- Búsqueda client-side con Fuse.js (fuzzy search)
- Lighthouse 100/100 en todas las categorías
- Minimalista, limpio, orientado al contenido
- Personalización de paleta via variables CSS sin compilar
- Activamente mantenido (2025)
- **Limitación:** no tiene estética terminal/retro por defecto, pero es altamente customizable

### 🥈 Alternativa retro/terminal: **re-Terminal**
- GitHub: https://github.com/mirus-ua/hugo-theme-re-terminal
- Fork activo del legendario `hugo-theme-terminal` (abandonado)
- Estética retro terminal auténtica, Fira Code como fuente por defecto
- Sistema de accent colors con CSS variables — cambio de paleta sin recompilar
- Dark/Light mode nativo
- Syntax highlighting con PrismJS
- **Limitación:** búsqueda básica (no fuzzy/Fuse.js), menos features que Congo

### 🥉 Alternativa moderna: **Blowfish**
- GitHub: https://github.com/nunocoracao/blowfish
- Tailwind CSS 3, dark mode, Fuse.js search
- Zen reading mode, image galleries, timeline layouts
- Más "moderno" que terminal, menos minimalista
- Uno de los más activamente desarrollados en 2026

### 💡 Sugerencia adicional: **PaperMod**
- GitHub: https://github.com/adityatelange/hugo-PaperMod
- El más popular del ecosistema Hugo (11k+ stars)
- Ultra-minimalista, dark mode, búsqueda nativa, muy rápido
- Sin estética terminal, pero excelente base si se quiere customizar desde cero
- 178 contribuidores, extremadamente estable

### Tabla comparativa

| Feature | Congo | re-Terminal | Blowfish | PaperMod |
|---|---|---|---|---|
| Dark/Light mode | ✅ auto+toggle | ✅ | ✅ auto+toggle | ✅ |
| Fuzzy search (Fuse.js) | ✅ | ❌ básica | ✅ | ✅ |
| Cambio de paleta/scheme | ✅ múltiples | ✅ accent vars | ✅ múltiples | ❌ limitado |
| Estética terminal/retro | ❌ | ✅ auténtica | ❌ | ❌ |
| Fira Code / monospace | configurable | ✅ default | configurable | configurable |
| Keyboard navigation | básico | básico | básico | básico |
| Ligaduras de fuente | via config CSS | ✅ nativo | via config CSS | via config CSS |
| Mantenimiento activo 2025 | ✅ | ✅ | ✅ | ✅ |
| Documentación | ✅ excelente | ✅ buena | ✅ excelente | ✅ buena |

> **Nota sobre keyboard navigation:** Ningún theme de Hugo tiene keybindings vim-style nativos.
> Esto se puede agregar como feature custom en Etapa 5 (JS liviano con `j/k` para navegar posts,
> `/` para focus en búsqueda, similar a how-to en Obsidian).

---

## Stack técnico

```
Obsidian Vault
  └── blog/                        ← contenido del blog (subdirectorio dedicado)
        ├── posts/
        │     ├── mi-post.md       ← share: true en frontmatter
        │     └── otro-post.md
        └── assets/
              └── mi-post/
                    └── imagen.jpg  ← Attachment Management genera esta estructura

GitHub Repo (blog)
  ├── .github/workflows/deploy.yml  ← GitHub Actions build+deploy
  ├── content/                      ← Enveloppe copia aquí los posts marcados
  ├── static/                       ← Enveloppe copia aquí las imágenes
  ├── themes/congo/                 ← theme como git submodule
  └── hugo.toml

GitHub Pages
  └── https://usuario.github.io/blog/
```

### Flujo de publicación final (steady state)

```
1. Escribís en Obsidian (wikilinks, imágenes con ![[...]])
2. Agregás `share: true` al frontmatter de la nota
3. Desde Obsidian: Enveloppe → "Upload all shared notes"
   - Convierte wikilinks a markdown estándar
   - Sube imágenes al path correcto del repo
   - Crea/actualiza archivos en el repo de GitHub
4. GitHub Actions detecta el push → build Hugo → deploy a Pages
5. Blog actualizado en ~1-2 minutos
```

---

## Etapas del proyecto

---

### Etapa 1 — Repositorio Hugo base

**Objetivo:** Tener un sitio Hugo funcionando localmente con el theme elegido.

**Tareas:**
1. Crear repositorio GitHub `<usuario>.github.io` o `blog` (decidir nombre)
2. Instalar Hugo extended localmente (`brew install hugo` / `apt install hugo`)
3. Crear sitio Hugo: `hugo new site blog`
4. Agregar theme como git submodule (Congo o re-Terminal según decisión)
5. Configurar `hugo.toml` básico:
   - `baseURL`, `title`, `theme`
   - Activar dark mode auto-switch
   - Configurar color scheme inicial
   - Activar búsqueda (Fuse.js)
6. Crear página `content/posts/_index.md` y primer post de prueba manual
7. Verificar `hugo server` local funciona

**Archivos clave a generar:**
- `hugo.toml`
- `content/posts/_index.md`
- `content/posts/test-post.md` (con frontmatter completo de ejemplo)

**Criterio de completado:** `hugo server` levanta el sitio localmente con dark mode y búsqueda operativos.

---

### Etapa 2 — GitHub Actions + GitHub Pages

**Objetivo:** Cada push al repo dispara build y deploy automático.

**Tareas:**
1. Crear `.github/workflows/deploy.yml` con:
   - Trigger: `push` a branch `main`
   - Job: checkout → setup Hugo → build → deploy a Pages
   - Manejo de git submodules para el theme
2. Configurar GitHub Pages en Settings → Pages → "GitHub Actions" como source
3. Verificar que el workflow pase en verde
4. Confirmar URL pública `https://<usuario>.github.io/<repo>/`

**Archivos clave a generar:**
- `.github/workflows/deploy.yml`

**Criterio de completado:** Push al repo → sitio actualizado en URL pública en < 3 minutos.

---

### Etapa 3 — Configuración de Enveloppe

**Objetivo:** Enveloppe toma notas marcadas del vault y las sube al repo con imágenes incluidas.

**Tareas:**
1. Instalar plugin **Enveloppe** en Obsidian (Community Plugins)
2. Generar GitHub Personal Access Token (scope: `repo`)
3. Configurar Enveloppe:
   - **GitHub:** usuario, repo, branch `main`
   - **Upload path:** `content/posts/` para las notas
   - **Attachment path:** `static/images/` para las imágenes
   - **Wikilinks:** activar conversión automática a markdown estándar
   - **Folder structure:** mapear `blog/posts/` del vault a `content/posts/` del repo
4. Configurar regla de imágenes:
   - Source path: `blog/assets/<NombreNota>/` (estructura de Attachment Management)
   - Destination path: `static/images/<NombreNota>/`
5. Test end-to-end: nota con `share: true` + imagen → upload → verificar repo → verificar Pages

**Frontmatter mínimo de un post:**
```yaml
---
title: "Título del Post"
date: 2025-01-01
draft: false
share: true
tags: ["tag1", "tag2"]
---
```

**Criterio de completado:** Una nota con imagen se publica correctamente via Enveloppe, imagen visible en el blog.

---

### Etapa 4 — Obsidian Git + automatización

**Objetivo:** El vault se sincroniza con GitHub automáticamente, opciones de auto-publish.

**Tareas:**
1. Instalar plugin **Obsidian Git** en el vault
2. Configurar auto-commit y push periódico (ej: cada 10 minutos o al cerrar Obsidian)
3. Decidir estrategia de automatización:
   - **Opción A (recomendada):** Enveloppe manual cuando se quiere publicar, Obsidian Git para backup del vault
   - **Opción B:** Hook en Obsidian Git post-push que dispara Enveloppe automáticamente
4. Crear template Templater para nuevos posts con frontmatter pre-cargado:
   ```
   title, date (auto), draft: true, share: false, tags: []
   ```
5. Documentar el workflow definitivo en una nota del vault (`blog/WORKFLOW.md`)

**Criterio de completado:** Vault se sincroniza automáticamente; nuevo post desde template hasta publicado en < 5 minutos de trabajo manual.

---

### Etapa 5 — Pulido, UX y features opcionales

**Objetivo:** Mejorar la experiencia del blog con features de calidad de vida.

**Tareas opcionales por prioridad:**

#### 5a — Tipografía y paleta
- Configurar Fira Code / JetBrains Mono con ligaduras en el theme
- Ajustar color scheme activo (si Congo: probar `congo`, `slate`, `ocean`, crear custom)
- Revisar contraste light/dark para legibilidad

#### 5b — Keyboard navigation custom
- Agregar JS liviano para keybindings:
  - `j/k` → navegar entre posts en lista
  - `/` → focus en barra de búsqueda (como Ctrl+K en Obsidian)
  - `g g` → ir al inicio
- Implementar via partial override de Hugo (sin modificar theme)

#### 5c — SEO y sharing
- Configurar `og:image` default y por post
- Sitemap automático (Hugo lo genera nativo)
- `robots.txt` correcto
- Favicon personalizado

#### 5d — Features de contenido
- Comentarios via **Giscus** (GitHub Discussions, gratuito)
- Reading time estimado
- Tabla de contenidos automática en posts largos
- Syntax highlighting para código (Chroma, ya incluido en Hugo)

#### 5e — Dominio personalizado (opcional)
- Configurar CNAME en GitHub Pages
- Actualizar `baseURL` en `hugo.toml`

---

## Plugins de Obsidian recomendados

| Plugin | Función | Prioridad |
|--------|---------|-----------|
| **Enveloppe** | Publicar notas seleccionadas al repo Hugo | ⭐ Esencial |
| **Obsidian Git** | Auto-sync del vault con GitHub | ⭐ Esencial |
| **Templater** | Templates de posts con frontmatter pre-cargado | ⭐⭐ Alta |
| **Attachment Management** | Ya instalado — mantener configuración actual | ⭐ Ya activo |
| **Dataview** | Generar índices/listas de posts desde el vault | ⭐⭐ Media |
| **Front Matter** | Editor visual de metadata YAML | ⭐⭐⭐ Conveniencia |

---

## Decisiones pendientes antes de empezar Etapa 1

- [ ] **¿Qué theme arrancamos?** Congo (recomendado) o re-Terminal (más retro)
- [ ] **¿Nombre del repo?** `<usuario>.github.io` (URL limpia) o `blog` (URL con subpath)
- [ ] **¿Color scheme inicial?** Congo tiene: `congo`, `slate`, `ocean`, `fire`, `forest`, `princess`, `neon`, `cherry`, `sapphire`, `rose`

---

## Referencias

- Congo docs: https://jpanther.github.io/congo/docs/
- re-Terminal: https://github.com/mirus-ua/hugo-theme-re-terminal
- Enveloppe docs: https://enveloppe.ovh/Getting%20Started/Plugin/
- Hugo docs: https://gohugo.io/documentation/
- GitHub Actions para Hugo: https://gohugo.io/hosting-and-deployment/hosting-on-github/
