# feat-brand-redesign · plan (propuesta completa)

> Objetivo: que `lucianodlf.is-a.dev` deje de ser "un blog con theme" y pase a ser la casa de la marca personal **lucianodlf**: una presentación clara de quién es Luciano, qué hace y cómo trabaja, con el blog como una sección más y una página de enlaces propia. Todo construido sobre el design system lucianodlf, en light y dark, sin tocar la funcionalidad existente.

Contexto y datos de base: `research.md`. Ejecución por fases: `roadmap.md`.

---

## 1. Idea de marca: "el `--verbose` de alguien que ordena"

El sistema ya trae dos ideas fuertes: el **motivo terminal** (wordmark mono con cursor ámbar, `$ whoami`) y una paleta **cálida y verde**, lejos del neón de dracula. La propuesta las combina en un concepto:

- **La terminal como estructura, no como disfraz.** Los comandos aparecen como *eyebrows* de sección (`$ ls proyectos/`, `$ cat cv.md`), en el wordmark y en detalles. El texto de lectura queda en IBM Plex Sans, limpio y humano. Así el sitio dice "técnico" sin perder calidez ni legibilidad.
- **Claridad como valor visible.** La frase de BIORG ("herramientas simples que aporten claridad") se traduce en el diseño: mucho aire, grilla de 4px estricta, cards con borde fino y esquinas de 8px, una sola acción principal por bloque, jerarquía tipográfica corta (5 estilos de texto y 3 mono).
- **El cursor `_` ámbar como firma.** Es el único elemento de color cálido intenso. Aparece en el wordmark, en el hero (barra de la portada del DS) y como marcador del ítem activo en la navegación. Nada más usa ámbar en superficies grandes.
- **La composición de la portada del DS como sello gráfico.** La losa verde, el bloque oscuro con grilla de puntos, la barra ámbar y la banda suave se reutilizan en el hero de la home, en el og:image, en la 404 y, reducida, en la página de enlaces. Es geometría pura (SVG con tokens), funciona en ambos temas y no necesita logo.

Tono de los textos del sitio: primera persona, voseo con el lector ("Escribime", "Mirá los proyectos"), resultados concretos antes que adjetivos, sin emojis ni em-dash (reglas de `BRAND.md`, `VOICE.md` y del README del DS).

---

## 2. Arquitectura de información

| Ruta | Página | Origen de datos | Estado |
| --- | --- | --- | --- |
| `/` | Home de marca personal | `content/_index.md` + `data/home.yaml` + posts + proyectos | rediseño total |
| `/posts/` | Blog (índice) | posts | nuevo layout |
| `/posts/<slug>/` | Post | posts | rediseño |
| `/projects/` | Proyectos | `content/projects/*` (page bundles) | nuevo modelo de datos |
| `/projects/<slug>/` | Detalle de proyecto (caso) | page bundle | nuevo |
| `/cv/` | CV completo + PDF | `data/cv.yaml` | nuevo |
| `/links/` | Página de enlaces (tipo linktree) | `data/links.yaml` | nuevo, standalone |
| `/tags/`, `/tags/<tag>/` | Taxonomías | Hugo | restyle |
| `/404.html` | Error | template | nuevo |

Navegación principal (orden y pesos explícitos en `hugo.toml` con `[[menus.main]]`, reemplazando `sectionPagesMenu`): **Blog · Proyectos · CV**. "Inicio" lo resuelve el wordmark. `/links/` no va en el menú (es una puerta de entrada externa).

Se mantienen los slugs actuales de los posts (sin redirecciones nuevas).

Lo que **no** se agrega aunque esté en la referencia: Tools, Play, Uses, Guides, chat IA. Para este perfil, cinco destinos alcanzan y cada uno tiene contenido real.

---

## 3. Decisiones técnicas de base

### 3.1 Salir del layout de Risotto (manteniendo el submodule hasta el final)

El layout nuevo (barra superior, home de secciones, CV, página de enlaces) no cabe en la grilla header/body/aside de Risotto. Propuesta:

- `layouts/_default/baseof.html` propio. Hugo prioriza `layouts/` sobre el theme, así que ninguna página usa ya el baseof de Risotto.
- `head.html` deja de cargar `css/palettes/dracula.css` y `css/risotto.css`.
- Se mantiene `theme = "risotto"` y el submodule durante la implementación como red de seguridad (cualquier template que falte cae al theme). En la última fase se evalúa quitarlo (decisión abierta D7).
- CSS sigue en `static/css/` (sin Hugo Pipes, igual que hoy) y se divide en:
  - `tokens.css`: variables del DS. Encabezado `/* lucianodlf: generado a mano desde tokens.json del DS, versión X */`.
  - `main.css`: base, layout, componentes y páginas del sitio.
  - `chroma.css`: resaltado de código por tema.
  - `links.css`: solo para `/links/`.
  - `print.css`: CV y posts al imprimir (o `@media print` dentro de `main.css`).
  - `custom.css` desaparece; su contenido útil se migra a `main.css`.

### 3.2 Tema light/dark sin tocar el mecanismo

`keybindings.js` y el anti-flash de `head.html` siguen igual: dark por defecto, `html.light` cuando el usuario lo elige. Eso coincide con el DS, que define **Dark (técnico) para el sitio y la terminal**.

