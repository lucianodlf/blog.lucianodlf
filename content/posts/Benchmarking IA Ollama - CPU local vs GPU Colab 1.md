---
title: "Benchmarking de modelos de visión con Ollama: CPU local vs GPU en Colab para OCR y extracción de facturas"
date: 2026-07-21
draft: true
share: true
featured: false
toc: true
tags:
  - ollama
  - ia
  - benchmark
  - ocr
  - vision
  - self-hosted
  - colab
  - llm
created: 21-07-2026T21:23
updated: 21-07-2026T21:32
---

## Vista previa

##### Informe completo (PDF)

{{< pdf-embed placeholder >}}
<!-- Placeholder: embeber o linkear "Informe benchmarking IA ollama V1.pdf". Ver sección de recursos al final del post para la captura sugerida. -->

##### Captura sugerida: tabla comparativa de hardware

![Hardware servidor local vs Colab](placeholder-hardware-table.png)
<!-- Captura de la tabla "1. Hardware de Servidor Local" / "2. Hardware de PC Colab" del PDF, páginas 1-2 -->

##### Captura sugerida: gráfica de tiempos por modelo

![Comparativa de tiempos totales](placeholder-tiempos-chart.png)
<!-- Captura de la sección 3 del PDF, "Gráfica Comparativa de Rendimiento" -->

---

> [!IMPORTANT] UPDATE (2026-07-21)
> Este benchmark se corrió en noviembre de 2025. Desde entonces el panorama de modelos de visión cambió bastante rápido, tanto para correr local como para usar vía API cloud. Para OCR y extracción de documentos estructurados hoy hay opciones más eficaces que las evaluadas acá: modelos locales más nuevos y mejor optimizados para VLM (versiones más recientes de Qwen-VL, entre otros), y servicios cloud especializados en extracción de documentos como **Mistral OCR** o **Mistral Document AI**, pensados específicamente para este tipo de tarea y con mejor relación precisión/velocidad que armar el pipeline con modelos generalistas vía Ollama. Los números y conclusiones de este post siguen siendo válidos como métodología y como fotografía de ese momento, pero si el objetivo es resolver el caso de uso hoy, vale la pena evaluar primero esas alternativas más recientes antes de replicar este setup tal cual.

## Por qué probar esto

