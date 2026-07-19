import { useState } from 'react'
import { refreshData } from '../../api/client'

function RefreshButton({ onRefreshed }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function handleRefresh() {
    setLoading(true)
    setError(null)
    try {
      await refreshData()
      onRefreshed?.()
    } catch (err) {
      setError(err.message ?? 'Refresh failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="refresh-wrap">
      <button
        type="button"
        className="btn btn-secondary"
        onClick={handleRefresh}
        disabled={loading}
      >
        {loading ? 'Refreshing…' : 'Refresh'}
      </button>
      {error && <span className="refresh-error">{error}</span>}
    </div>
  )
}

export default RefreshButton
