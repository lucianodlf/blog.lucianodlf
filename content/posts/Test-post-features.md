---
title: Herramientas que uso todos los días (y por qué) (Un test)
date: 2026-03-10
draft: false
share: true
featured: true
toc: true
tags:
  - tooling
  - terminal
  - productividad
  - desarrollo
created: 10-03-2026T09:07
updated: 10-03-2026T19:06
---

> [!NOTE]
> Este post usa callout boxes de ejemplo. La sintaxis `> [!TYPE]` funciona igual en Obsidian y en Hugo.

Hay herramientas que usás una vez por semana y herramientas que usás sin darte cuenta. Este post es sobre las segundas: las que ya son parte del músculo, las que extrañás cuando no están, las que recomendás sin que te pregunten.

No es una lista exhaustiva ni objetiva. Es lo que funciona para mí, en este momento, con este stack.

---

## Terminal y shell

La terminal es el centro de todo. No porque sea lo más eficiente en todos los casos, sino porque es el denominador común: funciona en cualquier máquina, no depende de ninguna UI, y te fuerza a entender lo que estás haciendo.

> [!TIP]
> Si venís de bash, el primer cambio que notás es el autocompletado. Vale el cambio solo por eso.

### zsh + starship

Migré de bash a zsh hace años y nunca volví. El plugin de autocompletado solo ya justifica el cambio. Starship como prompt: rápido, configurable, no invade.

```bash
# Instalación en una línea
curl -sS https://starship.rs/install.sh | sh

# Agregar al .zshrc
eval "$(starship init zsh)"
```

El `starship.toml` que uso es minimalista. No me interesan los emojis ni los colores explosivos — solo quiero saber en qué branch estoy y si el último comando falló:

```toml
# ~/.config/starship.toml
[character]
success_symbol = "[>](green)"
error_symbol = "[>](red)"

[git_branch]
symbol = " "
format = "[$symbol$branch]($style) "
```

### fzf — fuzzy finder

Si hay una herramienta que cambió cómo uso la terminal, es fzf. Búsqueda difusa sobre cualquier cosa: historial de comandos, archivos, branches de git, procesos.

```bash
# Ctrl+R con fzf: historial interactivo
# Ctrl+T: buscar archivos desde el directorio actual
# Alt+C: navegar directorios

# Integración en .zshrc
source ~/.fzf.zsh
```

El caso de uso que más uso: buscar en el historial con `Ctrl+R`. En lugar de flecha arriba diez veces, tipeo dos palabras y tengo el comando exacto.

---

## Editor y entorno

> [!WARNING]
> Neovim tiene una curva de aprendizaje brutal. No lo recomiendo como primera herramienta para aprender a programar.

### Neovim

Largo tema. No voy a intentar convencer a nadie de usar vim. Solo digo que después de un año de curva de aprendizaje, ahora escribo código más rápido que antes y con menos movimiento de manos. El precio fue alto.

