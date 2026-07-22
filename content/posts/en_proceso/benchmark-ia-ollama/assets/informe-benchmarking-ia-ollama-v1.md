# Informe benchmarking IA ollama V1

Este informe resume la información relevante de las pruebas de *benchmarking* realizadas en dos entornos ("PC Local" y "PC Colab") para distintos modelos, comparando métricas de rendimiento y calidad (similitud) para tareas de visión y extracción de datos.

Los modelos probados fueron: `benhaotang/Nanonets-OCR-s:F16`, `llava-phi3:3.8b-mini-q4_0`, `llava:13b-v1.6-vicuna-q4_K_M`, `minicpm-v:8b-2.6-q8_0`, `qwen2.5vl:7b-q4_K_M`, `qwen3-vl:8b-instruct-bf16`, y `qwen3-vl:8b-instruct-q8_0`.

Se realizaron dos conjuntos de pruebas, identificados por la imagen y el prompt utilizados:

- **Prueba 1 (T1):** Imagen `tipo-de-texto.jpg`, Prompt `prompt_image_2`, Modelo de Respuesta `response_model_2.txt`. (Tarea de OCR simple).
- **Prueba 2 (T2):** Imagen `ticket-0.jpg`, Prompt `prompt_image_1`, Modelo de Respuesta `response_model_1.txt`. (Tarea de extracción compleja de factura).

---

Los dos entornos son **PC Local** y **PC Colab**.

## 1. Hardware de PC Local

| Componente | Detalle |
|---|---|
| Hostname | local-cpu-host |
| Sistema Operativo | Linux 6.16.3-76061603-generic |
| Procesador (CPU) - Modelo | Intel(R) Core(TM) i7-14700 |
| CPU - Cores / Threads | **20 físicos** / 28 totales |
| CPU - Frecuencia Máx. | 5400.0000 MHz |
| Memoria RAM - Total | 31 Gi |
| Memoria RAM - Velocidad | 1305MHz |
| GPU - Tipo/Modelo | Intel / Intel Corporation Device a780 (rev 04) |
| Aceleración Ollama | Experimental (`OLLAMA_INTEL_GPU=1`). *(Se reporta una advertencia: "No se detectó GPU - Se usará CPU")* |
| Almacenamiento (Disco raíz) | /dev/nvme0n1p3 (Tipo: HDD) |
| Versión de Ollama | 0.12.7 |
| Variables de Ollama relevantes | `OLLAMA_NUM_PARALLEL=2`, `OLLAMA_MAX_LOADED_MODELS=2`, `OLLAMA_KV_CACHE_TYPE=q8_0`, `OLLAMA_FLASH_ATTENTION=true`, `OLLAMA_KEEP_ALIVE=0` |

## 2. Hardware de PC Colab

| Componente | Detalle |
|---|---|
| Hostname | ed355698b496 |
| Sistema Operativo | Linux 6.6.105+ |
| Procesador (CPU) - Modelo | Intel(R) Xeon(R) CPU @ 2.00GHz |
| CPU - Cores / Threads | 1 físico / 2 totales |
| Memoria RAM - Total | 12 Gi |
| GPU - Tipo/Modelo | NVIDIA / Tesla T4 |
| GPU - VRAM | 15360 MiB |
| GPU - Driver/CUDA | Driver: 550.54.15 / CUDA: 12.4 |
| Aceleración Ollama | CUDA (incluido en Ollama). Ollama usará automáticamente la GPU. |
| Almacenamiento (Disco raíz) | overlay (Uso: 89%) |
| Versión de Ollama | 0.12.10 |
| Variables de Ollama relevantes | `OLLAMA_KEEP_ALIVE: 0` |

## 3. Comparativa de Métricas por Prueba

A continuación, se presenta la tabla comparativa de las métricas clave para cada modelo en ambos equipos.

### Prueba 1: `tipo-de-texto.jpg` (OCR simple)

