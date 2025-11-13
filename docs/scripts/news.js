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

    if (item.image) {
      const thumbWrap = document.createElement('div');
      thumbWrap.className = 'news-card__thumb';
      const img = document.createElement('img');
      img.src = item.image;
      img.alt = item.title ? `${item.title} thumbnail` : 'News thumbnail';
      img.loading = 'lazy';
      thumbWrap.appendChild(img);
      card.appendChild(thumbWrap);
    }

    const body = document.createElement('div');
    body.className = 'news-card__body';

    const timeEl = document.createElement('time');
    timeEl.dateTime = item.date || '';
    timeEl.textContent = item.displayDate || item.date || '';

    const titleEl = document.createElement('h3');
    titleEl.textContent = item.title || 'Untitled update';

    const excerptEl = document.createElement('p');
    excerptEl.textContent = item.excerpt || '';

    body.appendChild(timeEl);
    body.appendChild(titleEl);
    body.appendChild(excerptEl);

    card.appendChild(body);

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
      loadMoreButton.style.display = hasMore ? 'flex' : 'none';
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
