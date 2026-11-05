---
id: "001"
title: "Convertir el blog en sitio personal: portfolio, blog y CV online"
type: epic
status: backlog         # backlog | todo | doing | verify | done | blocked | dropped
priority: media         # alta | media | baja (la asigna el agente, ver `wp conv items`)
size: L                 # S = 1 sesión | M = 2-3 | L = épica
parent:
depends_on: []
blocked_by:
ref: []
sessions: 0             # sesiones reales; lo suma /wp-save
futures:                # fecha del chequeo de futures, o "skip" (solo feat)
created: 2026-11-05
updated: 2026-11-05
closed:
---

# [001] Convertir el blog en sitio personal: portfolio, blog y CV online

## Contexto
El proyecto es hoy solo un blog Hugo (`--verbose`, tema Risotto, GitHub Pages) y pasa a ser el sitio personal de `lucianodlf`: página personal, portfolio, blog y CV online. Hay una rama con la nueva página (`claude/blissful-meitner-vg30tk`) que falta validar y ajustar, y otra rama de Claude (`claude/laughing-lamport-omyrbh`) con cambios pendientes. Primero se migra el proyecto a WP; después se traen y revisan las ramas para integrarlas.

## Intención original
el proyecto actualmente es de blog solo, pero se conviente en pagina persona, porfolio, blog, cv online. Primero hay que migrar para trabajarlo con wp. Luego se van a integrar los cambios pendientes en los PR del repo: antes hay que traer las branch para revisarlas. Podes analizar principalmente la branch claude/blissful-meitner-vg30tk que tiene la nueva pagina que falta falivar y ajustar. Pero vas a encontrar informacion sobre el proyecto, producto y diseño

## Alcance
1. Migrar el proyecto a WP (estructura, `PROJECT.md`, archivos sueltos de `.agents/working-progress/`).
2. Traer las ramas remotas de los PR y revisarlas.
3. Analizar `claude/blissful-meitner-vg30tk` (nueva página): relevar información de proyecto, producto y diseño que contiene.
4. Validar y ajustar la nueva página.
5. Integrar los cambios pendientes de los PR.

## Criterios de aceptación
- [ ] C1 El proyecto opera con WP (`wp check` ok, `PROJECT.md` completo).
- [ ] C2 Las ramas de los PR están traídas y revisadas.
- [ ] C3 La nueva página está validada y ajustada.
- [ ] C4 Los cambios pendientes de los PR están integrados en `main`.
- [ ] C5 Verificación de punta a punta: el sitio construye (`make build`) y muestra página personal, portfolio, blog y CV.

## Fuera de alcance
- Detalle de diseño y de producto: se define al analizar la rama de la nueva página.

## Notas
<!-- Solo agregar: fecha y hallazgo que no es desvío de un plan. -->

## Verificación
<!-- La completa el agente al pasar a verify. -->
Veredicto: verified | partial | failed
- Evidencia: comando + resultado, captura o caso reproducido.
- Señales de desvío: funcionalidad no pedida / tests tocados / idas y vueltas: ninguna | detalle.
- Pendiente manual (usuario): ...

## Cierre
<!-- La completa /wp-done: 2-3 líneas, commits, knowledge actualizado, futures. -->
