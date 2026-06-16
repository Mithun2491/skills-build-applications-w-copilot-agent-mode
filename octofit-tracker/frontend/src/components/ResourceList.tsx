import { useEffect, useState } from 'react'

interface ResourceListProps {
  apiBaseUrl: string
  resource: string
  title: string
  renderItem: (item: any) => JSX.Element
}

function normalizeResponse(data: unknown): any[] {
  if (Array.isArray(data)) {
    return data
  }

  if (data && typeof data === 'object') {
    const payload = data as Record<string, unknown>
    if (Array.isArray(payload.data)) return payload.data
    if (Array.isArray(payload.results)) return payload.results
    if (Array.isArray(payload.items)) return payload.items
  }

  return []
}

export default function ResourceList({ apiBaseUrl, resource, title, renderItem }: ResourceListProps) {
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    const url = `${apiBaseUrl}/${resource}`

    setLoading(true)
    setError(null)

    fetch(url, { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`${response.status} ${response.statusText}`)
        }

        const data = await response.json()
        setItems(normalizeResponse(data))
      })
      .catch((error) => {
        if (error.name !== 'AbortError') {
          setError(error.message)
        }
      })
      .finally(() => {
        setLoading(false)
      })

    return () => controller.abort()
  }, [apiBaseUrl, resource])

  return (
    <section className="resource-page">
      <header className="resource-header">
        <h2>{title}</h2>
        <p className="resource-note">Fetching data from: <code>{`${apiBaseUrl}/${resource}`}</code></p>
      </header>

      {loading && <p>Loading {title.toLowerCase()}...</p>}
      {error && <p className="error">Failed to load {title.toLowerCase()}: {error}</p>}

      {!loading && !error && items.length === 0 && (
        <p>No {title.toLowerCase()} found.</p>
      )}

      <div className="resource-list">
        {items.map((item) => renderItem(item))}
      </div>
    </section>
  )
}
