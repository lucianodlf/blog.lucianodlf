/**
 * --verbose · mermaid.js
 * Carga e inicializa mermaid.js solo si hay diagramas en la página.
 * Sincroniza el tema con el dark/light toggle (paleta Dracula).
 */
(function () {
  'use strict';

  if (!document.querySelector('.mermaid')) return;

  const isLight = document.documentElement.classList.contains('light');

  const baseConfig = {
    startOnLoad: true,
    theme: isLight ? 'default' : 'dark',
  };

  if (!isLight) {
    baseConfig.themeVariables = {
      darkMode: true,
      background: '#282936',
      primaryColor: '#3a3c4e',
      primaryTextColor: '#e9e9f4',
      primaryBorderColor: '#62d6e8',
      secondaryColor: '#4d4f68',
      tertiaryColor: '#282936',
      lineColor: '#62d6e8',
      textColor: '#e9e9f4',
      mainBkg: '#3a3c4e',
      nodeTextColor: '#e9e9f4',
    };
  }

  const script = document.createElement('script');
  script.type = 'module';
  script.textContent = `
    import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';
    mermaid.initialize(${JSON.stringify(baseConfig)});
  `;
  document.head.appendChild(script);
})();
