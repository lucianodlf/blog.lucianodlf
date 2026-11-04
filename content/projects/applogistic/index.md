---
title: "AppLogistic"
summary: "Plataforma para planificar rutas de recolección, con backoffice web, app mobile y un modelo de optimización MILP."
kind: cliente
client: "INGAR (CONICET-UTN)"
role: "Software Engineer"
period: "04/2026 – 07/2026"
date: 2026-04-01
status: finalizado
featured: true
weight: 1
coverLabel: "AppLogistic"
stack: [Python, FastAPI, PostgreSQL, Redis, ARQ, Vue.js, Tailwind, shadcn-vue, MILP]
metrics:
  - { value: "51", label: "issues en 9 fases" }
  - { value: "2 de 3", label: "meses: alcance entregado antes de lo planificado" }
  - { value: "20' → 10'", label: "el escenario más grande pasó de no resolver a dar una solución válida" }
links: {}
---

## Contexto

Planificar rutas de recolección sobre un modelo de optimización MILP, con una plataforma que lo ponga en manos de quien planifica.

## Qué hice

- Backend en Python con FastAPI, PostgreSQL, Redis y ARQ para las tareas en segundo plano.
- Backoffice web en Vue.js con Tailwind y shadcn-vue, más una app mobile.
- Trabajo spec-driven con agentes: especificación, plan en 9 fases y 51 issues, validación en cada fase.

## Resultado

El alcance pensado para tres meses se entregó en dos. En el escenario más grande, el modelo MILP pasó de no encontrar solución en 20 minutos a dar una válida en 10.
