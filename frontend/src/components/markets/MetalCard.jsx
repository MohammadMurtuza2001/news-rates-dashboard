import { formatPrice } from '../../utils/format'

function MetalCard({ name, price1Tola, price1g }) {
  const accentClass = name === 'Gold' ? 'metal-gold' : 'metal-silver'

  return (
    <article className={`metal-card ${accentClass}`}>
      <h3>{name}</h3>
      <dl>
        <div>
          <dt>Per tola</dt>
          <dd>PKR {formatPrice(price1Tola)}</dd>
        </div>
        <div>
          <dt>Per gram</dt>
          <dd>PKR {formatPrice(price1g)}</dd>
        </div>
      </dl>
    </article>
  )
}

export default MetalCard
