---
updated: 2026-11-05
focus: ["001"]
---

# Estado

## Foco
- [001] Convertir el blog en sitio personal (épica, backlog): traer y revisar las ramas de los PR.

## Último hecho
- [002] cerrado con `/wp-done`: `LAST-STATUS.md` a `.agents/working-progress/INBOX.md` y `.agents/working-progress/log/legacy/LAST-STATUS.md`, plan de MilPathsX convertido en [003], `CLAUDE.md` sin el workflow viejo. Cosecha: nada. `wp check` ok.

## Próximo paso
- `blissful-meitner` mergeada en `main` local (88cb81b) y dominio a `lucianodlf.com.ar` (a3f4b1e), sin push. `make build` + `npx pagefind` ok con Hugo 0.169.0.
- Antes del push: en GitHub Pages el custom domain es `lucianodlf.is-a.dev` y Cloudflare redirige `lucianodlf.com.ar` (301) hacia ahí. Para servir en `.com.ar`: cambiar el custom domain en Pages y los DNS de Cloudflare (sin redirect).
- `laughing-lamport` mergeada (9227ac8). Después del push: borrar las ramas remotas `claude/blissful-meitner-vg30tk` y `claude/laughing-lamport-omyrbh` y el worktree `.agents/working-progress/_scratch/vb30tk`.
- Restos sin trackear del submódulo: `.gitmodules`, `themes/risotto/` (borrar a mano).

## Esperando tu decisión
- [003] (post MilPathsX, backlog): el borrador `content/posts/Desarrollo agentico MilPathsX.md.draft` sigue sin publicar.

<!-- wp:status -->
