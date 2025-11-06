(function () {
  const params = new URLSearchParams(window.location.search);
  const articleId = params.get('id');

  const hero = document.getElementById('news-hero');
  const titleEl = document.getElementById('article-title');
  const excerptEl = document.getElementById('article-excerpt');
  const dateEl = document.getElementById('article-date');
  const tagsEl = document.getElementById('article-tags');
  const bodyEl = document.getElementById('article-body');
  const articleWrapper = document.getElementById('news-article');

  const renderNotFound = () => {
    if (titleEl) titleEl.textContent = 'Story not found';
    if (excerptEl) excerptEl.textContent = '';
    if (dateEl) dateEl.textContent = '';
    if (tagsEl) tagsEl.innerHTML = '';
    if (bodyEl) {
      bodyEl.innerHTML = '';
      const p = document.createElement('p');
      p.textContent = 'This update could not be located. Return to the news feed to explore recent notices.';
      bodyEl.appendChild(p);
    }
    if (articleWrapper) articleWrapper.setAttribute('data-status', 'empty');
  };

  if (!articleId) {
    renderNotFound();
    return;
  }

  fetch('data/news.json')
    .then((response) => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    })
    .then((items) => {
      const article = Array.isArray(items)
        ? items.find((item) => item.id === articleId)
        : null;

      if (!article) {
        renderNotFound();
        return;
      }

      if (article.title) {
        document.title = `Vida Hostel Lisbon | ${article.title}`;
      }

      if (titleEl) titleEl.textContent = article.title || 'Story';
      if (excerptEl) excerptEl.textContent = article.excerpt || '';
      if (dateEl) {
        const displayDate = article.displayDate || article.date;
        dateEl.textContent = displayDate ? `Published ${displayDate}` : '';
      }

      if (tagsEl) {
        tagsEl.innerHTML = '';
        if (Array.isArray(article.categories) && article.categories.length) {
          article.categories.forEach((cat) => {
            if (!cat) return;
            const badge = document.createElement('span');
            badge.className = 'tag';
            badge.textContent = cat;
            tagsEl.appendChild(badge);
          });
        }
      }

      if (bodyEl) {
        bodyEl.innerHTML = '';
        if (Array.isArray(article.body) && article.body.length) {
          article.body.forEach((paragraph) => {
            if (typeof paragraph !== 'string') return;
            const p = document.createElement('p');
            p.textContent = paragraph;
            bodyEl.appendChild(p);
          });
        }
      }

      if (hero && article.image) {
        hero.style.backgroundImage = `url('${article.image}')`;
      }
    })
    .catch((error) => {
      console.error('Failed to load article', error);
      renderNotFound();
    });
})();