```css
:root {            /* dark, por defecto */
  --background:#09120e; --surface:#111e19; --border:#24312c;
  --text:#edebe4; --muted:#84938d; --primary:#68b986; --on-primary:var(--background);
  --primary-soft:#17301f; /* candidato, ver §3.3 */ --primary-deep:#3a8357; --accent:#e4ac59;
  --danger:#ec8b80;       /* candidato, ver §3.3 */
  color-scheme: dark;
}
html.light {
  --background:#f7f5ec; --surface:#fdfcf7; --border:#dad8cd;
  --text:#111e19; --muted:#53615c; --primary:#2a7449; --on-primary:var(--surface);
  --primary-soft:#c5e8d0; --primary-deep:#2a7449; --accent:#965719;
  --danger:#a8382f;
  color-scheme: light;
}
```

Se agregan también `--font-sans`, `--font-mono`, `--space-1/2/3/4/6/8/12/16` (múltiplos de 4px; los del DS más pasos intermedios que conviene agregar al DS), `--radius-sm/md/full`, `--measure: 42rem` (ancho de lectura) y `--container: 72rem`.

Si en la sesión de implementación se decide que el default del sitio sea light (D1), el cambio es solo invertir qué bloque va en `:root`; el JS no cambia.

### 3.3 Huecos del DS: valores candidatos (contraste calculado)

Se proponen y, si se aprueban, se agregan al DS (artifact) en la misma sesión:

| Token | Light | Dark | Contraste medido (WCAG) |
| --- | --- | --- | --- |
| `primary-soft` dark | (igual) `#c5e8d0` | `#17301f` | `text` sobre él 11.9:1; `primary` sobre él 6.0:1; frente a `background` 1.34:1 (tinte, decorativo) |
| `primary-deep` light | `#2a7449` (= primary) | (igual) `#3a8357` | evita el valor heredado incoherente |
| `danger` (nuevo) | `#a8382f` | `#ec8b80` | light 5.88:1 sobre `background`, 6.25:1 sobre `surface`; dark 7.76:1 y 7.01:1 |

Además se proponen tokens de código (§4.6) y un estilo de texto `lead` 20/30 400 para el párrafo de valor del hero (hoy el DS no tiene un tamaño intermedio de lectura).

### 3.4 Resaltado de código

- `hugo.toml`: `noClasses = false` (las clases `.chroma` reemplazan los estilos inline de dracula). `lineNos` y el resto quedan igual.
- `chroma.css` hecho a mano con ~20 clases mapeadas a tokens (ver §4.6), así el mismo archivo sirve para ambos temas vía variables. Se elimina el filtro `invert + hue-rotate` de light (cierra el pendiente de CLAUDE.md).
- Verificar en la implementación los nombres de clase reales con `hugo gen chromastyles --style=github` como referencia de selectores.

### 3.5 Fuentes e íconos

- Google Fonts: IBM Plex Sans 400, 400 italic, 600 e IBM Plex Mono 400, 500, 600, con `display=swap` y `preconnect`. Se elimina JetBrains Mono. (La itálica 400 no está en el DS; los posts la usan. Agregarla al DS.)
- Ligaduras: desactivadas en `print.css` (regla del DS para documentos).
- FontAwesome 6.6.0 se mantiene (callouts, redes y helpers dependen de él). Academicons no se usa en ningún template propio: evaluar quitarlo (D8).

### 3.6 Pagefind

Sin cambio de comportamiento. Mejora opcional (D6): marcar `data-pagefind-body` en el contenido de posts, proyectos y CV, y `data-pagefind-ignore` en nav y footer, para que los resultados no repitan el texto del footer. Ojo: con `data-pagefind-body` en alguna página, Pagefind deja de indexar las páginas que no lo tengan. `/links/` no se indexa.

### 3.7 Contratos de JS a preservar (checklist de regresión)

`#theme-toggle`, `#wide-toggle`, `#search-modal`, `#help-modal`, `html.light`, `html.wide`, `.content__body table`, `.kb-selected`, `.pagefind-ui__result`, `.mermaid`. El contenedor de lectura del post reacciona a `html.wide` (pasa de `--measure` a ~64rem y el contenedor general a 90rem).

---

## 4. Lenguaje visual

### 4.1 Grilla y medidas

- Contenedor `72rem` con gutter de 16px en mobile y 32px desde 768px.
- Ancho de lectura de posts y textos largos: `42rem` (~68 caracteres en Plex Sans 16px).
- Ritmo vertical: secciones de la home separadas por `space-16` (64px) en desktop y `space-12` (48px) en mobile. Dentro de una card, `space-4`.
- Breakpoints: 640px (2 columnas), 960px (3 columnas y ToC lateral), 1200px.

### 4.2 Tipografía aplicada

| Uso | Estilo DS | Familia |
| --- | --- | --- |
| Nombre en hero, título de CV | `display` 40/44 600 (56/60 en desktop como variante `display-xl`, a proponer al DS) | Sans |
| Título de página y de post | `heading-1` 28/34 600 | Sans |
| Títulos de sección, nombre de proyecto | `heading-2` 20/28 600 | Sans |
| Párrafo de valor del hero, bajadas | `lead` 20/30 400 (nuevo) | Sans |
| Texto | `body` 16/24; en posts 17/28 para lectura larga (a validar) | Sans |
| Metadatos, fechas | `small` 14/20 en `muted` | Sans |
| Wordmark | `wordmark` 32/36 600 (20px en el header) | Mono |
| Eyebrows de sección, chips de stack, nav | `label` 12/16 500 +0.04em | Mono |
| Código | `code` 14/20 | Mono |

