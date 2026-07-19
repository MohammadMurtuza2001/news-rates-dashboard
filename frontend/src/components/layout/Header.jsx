import ThemeToggle from '../ui/ThemeToggle'
import RefreshButton from '../ui/RefreshButton'
import { formatDate } from '../../utils/format'

function Header({ theme, onToggleTheme, onRefresh, lastUpdated }) {
  return (
    <header className="header panel">
      <div className="header-main">
        <div>
          <h1 className="app-title">News &amp; Rates</h1>
          {lastUpdated && (
            <p className="last-updated">Last updated: {formatDate(lastUpdated)}</p>
          )}
        </div>
        <div className="header-actions">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <RefreshButton onRefreshed={onRefresh} />
        </div>
      </div>
    </header>
  )
}

export default Header
