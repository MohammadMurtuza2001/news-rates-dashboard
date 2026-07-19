import { useEffect } from 'react'
import { useFetch } from '../../hooks/useFetch'
import { fetchCurrency } from '../../api/client'
import { formatRate } from '../../utils/format'
import Spinner from '../ui/Spinner'
import ErrorMessage from '../ui/ErrorMessage'

function CurrencyTable({ refreshKey, onLoaded }) {
  const { data, loading, error } = useFetch(fetchCurrency, refreshKey)

  useEffect(() => {
    if (data?.[0]?.fetched_at) onLoaded?.(data[0].fetched_at)
  }, [data, onLoaded])

  if (loading) return <Spinner label="Loading rates…" />
  if (error) return <ErrorMessage message={error} />
  if (!data?.length) return <p className="empty-state">No currency data available.</p>

  const sorted = [...data].sort((a, b) => a.pairs.localeCompare(b.pairs))

  return (
    <div className="table-wrap">
      <table className="data-table">
        <thead>
          <tr>
            <th>Pair</th>
            <th>Rate (PKR)</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((row) => (
            <tr key={row.id}>
              <td>{row.pairs}</td>
              <td>{formatRate(row.rate)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CurrencyTable
