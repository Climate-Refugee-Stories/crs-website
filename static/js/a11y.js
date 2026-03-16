// static/js/a11y.js
(function(){
  const LS_KEY = 'a11yState';
  const docEl = document.documentElement;
  const body = document.body;

  // state
  const state = {
    fontScale: 1,                // 0.75–2.0
    grayscale: false,
    high: false,
    negative: false,
    light: false,
    underline: false,
    readable: false
  };

  // load saved state
  try {
    const saved = JSON.parse(localStorage.getItem(LS_KEY));
    if (saved && typeof saved === 'object') Object.assign(state, saved);
  } catch(e){}

  // apply state to DOM
  function apply(){
    // font scale via CSS var
    docEl.style.setProperty('--a11y-font-scale', String(state.fontScale));

    // mutually exclusive contrast modes: high / negative / light
    body.classList.toggle('a11y-high-contrast', !!state.high);
    body.classList.toggle('a11y-negative-contrast', !!state.negative);
    body.classList.toggle('a11y-light-bg', !!state.light);

    // grayscale
    body.classList.toggle('a11y-grayscale', !!state.grayscale);

    // underline links
    body.classList.toggle('a11y-underline-links', !!state.underline);

    // readable font
    body.classList.toggle('a11y-readable-font', !!state.readable);
  }

  function save(){
    localStorage.setItem(LS_KEY, JSON.stringify(state));
  }

  function setExclusive(mode){
    // turn off other contrast modes when one is toggled on
    if (mode === 'high') { state.negative = false; state.light = false; }
    if (mode === 'negative') { state.high = false; state.light = false; }
    if (mode === 'light') { state.high = false; state.negative = false; }
  }

  function clamp(v, min, max){ return Math.max(min, Math.min(max, v)); }

  // init apply
  apply();

  // toolbar actions
  document.addEventListener('click', function(e){
    const btn = e.target.closest('#a11y-toolbar .a11y-btn');
    if (!btn) return;
    const action = btn.getAttribute('data-a11y');

    switch(action){
      case 'font-inc':
        state.fontScale = clamp(state.fontScale + 0.1, 0.75, 2.0);
        break;
      case 'font-dec':
        state.fontScale = clamp(state.fontScale - 0.1, 0.75, 2.0);
        break;
      case 'grayscale':
        state.grayscale = !state.grayscale;
        break;
      case 'high':
        state.high = !state.high; setExclusive('high');
        break;
      case 'negative':
        state.negative = !state.negative; setExclusive('negative');
        break;
      case 'light':
        state.light = !state.light; setExclusive('light');
        break;
      case 'underline':
        state.underline = !state.underline;
        break;
      case 'readable':
        state.readable = !state.readable;
        break;
      case 'reset':
        state.fontScale = 1;
        state.grayscale = state.high = state.negative = state.light = state.underline = state.readable = false;
        break;
    }
    apply(); save();
  });
})();