Los títulos de página llevan remate tipográfico propio: el nombre de la página seguido del cursor ámbar (`Proyectos_`), en vez del punto final de la referencia. Es la firma del wordmark aplicada al sitio.

### 4.3 Forma

- `radius-md` (8px): cards, botones, bloques de código, callouts, modales, tablas, imágenes de posts.
- `radius-sm` (4px): chips, tags, `kbd`, código inline.
- `radius-full`: avatar, pills de estado, botón de tema.
- Bordes de 1px en `border` para todo. Sin sombras y sin gradientes. La elevación se marca con `surface` sobre `background`.
- Un control interactivo nunca depende solo del borde decorativo: en hover/foco el borde pasa a `primary` (regla del DS).
- Foco: `outline: 2px solid var(--primary); outline-offset: 2px;` en todo elemento interactivo (`:focus-visible`).

### 4.4 Componentes base

| Componente | Especificación |
| --- | --- |
| **Botón primario** | fondo `primary`, texto `on-primary`, `radius-md`, 40px de alto, padding 0 16px, Sans 600 15px. Hover: `primary-deep` en dark / oscurecer 8% en light (definir token `primary-hover` si hace falta) |
| **Botón secundario** | fondo `surface`, borde `border`, texto `text`. Hover: borde `primary` |
| **Link de texto** | `primary`, subrayado de 1px con `text-underline-offset: 3px`; hover: subrayado 2px |
| **Link "ver todo"** | mono `label`, `primary`, con `→`; alineado a la derecha del título de sección |
| **Card** | `surface`, borde `border`, `radius-md`, padding `space-4` a `space-6`. Toda la card es un link; hover: borde `primary` y el título pasa a `primary`. Sin `translateY` |
| **Chip / tag** | mono `label`, fondo `primary-soft`, texto `text`, `radius-sm`, padding 2px 8px. Variante neutra (stack): fondo transparente, borde `border`, texto `muted` |
| **Pill de estado** | `radius-full`, borde `border`, punto de 8px en `primary` + texto `small`. Ej.: "Disponible para proyectos freelance" |
| **Eyebrow de sección** | mono `label` en `muted`: `$ ls proyectos/` |
| **Stat tile** | número en mono 600 28px `text`, bajada `small` `muted`, separadas por bordes verticales de 1px |
| **Terminal card** | `surface`, borde, `radius-md`; barra superior de 32px con la ruta en mono `label` `muted` (`~/readme.txt`), sin los tres puntos tipo macOS |
| **kbd** | mono 12px, borde `border`, borde inferior 2px, `radius-sm` |

### 4.5 Callouts (sin borde izquierdo de color)

El borde izquierdo grueso es un recurso gastado y además hoy depende de colores dracula. Propuesta: card `surface` con borde 1px `border`, `radius-md`, y un **chip de título** a la izquierda (ícono FA + etiqueta en mono `label`) con el color del tipo:

| Tipo | Color del ícono y etiqueta | Fondo del chip |
| --- | --- | --- |
| Nota | `muted` | `background` |
| Tip | `primary` | `primary-soft` (texto en `text`) |
| Importante | `primary` | `primary-soft`, borde de la card en `primary` |
| Atención | `accent` | `background` |
| Precaución | `danger` | `background`, borde de la card en `danger` |

Los selectores `.callout`, `.callout--<tipo>`, `.callout__title` y `.callout__body` no cambian (los generan el render hook y `callouts.js`).

### 4.6 Código

- Bloque: fondo `surface` (en dark, un paso más oscuro que la card para que se lea como "pantalla": proponer token `code-bg`, candidato `#0d1813`), borde 1px, `radius-md`, padding 16px, scroll horizontal.
- Etiqueta de lenguaje arriba a la derecha en mono `label` `muted`, leída del atributo `data-lang` que Hugo pone en `<code>` (verificar en el HTML generado; si no está, se omite, sin JS).
- Tokens de color: keyword `primary` 600 · string `accent` · número `accent` · función/clase `text` 600 · comentario `muted` itálica · operador y puntuación `muted` · nombre/atributo `text` · error `danger` · inserted `primary` · deleted `danger`. El ámbar en strings es una excepción documentada a "accent solo puntual" (los strings son tramos cortos); si no se aprueba, strings en `primary-deep`.
- Código inline: fondo `background` sobre `surface` o `surface` sobre `background`, borde 1px, `radius-sm`, 0.92em.

### 4.7 Imágenes

- Imágenes de posts: `radius-md`, borde 1px `border`, máximo el ancho de lectura; se respeta el sufijo de Obsidian `|300` que ya usan los posts.
- Avatar: `radius-full`, borde 2px `background` + anillo 1px `border` (efecto de separación sin sombra).
- Miniaturas de proyecto: relación 16:10, `object-fit: cover`. Los íconos cuadrados (gplnr, mitarasca) se centran sobre un fondo `primary-soft` con grilla de puntos para que todas las cards tengan el mismo formato.

### 4.8 Motion

Transiciones de 120ms en color y borde. El cursor `_` del wordmark parpadea (1.1s, `steps(1)`) solo en el header y solo si `prefers-reduced-motion: no-preference`. Nada más se anima.

### 4.9 Iconografía y marca

