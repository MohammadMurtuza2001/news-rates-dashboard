// Fallback list, used if GET /news/categories can't be reached.
// The dropdown should normally be populated from that endpoint
// (see fetchNewsCategories in api/client.js) so new sources added to
// config/news_sources.py show up automatically without editing this file.
export const CATEGORIES = [
  { value: 'latest', label: 'Tribune Latest' },
  { value: 'pakistan', label: 'Tribune Pakistan' },
  { value: 'world', label: 'Tribune World' },
  { value: 'games', label: 'Tribune Games' },
  { value: 'geo-pakistan', label: 'Geo News Pakistan' },
  { value: 'geo-world', label: 'Geo News World' },
  { value: 'jang-tech', label: 'Jang Tech' },
  { value: 'ign-tech', label: 'IGN Tech' },
  { value: 'ign-games', label: 'IGN Games' },
  { value: 'ign-movies', label: 'IGN Movies' },
  { value: 'theverge-games', label: 'TheVerge Games' },
  { value: 'theverge-ai', label: 'TheVerge AI' },
]
