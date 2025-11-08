(function () {
  const grid = document.getElementById('news-grid');
  const emptyMessage = document.getElementById('news-empty');
  const loadMoreButton = document.getElementById('news-load-more');
  if (!grid) return;

  const PAGE_SIZE = 3;
  let allItems = [];
  let renderedCount = 0;

  const gotoDetail = (id) => {
    window.location.href = `news-detail.html?id=${encodeURIComponent(id)}`;
  };

  const createCard = (item) => {
    const card = document.createElement('article');
    card.className = 'news-card';
    card.tabIndex = 0;
    card.setAttribute('role', 'link');
    card.dataset.id = item.id;

    const timeEl = document.createElement('time');
    timeEl.dateTime = item.date || '';
    timeEl.textContent = item.displayDate || item.date || '';

    const titleEl = document.createElement('h3');
    titleEl.textContent = item.title || 'Untitled update';

    const excerptEl = document.createElement('p');
    excerptEl.textContent = item.excerpt || '';

    card.appendChild(timeEl);
    card.appendChild(titleEl);
    card.appendChild(excerptEl);

    if (Array.isArray(item.categories) && item.categories.length) {
      const categoriesEl = document.createElement('div');
      categoriesEl.className = 'news-card__categories';
      item.categories.forEach((cat) => {
        if (!cat) return;
        const badge = document.createElement('span');
        badge.className = 'tag';
        badge.textContent = cat;
        categoriesEl.appendChild(badge);
      });
      card.appendChild(categoriesEl);
    }

    card.addEventListener('click', () => gotoDetail(item.id));
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        gotoDetail(item.id);
      }
    });

    return card;
  };

  const renderNextBatch = () => {
    const remaining = allItems.length - renderedCount;
    const batchSize = Math.min(PAGE_SIZE, remaining);
    const slice = allItems.slice(renderedCount, renderedCount + batchSize);
    slice.forEach((item) => {
      if (!item || !item.id) return;
      const card = createCard(item);
      grid.appendChild(card);
    });
    renderedCount += batchSize;

    if (loadMoreButton) {
      const hasMore = renderedCount < allItems.length;
      loadMoreButton.style.display = hasMore ? 'inline-flex' : 'none';
      loadMoreButton.disabled = !hasMore;
    }
  };

  const handleLoadMore = () => {
    renderNextBatch();
    if (loadMoreButton) {
      const lastCard = grid.lastElementChild;
      if (lastCard) {
        lastCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  if (loadMoreButton) {
    loadMoreButton.addEventListener('click', handleLoadMore);
    loadMoreButton.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        handleLoadMore();
      }
    });
  }

  fetch('data/news.json')
    .then((response) => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    })
    .then((items) => {
      if (!Array.isArray(items) || items.length === 0) {
        if (emptyMessage) emptyMessage.style.display = 'block';
        if (loadMoreButton) loadMoreButton.style.display = 'none';
        return;
      }

      allItems = items
        .slice()
        .sort((a, b) => new Date(b.date) - new Date(a.date));

      if (emptyMessage) emptyMessage.style.display = 'none';
      renderNextBatch();
    })
    .catch((error) => {
      console.error('Failed to load news items', error);
      if (emptyMessage) emptyMessage.style.display = 'block';
      if (loadMoreButton) loadMoreButton.style.display = 'none';
    });
})();