- Favicon: cuadrado `radius-sm` con `l_` en Plex Mono 600 (`l` en `text`, `_` en `accent`) sobre `background` dark, en SVG + PNG 32/16 + apple-touch 180. Resuelve el pendiente "Logo `>` en sidebar" (se elimina el `>`) y "favicon" de CLAUDE.md.
- og:image por defecto (1200x630): la composición de portada del DS con `lucianodlf` y la línea de rol, exportada a PNG una vez. Opcional: og:image por post generado con `images.Text` de Hugo (D9).

---

## 5. Layout global (shell)

### 5.1 Header

```
┌────────────────────────────────────────────────────────────────────────┐
│ lucianodlf_ -v        Blog   Proyectos   CV        [Buscar  /]  ◐  ?   │
└────────────────────────────────────────────────────────────────────────┘
```

- Sticky, 64px, fondo `background`, borde inferior `border` que aparece solo al scrollear (sin JS: borde siempre visible, decisión simple).
- Izquierda: wordmark `lucianodlf` (Mono 600 20px, `text`) + `_` en `accent` + ` -v` en `muted`. Link a `/`.
- Centro/derecha: links de nav en mono `label` 13px. Activo: texto `text` con `_` ámbar debajo (2px x 12px), inactivo `muted`.
- Derecha: botón "Buscar" con `kbd /` (abre el modal existente), `#theme-toggle` (ícono `fa-circle-half-stroke` dentro de un círculo de 32px) y `?`.
  - Nota: hoy la búsqueda y la ayuda solo se abren por teclado. Un botón visible necesita 2 líneas de JS que llamen a las funciones existentes; es la única "funcionalidad" que la propuesta suma, porque sin eso en mobile no hay forma de buscar (D4).
- Mobile (< 640px): wordmark + íconos en una fila; los tres links de nav en una segunda fila con scroll horizontal si hiciera falta. Sin hamburguesa (cero JS nuevo).

### 5.2 Footer

```
┌──────────────────────────────────────────────────────────────────────┐
│ lucianodlf_                          $ ls -t posts/ | head -3        │
│ Desarrollo software para ayudar a    · Título post 1                 │
│ las personas a resolver problemas…   · Título post 2                 │
│                                      · Título post 3                 │
│ Blog · Proyectos · CV · Enlaces      ● disponible para proyectos     │
│ GitHub · LinkedIn · Email · RSS                                      │
│──────────────────────────────────────────────────────────────────────│
│ © 2026 Luciano Delfino · hecho con Hugo · Santa Fe, Argentina        │
└──────────────────────────────────────────────────────────────────────┘
```

- Se conserva `$ ls -t posts/ | head -3` (es parte de la identidad actual).
- Línea de estado (idea tomada de la referencia, en clave propia): `● disponible para proyectos freelance y equipos de producto`, punto en `primary`. Editable en `hugo.toml` (`params.status`).
- El copyright pierde el emoji `❤️` (regla del DS).
- `search.html` (modales) se sigue incluyendo desde el footer, sin cambios de marcado.

### 5.3 Modales de búsqueda y ayuda

Mismo marcado. Restyle: `surface`, borde, `radius-md`, backdrop `rgb(9 18 14 / 0.72)`, input de 44px con `radius-md` y foco `primary`, resultado seleccionado (`.kb-selected`) con fondo `primary-soft` y texto `text`. Variables `--pagefind-ui-*` mapeadas a tokens; fuente Sans para resultados y Mono para el input.

---

## 6. Páginas

### 6.1 Home (`/`)

Orden de secciones (wireframe desktop):

```
[HERO]
  izq: $ whoami
       Luciano Delfino
       Software Engineer | Backend & Full Stack | AI-Augmented   (mono label)
       Trabajo en IT desarrollando software para ayudar a las
       personas a resolver problemas, convertir ideas en procesos
       y herramientas simples que aporten claridad.              (lead)
       ● Disponible para proyectos freelance y equipos de producto
       [Ver proyectos]  [CV completo]  [Escribime]
  der: composición de portada del DS (SVG) con el avatar recortado
       dentro del bloque oscuro, a la altura de la grilla de puntos

[MÉTRICAS]  4 stat tiles en una franja con bordes
[SERVICIOS] $ man luciano      "En qué te puedo ayudar"     6 cards
[PROYECTOS] $ ls proyectos/    "Proyectos"   ver todos →    3 cards
[CÓMO TRABAJO] $ cat workflow.md  texto + diagrama de 4 pasos
[ESCRITOS]  $ cat destacados.txt  featured (3 cards) + últimos 3 en lista mono
[TRAYECTORIA] $ git log --oneline  5 hitos + CV completo →
[README]    $ cat readme.txt   terminal card con el texto personal actual
[CONTACTO]  banda final con CTA
```

**Hero.** En mobile la composición pasa arriba, recortada a 16:9, y el texto abajo. La frase de valor es la versión final de BIORG, sin el saludo:

> Trabajo en IT desarrollando software para ayudar a las personas a resolver problemas, convertir ideas en procesos y herramientas simples que aporten claridad.

CTAs: "Ver proyectos" (primario, `/projects/`), "CV completo" (secundario, `/cv/`), "Escribime" (link de texto, `mailto:`).

**Métricas** (todas defendibles con el CV y LinkedIn; elegir 4, D10):

