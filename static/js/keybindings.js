/**
 * --verbose · keybindings.js
 * Búsqueda (/  Ctrl+K) + ayuda (?) + scroll (gg, G) + theme toggle
 */
(function () {
  'use strict';

  // --- Theme toggle ---
  const themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      document.documentElement.classList.toggle('light');
      const theme = document.documentElement.classList.contains('light') ? 'light' : 'dark';
      localStorage.setItem('theme', theme);
    });
  }

  function isTyping() {
    const el = document.activeElement;
    return el && (
      el.tagName === 'INPUT' ||
      el.tagName === 'TEXTAREA' ||
      el.isContentEditable
    );
  }

  const searchModal = document.getElementById('search-modal');
  const helpModal   = document.getElementById('help-modal');

  // --- Búsqueda ---

  function openSearch() {
    if (!searchModal) return;
    searchModal.showModal();
    setTimeout(() => {
      const input = searchModal.querySelector('input[type="text"]');
      if (input) input.focus();
    }, 60);
  }

  function closeSearch() {
    if (searchModal && searchModal.open) searchModal.close();
  }

  // Cerrar al hacer click en el backdrop
  if (searchModal) {
    searchModal.addEventListener('click', (e) => {
      if (e.target === searchModal) closeSearch();
    });
  }

  // --- j/k navegación en resultados de Pagefind ---

  let resultIndex = -1;

  function getResults() {
    if (!searchModal) return [];
    return Array.from(searchModal.querySelectorAll('.pagefind-ui__result'));
  }

  function selectResult(index) {
    const results = getResults();
    if (!results.length) return;
    results.forEach(r => r.classList.remove('kb-selected'));
    resultIndex = Math.max(0, Math.min(results.length - 1, index));
    results[resultIndex].classList.add('kb-selected');
    results[resultIndex].scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }

  function openSelected() {
    const results = getResults();
    if (resultIndex < 0 || !results[resultIndex]) return;
    const link = results[resultIndex].querySelector('a');
    if (link) link.click();
  }

  // Reset índice cuando cambia la búsqueda
  if (searchModal) {
    searchModal.addEventListener('input', () => { resultIndex = -1; });
  }

  // --- Ayuda ---

  function toggleHelp() {
    if (!helpModal) return;
    if (helpModal.open) {
      helpModal.close();
    } else {
      helpModal.showModal();
    }
  }

  if (helpModal) {
    helpModal.addEventListener('click', (e) => {
      if (e.target === helpModal) helpModal.close();
    });
  }

  // --- gg scroll ---

  let gPressed = false;
  let gTimer   = null;

  // --- Listener principal ---

  document.addEventListener('keydown', function (e) {

    // Esc cierra lo que esté abierto
    if (e.key === 'Escape') {
      if (helpModal && helpModal.open) { helpModal.close(); return; }
      if (searchModal && searchModal.open) { closeSearch(); return; }
    }

    // Dentro del modal de búsqueda: ArrowDown/Up para navegar, Enter para abrir
    if (searchModal && searchModal.open) {
      if (e.key === 'ArrowDown') { e.preventDefault(); selectResult(resultIndex + 1); }
      if (e.key === 'ArrowUp')   { e.preventDefault(); selectResult(resultIndex - 1); }
      if (e.key === 'Enter' && resultIndex >= 0) { e.preventDefault(); openSelected(); }
      return;
    }

    if (isTyping()) return;

    switch (e.key) {

      case '/':
        e.preventDefault();
        openSearch();
        break;

      case 'k':
        if (e.ctrlKey) { e.preventDefault(); openSearch(); }
        break;

      case '?':
        toggleHelp();
        break;

      case 'G':
        e.preventDefault();
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        break;

      case 'g':
        if (gPressed) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          gPressed = false;
          clearTimeout(gTimer);
        } else {
          gPressed = true;
          gTimer = setTimeout(() => { gPressed = false; }, 500);
        }
        break;

      default:
        if (e.key !== 'g') gPressed = false;
    }
  });

})();