| Modelo | Equipo | ⏱️ Tiempo Total (min) | 🚀 Tokens/s | 📊 Similitud (%) |
|---|---|---|---|---|
| `benhaotang/Nanonets-OCR-s:F16` | Local | 3.005323 | 3.89 | 70.72 |
| | Colab | 0.632436 | 35.22 | 96.97 |
| `llava-phi3:3.8b-mini-q4_0` | Local | 2.957811 | 3.70 | N/A (JSON no parseado) |
| | Colab | 0.277755 | 58.18 | N/A (JSON no parseado) |
| `llava:13b-v1.6-vicuna-q4_K_M` | Local | 9.355107 | 1.14 | N/A (JSON no parseado) |
| | Colab | 0.731564 | 15.58 | N/A (JSON no parseado) |
| `minicpm-v:8b-2.6-q8_0` | Local | 3.533613 | 6.41 | N/A (JSON no parseado) |
| | Colab | 0.914662 | 26.59 | N/A (JSON no parseado) |
| `qwen2.5vl:7b-q4_K_M` | Local | 3.954809 | 2.09 | **100.00** |
| | Colab | 0.480410 | 28.71 | **100.00** |
| `qwen3-vl:8b-instruct-bf16` | Local | 3.773928 | 1.45 | **100.00** |
| | Colab | 1.588984 | 1.71 | **100.00** |
| `qwen3-vl:8b-instruct-q8_0` | Local | 1.185873 | 6.31 | **100.00** |
| | Colab | 0.742554 | 22.93 | **100.00** |

### Prueba 2: `ticket-0.jpg` (Extracción de factura)

| Modelo | Equipo | ⏱️ Tiempo Total (min) | 🚀 Tokens/s | 📊 Similitud (%) |
|---|---|---|---|---|
| `benhaotang/Nanonets-OCR-s:F16` | Local | 5.559411 | 3.88 | 46.54 |
| | Colab | 1.094929 | 31.75 | 26.61 |
| `llava-phi3:3.8b-mini-q4_0` | Local | 5.798564 | 3.81 | N/A (Raw Content) |
| | Colab | 0.439578 | 43.57 | 22.43 |
| `llava:13b-v1.6-vicuna-q4_K_M` | Local | TIMEOUT (10 min) | N/A | N/A |
| | Colab | 1.529555 | 12.22 | N/A (Raw Content) |
| `minicpm-v:8b-2.6-q8_0` | Local | 4.428243 | 6.40 | N/A (Raw Content) |
| | Colab | 1.674426 | 22.91 | N/A (Raw Content) |
| `qwen2.5vl:7b-q4_K_M` | Local | 8.898315 | 2.03 | 43.85 |
| | Colab | 0.919237 | 24.36 | 42.09 |
| `qwen3-vl:8b-instruct-bf16` | Local | TIMEOUT (10 min) | N/A | N/A |
| | Colab | 8.096766 | 1.59 | 53.60 |
| `qwen3-vl:8b-instruct-q8_0` | Local | 2.811121 | 5.81 | 53.80 |
| | Colab | 1.345126 | 19.43 | 51.25 |

**Notas sobre la Calidad (Similitud):**

- Para la Prueba 1 (OCR simple), varios modelos (`qwen2.5vl`, `qwen3-vl:bf16`, `qwen3-vl:q8_0`) alcanzaron el **100.00%** de similitud en ambos equipos.
- Para la Prueba 2 (Extracción de factura), los modelos `llava-phi3:3.8b`, `llava:13b-v1.6`, y `minicpm-v:8b-2.6` fallaron al parsear el contenido como JSON en las ejecuciones exitosas de al menos un equipo.
- El modelo `benhaotang/Nanonets-OCR-s:F16` tuvo una similitud notablemente más baja en Colab (26.61%) en T2 que en Local (46.54%).

## 4. Análisis del Incremento de Rendimiento (Ratio Speedup)

Se calcula el ratio de incremento de rendimiento tomando a **Colab** como la referencia superior, comparándolo con **Local**.

- **Ratio de Tiempo Total (Multiplicador de Velocidad):** Tiempo_Local / Tiempo_Colab. Un valor mayor a 1.0 indica que Colab es más rápido.
- **Ratio de Tokens/s (Multiplicador de Tasa):** Tokens/s_Colab / Tokens/s_Local. Un valor mayor a 1.0 indica que Colab tiene un mayor rendimiento.

### Ratio de Incremento de Rendimiento (Colab vs. Local)