| Número | Bajada |
| --- | --- |
| `2006` | en IT; desarrollando software desde 2016 |
| `+20` | clientes acompañados en implementaciones de software |
| `2 de 3` | meses: AppLogistic entregado antes con un workflow spec-driven |
| `20' → 10'` | el modelo MILP más grande pasó de no resolver a dar solución |
| `7` | modelos de OCR comparados en un benchmark propio |

**Servicios** (fuente: LinkedIn "En qué te puedo ayudar hoy"; ícono FA + título + una línea):

1. Sistemas a medida · Desarrollo backend y full stack de sistemas internos y de gestión.
2. Integraciones · Conecto ERP, ecommerce y APIs para que la información no se duplique.
3. Odoo · Implementación y adaptación, con módulos propios cuando hace falta.
4. Automatización · Procesos y workflows, con IA cuando aporta valor y validación humana del resultado.
5. Análisis funcional · Relevo cómo trabajás antes de escribir código.
6. Capacitación y soporte · Acompaño la adopción de la herramienta hasta que se usa.

(Textos a pulir con la voz del usuario; "a medida" quedó vetado en la frase de BIORG, acá describe el tipo de sistema. Revisar en D10.)

**Proyectos destacados:** 3 cards con `featured: true` y `weight` (propuesta: AppLogistic, Poliédrica, MiTarasca). Card: miniatura 16:10, chip de tipo (`cliente` / `propio`), título `heading-2`, una línea de resumen, 3 a 4 chips de stack, período en `small`.

**Cómo trabajo** (diferencial AI-Augmented, fuente CV base §Perfil y LinkedIn): párrafo corto + diagrama horizontal de 4 pasos en mono: `spec → plan → implementación → validación`, cada uno en una card mínima. Remate: "Los LLMs amplían lo que puedo hacer; la metodología, mi criterio y mis decisiones son con lo que más valor aporto." Link al post de MilPathsX cuando se publique.

**Escritos:** fila de cards de posts `featured: true` (fecha, reading time, título, extracto de 2 líneas, tags) + a la derecha la lista `$ ls -t posts/ | head -3`. Link "ver el blog →".

**Trayectoria:** `$ git log --oneline` con 5 líneas tipo commit: año en `primary` (el ámbar se reserva para el cursor), texto en `text`. Ej.: `2026 AppLogistic · optimización de rutas con MILP`, `2024 Innovat · backoffice institucional CONICET`, `2022 Fenix App · caja, stock y cuentas corrientes`, `2016 ANCA · de soporte a desarrollo`, `2008 EMSER · +20 implementaciones`. Link "CV completo →".

**README:** el texto actual de `content/_index.md` (`$ whoami (Anātman)`, `$ cat readme.txt` y el poema) en una terminal card. Conserva la personalidad del sitio y deja claro que el blog también es escritura personal. La fila de emojis choca con el DS: D2.

**Contacto:** banda `primary-soft` (en dark, `primary-soft` dark) con `radius-md`: "¿Tenés una idea o un proceso para ordenar? Escribime." + botón primario mailto + link a LinkedIn.

Datos: los textos de la home viven en `data/home.yaml` (hero, métricas, servicios, workflow, trayectoria) para editarlos sin tocar templates. `content/_index.md` conserva el README.

### 6.2 Blog (`/posts/`)

```
$ ls posts/
Blog_
Write-ups técnicos con sus desvíos y escritos personales. (bajada, de BRAND.md)
[ todos ] [ ia ] [ ocr ] [ self-hosted ] [ hugo ] …   ← links a /tags/<tag>/ (no filtro JS)

┌ Destacado ─────────────────────────────────────────────┐
│ (post featured más reciente, card grande con imagen)    │
└─────────────────────────────────────────────────────────┘
2026
  21 jul · Benchmarking de modelos de visión con Ollama …   12 min   #ollama #ocr
  26 may · gplnr: Get Path Line Number Reference            3 min    #vscode
2026 (…)
```

- Agrupado por año (heading mono), cada fila: fecha corta en mono `muted`, título `heading-2` reducido (18px 600), extracto de una línea en `muted`, reading time y hasta 3 tags. Fila completa clickeable; hover: título en `primary`.
- Chips de tags: los 8 más usados, más "ver todos" a `/tags/`.
- Normalización de tags (hoy conviven `Hugo`, `Workflow` y `ia`, `ollama`): pasar todos a minúscula. Es cambio de contenido en Obsidian, no de layout (D11).

### 6.3 Post (`/posts/<slug>/`)

```
← Blog
TÍTULO DEL POST (heading-1, hasta 3 líneas)
21 jul 2026 · 12 min de lectura · #ollama #ocr #benchmark        [w ⇔]
──────────────────────────────────────────────────────────────────
│ contenido (42rem)                         │ En este post        │
│                                           │ 1. Sección          │
│                                           │ 2. Sección          │
│                                           │ (sticky, ≥960px)    │
──────────────────────────────────────────────────────────────────
tags · ← anterior | siguiente →
[card "Sobre el autor": avatar, frase de valor corta, links CV / proyectos]
```

