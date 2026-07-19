import { useEffect, useState } from 'react'

export function useFetch(fetchFn, dependencyKey) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      setError(null)
      try {
        const result = await fetchFn()
        if (!cancelled) setData(result)
      } catch (err) {
        if (!cancelled) setError(err.message ?? 'Something went wrong')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [dependencyKey, fetchFn])

  return { data, loading, error }
}
