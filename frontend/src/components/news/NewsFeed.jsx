import { useCallback, useEffect, useState } from 'react'
import { useFetch } from '../../hooks/useFetch'
import { fetchNews, fetchNewsCategories } from '../../api/client'
import { CATEGORIES } from '../../utils/categories'
import CategoryDropdown from './CategoryDropdown'
import ArticleCard from './ArticleCard'
import Spinner from '../ui/Spinner'
import ErrorMessage from '../ui/ErrorMessage'

function NewsFeed({ refreshKey }) {
  const [category, setCategory] = useState('latest')
  const [categories, setCategories] = useState(CATEGORIES)

  useEffect(() => {
    let cancelled = false

    fetchNewsCategories()
      .then((slugs) => {
        if (!cancelled && Array.isArray(slugs) && slugs.length > 0) {
          setCategories(slugs.map((c) => ({ value: c.slug, label: c.label })))
        }
      })
      .catch(() => {
        // API unreachable — keep the static fallback list from categories.js
      })

    return () => {
      cancelled = true
    }
  }, [])

  const loadNews = useCallback(() => fetchNews(category), [category])
  const { data, loading, error } = useFetch(loadNews, `${category}-${refreshKey}`)

  return (
    <section className="news-feed panel">
      <div className="news-feed-header">
        <h2 className="panel-title">News Feed</h2>
        <CategoryDropdown value={category} onChange={setCategory} categories={categories} />
      </div>

      {loading && <Spinner label="Loading news…" />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && !data?.length && (
        <p className="empty-state">No articles in this category — try Refresh.</p>
      )}
      {!loading && !error && data?.length > 0 && (
        <div className="article-list">
          {data.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </section>
  )
}

export default NewsFeed