- `.content__body` se mantiene como clase del contenido (lo usa `tables.js`).
- ToC: solo si `toc: true` (igual que hoy). En < 960px va como `<details>` colapsado arriba del contenido (HTML nativo, sin JS).
- `#wide-toggle` pasa del sidebar a la barra de metadatos del post. `html.wide` expande `--measure` y oculta el ToC lateral.
- Prev/next entre posts (`.PrevInSection` / `.NextInSection`): navegación pura de template.
- Card "Sobre el autor" al final: convierte lectores del blog en visitantes de la marca.
- Posts con `author` distinto (Conciencia y Destino): mostrar "Texto de Julian Cardoso Correa · fuente" en los metadatos, usando `author` y `source` del frontmatter.
- Tipografía de lectura: `h2` 24/32 600 con `space-12` arriba, `h3` 20/28, listas con marcador `primary`, `blockquote` normal con borde completo y texto en `muted` itálica, `hr` como `· · ·` centrado en `muted`.

### 6.4 Proyectos (`/projects/` y detalle)

**Modelo de datos:** cada proyecto pasa a ser un page bundle `content/projects/<slug>/index.md` con su imagen al lado. Así cada uno tiene página de detalle, entra en Pagefind y se puede relacionar con posts. Reemplaza `data/projects.json` (actualizar README).

```yaml
---
title: "AppLogistic"
summary: "Plataforma para planificar rutas de recolección, con backoffice web y app mobile."
kind: cliente            # cliente | propio
client: "INGAR (CONICET-UTN)"
role: "Software Engineer"
period: "04/2026 – 07/2026"
date: 2026-04-01         # para ordenar
status: finalizado       # en uso | activo | experimental | finalizado
featured: true
weight: 1
stack: [Python, FastAPI, PostgreSQL, Redis, ARQ, Vue.js, Tailwind, shadcn-vue, MILP]
metrics:
  - "51 issues en 9 fases"
  - "2 meses para un alcance de 3"
links:
  repo: ""
  demo: ""
  post: ""               # ruta a un post relacionado
cover: cover.png
---
## Contexto
## Qué hice
## Resultado
```

**Índice:** dos bloques sin filtros JS:

- `$ ls clientes/` **Trabajo con clientes**: AppLogistic, Poliédrica, Innovat, Fenix App, ANCA (UDR Web UI y validación de capturas).
- `$ ls ~/proyectos/` **Proyectos propios**: MiTarasca, gplnr, Automatización de gastos, Este blog; opcionales `summary-gitlab-issues`, `n8n-shbase` (D12).

Grid de 1/2/3 columnas. Card igual que en la home más chips de estado (`en uso`, `experimental`).

**Detalle:** header con chip de tipo, título con cursor, resumen `lead`, fila de datos (cliente · rol · período · estado), botones "Ver demo" / "Código" / "Leer el post" según `links`, miniatura grande, cuerpo de caso (Contexto, Qué hice, Resultado) con métricas en stat tiles, stack en chips, prev/next.

**Contenido inicial** (fuente: LinkedIn unificado y repos verificados):

| Slug | Tipo | Links verificados | Post relacionado |
| --- | --- | --- | --- |
| `applogistic` | cliente | ninguno | `Desarrollo agentico MilPathsX` (draft, D13) |
| `poliedrica` | cliente | ninguno (consultar si el catálogo web es público) | |
| `innovat` | cliente | ninguno | Benchmarking Ollama |
| `fenix-app` | cliente | ninguno | |
| `anca-udr` | cliente | ninguno | |
| `mitarasca` | propio | repo `github.com/lucianodlf/mitarasca`, demo `mitarasca.demo.lucianodlf.com.ar` | |
| `gplnr` | propio | repo `github.com/lucianodlf/gplnr` | gplnr |
| `automatizacion-gastos` | propio | repo `github.com/lucianodlf/ia-update-gestion-personal` | Automatizar el registro de gastos (p1) |
| `este-blog` | propio | repo `github.com/lucianodlf/blog.lucianodlf` | Cómo construí este blog |
| `minguitod` | propio | **repo privado**; `notesmd` no existe | (D12) |

Imágenes de clientes: no hay. Propuesta: cover generado con la composición del DS + nombre del proyecto (mismo SVG parametrizado), así no se exponen capturas de sistemas de terceros.

### 6.5 CV (`/cv/`)

Fuente única: `data/cv.yaml`, armado desde **LinkedIn unificado** (versión más completa) con el orden y los títulos del **CV base**. La home (trayectoria) lee el mismo archivo.

```
$ cat cv.md
Luciano Javier Delfino_
Software Engineer | Backend & Full Stack | AI-Augmented
Santa Fe, Argentina · email · in/lucianodelfino · github.com/lucianodlf
[Descargar PDF]  [LinkedIn]

[stat tiles: desde 2006 · +20 implementaciones · 10 roles · español / inglés técnico]

┌ índice (sticky, ≥960px) ┐  Perfil
│ Perfil                   │  Core skills   (grupos en chips: Backend, Frontend, Datos,
│ Skills                   │                 Testing, Infra/DevOps, Integraciones,
│ Experiencia              │                 AI-Augmented, Explorando)
│ Educación                │  Experiencia   (timeline: línea vertical 1px border,
│ Certificaciones          │                 nodo de 8px primary por rol)
│ Idiomas                  │    Rol · Empresa                       período
│ Complementarias          │    lugar · modalidad · tipo            (small muted)
│ Proyectos                │    contexto (1 párrafo)
└──────────────────────────┘    • logros
                                [chips de stack]
                               Educación · Certificaciones · Idiomas
                               Experiencias complementarias (voluntariado, viaje en bici)
                               Proyectos propios (links a /projects/)
```

