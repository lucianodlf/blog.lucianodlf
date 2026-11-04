---
title: "Innovat"
summary: "Backoffice de gestión institucional de la Fundación Innovat (UVT de CONICET): subsidios, vinculación, tesorería y contabilidad."
kind: cliente
client: "INGAR (CONICET-UTN)"
role: "Software Engineer"
period: "07/2024 – 07/2026"
date: 2024-07-01
status: finalizado
featured: false
weight: 3
coverLabel: "Innovat"
stack: [Python, FastAPI, SQLAlchemy, PostgreSQL, Redis, ARQ, Pytest, Playwright, Ollama, Vue.js, TypeScript, Docker, ARCA]
metrics:
  - { value: "7", label: "modelos OCR y de visión comparados con Ollama, CPU local contra GPU en la nube" }
links:
  post: "posts/Benchmarking IA Ollama - CPU vs GPU.md"
---

## Contexto

Desarrollé funcionalidades para el backoffice de gestión institucional de la Fundación Innovat, en el equipo de desarrollo junto a analistas funcionales y dueños de producto.

## Qué hice

- Construí la base de un módulo propio de facturación electrónica con ARCA, extensible y con tests unitarios en Pytest, en reemplazo de un SDK cerrado.
- Diseñé un benchmark con el que comparé 7 modelos OCR y de visión con Ollama, con inferencia local en CPU frente a GPU en la nube, y entregué un informe técnico con una recomendación.
- Investigué y diseñé un workflow de testing E2E aumentado con IA (Playwright, browser-use y Claude Code), a partir de la documentación del conocimiento del negocio.
- Implementé procesos en segundo plano con ARQ y Redis (envío de emails y otras tareas) y configuré los entornos de QA con Docker Compose, Nginx, Caddy y certbot.
