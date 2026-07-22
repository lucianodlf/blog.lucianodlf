/**
 * --verbose · tables.js
 * Envuelve cada tabla del post en un contenedor con scroll horizontal
 * y añade un toggle "vista renderizada / markdown crudo" (estilo Obsidian).
 */
(function () {
  'use strict';

  // Reconstruye el markdown crudo de una <table> (aproximación GFM).
  function tableToMarkdown(table) {
    const rows = Array.from(table.rows).map(function (tr) {
      return Array.from(tr.cells).map(function (cell) {
        return cell.textContent.trim().replace(/\|/g, '\\|');
      });
    });
    if (!rows.length) return '';

    const header = rows[0];
    const sep = header.map(function () { return '---'; });
    const body = rows.slice(1);

    const line = function (cells) { return '| ' + cells.join(' | ') + ' |'; };
    return [line(header), line(sep)].concat(body.map(line)).join('\n');
  }

  const tables = document.querySelectorAll('.content__body table');

  tables.forEach(function (table) {
    // Contenedor con scroll horizontal
    const wrap = document.createElement('div');
    wrap.className = 'table-wrap';
    table.parentNode.insertBefore(wrap, table);
    wrap.appendChild(table);

    // Bloque de markdown crudo (oculto por defecto)
    const raw = document.createElement('pre');
    raw.className = 'table-raw';
    raw.hidden = true;
    const code = document.createElement('code');
    code.textContent = tableToMarkdown(table);
    raw.appendChild(code);
    wrap.appendChild(raw);

    // Botón toggle
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'table-toggle';
    btn.title = 'Ver markdown crudo';
    btn.setAttribute('aria-label', 'Alternar entre tabla y markdown crudo');
    btn.innerHTML = '<i class="fa-solid fa-code" aria-hidden="true"></i>';
    wrap.insertBefore(btn, table);

    btn.addEventListener('click', function () {
      const showRaw = table.hidden === false;
      table.hidden = showRaw;
      raw.hidden = !showRaw;
      btn.title = showRaw ? 'Ver tabla renderizada' : 'Ver markdown crudo';
      btn.classList.toggle('is-raw', showRaw);
    });
  });
})();
