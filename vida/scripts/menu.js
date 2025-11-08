(function () {
  const sidebar = document.querySelector('.sidebar');
  const toggle = document.querySelector('[data-sidebar-toggle]');
  const panel = document.querySelector('[data-sidebar-panel]');

  if (!sidebar || !toggle || !panel) {
    return;
  }

  const supportsInert = 'inert' in panel;
  const mobileQuery = window.matchMedia('(max-width: 880px)');

  const scrim = document.createElement('div');
  scrim.className = 'sidebar__scrim';
  scrim.setAttribute('data-sidebar-scrim', '');
  scrim.setAttribute('hidden', '');
  document.body.appendChild(scrim);

  const setState = (isOpen) => {
    if (!mobileQuery.matches) {
      isOpen = false;
    }

    document.body.classList.toggle('nav-open', isOpen);
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    panel.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
    scrim.toggleAttribute('hidden', !isOpen);

    if (supportsInert) {
      panel.inert = !isOpen;
    }
  };

  const syncToViewport = () => {
    if (!mobileQuery.matches) {
      document.body.classList.remove('nav-open');
      toggle.setAttribute('aria-expanded', 'false');
      panel.setAttribute('aria-hidden', 'false');
      scrim.setAttribute('hidden', '');
      if (supportsInert) {
        panel.inert = false;
      }
    } else if (!document.body.classList.contains('nav-open')) {
      panel.setAttribute('aria-hidden', 'true');
      if (supportsInert) {
        panel.inert = true;
      }
    }
  };

  syncToViewport();
  if (typeof mobileQuery.addEventListener === 'function') {
    mobileQuery.addEventListener('change', syncToViewport);
  } else if (typeof mobileQuery.addListener === 'function') {
    mobileQuery.addListener(syncToViewport);
  }

  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    setState(!isOpen);
  });

  scrim.addEventListener('click', () => setState(false));

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      setState(false);
    }
  });

  document.addEventListener('click', (event) => {
    if (!document.body.classList.contains('nav-open')) {
      return;
    }

    if (sidebar.contains(event.target)) {
      return;
    }

    setState(false);
  });

  panel.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setState(false));
  });
})();
