/* CV: experiencias colapsables. Sin JS se ven completas.
   Colapsa solo las que superan el alto de vista previa; click en el botón o en la
   vista previa expande. Al imprimir, el CSS muestra todo. */
(function () {
  var items = document.querySelectorAll('.xp');
  if (!items.length) return;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  items.forEach(function (item) {
    var body = item.querySelector('.xp__body');
    var btn = item.querySelector('.xp__toggle');
    if (!body || !btn) return;
    var label = btn.querySelector('.xp__toggle-label');

    item.classList.add('is-collapsed');
    // Contenido corto: no hace falta colapsar.
    if (body.scrollHeight <= body.clientHeight + 24) {
      item.classList.remove('is-collapsed');
      return;
    }
    btn.hidden = false;
    btn.setAttribute('aria-expanded', 'false');

    function set(open) {
      var from = body.getBoundingClientRect().height;
      item.classList.toggle('is-collapsed', !open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      label.textContent = open ? 'ver menos' : 'ver experiencia completa';
      if (reduce) return;
      var to = body.scrollHeight;
      if (!open) to = parseFloat(getComputedStyle(body).maxHeight) || 0;
      body.style.maxHeight = from + 'px';
      body.offsetHeight; // reflow
      body.style.maxHeight = to + 'px';
      body.addEventListener('transitionend', function done() {
        body.style.maxHeight = '';
        body.removeEventListener('transitionend', done);
      });
    }

    btn.addEventListener('click', function () { set(item.classList.contains('is-collapsed')); });
    body.addEventListener('click', function (e) {
      if (item.classList.contains('is-collapsed') && !e.target.closest('a')) set(true);
    });
  });
})();
