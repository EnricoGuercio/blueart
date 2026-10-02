/*
 * JS minimo per le pagine PHP (Eventi/Blog): niente React/Next qui.
 * - lightbox nativo <dialog> (stesso comportamento di BlogHeaderImage.tsx)
 * - scroll istantaneo verso le ancore #id (stesso motivo di HashScrollFix.tsx:
 *   html{scroll-behavior:smooth} interrompe lo scroll automatico del browser)
 */
(function () {
  document.querySelectorAll('[data-lightbox-open]').forEach(function (btn) {
    var dialog = btn.parentElement && btn.parentElement.querySelector('dialog[data-lightbox]');
    if (!dialog) return;
    btn.addEventListener('click', function () { dialog.showModal(); });
    dialog.addEventListener('click', function (e) { if (e.target === dialog) dialog.close(); });
    var close = dialog.querySelector('[data-lightbox-close]');
    if (close) close.addEventListener('click', function () { dialog.close(); });
  });

  function scrollToHash() {
    if (!location.hash) return;
    var el = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (el) el.scrollIntoView({ block: 'start', behavior: 'instant' });
  }
  setTimeout(scrollToHash, 50);
  setTimeout(scrollToHash, 350);
  window.addEventListener('hashchange', scrollToHash);
})();
