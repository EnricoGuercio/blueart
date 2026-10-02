/*
 * Editor semplice del pannello (nessuna libreria):
 * - bottone "+ Titoletto" che inserisce il prefisso "### " a inizio riga
 * - anteprima dal vivo con le stesse regole del sito (paragrafi separati da
 *   riga vuota, "### " = titoletto). Il testo viene inserito con textContent,
 *   mai come HTML.
 * - anteprima dell'immagine appena scelta
 */
(function () {
  var ta = document.querySelector('[data-editor]');
  var prev = document.querySelector('[data-preview]');

  function render() {
    if (!ta || !prev) return;
    prev.textContent = '';
    var blocks = ta.value.replace(/\r\n/g, '\n').split(/\n\n/);
    var any = false;
    blocks.forEach(function (b) {
      b = b.trim();
      if (!b) return;
      any = true;
      var el;
      if (b.indexOf('### ') === 0) {
        el = document.createElement('h3');
        el.style.cssText = 'font-size:1.15rem;font-weight:600;margin:.8rem 0 .4rem;color:var(--color-fg)';
        el.textContent = b.slice(4);
      } else {
        el = document.createElement('p');
        el.style.cssText = 'margin:.5rem 0;color:var(--color-fg-muted);line-height:1.6';
        el.textContent = b;
      }
      prev.appendChild(el);
    });
    if (!any) {
      var p = document.createElement('p');
      p.className = 'pn-hint';
      p.textContent = 'L’anteprima del testo appare qui.';
      prev.appendChild(p);
    }
  }

  if (ta) {
    ta.addEventListener('input', render);
    render();
    var btn = document.querySelector('[data-insert-heading]');
    if (btn) {
      btn.addEventListener('click', function () {
        var start = ta.selectionStart;
        var before = ta.value.slice(0, start);
        var after = ta.value.slice(start);
        var lead = before === '' || /\n\n$/.test(before) ? '' : (/\n$/.test(before) ? '\n' : '\n\n');
        var ins = lead + '### ';
        ta.value = before + ins + after;
        var pos = start + ins.length;
        ta.focus();
        ta.setSelectionRange(pos, pos);
        render();
      });
    }
  }

  var input = document.querySelector('[data-image-input]');
  var img = document.querySelector('[data-image-preview]');
  if (input && img) {
    input.addEventListener('change', function () {
      var f = input.files && input.files[0];
      if (!f) { img.hidden = true; return; }
      img.src = URL.createObjectURL(f);
      img.hidden = false;
    });
  }
})();
