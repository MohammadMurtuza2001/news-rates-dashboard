import { useState } from 'react'
import './App.css'
import { useTheme } from './hooks/useTheme'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import MarketSidebar from './components/markets/MarketSidebar'
import NewsFeed from './components/news/NewsFeed'

function App() {
  const { theme, toggleTheme } = useTheme()
  const [refreshKey, setRefreshKey] = useState(0)
  const [lastUpdated, setLastUpdated] = useState(null)

  function handleRefresh() {
    setRefreshKey((key) => key + 1)
  }

  return (
    <div className="app">
      <Header
        theme={theme}
        onToggleTheme={toggleTheme}
        onRefresh={handleRefresh}
        lastUpdated={lastUpdated}
      />
      <main className="dashboard">
        <MarketSidebar refreshKey={refreshKey} onRatesLoaded={setLastUpdated} />
        <NewsFeed refreshKey={refreshKey} />
      </main>
      <Footer />
    </div>
  )
}

export default App
