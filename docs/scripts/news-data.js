(function (global) {
  const DEFAULT_COLUMN_MAP = {
    id: 'id',
    date: 'date',
    displayDate: 'displayDate',
    title: 'title',
    excerpt: 'excerpt',
    image: 'image',
    categories: 'categories',
    body: 'body'
  };

  const DEFAULT_CONFIG = {
    csvUrl: '',
    spreadsheetId: '',
    sheetName: 'News',
    range: '',
    query: '',
    listSeparator: ',',
    paragraphSeparator: 'blankline',
    bodyColumns: null,
    columnMap: DEFAULT_COLUMN_MAP
  };

  const normalizeHeader = (value) =>
    (value || '')
      .toString()
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '');

  const slugify = (value) =>
    (value || '')
      .toString()
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 120);

  const parseCsv = (text) => {
    const rows = [];
    let currentValue = '';
    let currentRow = [];
    let inQuotes = false;

    const pushValue = () => {
      currentRow.push(currentValue);
      currentValue = '';
    };

    const pushRow = () => {
      rows.push(currentRow);
      currentRow = [];
    };

    for (let i = 0; i < text.length; i += 1) {
      const char = text[i];

      if (char === '"') {
        if (inQuotes && text[i + 1] === '"') {
          currentValue += '"';
          i += 1;
        } else {
          inQuotes = !inQuotes;
        }
        continue;
      }

      if (!inQuotes && char === ',') {
        pushValue();
        continue;
      }

      if (!inQuotes && (char === '\n' || char === '\r')) {
        pushValue();
        pushRow();
        if (char === '\r' && text[i + 1] === '\n') {
          i += 1;
        }
        continue;
      }

      currentValue += char;
    }

    pushValue();
    if (currentRow.length) {
      rows.push(currentRow);
    }

    return rows.filter((row) => row.some((cell) => (cell || '').trim().length));
  };

  const parseList = (value, separator) => {
    if (!value) return [];
    if (Array.isArray(value)) {
      return value.map((entry) => (entry || '').toString().trim()).filter(Boolean);
    }
    const normalized = value.toString().replace(/\r/g, '').trim();
    if (!normalized) return [];
    if (separator === 'newline') {
      return normalized.split(/\n+/).map((entry) => entry.trim()).filter(Boolean);
    }
    const splitter = separator || ',';
    const parts = splitter instanceof RegExp ? normalized.split(splitter) : normalized.split(splitter);
    return parts.map((entry) => entry.trim()).filter(Boolean);
  };

  const parseParagraphs = (value, separator) => {
    if (!value) return [];
    const normalized = value.toString().replace(/\r/g, '\n').trim();
    if (!normalized) return [];

    if (!separator || separator === 'blankline') {
      return normalized.split(/\n\s*\n/).map((entry) => entry.trim()).filter(Boolean);
    }

    if (separator === 'linebreak') {
      return normalized.split(/\n+/).map((entry) => entry.trim()).filter(Boolean);
    }

    const parts = normalized.split(separator);
    return parts.map((entry) => entry.trim()).filter(Boolean);
  };

  const buildSheetUrl = (config) => {
    if (config.csvUrl) {
      return config.csvUrl;
    }

    if (!config.spreadsheetId || (!config.range && !config.sheetName)) {
      return '';
    }

    const params = new URLSearchParams();
    params.set('tqx', 'out:csv');
    if (config.query) params.set('tq', config.query);
    if (config.range) {
      params.set('range', config.range);
    } else if (config.sheetName) {
      params.set('sheet', config.sheetName);
    }

    return `https://docs.google.com/spreadsheets/d/${config.spreadsheetId}/gviz/tq?${params.toString()}`;
  };

  const getConfig = () => {
    const overrides = (global && global.VIDA_NEWS_SHEET) || {};
    return {
      ...DEFAULT_CONFIG,
      ...overrides,
      columnMap: {
        ...DEFAULT_COLUMN_MAP,
        ...(overrides.columnMap || {})
      }
    };
  };

  const convertRowToItem = (row, headerLookup, config) => {
    const getByHeader = (headerName) => {
      if (!headerName) return '';
      const normalizedKey = normalizeHeader(headerName);
      if (!normalizedKey && normalizedKey !== '') return '';
      const index = headerLookup[normalizedKey];
      if (typeof index === 'undefined') return '';
      const rawValue = row[index];
      return typeof rawValue === 'string' ? rawValue.trim() : rawValue || '';
    };

    const getValue = (fieldName) => {
      const mapName = (config.columnMap && config.columnMap[fieldName]) || fieldName;
      return getByHeader(mapName);
    };

    const gatherBody = () => {
      if (Array.isArray(config.bodyColumns) && config.bodyColumns.length) {
        const combined = config.bodyColumns
          .map((header) => getByHeader(header))
          .filter(Boolean)
          .join('\n\n');
        const paragraphs = parseParagraphs(combined, config.paragraphSeparator);
        if (paragraphs.length) return paragraphs;
        return combined ? [combined] : [];
      }
      const bodyText = getValue('body');
      const paragraphs = parseParagraphs(bodyText, config.paragraphSeparator);
      if (paragraphs.length) return paragraphs;
      return bodyText ? [bodyText] : [];
    };

    const rawTitle = getValue('title');
    const id = getValue('id') || slugify(rawTitle);
    if (!id) return null;

    const item = {
      id,
      date: getValue('date'),
      displayDate: getValue('displayDate'),
      title: rawTitle,
      excerpt: getValue('excerpt'),
      image: getValue('image'),
      categories: parseList(getValue('categories'), config.listSeparator),
      body: gatherBody()
    };

    if (!item.displayDate) {
      item.displayDate = item.date;
    }

    if (!item.body.length) {
      item.body = [];
    }

    return item;
  };

  const csvToItems = (csvText, config) => {
    const rows = parseCsv(csvText);
    if (!rows.length) return [];
    const headerRow = rows.shift();
    if (!headerRow) return [];
    const headerLookup = {};
    headerRow.forEach((header, index) => {
      const normalizedKey = normalizeHeader(header);
      if (normalizedKey && typeof headerLookup[normalizedKey] === 'undefined') {
        headerLookup[normalizedKey] = index;
      }
    });

    return rows
      .map((row) => convertRowToItem(row, headerLookup, config))
      .filter((item) => Boolean(item));
  };

  const fetchFromSheet = (config) => {
    const url = buildSheetUrl(config);
    if (!url) {
      return Promise.reject(new Error('Google Sheets source not configured.'));
    }

    return fetch(url)
      .then((response) => {
        if (!response.ok) throw new Error(`Sheet HTTP ${response.status}`);
        return response.text();
      })
      .then((csv) => csvToItems(csv, config));
  };

  const fetchFromJson = () =>
    fetch('data/news.json')
      .then((response) => {
        if (!response.ok) throw new Error(`JSON HTTP ${response.status}`);
        return response.json();
      })
      .catch((error) => {
        console.error('Failed to load local news.json', error);
        return [];
      });

  let cachedPromise = null;

  const fetchAll = () => {
    if (!cachedPromise) {
      const config = getConfig();
      const shouldUseSheet = Boolean(config.spreadsheetId && (config.range || config.sheetName));
      const primary = shouldUseSheet
        ? fetchFromSheet(config)
            .then((items) => {
              // If sheet returns empty array, fallback to JSON
              if (!items || items.length === 0) {
                console.warn('Google Sheets is empty, falling back to local news.json data');
                return fetchFromJson();
              }
              return items;
            })
            .catch((error) => {
              console.warn('Falling back to local news.json data', error);
              return fetchFromJson();
            })
        : fetchFromJson();

      cachedPromise = primary.catch((error) => {
        console.error('News data failed to load', error);
        return [];
      });
    }

    return cachedPromise.then((items) => items.slice());
  };

  const fetchById = (id) =>
    fetchAll().then((items) => items.find((item) => item.id === id) || null);

  global.NewsDataSource = {
    fetchAll,
    fetchById
  };
})(typeof window !== 'undefined' ? window : this);