- Todo el contenido visible por defecto (bueno para imprimir y para buscadores). Las listas de stack largas (LinkedIn trae hasta 25 ítems) se recortan a 10 chips con `<details>` "ver stack completo".
- Botón "Descargar PDF" → `static/cv/luciano-delfino-cv.pdf` generado por el usuario con `mi-profile/build/cv.py` (D3). Si no hay PDF, el botón no se renderiza (`fileExists`).
- `print.css`: fuerza paleta light, oculta header, footer, índice y botones, `break-inside: avoid` por rol, links con URL visible, sin ligaduras. Así "imprimir a PDF" desde el navegador también da un CV correcto.
- **No se publica el teléfono.** Email sí (ya está en el sitio).
- Experiencias desde LinkedIn: Poliédrica, AppLogistic, Innovat, Independiente (2021 a actualidad), Fenix App, ANCA freelance (UDR Web UI), DataLab Center, ANCA, EMSER, Raúl Torres Hogar.

### 6.6 Enlaces (`/links/`)

Página standalone (template propio sin `baseof`, sin header ni footer del sitio), pensada para la bio de redes, una firma o un QR, y lista para moverse a su propia URL.

```
                              [◐]
          ┌─ banda corta con la composición del DS ─┐
                 ( avatar 96px, radius-full )
                       lucianodlf_
        Software Engineer | Backend & Full Stack | AI-Augmented
     Desarrollo software para ayudar a las personas a resolver
     problemas y convertir ideas en herramientas simples.
     ● disponible para proyectos

     [ Sitio y blog                                 → ]   (primario)
     [ CV completo                                  → ]
     [ Escribime                                    ✉ ]

     $ ls trabajo/
     [ ▣ MiTarasca · demo en vivo                   ↗ ]
     [ ▣ Proyectos                                  → ]
     [ ▣ GitHub · github.com/lucianodlf             ↗ ]

     $ ls -t posts/ | head -2           (automático)
     [ ▣ Título del último post                     → ]
     [ ▣ Título del anteúltimo post                 → ]

     $ ls redes/
     [ in LinkedIn                                  ↗ ]

           (GitHub)  (LinkedIn)  (Email)  (RSS)
                  lucianodlf.is-a.dev
```

- Columna de 480px máximo, gutter 16px, centrada. Botones de ancho completo, 56px de alto mínimo, `surface` + borde + `radius-md`; miniatura de 40px `radius-sm` o ícono FA dentro de un cuadrado `primary-soft`; título Sans 600 y subtítulo `small` `muted`; flecha a la derecha (`→` interno, `↗` externo). El primero de la lista es botón primario (`primary` / `on-primary`).
- A diferencia de la referencia, el texto va alineado a la izquierda dentro del botón (más legible con subtítulos) y no hay menú `⋮` ni botón de Linktree.
- Encabezados de sección con el eyebrow terminal en vez de mayúsculas.
- `#theme-toggle` arriba a la derecha (incluye `keybindings.js` y el anti-flash: todo sigue funcionando porque el script tolera la ausencia de los modales).
- Datos en `data/links.yaml` (secciones, título, subtítulo, url, ícono o imagen, `primary: true`). Los posts se toman automáticamente de `site.RegularPages`.
- Autocontenida: un CSS propio (`links.css` + `tokens.css`), URLs absolutas, sin dependencias del layout del sitio. Para la URL propia (D5): alias corto `/l/` con `aliases` de Hugo hoy; más adelante, un subdominio con redirección o un build separado que reutiliza el mismo template.
- Extra opcional: QR a `/links/` en SVG con los tokens `qr-ink`/`qr-ground` del DS (siempre oscuro sobre claro, margen de 4 módulos), generado una vez con `qrencode` y guardado en `static/img/qr-links.svg`; se puede mostrar en el CV impreso.

### 6.7 Taxonomías y 404

- `/tags/`: nube de chips con contador (`ollama 1`), ordenada por frecuencia.
- `/tags/<tag>/`: mismo listado que el blog.
- 404: composición del DS en grande + `$ cd <ruta>: No such file or directory` + links a Inicio, Blog, Proyectos.

---

## 7. Mapa de archivos

| Archivo | Acción |
| --- | --- |
| `hugo.toml` | `baseURL` al dominio real; `[[menus.main]]` explícito; `params.status`; `params.description` (meta); `params.about.description` actualizado; `copyright` sin emoji; `noClasses = false`; quitar `params.theme.palette` cuando no se use |
| `layouts/_default/baseof.html` | nuevo |
| `layouts/partials/head.html` | quitar dracula/risotto/JetBrains; agregar Plex, tokens, main, chroma; meta description por página; og:image; favicon |
| `layouts/partials/header.html` | nuevo (override del theme) |
| `layouts/partials/footer.html` | rediseño, conserva `search.html` y `ls -t` |
| `layouts/partials/about.html` | deja de usarse (el sidebar desaparece); se borra al final |
| `layouts/partials/components/*.html` | nuevos: `card-post`, `card-project`, `chip`, `eyebrow`, `stat`, `cover-svg`, `author-card`, `status-pill` |
| `layouts/index.html` | nuevo (home) |
| `layouts/_default/list.html`, `single.html` | rediseño (blog y post) |
| `layouts/_default/terms.html`, `taxonomy.html` | nuevos |
| `layouts/projects/list.html`, `single.html` | rediseño y nuevo |
| `layouts/cv/single.html` (o `layouts/_default/cv.html`) | nuevo |
| `layouts/links/single.html` | nuevo, standalone |
| `layouts/404.html` | nuevo |
| `layouts/_default/_markup/*` | sin cambios |
| `content/cv.md`, `content/links.md` | nuevos (solo frontmatter: `layout`/`type`, título, descripción) |
| `content/projects/<slug>/index.md` | nuevos (9 a 10 bundles) |
| `data/home.yaml`, `data/cv.yaml`, `data/links.yaml` | nuevos |
| `data/projects.json` | se elimina tras migrar |
| `static/css/tokens.css`, `main.css`, `chroma.css`, `links.css` | nuevos; `custom.css` se elimina |
| `static/js/mermaid.js` | `themeVariables` leídos de las variables CSS (en vez de dracula hardcodeado), en ambos temas |
| `static/js/keybindings.js` | solo si se aprueba D4: listeners de click para botones de búsqueda y ayuda |
| `static/favicon.svg`, `favicon-32x32.png`, `favicon-16x16.png`, `apple-touch-icon.png`, `img/og-default.png` | nuevos |
| `README.md`, `CLAUDE.md` | actualizar URL, estructura, proyectos, paleta |

