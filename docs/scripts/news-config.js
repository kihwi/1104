// Configure how the news feed pulls rows from Google Sheets.
//
// 1. Duplicate the "news" sheet template (or create your own) with the headers:
//    id, date, displayDate, title, excerpt, image, categories, body
// 2. File → Share → Publish to web → Entire sheet → Comma-separated values (CSV).
// 3. Overwrite the empty spreadsheetId/sheetName below with your document's values.
// 4. Adjust columnMap names only if your headers differ from the defaults.
// 5. Reload news.html to see Google Sheets content reflected on the site.
window.VIDA_NEWS_SHEET = window.VIDA_NEWS_SHEET || {
  spreadsheetId: '1D7-F0wJzEcWAukbbKcjf-o_yB75tEv_1o80mHQCjZLI', // stays on local JSON when empty
  csvUrl: '', // optional: paste the publish-to-web CSV URL instead of spreadsheetId/sheetName
  sheetName: '시트1', // tab name that contains the news records
  range: '', // optional: A1:H200 style range. Leave empty to read the full sheet.
  query: '', // optional Google Visualization query (e.g. 'select * where A is not null')
  listSeparator: ',', // used to split category text if multiple values live in one cell
  paragraphSeparator: 'blankline', // blankline | linebreak | custom string delimiter
  bodyColumns: null, // optional array of header names if body content spans several columns
  columnMap: {
    id: 'id',
    date: 'date',
    displayDate: 'displayDate',
    title: 'title',
    excerpt: 'excerpt',
    image: 'image',
    categories: 'categories',
    body: 'body'
  }
};
