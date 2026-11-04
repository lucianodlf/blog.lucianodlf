/**
 * --verbose · mermaid.js
 * Carga e inicializa mermaid.js solo si hay diagramas en la página.
 * Colores leídos de los tokens CSS (tokens.css), así respeta light y dark.
 */
(function () {
  'use strict';

  if (!document.querySelector('.mermaid')) return;

  const css = getComputedStyle(document.documentElement);
  const v = (name) => css.getPropertyValue(name).trim();
  const isLight = document.documentElement.classList.contains('light');

  const baseConfig = {
    startOnLoad: true,
    theme: 'base',
    fontFamily: v('--font-sans'),
    themeVariables: {
      darkMode: !isLight,
      fontFamily: v('--font-sans'),
      background: v('--surface'),
      primaryColor: v('--primary-soft'),
      primaryTextColor: v('--text'),
      primaryBorderColor: v('--primary'),
      secondaryColor: v('--background'),
      secondaryTextColor: v('--text'),
      secondaryBorderColor: v('--border'),
      tertiaryColor: v('--surface'),
      tertiaryTextColor: v('--text'),
      tertiaryBorderColor: v('--border'),
      lineColor: v('--muted'),
      textColor: v('--text'),
      mainBkg: v('--primary-soft'),
      nodeBorder: v('--primary'),
      nodeTextColor: v('--text'),
      clusterBkg: v('--background'),
      clusterBorder: v('--border'),
      edgeLabelBackground: v('--surface'),
      noteBkgColor: v('--surface'),
      noteTextColor: v('--text'),
      noteBorderColor: v('--accent'),
    },
  };

  const script = document.createElement('script');
  script.type = 'module';
  script.textContent = `
    import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';
    mermaid.initialize(${JSON.stringify(baseConfig)});
  `;
  document.head.appendChild(script);
})();