---

## 8. Accesibilidad y calidad

- Contraste: todos los pares de texto del DS ya superan 4.5:1; los candidatos nuevos están medidos en §3.3. Verificar con axe o Lighthouse en ambos temas.
- `:focus-visible` en todo; skip link "Saltar al contenido" al inicio del body.
- Landmarks: `header`, `nav[aria-label]`, `main`, `footer`; un solo `h1` por página.
- Imágenes con `alt` real; SVG decorativos con `aria-hidden`.
- `prefers-reduced-motion` respetado.
- Sin scroll horizontal a 320px.
- Peso: Plex en woff2 vía Google Fonts (6 archivos); no se agrega JS de terceros.

---

## 9. Qué NO cambia (garantía de funcionalidad)

Atajos (`/`, Ctrl+K, flechas, Enter, `gg`, `G`, `w`, `?`, Esc), toggle de tema con persistencia, wide toggle con persistencia, Pagefind (índice y UI), callouts por render hook y por JS, tablas con scroll y vista cruda, mermaid, ToC opcional, reading time, tags, `featured`, RSS, flujo Obsidian → Enveloppe → `fix-assets.sh` → CI. El frontmatter de los posts no cambia.

---

## 10. Riesgos

| Riesgo | Mitigación |
| --- | --- |
| Romper un contrato de JS al cambiar el DOM | checklist §3.7 + prueba manual de cada atajo en cada tipo de página |
| `noClasses = false` cambia el HTML de todos los bloques de código | revisar los 6 posts publicados en ambos temas antes de cerrar la fase |
| Pagefind con `data-pagefind-body` deja páginas fuera del índice | aplicarlo a todos los tipos de contenido a la vez, o no aplicarlo (D6) |
| Exponer información de clientes | usar solo lo que ya está público en LinkedIn; covers generados en vez de capturas |
| Links rotos (`notesmd`, `minguitod` privado) | resolver D12 antes de publicar proyectos |
| El DS cambia después | `tokens.css` con versión en el encabezado; un solo archivo a actualizar |

---

## 11. Decisiones abiertas (resolver al inicio de la implementación)

| # | Pregunta | Recomendación |
| --- | --- | --- |
| D1 | ¿Tema por defecto del sitio? | Dark (el DS lo define para el sitio; no cambia el JS). Light queda para CV impreso |
| D2 | ¿Se mantiene la fila de emojis del README personal de la home? | Quitarla o pasarla a texto; el DS prohíbe emojis |
| D3 | ¿PDF del CV en el repo? ¿Cuál versión (base o docencia)? | CV base, regenerado con `cv.py` y copiado a `static/cv/` |
| D4 | ¿Se agregan botones visibles de búsqueda y ayuda en el header (2 listeners de click)? | Sí; hoy mobile no puede buscar |
| D5 | ¿URL final de la página de enlaces? | `/links/` + alias `/l/` ahora; subdominio después |
| D6 | ¿Acotar Pagefind con `data-pagefind-body`? | Sí, en posts, proyectos y CV a la vez |
| D7 | ¿Quitar el submodule Risotto al final? | Sí, en la última fase, si `hugo` buildea sin él |
| D8 | ¿Quitar Academicons? | Sí (no se usa) |
| D9 | ¿og:image por post generado con Hugo? | Opcional, después del lanzamiento |
| D10 | Métricas y textos de servicios de la home | Validar con el usuario; los propuestos salen de CV y LinkedIn |
| D11 | ¿Normalizar tags a minúscula en Obsidian? | Sí |
| D12 | MinguitoD (repo privado), NotesMD (no existe), `summary-gitlab-issues`, `n8n-shbase` | Publicar MinguitoD solo si el repo se hace público; no listar NotesMD |
| D13 | ¿Publicar el post de MilPathsX para enlazarlo desde AppLogistic? | Decisión editorial del usuario |
| D14 | ¿Qué posts quedan como destacados en una home de marca? "Conciencia y Destino" es de otro autor | Destacar gplnr, Benchmarking y Cómo construí este blog; los escritos personales viven en el blog y en el README |
| D15 | ¿Se agregan al DS `primary-soft` dark, `primary-deep` light, `danger`, `lead`, `code-*`, `display-xl`, itálica? | Sí, en el artifact del DS, con los valores de §3.3 |
