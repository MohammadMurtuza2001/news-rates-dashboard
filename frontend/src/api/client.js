const BASE = import.meta.env.VITE_API_URL ?? 'http://127.0.0.1:8000'

async function request(path, options = {}) {
  const response = await fetch(`${BASE}${path}`, options)
  if (!response.ok) {
    let message = `Request failed (${response.status})`
    try {
      const body = await response.json()
      if (body.detail) {
        message = typeof body.detail === 'string' ? body.detail : JSON.stringify(body.detail)
      }
    } catch {
      /* ignore parse errors */
    }
    throw new Error(message)
  }
  return response.json()
}

export function fetchNews(category = 'latest') {
  return request(`/news?category=${encodeURIComponent(category)}`)
}

export function fetchNewsCategories() {
  return request('/news/categories')
}

export function fetchCurrency() {
  return request('/currency')
}

export function fetchMetals() {
  return request('/metals')
}

export function refreshData() {
  return request('/refresh', { method: 'POST' })
}

export function summarizeArticle(articleId) {
  return request(`/news/${articleId}/summarize`, { method: 'POST' })
}
