---
title: "gplnr: Get Path Line Number Reference"
date: 2026-05-26
draft: false
share: true
featured: true
toc: false
tags:
  - VScode
  - Extensiones
  - DIY
created: 18-07-2026T13:05
updated: 18-07-2026T14:24
---
![center|300](../../static/assets/asset-20260718131346335.png.png)

Estaba escribiendo en un archivo, seleccioné unas líneas, apreté ctrl+alt+k para mandarle la referencia a Claude Code, y en vez de eso se abrió una terminal nueva con un `@mention` vacío adentro. En otros casos, dos terminales integradas, solo enviaba un '@mention' a la primer instancia de Claude Code. O bien, queria obtener el mention copiado para usar en otro lado. Nada de lo que yo quería estaba funcionando. La extensión oficial de Claude Code para VS Code había registrado exactamente el mismo atajo, con el mismo `when: editorTextFocus`.

No era un bug. Solo un comportamiento que no se ajustaba a mi necesidad.
Una búsqueda de extensiones actuales me mostró un montón de extensiones para hacer esto, desde simples a muy complejas cargadas de opciones. No me interesó.

Se me ocurrió interesante probar construir mi primera propia extensión. Lo que yo quería era chiquito y preciso: copiar al portapapeles una referencia del tipo `@src/archivo.js#L12-40` (archivo y rango de líneas, el formato exacto que Claude Code entiende cuando se lo pegás) e inyectarla en la terminal integrada si había una activa, sin ejecutarla, solo puesta ahí lista para que yo decida qué hacer con ella. Dos verbos. Copiar. Inyectar. Nada más.

Entonces fui descubriendo cosas que ya estaban resueltas en la implementacion de la API de VS Code. `vscode.window.activeTerminal` ya devuelve `undefined` si no hay terminal, así que "no hay terminal" y "ninguno tiene foco" son el mismo caso, no hace falta distinguirlos. `Terminal.sendText(texto, false)` ya inserta sin ejecutar. `workspace.asRelativePath` ya resuelve el path relativo al workspace y ya tiene un fallback a ruta absoluta para el archivo suelto que no pertenece a ningún folder. No hay que armar nada de esto. Hay que encontrarlo y usarlo.

Algo hermoso al darme cuenta de que este "encontrarlo y usarlo" fue, en este caso, gracias al trabajo en conjunto con Claude Code CLI con el que fui desarrollando la extensión. Construir una extensión para VS Code, con VS Code, usando shell integrado con Claude Code CLI, mientras que la extensión es para VS Code, que pudiera mejorar la implementación actual del keybinding Ctrl+Alt+K al usar Claude Code CLI integrado en la shell. El punto es construir algo con las herramientas que mejore la misma herramienta en la sinergia de uso entre la herramienta y yo. 

El primer borrador tenía cinco funciones. El segundo tenía dos: `buildReference`, pura, que solo calcula el string, y `copyReference`, que orquesta portapapeles y terminal. Las tres funciones que había en el medio, resolver el path, resolver el sufijo de línea, no tenían un segundo caller que las justificara. Fragmentación disfrazada de prolijidad. Las borré y el código quedó más legible, no menos.

Debo dar las gracias a [ponytail](https://github.com/DietrichGebert/ponytail) por esto.

Sin TypeScript. Sin bundler. Sin build step. Un archivo, `extension.js`, cuarenta y seis líneas, que `main` en `package.json` apunta directo. F5 corre eso, tal cual está, sin paso intermedio. Cada dependencia que no agregué es una decisión, no una omisión: cero dependencias en runtime, la única API que usa es la de `vscode`, que ya está ahí. Tampoco hay try/catch alrededor de `clipboard.writeText` o de `sendText`. Si algo de eso falla en condiciones normales, prefiero verlo reventar en la consola del extension host antes que tragarme el error en silencio.

### Prueba publicación (¿por qué Open VSX? No lo sé...)
Publicar en Open VSX resultó un poco arduo de validaciones, pero de todas formas fue interesante el proceso. Cuenta de eclipse.org, publisher agreement firmado, un namespace creado una sola vez (con un proceso de verificación o solicitud de propiedad, cargando un issue en un repo. Pensé que nadie me respondería, pero no fue así: un par de horas y alguien aprobó mi solicitud), un token y después de eso, cada nueva versión es: subir el número en `package.json`, y `npx ovsx publish`. Un comando. `ovsx` empaqueta y sube en el mismo paso, no hace falta generar el `.vsix` a mano para después subirlo aparte. Publiqué y al rato: https://open-vsx.org/extension/lucianodlf/gplnr 

El conflicto de atajos sigue ahí, documentado en el README para quien lo necesite: una línea de `keybindings.json` le saca el atajo a la extensión de Claude Code y lo deja libre para esta. Pero ya casi no me acuerdo de eso cuando lo uso. Aprieto la combinación y aparece lo que pedí, del tamaño que lo pedí.
Quizás hay otra forma, pero aún no la sé.

Ya sé que hay muchas más extensiones que hacen lo mismo, más o menos, para otras plataformas, etc. Pero esta es la que hice con mis manos, y eso es experiencia que disfruto. No tengo que clonar un repo para ver si es "segura" por si me da duda la autoría y esas cosas. Si llegaste acá y la querés probar, queda a tu criterio ver si es segura.

Un abrazo. 🤗

- [Extensión en Open VSX](https://open-vsx.org/extension/lucianodlf/gplnr)
- [Repositorio en GitHub](https://github.com/lucianodlf/gplnr)