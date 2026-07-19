import MetalsCards from './MetalsCards'
import CurrencyTable from './CurrencyTable'

function MarketSidebar({ refreshKey, onRatesLoaded }) {
  return (
    <aside className="market-sidebar">
      <section className="panel">
        <h2 className="panel-title">Gold &amp; Silver</h2>
        <MetalsCards refreshKey={refreshKey} />
      </section>
      <section className="panel">
        <h2 className="panel-title">Exchange Rates</h2>
        <CurrencyTable refreshKey={refreshKey} onLoaded={onRatesLoaded} />
      </section>
    </aside>
  )
}

export default MarketSidebar
