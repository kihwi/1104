# Google Sheets Source for News Pages

The news list (`docs/news.html`) and detail (`docs/news-detail.html`) can now read their data directly from a Google Spreadsheet. The rendered cards stay the same—you just edit a sheet instead of `docs/data/news.json`.

## 1. Create + publish the sheet

1. In Google Sheets, create (or duplicate) a tab that contains the following headers in row 1: `id`, `date`, `displayDate`, `title`, `excerpt`, `image`, `categories`, `body`.
2. Go to **File → Share → Publish to web**. Select your sheet/tab and choose **Comma-separated values (.csv)**, then confirm **Publish**. The spreadsheet must be shared “Anyone with the link can view”.
3. Copy the spreadsheet ID from its URL (the long string between `/d/` and `/edit`). If you published a tab other than the first, note the tab name too.

## 2. Map the sheet in `scripts/news-config.js`

Open `docs/scripts/news-config.js` and fill in:

```js
window.VIDA_NEWS_SHEET = {
  spreadsheetId: 'YOUR_SHEET_ID',
  csvUrl: '', // optional: paste the publish-to-web CSV URL instead of spreadsheetId/sheetName
  sheetName: 'News', // or provide range: 'News!A:H'
  query: '', // optional Google Visualization query
  listSeparator: ',',
  paragraphSeparator: 'blankline',
  bodyColumns: null,
  columnMap: { /* only change if headers differ */ }
};
```

Notes:
- Leave `range` blank to read the full tab; alternatively set `range: 'News!A:H'` if you only want a portion of the sheet.
- If your header labels differ (for example `Display Date` with a space), adjust `columnMap.displayDate = 'Display Date'`.
- Set `bodyColumns` to an array (e.g. `['body1', 'body2']`) when your paragraphs live across multiple columns.
- Use `csvUrl` if you prefer to paste the published CSV link (`.../pub?output=csv`). When `csvUrl` is provided, `spreadsheetId`/`sheetName` are ignored.

## 3. Formatting conventions

- `date` and `displayDate` should contain ISO-friendly strings (`2025-03-02`, `02 Mar 2025`). Sorting uses `date`.
- `categories` accepts comma-separated values by default. Change `listSeparator` to `'newline'` if you prefer one category per line.
- `body` supports multi-paragraph content. Separate paragraphs with a blank line, or set `paragraphSeparator: 'linebreak'` to split on every newline, or provide your own delimiter (e.g. `' || '`).
- If `id` is blank, it will be generated from the `title`. Keep them unique for deep links.
- `image` should contain a relative path under `docs/` (e.g. `img/events.jpg`).

## 4. Fallback + local development

- If the spreadsheet is unreachable or not configured, the site automatically falls back to `docs/data/news.json`, so local previews still work offline.
- After editing the config, reload `news.html`/`news-detail.html` in the browser to pull the updated rows.

That’s it—maintain the bulletin board via Google Sheets while preserving the existing UI.
