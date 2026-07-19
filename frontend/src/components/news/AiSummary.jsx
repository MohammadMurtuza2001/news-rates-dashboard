import Spinner from '../ui/Spinner'

function AiSummary({ status, summary, error }) {
  if (status === 'idle') return null

  if (status === 'loading') {
    return (
      <div className="ai-summary ai-summary-loading">
        <Spinner label="Summarizing…" />
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="ai-summary ai-summary-error" role="alert">
        {error ?? 'Could not generate summary.'}
      </div>
    )
  }

  return (
    <div className="ai-summary">
      <p className="ai-summary-label">AI Summary</p>
      <p>{summary}</p>
    </div>
  )
}

export default AiSummary
