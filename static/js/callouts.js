/**
 * --verbose · callouts.js
 * Convierte blockquotes con sintaxis Obsidian > [!TYPE] a callout boxes
 */
(function () {
  const icons = {
    note:      'fa-solid fa-circle-info',
    tip:       'fa-solid fa-lightbulb',
    warning:   'fa-solid fa-triangle-exclamation',
    caution:   'fa-solid fa-fire',
    important: 'fa-solid fa-star'
  };

  const labels = {
    note:      'Nota',
    tip:       'Tip',
    warning:   'Atención',
    caution:   'Precaución',
    important: 'Importante'
  };

  document.querySelectorAll('blockquote').forEach(function (bq) {
    var p = bq.querySelector('p');
    if (!p) return;

    var match = p.textContent.match(/^\[!([A-Za-z]+)\]/);
    if (!match) return;

    var type  = match[1].toLowerCase();
    var icon  = icons[type]  || 'fa-solid fa-circle-info';
    var label = labels[type] || match[1];

    // Limpiar [!TYPE] del párrafo
    p.innerHTML = p.innerHTML.replace(/^\[![A-Za-z]+\]\s*/, '');

    // Construir el callout
    var div = document.createElement('div');
    div.className = 'callout callout--' + type;
    div.innerHTML =
      '<div class="callout__title">' +
        '<i class="' + icon + '" aria-hidden="true"></i> ' + label +
      '</div>' +
      '<div class="callout__body">' + bq.innerHTML + '</div>';

    bq.parentNode.replaceChild(div, bq);
  });
})();