Lo relevante: uso [lazy.nvim](https://github.com/folke/lazy.nvim) como plugin manager y el stack estándar de LSP que da Hugo para el autocompletado.

```lua
-- init.lua (extracto)
require("lazy").setup({
  { "neovim/nvim-lspconfig" },
  { "hrsh7th/nvim-cmp" },
  { "nvim-telescope/telescope.nvim" },
  { "folke/tokyonight.nvim" },
})
```

### Obsidian

Para notas, drafts, y este blog. El sistema de backlinks y el modo grafo son lo que más uso. Lo que más extraño cuando no lo tengo: los wikilinks. Escribir `[[nombre de nota]]` y que aparezca como link es adictivo.

> La tensión entre "escribir en texto plano" y "querer features de una app" se resuelve acá: Obsidian es una app que encima guarda todo en `.md` plano. Win-win.

---

## Control de versiones

### git — aliases que importan

El git estándar es verbose. Estos aliases están en mi `.gitconfig` desde hace años:

```ini
[alias]
  st = status -sb
  lg = log --oneline --graph --decorate --all
  co = checkout
  br = branch -vv
  oops = commit --amend --no-edit
  undo = reset HEAD~1 --soft
```

`git oops` para cuando commitié algo con typo en el mensaje y me doy cuenta inmediatamente. `git undo` para cuando el commit fue demasiado grande y quiero dividirlo.

### lazygit

Para operaciones más complejas (cherry-pick, rebase interactivo, resolver conflictos), uso lazygit. Es una TUI que hace que el rebase interactivo sea manejable sin tener que acordarse de todos los comandos.

```bash
# Instalación
brew install lazygit  # macOS
sudo apt install lazygit  # Debian/Ubuntu
```

---

## Scripting y automatización

### Python para scripts rápidos

Cuando necesito algo más que un one-liner de bash pero menos que un proyecto completo, Python. El ecosistema de la stdlib cubre el 80% de los casos:

```python
#!/usr/bin/env python3
"""
Renombrar archivos en bulk usando un patrón.
Uso: python rename.py --prefix "2026-" --ext ".md" ./notas/
"""
import argparse
import re
from pathlib import Path

def slugify(text: str) -> str:
    text = text.lower().strip()
    text = re.sub(r'[^\w\s-]', '', text)
    return re.sub(r'[-\s]+', '-', text)

def rename_files(directory: Path, prefix: str, ext: str) -> None:
    for file in directory.glob(f"*{ext}"):
        new_name = prefix + slugify(file.stem) + ext
        file.rename(file.parent / new_name)
        print(f"  {file.name} → {new_name}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("directory", type=Path)
    parser.add_argument("--prefix", default="")
    parser.add_argument("--ext", default=".md")
    args = parser.parse_args()
    rename_files(args.directory, args.prefix, args.ext)
```

### jq para JSON

Inevitable si trabajás con APIs o archivos de configuración. El uso que más repito:

```bash
# Extraer campo específico de una respuesta
curl -s https://api.github.com/repos/joeroe/risotto | jq '.stargazers_count'

# Filtrar array por condición
cat data.json | jq '.items[] | select(.status == "active") | .name'

# Pretty print + guardar
cat minified.json | jq '.' > pretty.json
```

---

## Stack de este blog

Ya que estamos: el stack de este blog es deliberadamente simple.

| Capa | Herramienta | Por qué |
|------|-------------|---------|
| Escritura | Obsidian | Wikilinks, backlinks, modo grafo |
| Publicación | Enveloppe | Push desde Obsidian directo al repo |
| Build | Hugo | Rápido, sin dependencias JS |
| Theme | Risotto | Terminal aesthetic, dracula palette |
| Hosting | GitHub Pages | Gratis, automático |
| Search | Pagefind | Post-build, sin servidor |

El flujo: escribo en Obsidian → `Ctrl+Shift+P` para publicar → GitHub Actions buildea → blog actualizado.

---

> [!CAUTION]
> No instales todo esto de una vez. Cambiar demasiadas herramientas al mismo tiempo garantiza que no vas a aprender ninguna bien.

## Lo que estoy mirando

Herramientas en mi radar que todavía no incorporé al workflow diario:

1. **Nushell** — shell con tipos. El pipeline de datos se parece más a SQL que a bash.
2. **Zellij** — multiplexer de terminal. Lo probé brevemente, la UX es mejor que tmux pero tengo mucho muscle memory de tmux.
3. **Bun** — runtime JS. Para scripts simples ya lo uso, todavía no para proyectos.

---

## Una nota sobre el cambio de herramientas

Cada vez que agrego algo nuevo al stack me hago la misma pregunta: ¿el tiempo de aprendizaje es menor que el tiempo que voy a ahorrar?

Para la mayoría de las herramientas de esta lista, la respuesta tardó semanas en ser sí. Eso está bien. El costo inicial de aprender algo bien hecho se amortiza en años.

Lo que no funciona: cambiar de herramienta cada seis meses persiguiendo la última novedad. El FOMO de tooling es real y es una trampa. Mejor dominar cinco herramientas que conocer superficialmente veinte.

> "The best tool is the one you actually use."
> — Alguien en internet, probablemente con razón.

---

## Conclusión

La lista va a cambiar. Dentro de un año voy a leer esto y voy a estar en desacuerdo con algo. Eso está bien — significa que aprendí algo en el medio.

Si llegaste hasta acá y querés recomendar algo, el link de contacto está en el sidebar.

---

*Tiempo estimado de lectura según Hugo: ver arriba.*
