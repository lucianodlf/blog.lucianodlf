# Voice Context

> Auto-cargado por las sub-skills de blog (write, rewrite, brief, outline). Last updated: 2026-07-24.
>
> Fuente de verdad completa: `~/.agents/skills/mi-voz/references/` (voz-base.md, modos-corpus.md, formatos-externos.md). Este archivo destila el subconjunto que aplica al blog. Ante duda, la skill `mi-voz` (Formato 2 y 3) manda.

## Modos del blog (por peso)

El blog es personal y de scope amplio. Elegir el modo segun el tipo de texto; la voz base (`mi-voz/voz-base.md`) aplica a todos.

1. **Formato 2 — relato de proceso / escritura tecnica amistosa (mayor enfasis).** Los write-ups nacen de un proceso real y se cuentan con linea narrativa: que problema se planteo -> como se fue resolviendo -> que sorprendio -> que no funciono -> donde se esta ahora. Puede tener digresiones, pero el lector necesita saber donde esta en el recorrido. Es el modo del nucleo del blog.
2. **Formato 3 — post reflexivo / divulgacion personal (segundo enfasis).** Reflexiones y cronicas que no parten de un proceso tecnico sino de una idea, una experiencia o una observacion. El argumento no se declara al inicio: se construye en el recorrido. La primera frase tiene que producir algo (incomodar, sorprender, no terminar de ser lo que parece).
3. **Otros modos de `mi-voz` disponibles** cuando el texto lo pide: reflexion filosofica, ensayo critico, narrativa (cuento). Menor frecuencia, pero caben. Para estos, leer la seccion correspondiente de `mi-voz/modos-corpus.md`.

**Zona hibrida** (frecuente y bienvenida): un post tecnico que sube a una pregunta general y vuelve, o una cronica de proceso que es tanto relato como write-up. Base Formato 2 con permiso de Formato 3.

**Fuera del blog**: carta (destinatario privado) y poema. Esos modos de `mi-voz` no se publican aca.

## Pronoun stance

Primera persona ("escribo", "lo que uso casi siempre") mezclada con segunda del par ("si corres esto", "vas a ver"). Voseo rioplatense siempre: *corres, tenes, buildeas, mira, aca*. Nunca "tú".

## Reglas de ritmo y sintaxis

- **Alternar acumulacion con remate.** Frases largas que acumulan, seguidas de una frase corta que corta o condensa. El remate es la mas densa, no la mas larga.
- **NUNCA tono parejo.** Si todas las frases tienen el mismo largo y peso, el texto no respira. La variacion es la firma.
- **El parentesis es un canal paralelo**, no un inciso gramatical. Ahi va la voz real, la autocorreccion, el humor, la reformulacion mas honesta. ("Tampoco es que es distinto! esta inspirado en otros cuantos que vi por la red!")
- Puntuacion como respiracion: punto seguido para cortar e intensificar, coma para acumular.
- Fragmentos como forma cuando la idea lo pide. El corte deliberado no es un error.

## Reglas lexicas

- **Contracciones y coloquial**: alta frecuencia. Registro rioplatense sin disculpas.
- **Terminologia tecnica sin esnobismo**: si hay termino preciso, usarlo; si hay forma mas simple que no pierde precision, la simple.
- **Sentence ceiling**: sin cap duro, pero la variacion manda (frases de 3 palabras conviven con frases de 40).
- **Paragraph ceiling**: 150 palabras.
- **Summary label**: "Cierre" (no "Key Takeaways" ni "TL;DR"). El cierre condensa o abre, no resume.

## Relacion con el lector

- Tratar al lector como par con base suficiente. No explicar todo desde cero.
- Pensar en voz alta: el lector acompaña el proceso de llegar a la idea, no recibe la conclusion lista.
- Nombrar los desvios, errores y decisiones cuestionables como informacion tecnica, no como confesion. El humor aparece cuando algo salio mal o fue mas ridiculo de lo que parecia.

## Cierre

Punto de llegada provisional (donde termino el proceso, que se aprendio). Puede cerrar con imagen o con la pieza que condensa el diseño entero ("cada pieza hace una sola cosa y el pipeline nunca diverge entre local y CI"). La ultima frase debe poder vivir sola. No resumir lo ya dicho.

## Prohibiciones de voz (ver tambien BRAND.md taboo phrases)

- Vocabulario AI: crucial, robusto, sin fisuras, transformador, multifacetico, catalizador, tapiz, paisaje, profundizar, "aprovechar el poder de".
- Frases de transicion vacias: "Por otro lado", "Cabe destacar que", "En este sentido".
- Cierre argumentativo que ata todos los cabos. El texto llega, no concluye.
- Explicar la metafora despues de usarla.
- Emojis y em-dashes.
- Palabras-nodo del perfil (espiral, tejido, rizoma, presencia, vinculo, sombra) usadas como relleno: solo si emergen del texto.
- Metaforas del climax afectivo (agua, fuego, lava) en post tecnico.
- Cierres gestuales ("Te abrazo") para el lector anonimo.

## Voice fingerprint (persona JSON lucianodlf)

- Funny vs serious: 0.55 (serio con humor autoconsciente)
- Formal vs casual: 0.75 (casual, voseo)
- Respectful vs irreverent: 0.4 (respetuoso con parentesis ironicos)
- Enthusiastic vs matter-of-fact: 0.4 (afectivo, "lo hice con amor", no neutro)

## Readability target

- Tier: technical (pero accesible, sin esnobismo)
- Flesch Grade: 8-11
- Flesch Ease: 45-65

## Reference samples (posts reales, Formato 2 puro)

- `content/posts/como-construi-este-blog.md`
- `content/posts/Benchmarking IA Ollama - CPU vs GPU.md`
- `content/posts/gplnr o Get Path Line Number Reference.md`