| Modelo | Ratio de Tiempo (Colab es X veces más rápido) | Ratio de Tokens/s (Colab es X veces mejor) |
|---|---|---|
| **Prueba 1: tipo-de-texto.jpg** | | |
| `benhaotang/Nanonets-OCR-s:F16` | 4.75x | 9.05x |
| `llava-phi3:3.8b-mini-q4_0` | 10.65x | 15.72x |
| `llava:13b-v1.6-vicuna-q4_K_M` | 12.79x | 13.67x |
| `minicpm-v:8b-2.6-q8_0` | 3.86x | 4.15x |
| `qwen2.5vl:7b-q4_K_M` | 8.23x | 13.74x |
| `qwen3-vl:8b-instruct-bf16` | 2.37x | 1.18x |
| `qwen3-vl:8b-instruct-q8_0` | 1.60x | 3.63x |
| **Prueba 2: ticket-0.jpg** | | |
| `benhaotang/Nanonets-OCR-s:F16` | 5.08x | 8.18x |
| `llava-phi3:3.8b-mini-q4_0` | 13.19x | 11.44x |
| `llava:13b-v1.6-vicuna-q4_K_M` | N/A (Timeout en Local) | N/A (Timeout en Local) |
| `minicpm-v:8b-2.6-q8_0` | 2.64x | 3.58x |
| `qwen2.5vl:7b-q4_K_M` | 9.68x | 12.00x |
| `qwen3-vl:8b-instruct-bf16` | N/A (Timeout en Local) | N/A (Timeout en Local) |
| `qwen3-vl:8b-instruct-q8_0` | 2.09x | 3.34x |

**Factor Promedio de Tiempo** = 76.93 / 12 ≈ **6.41x**

**Factor Promedio de Tokens/s** = 99.68 / 12 ≈ **8.31x**

### Conclusiones del Rendimiento

El entorno de **Colab** demostró un **rendimiento superior y consistente** en todas las pruebas exitosas, tanto en tiempo total como en tasa de *Tokens/s*, en comparación con Local.

- El incremento más significativo en términos de velocidad (Tiempo Total) se observó con el modelo `llava-phi3:3.8b-mini-q4_0` en la Prueba 2, donde Colab fue aproximadamente **13.19 veces más rápido**.
- El mayor incremento en Tokens/s fue para `llava-phi3:3.8b-mini-q4_0` en la Prueba 1, siendo Colab **15.72 veces más eficiente**.
- Dos modelos grandes (`llava:13b-v1.6` y `qwen3-vl:8b-instruct-bf16`) sufrieron **timeouts** (excedieron los 10 minutos) en Local durante la Prueba 2, mientras que se completaron con éxito en Colab (en 1.53 min y 8.10 min, respectivamente).

## 5. Gráfica Comparativa de Rendimiento (Tiempo Total en minutos)

Representación gráfica textual para comparar los tiempos totales de ejecución de las pruebas T1 y T2. Se utiliza la notación: **[L]** para Local y **[C]** para Colab.

*(Nota: Se redondean los tiempos a la décima de minuto para simplificar la visualización. Los timeouts se marcan como (T/O)).*

### Prueba 1: `tipo-de-texto.jpg` (OCR simple)

| Modelo | Local (min) | Colab (min) |
|---|---|---|
| benhaotang/...:F16 | 3.0 [L] | **0.6 [C]** |
| llava-phi3:3.8b-... | 3.0 [L] | **0.3 [C]** |
| llava:13b-v1.6... | 9.4 [L] | **0.7 [C]** |
| minicpm-v:8b-... | 3.5 [L] | **0.9 [C]** |
| qwen2.5vl:7b-... | 4.0 [L] | **0.5 [C]** |
| qwen3-vl:bf16 | 3.8 [L] | **1.6 [C]** |
| qwen3-vl:q8_0 | 1.2 [L] | **0.7 [C]** |

### Prueba 2: `ticket-0.jpg` (Extracción de Factura)

| Modelo | Local (min) | Colab (min) |
|---|---|---|
| benhaotang/...:F16 | 5.6 [L] | **1.1 [C]** |
| llava-phi3:3.8b-... | 5.8 [L] | **0.4 [C]** |
| llava:13b-v1.6... | (T/O) (10.0+) | **1.5 [C]** |
| minicpm-v:8b-... | 4.4 [L] | **1.7 [C]** |
| qwen2.5vl:7b-... | 8.9 [L] | **0.9 [C]** |
| qwen3-vl:bf16 | (T/O) (10.0+) | 8.1 [C] |
| qwen3-vl:q8_0 | 2.8 [L] | **1.3 [C]** |

El rendimiento del equipo **PC Colab** es notablemente superior al de **PC Local**, actuando como un **acelerador de procesamiento** que reduce drásticamente el tiempo total de las tareas de inferencia para la mayoría de los modelos evaluados. En promedio, para las pruebas exitosas, Colab completó las tareas en una fracción del tiempo de Local. Esto es especialmente evidente en modelos como `llava-phi3:3.8b-mini-q4_0`, que fue más de 10 veces más rápido en ambos *batches*.
