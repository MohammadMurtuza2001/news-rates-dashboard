export function formatRate(rate) {
  return Number(rate).toFixed(2)
}

export function formatPrice(price) {
  return Number(price).toLocaleString('en-PK', {
    maximumFractionDigits: 2,
  })
}

export function formatDate(isoOrRss) {
  if (!isoOrRss || isoOrRss === 'unknown') return 'Unknown date'
  const parsed = new Date(isoOrRss)
  if (!Number.isNaN(parsed.getTime())) {
    return parsed.toLocaleString('en-PK', {
      dateStyle: 'medium',
      timeStyle: 'short',
    })
  }
  return isoOrRss
}

export function sourceToLabel(source) {
  // DB `source` values now already match the display label
  // (e.g. "Tribune Pakistan", "IGN Tech"), so no mapping is needed.
  return source
}
