---
title: "Poliédrica"
summary: "Odoo 19 para una librería, con un módulo que completa la información de cada libro con APIs, web scraping y LLMs, y un catálogo web en Astro."
kind: cliente
client: "Poliédrica Librería Nómade"
role: "Software Engineer"
period: "07/2026 – 10/2026"
date: 2026-07-01
status: finalizado
featured: true
weight: 2
coverLabel: "Poliédrica"
stack: [Odoo 19, Python, PostgreSQL, LiteLLM, OpenRouter, BeautifulSoup, Astro, Vue.js, Cloudflare Workers, Docker]
links: {}
---

## Contexto

Una librería que llevaba el catálogo en Excel y necesitaba inventario, ventas, punto de venta, CRM y facturación en un solo sistema.

## Qué hice

Implementé Odoo 19 Community con la migración del catálogo desde Excel y un módulo propio sobre el punto de venta.

- Desarrollé un módulo que busca y completa la información de cada libro con APIs (Open Library, Google Books), web scraping y búsqueda web, y genera con LLMs propuestas de reseña. La orquestación está en Python con LiteLLM, con fallback entre proveedores (Gemini, Groq, Mistral y OpenRouter).
- Desarrollé un catálogo web estático en Astro con islas Vue y búsqueda, generado desde Odoo con sincronización automatizada de productos y desplegado en Cloudflare Workers.
- Configuré backups programados y una demo pública en un VPS.