Vengo usando modelos locales con [Ollama](https://ollama.com) para distintas pruebas, y tenía dando vueltas una pregunta concreta: ¿tiene sentido correr modelos de visión (VLM) para tareas de OCR y extracción de datos estructurados sobre un equipo de escritorio sin GPU dedicada, o el costo en tiempo lo vuelve inviable frente a una GPU en la nube gratuita como la de Google Colab?

En paralelo tenía otra curiosidad más práctica: qué tan bien resuelven estos modelos un caso de uso concreto que me interesa —el reconocimiento de facturas y tickets, con extracción de campos en JSON— comparado contra un OCR simple de "leer el texto de una imagen".

Armé un mini-benchmark para responder las dos preguntas a la vez: comparar hardware (CPU local vs GPU en Colab) y comparar dificultad de tarea (OCR simple vs extracción de factura). El resultado completo está en el informe embebido arriba; en este post reviso la metodología, los hallazgos y los scripts que arman todo el pipeline.

## Resumen rápido

- Se probaron **7 modelos de visión** distintos (`benhaotang/Nanonets-OCR-s:F16`, `llava-phi3:3.8b-mini-q4_0`, `llava:13b-v1.6-vicuna-q4_K_M`, `minicpm-v:8b-2.6-q8_0`, `qwen2.5vl:7b-q4_K_M`, `qwen3-vl:8b-instruct-bf16`, `qwen3-vl:8b-instruct-q8_0`) en dos equipos: una PC local sin GPU dedicada para IA y una instancia de Google Colab con GPU Tesla T4.
- Dos pruebas: **T1** (OCR simple de una imagen con texto) y **T2** (extracción estructurada de un ticket de compra a JSON).
- Colab fue en promedio **~6.4x más rápido** en tiempo total y **~8.3x superior** en tokens/segundo frente al equipo local.
- Dos modelos (`llava:13b-v1.6-vicuna-q4_K_M` y `qwen3-vl:8b-instruct-bf16`) tuvieron **timeout (10 min)** en el equipo local durante la tarea de extracción de factura, mientras que en Colab terminaron sin problema.
- Para la tarea de extracción de factura (la más exigente), solo `qwen3-vl:8b-instruct-q8_0` superó el 50% de similitud en ambos entornos; ningún modelo llegó al 100%.

## Metodología

### Los dos entornos

| | PC local ("Local Server") | Google Colab |
|---|---|---|
| CPU | Intel Core i7-14700 (20 físicos / 28 totales) | Intel Xeon @ 2.00GHz (1 físico / 2 totales) |
| RAM | 31 Gi | 12 Gi |
| GPU | Intel (sin soporte estable, `OLLAMA_INTEL_GPU=1` experimental) | NVIDIA Tesla T4, 15360 MiB VRAM |
| Aceleración | CPU (advertencia: "No se detectó GPU") | CUDA 12.4 |
| Almacenamiento | HDD | overlay (89% uso) |
| Ollama | 0.12.7 | 0.12.10 |

> [!NOTE]
> El equipo local tiene una GPU integrada Intel que Ollama solo soporta de forma experimental. En la práctica, todas las pruebas locales corrieron sobre CPU. Esto es justamente parte de lo que quería medir: qué tan penalizante es correr VLMs sin aceleración de GPU real.

### Las dos pruebas

**Prueba 1 (T1) — OCR simple.** Una imagen con texto (`tipo-de-texto.jpg`) y un prompt que pide devolver el texto principal en JSON:

```
Analyze the image and extract the main text. Returns the result in the following JSON format: {text:""}
```

**Prueba 2 (T2) — extracción de factura.** Un ticket de compra (`ticket-0.jpg`) y un prompt bastante más exigente, que pide extraer ~19 campos estructurados (tipo de comprobante, CUIT emisor/receptor, ítems con cantidad y precio, CAE, condición de IVA, etc.):

```json
{
  "factura_tipo": "",
  "factura_punto_venta": "",
  "factura_numero": "",
  "factura_fecha": "",
  "emisor_nombre": "",
  "emisor_cuit": "",
  "receptor_nombre": "",
  "receptor_cuit": "",
  "items": [
    {"descripción": "", "cantidad": "", "precio_unitario": "", "total": ""}
  ],
  "subtotal": "",
  "impuesto": "",
  "total_importe": "",
  "moneda": "",
  "cae": "",
  "condicion_iva_emisor": "",
  "condicion_iva_receptor": ""
}
```

Un ejemplo real de salida (ticket de un restaurante, dato público de un comprobante de prueba, sin relación con datos personales del proyecto):

```json
{
    "factura_numero": "3071372322",
    "emisor_nombre": "DONA SALTA",
    "emisor_cuit": "30711372322",
    "receptor_nombre": "CONSUMIDOR FINAL",
    "items": [
        {"descripcion": "EMPANADA DE POLLO", "cantidad": "21.00", "total": "13.00"},
        {"descripcion": "TORO", "cantidad": "21.00", "total": "28.00"}
    ],
    "total_importe": "253.00",
    "moneda": "ARS",
    "condicion_iva_receptor": "CONSUMIDOR FINAL"
}
```

Para cada corrida se midió **tiempo total**, **tokens por segundo** y un **porcentaje de similitud** contra una respuesta de referencia (usando `difflib.SequenceMatcher` de Python para comparar el JSON generado contra el esperado).

### El pipeline de scripts

Todo el proceso corre sobre un set de scripts Bash que arman el batch, llaman a la API de Ollama y parsean resultados. La estructura, simplificada:

```
wrapper_batch_script_v2.sh
  ├── lee lista de modelos (nombre;tamaño_gb)
  ├── lee lista de imágenes
  ├── lee prompt
  └── por cada combinación modelo × imagen:
        ollama_benchmark_api_batch_v10.sh
          ├── hace pull del modelo si no está descargado
          ├── llama a la API de Ollama (/api/chat) con la imagen en base64
          ├── mide tiempo total, tokens/s, prompt_eval_count, eval_count
          └── compara la respuesta contra el JSON esperado (similitud)
```

Ejemplo simplificado de la llamada cruda a la API (con placeholder de host, ver nota de seguridad más abajo):

```bash
# 1. Codificar la imagen
IMG=$(base64 < ticket.jpg | tr -d '\n')
OLLAMA_MODEL="qwen3-vl:8b-instruct-q8_0"

# 2. Enviarla a la API de Ollama
curl -X POST "$OLLAMA_API_URL/chat" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "'"$OLLAMA_MODEL"'",
    "messages": [{
      "role": "user",
      "content": "'"$PROMPT"'",
      "images": ["'"$IMG"'"]
    }],
    "stream": false
  }'
```

> [!TIP]
> El mismo script sirve para correr contra un Ollama local (`http://localhost:11434/api`) o contra un Ollama remoto propio, pasando la URL como parámetro. Para este benchmark usé un Ollama expuesto en un servidor propio (no público) como backend del equipo "Local Server".

El script de hardware (`hw_ollama_info.sh`) recolecta CPU, RAM, GPU, versión de Ollama y variables de entorno relevantes (`OLLAMA_NUM_PARALLEL`, `OLLAMA_MAX_LOADED_MODELS`, `OLLAMA_KV_CACHE_TYPE`, `OLLAMA_FLASH_ATTENTION`, `OLLAMA_KEEP_ALIVE`), que es justamente la tabla que arma la sección 1 y 2 del informe.

### Corriendo lo mismo en Colab

La segunda pata del experimento fue correr el mismo pipeline en un notebook de Google Colab, para tener una GPU real (Tesla T4) sin costo. El notebook instala Ollama, monta Google Drive para leer los scripts e inputs, y ejecuta el mismo wrapper:

```python
# Instalar Ollama
!curl -fsSL https://ollama.com/install.sh | sh
```

```python
# Variables de entorno para las rutas del proyecto
%env BASE_PATH=/content/drive/MyDrive/ia-benchmark
%env MODELS_FILE={BASE_PATH}input-files/list_models_3.txt
%env IMAGES_FILE={BASE_PATH}input-files/list_images_2.txt
%env PROMPT_FILES={BASE_PATH}input-files/prompt_image_2.txt
%env SCRIPTS_PATH={BASE_PATH}scripts
```

```python
# Ejecutar el batch completo
!"${SCRIPTS_PATH}/wrapper_batch_script_v2.sh" "$PROMPT_FILES" "$MODELS_FILE" \
  "$IMAGES_FILE" 20 "$RESPONSE_MODELS" http://localhost:11434/api
```

Colab (a diferencia del servidor propio) sirve Ollama en `localhost`, así que no hace falta ningún host externo: todo corre dentro de la sesión del notebook.

##### Captura sugerida: notebook de Colab corriendo el batch

![Colab ejecutando el benchmark](placeholder-colab-notebook.png)
<!-- Captura de colab_ia_benchmark_v2.ipynb ejecutando la celda del wrapper -->

## Resultados

### OCR simple (T1): la brecha ya es grande

| Modelo | Tiempo local (min) | Tiempo Colab (min) | Similitud |
|---|---|---|---|
| `benhaotang/Nanonets-OCR-s:F16` | 3.01 | 0.63 | 70.72% / 96.97% |
| `llava-phi3:3.8b-mini-q4_0` | 2.96 | 0.28 | JSON no parseado |
| `llava:13b-v1.6-vicuna-q4_K_M` | 9.36 | 0.73 | JSON no parseado |
| `minicpm-v:8b-2.6-q8_0` | 3.53 | 0.91 | JSON no parseado |
| `qwen2.5vl:7b-q4_K_M` | 3.95 | 0.48 | 100% / 100% |
| `qwen3-vl:8b-instruct-bf16` | 3.77 | 1.59 | 100% / 100% |
| `qwen3-vl:8b-instruct-q8_0` | **1.19** | 0.74 | 100% / 100% |

Tres modelos (`qwen2.5vl`, `qwen3-vl:bf16`, `qwen3-vl:q8_0`) llegaron a 100% de similitud en ambos entornos para la tarea simple. Los tres modelos basados en LLaVA (`llava-phi3`, `llava:13b-v1.6`, `minicpm-v`) fallaron al no devolver un JSON parseable, independientemente del hardware — un problema de formato de salida, no de velocidad.

### Extracción de factura (T2): la tarea difícil separa la paja del trigo

| Modelo | Tiempo local (min) | Tiempo Colab (min) | Similitud |
|---|---|---|---|
| `benhaotang/Nanonets-OCR-s:F16` | 5.56 | 1.09 | 46.54% / 26.61% |
| `llava-phi3:3.8b-mini-q4_0` | 5.80 | 0.44 | Raw / 22.43% |
| `llava:13b-v1.6-vicuna-q4_K_M` | **TIMEOUT (10 min)** | 1.53 | N/A / Raw |
| `minicpm-v:8b-2.6-q8_0` | 4.43 | 1.67 | Raw / Raw |
| `qwen2.5vl:7b-q4_K_M` | 8.90 | 0.92 | 43.85% / 42.09% |
| `qwen3-vl:8b-instruct-bf16` | **TIMEOUT (10 min)** | 8.10 | N/A / 53.60% |
| `qwen3-vl:8b-instruct-q8_0` | 2.81 | 1.35 | **53.80% / 51.25%** |

Acá aparece el dato más interesante del informe: dos modelos que en T1 funcionaban perfectamente bien tardaron **más de 10 minutos** (timeout) en el equipo local al enfrentar la tarea de extracción de factura, y sin embargo terminaron sin problema en Colab. La complejidad del prompt (19 campos anidados, un array de ítems) no solo baja la calidad del resultado: en hardware sin GPU puede volver la tarea directamente inviable en tiempos razonables.

Ningún modelo superó el 54% de similitud en la tarea de extracción completa — la tarea de reconocer campos fiscales estructurados de un ticket real sigue siendo notablemente más difícil que un OCR de texto plano, incluso para el mejor modelo de la tanda (`qwen3-vl:8b-instruct-q8_0`).

### El ratio de aceleración

Promediando los ratios de todos los modelos y las dos pruebas (12 comparaciones válidas, excluyendo los timeouts):

- **Factor promedio de tiempo: ~6.41x** — Colab resuelve en promedio la misma tarea 6.4 veces más rápido.
- **Factor promedio de tokens/s: ~8.31x** — la tasa de generación de tokens en Colab es en promedio 8.3 veces mayor.

El caso más extremo fue `llava-phi3:3.8b-mini-q4_0` en la prueba de extracción de factura: **13.19x más rápido** en Colab. El menos extremo, `qwen3-vl:8b-instruct-bf16` en T1, con solo 1.18x en tokens/s — probablemente porque ese modelo en formato `bf16` (sin cuantizar) es tan pesado que ni la GPU T4 lo aprovecha con holgura.

##### Captura sugerida: tabla de ratios de speedup

![Ratios de aceleración por modelo](placeholder-ratios-table.png)
<!-- Captura de la tabla "Ratio de Incremento de Rendimiento (Colab vs. Local Server)", página 4-5 del PDF -->

## Qué me llevo de esto

**La GPU no es opcional para VLMs si el tiempo importa.** La diferencia entre CPU y una GPU modesta como la T4 (que Google regala en el tier gratuito de Colab) no es una mejora incremental: es la diferencia entre que una tarea termine en 3 minutos o directamente no termine en 10. Para cualquier uso que no sea "correrlo una vez y esperar lo que sea", correr VLMs de este tamaño (7B-13B) sin GPU real no es viable.

**El formato de salida (JSON válido) es un problema aparte de la calidad del contenido.** Los modelos de la familia LLaVA (`llava-phi3`, `llava:13b-v1.6`) fallaron consistentemente en devolver JSON parseable, sin importar cuánto tiempo tuvieran disponible. Esto importa para cualquier pipeline que dependa de parsear la salida programáticamente: conviene validar el formato de salida antes de invertir tiempo en medir precisión.

**La familia Qwen (`qwen2.5vl`, `qwen3-vl`) fue la más consistente** en ambas pruebas y ambos entornos, con `qwen3-vl:8b-instruct-q8_0` como el mejor balance de velocidad y similitud en la tarea difícil.

**El caso de uso de extracción de facturas todavía tiene mucho margen.** Ninguno de los modelos locales evaluados superó el 54% de similitud en la tarea completa. Para un caso de uso real de automatización de gastos (que es algo que [ya vengo explorando](https://blog.lucianodlf.com.ar/) con otros enfoques), esto sugiere que, al menos con este set de modelos y sin fine-tuning, todavía conviene usar un modelo comercial (tipo Claude o GPT) o un servicio de OCR dedicado para la parte de extracción estructurada, y reservar los modelos locales vía Ollama para tareas más simples de lectura de texto.

## Próximos pasos

Quedó pendiente:

- Probar con más ejemplos de facturas/tickets (el benchmark actual usa un único caso por prueba, lo cual limita cuánto se puede generalizar de la métrica de similitud).
- Evaluar variantes cuantizadas más agresivas (`q4_K_M`, `q3_K_M`) de los modelos que mejor rindieron, para ver si se puede achicar más la brecha de tiempo en CPU sin perder demasiada calidad.
- Sumar un modelo comercial (vía API) como referencia de "techo" de calidad en la misma tabla comparativa.

## Recursos

- **Repositorio del proyecto (script completo, notebooks e informe):** [github.com/lucianodlf/ia-benchmark-ollama](https://github.com/lucianodlf) — *placeholder: repo aún no publicado, actualizar con la URL real al crearlo.*
- **Notebook de Colab:** *placeholder — agregar link de "Open in Colab" una vez subido el `.ipynb` al repo público.*
- **Informe completo (PDF):** embebido al inicio del post — *placeholder, ver nota de proceso de limpieza más abajo.*
- Más sobre mis experimentos con IA y automatización: [blog.lucianodlf.com.ar](https://blog.lucianodlf.com.ar/)

---

*Este post es parte de una serie de experimentos personales probando modelos de IA locales y en la nube para distintos casos de uso. El repositorio del benchmark se va a publicar próximamente — el link de arriba es un placeholder hasta entonces.*
