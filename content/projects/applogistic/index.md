---
title: "AppLogistic"
summary: "Plataforma de logística para planificar rutas de recolección, con backoffice web y app mobile, para un cliente que planificaba en papel y Excel."
kind: cliente
client: "INGAR (CONICET-UTN)"
role: "Software Engineer"
period: "04/2026 – 07/2026"
date: 2026-04-01
status: finalizado
featured: true
weight: 1
coverLabel: "AppLogistic"
stack: [Python, FastAPI, SQLAlchemy, PostgreSQL, Redis, ARQ, MILP, Pyomo, HiGHS, Vue.js, TypeScript, Tailwind, shadcn-vue, Docker]
metrics:
  - { value: "51", label: "issues resueltos en 9 fases" }
  - { value: "2 de 3", label: "meses: alcance entregado antes de lo planificado" }
  - { value: "20' → 10'", label: "escenario de 44 clientes: de no resolver a una solución válida" }
links: {}
---

## Contexto

El cliente planificaba las rutas de recolección en papel y Excel. El proyecto era una plataforma con backoffice web y app mobile, sobre un modelo de optimización MILP del equipo de matemática.

## Qué hice

Trabajé todo el proyecto con un workflow propio, spec-driven y aumentado con IA: generé el backlog de issues a partir del documento de alcance y resolví 51 issues en 9 fases, cada uno con investigación, plan, implementación y validación.

- Con una investigación guiada con IA aceleré el modelo MILP: una heurística como punto de partida del solver y un benchmark de solvers y configuraciones sobre datos reales, documentado para que el equipo lo repita.
- Implementé la ejecución del modelo como tarea asíncrona con ARQ y Redis, para que el cálculo largo no bloqueara la API.
- Renové por completo el frontend (de Bulma a Tailwind y shadcn-vue) y desarrollé el planificador semanal de rutas con drag and drop entre días, clientes, vehículos y conductores, con validaciones según el estado de cada ruta.
- Coordiné con producto y negocio, analistas funcionales y el equipo de matemática para definir alcance, priorizar y validar las mejoras.

## Resultado

Entregué en dos meses un alcance planificado para tres. En el escenario de 44 clientes, el modelo pasó de no encontrar solución en 20 minutos a dar una válida en 10.
