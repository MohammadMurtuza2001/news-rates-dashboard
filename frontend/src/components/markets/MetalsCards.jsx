import { useFetch } from '../../hooks/useFetch'
import { fetchMetals } from '../../api/client'
import Spinner from '../ui/Spinner'
import ErrorMessage from '../ui/ErrorMessage'
import MetalCard from './MetalCard'

function MetalsCards({ refreshKey }) {
  const { data, loading, error } = useFetch(fetchMetals, refreshKey)

  if (loading) return <Spinner label="Loading metals…" />
  if (error) return <ErrorMessage message={error} />

  return (
    <div className="metals-grid">
      {data?.map((metal) => (
        <MetalCard
          key={metal.id}
          name={metal.metalname}
          price1Tola={metal.price1Tola}
          price1g={metal.price1g}
        />
      ))}
    </div>
  )
}

export default MetalsCards
