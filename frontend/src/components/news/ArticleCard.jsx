import { useState } from 'react'
import { summarizeArticle } from '../../api/client'
import { formatDate, sourceToLabel } from '../../utils/format'
import AiSummary from './AiSummary'

function ArticleCard({ article }) {
  const [summaryState, setSummaryState] = useState({
    status: 'idle',
    summary: '',
    error: null,
  })

  async function handleSummarize() {
    setSummaryState({ status: 'loading', summary: '', error: null })
    try {
      const result = await summarizeArticle(article.id)
      setSummaryState({ status: 'done', summary: result.summary, error: null })
    } catch (err) {
      setSummaryState({
        status: 'error',
        summary: '',
        error: err.message ?? 'Summarization failed',
      })
    }
  }

  const badge = sourceToLabel(article.source)

  return (
    <article className="article-card panel">
      <div className="article-card-header">
        <span className="category-badge">{badge}</span>
      </div>
      <h3>
        <a href={article.link} target="_blank" rel="noopener noreferrer">
          {article.title}
        </a>
      </h3>
      <p className="article-summary">{article.summary}</p>
      <p className="article-meta">
        {article.source} · {formatDate(article.published)}
      </p>
      <button
        type="button"
        className="btn btn-primary"
        onClick={handleSummarize}
        disabled={summaryState.status === 'loading'}
      >
        {summaryState.status === 'done' ? 'Re-summarize' : 'Summarize'}
      </button>
      <AiSummary
        status={summaryState.status}
        summary={summaryState.summary}
        error={summaryState.error}
      />
    </article>
  )
}

export default ArticleCard
