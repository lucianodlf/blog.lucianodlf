# Propuestas de texto: lead del home, servicios y readme.txt

Fuentes: `data/home.yaml` (lead actual), `content/_index.md` (bloques `whoami` y `readme.txt`), `~/Projects/desarrollo-profesional/mi-profile/piezas/` (identidad, pitch, skills, proyectos, descansos) y `~/Projects/desarrollo-profesional/mi-profile/pitch-servicios-it.es.md`.

## 1. Lead del home (3 versiones, sin aplicar)

Combinan el lead actual con los dos textos del readme (`$ whoami (Anātman)` y `$ cat readme.txt`). Largo objetivo: 2 o 3 oraciones, entre 230 y 290 caracteres (el actual tiene ~165).

Lead actual:
> Trabajo en IT desarrollando software para ayudar a las personas a resolver problemas, convertir ideas en procesos y herramientas simples que aporten claridad.

### L1. El --verbose (juego con el nombre del sitio)
> Desarrollo software para ayudar a las personas a resolver problemas y convertir ideas en herramientas simples que aporten claridad. Este sitio es el --verbose de ese proceso: proyectos, notas y reflexiones de un flujo de vida que nunca termina de compilar.

Por qué: une lo profesional con el concepto del sitio en una sola metáfora técnica. Es la que mejor explica qué va a encontrar quien entra.

### L2. Convencionalmente (whoami)
> Convencionalmente, Luciano Delfino; a veces, Rafiki. Trabajo en IT desarrollando software que convierte ideas en procesos y herramientas simples. Entre commit y commit escribo sobre lo que me entusiasma: código, curiosidad y cosas de la hermosa vida.

Por qué: abre con la voz del readme (Anātman, el alias) y deja el oficio en el medio. Es la más personal; repite el nombre del h1, así que funciona mejor si el h1 queda como está.

### L3. Versión desactualizada (la mosca)
> Trabajo en IT desarrollando software para ayudar a las personas a resolver problemas con herramientas simples y claras. Acá dejo el registro: proyectos, ideas y escritos sueltos de un proceso de pensamiento. Ya estás leyendo una versión desactualizada.

Por qué: mantiene la primera oración casi igual (lo profesional no se pierde) y cierra con el remate del readme, que da el tono lúdico sin explicar.

Para aplicar una: reemplazar `hero.lead` en `data/home.yaml`.

## 2. Servicios (4 versiones)

Las cuatro están en `data/services.yaml` bajo `variants`; se cambia con `active: "a" | "b" | "c" | "d"`. Hoy está activa la A. Todas tienen 8 tarjetas más la tarjeta "¿No sabés por dónde empezar?" (grilla de 3 x 3). Las skills son solo de uso real según `piezas/skills.md` (sin RAG ni búsqueda semántica, que figuran como "explorando").

| | Enfoque | Título de sección | Títulos de tarjetas |
|---|---|---|---|
| A | Fiel a los textos actuales (CV, pitch, home) | En qué te puedo ayudar | Desarrollo backend y full stack · Integraciones · Implementaciones Odoo · Automatización con IA · Web scraping · Estructura técnica · Análisis funcional · Formación y capacitación |
| B | El problema del cliente como título | Lo que puedo resolver | La planilla ya no alcanza · Tus sistemas no se hablan · Necesitás un ERP · Tareas que se repiten · Los datos están en la web · Nadie sabe dónde corre · No sabés qué pedir · El sistema está, pero no se usa |
| C | Terminal: cada servicio es un comando (`$ luciano --help`) | Comandos disponibles | build · integrate · implement --odoo · automate --with-ai · scrape · deploy · analyze · teach |
| D | Recorrido de un proyecto, de la idea al uso | De la idea al sistema que se usa | Entender · Diseñar · Construir · Conectar · Automatizar · Desplegar · Acompañar · Enseñar |

Recomendación: B para el home. Es la que más le habla a quien no es técnico (pymes, emprendimientos), refleja el hilo validado ("entiendo cómo trabaja la gente") y se diferencia del resto de las webs de servicios. C es la más coherente con la estética terminal del sitio, pero pide más esfuerzo a quien no programa; serviría como variante para un público técnico (consultoras, partnership). D se superpone con la sección "Cómo trabajo".

## 3. Dónde ubicar el readme.txt

Hoy está abajo de todo en el home, entre "Trayectoria" y el contacto, y no se borró.

Recomendación: moverlo al encabezado del blog (`/posts/`) y dejar en el home solo un guiño en el lead (L1 o L3).

Por qué:
- El readme describe el blog, no los servicios: "proyectos, reflexiones, notas, ideas, como ensalada de escritos". En `/posts/` es la bienvenida exacta de esa sección.
- En el home compite con el contacto: llega justo antes del llamado a la acción y cambia de registro (de oferta profesional a poema) en el momento en que se le pide algo al visitante.
- El lado creativo no se pierde en el home: lo toma el lead, que es lo primero que se lee, en lugar de lo último.
- Alternativa si se quiere conservar en el home: subirlo arriba de "Escritos", como puerta de entrada al blog (mismo argumento, sin mover de página).

## 4. Otros puntos

- Métricas: ocultas con `showMetrics: false` (`data/home.yaml`) y `showStats: false` (`data/cv.yaml`); las de proyectos (`stats--project`) siguen. Quedan cifras dentro de textos corridos: "Cómo trabajo" (dos meses para un alcance de tres, 51 issues en 9 fases) y el perfil y la experiencia del CV. No se tocaron.
- WhatsApp: el ícono usa `https://wa.me/5493425133628` (mismo número que `docs/tarjetas/build.py`). `data/cv.yaml` dice "No publicar teléfono": con el link en el home, el número queda visible en el HTML.
