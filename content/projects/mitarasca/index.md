---
title: "MiTarasca"
summary: "Finanzas personales local-first: movimientos, deudas y cuotas en un SQLite tuyo. Web, CLI, MCP y API."
kind: propio
period: "2026"
date: 2026-08-01
status: en uso
featured: true
weight: 3
coverFit: contain
stack: [Bun, TypeScript, Hono, Drizzle, tRPC, SQLite, Vue 3, shadcn-vue, Docker, OCI, GitLab CI]
links:
  repo: "https://github.com/lucianodlf/mitarasca"
  demo: "https://mitarasca.demo.lucianodlf.com.ar"
---

## Contexto

Una herramienta personal para gestionar movimientos, deudas y cuotas con un enfoque claro: mostrarte lo que gastás cada mes, con nombre y apellido. No promete que vas a tener más plata; te ayuda a entender qué es fijo, qué es variable, qué está pagado y qué está adeudado. Los datos viven en un archivo SQLite local, sin cuentas en la nube.

## Qué hice

- Un monorepo con un núcleo backend y tres interfaces que se comunican vía tRPC (API, CLI y MCP para asistentes de IA), más una SPA web en Vue 3.
- Movimientos con contexto, prorrateo real, plantillas mensuales de gastos fijos, deudas bidireccionales y balance en tres modos.
- Despliegue en Oracle Cloud Infrastructure con un pipeline de CI/CD en GitLab: tests, build de Docker, push al registry, release por tag y deploy.
