---
# Generado por ~/Projects/portfolio (scripts/build.py mitarasca). No editar a mano.
title: "MiTarasca"
summary: "Finanzas personales local-first: movimientos, deudas y cuotas en un SQLite tuyo, con web, CLI, MCP y API sobre el mismo dominio."
kind: propio
role: "Autor: producto, desarrollo y despliegue"
period: "2026"
date: 2026-08-01
status: en uso
featured: true
weight: 3
coverFit: contain
stack: [Bun, TypeScript, Hono, tRPC, Drizzle, SQLite, Zod, Vue 3, Pinia, shadcn-vue, Tailwind, Commander.js, MCP, Docker, GitLab CI, Oracle Cloud]
links:
  repo: "https://github.com/lucianodlf/mitarasca"
  demo: "https://mitarasca.demo.lucianodlf.com.ar"
---

## Contexto

Una herramienta propia para llevar las finanzas personales: qué es fijo y qué es variable, qué está pagado y qué está adeudado, cuánto está comprometido en cuotas y cuánto debe cada persona con la que se comparten gastos. No promete que vas a tener más plata ni da consejos: muestra lo que se va cada mes, con nombre y apellido.

Nació para uso propio, en Argentina, con pesos y billeteras virtuales locales, como evolución de una automatización de gastos. Los datos viven en un archivo SQLite en la máquina del usuario, sin cuenta ni nube obligatoria.

## Qué hice

Lo diseñé y desarrollé de punta a punta, del dominio al despliegue de la demo.

- **Un dominio, cuatro puertas.** La lógica vive solo en un paquete `core`, sin HTTP ni framework, y la usan cuatro interfaces que solo traducen su entrada: una SPA en Vue 3, una API tRPC sobre Hono, una CLI y un servidor MCP. La CLI y el MCP llaman al dominio en el mismo proceso, sin red.
- **tRPC solo donde hay red.** La web habla con la API por tRPC e importa únicamente el tipo del router, así el acceso a SQLite nunca entra al bundle del navegador.
- **Funcionalidades:** movimientos con etiquetas en cinco dimensiones (tipo, concepto, estado, medio de pago y persona), prorrateo de gastos compartidos (lo que pagaste y lo que te toca, por separado), plantilla mensual de gastos fijos, deudas en las dos direcciones con cuotas automáticas, y balance proyectado, real y con estimación de gastos variables.
- **Asistentes de IA sobre los mismos datos:** el servidor MCP expone 18 tools para consultar y cargar movimientos y deudas desde un asistente.
- **Pipeline de CI/CD en GitLab:** typecheck y tests en cada push; imagen Docker en `main` y en tags; en cada tag `vX.Y.Z`, release y deploy por SSH a una VM de Oracle Cloud (Always Free) con `docker compose` y healthcheck. Lo armé después de encontrar la API de la demo caída sin que nadie lo hubiera notado.
- **Repo público por allowlist:** el código de GitHub se exporta desde el repo de trabajo con una lista explícita de archivos, que deja afuera los datos financieros reales; ahí corre su propio CI con typecheck y tests.
- **Instalación y demo:** instalador para Linux que deja el comando `mitarasca`, y modo demo con datos inventados en la CLI, la web, el MCP y Docker.

## Resultado

- Herramienta en uso propio, publicada en la versión 0.2.0 (03/11/2026), con una demo pública que se actualiza sola al etiquetar una versión.
- Más de 200 tests del dominio en `packages/core`.
- Límites dichos sin vueltas: la importación desde capturas de billetera y algunos comandos de la CLI son experimentales, el instalador es solo para Linux y no hay versión mobile.

## Evidencia

- Demo con datos inventados: <https://mitarasca.demo.lucianodlf.com.ar>
- Código: <https://github.com/lucianodlf/mitarasca>
- Arquitectura y madurez de cada feature: [`docs/architecture.md`](https://github.com/lucianodlf/mitarasca/blob/main/docs/architecture.md) y [`docs/features.md`](https://github.com/lucianodlf/mitarasca/blob/main/docs/features.md).
