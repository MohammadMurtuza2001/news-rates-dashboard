function Spinner({ label = 'Loading…' }) {
  return (
    <div className="spinner" role="status" aria-live="polite">
      <span className="spinner-icon" aria-hidden="true" />
      <span>{label}</span>
    </div>
  )
}

export default Spinner
