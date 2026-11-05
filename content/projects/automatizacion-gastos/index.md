---
title: "Automatización de gastos"
summary: "Registro de gastos desde Telegram con n8n, OCR (Mistral Document AI) y Claude Code CLI, hacia una planilla de Google Sheets."
kind: propio
period: "2026"
date: 2026-03-26
status: en uso
featured: false
weight: 7
coverLabel: "gastos"
stack: [n8n, Telegram Bot API, Mistral Document AI, Claude Code, MCP, Google Sheets API, Docker]
links:
  repo: "https://github.com/lucianodlf/ia-update-gestion-personal"
  post: "posts/Exploracion Automatizacion Finanzas (p1).md"
---

Un sistema que procesa comprobantes (imágenes, PDFs o mensajes de texto) enviados por Telegram, extrae los datos con OCR y actualiza una planilla de Google Sheets. n8n orquesta el flujo, Mistral Document AI procesa los documentos y Claude Code CLI interactúa con la planilla. Los workflows se desarrollaron junto con Claude Code vía MCP sobre una instancia self-hosted de n8n. El proceso completo está en el post relacionado.
