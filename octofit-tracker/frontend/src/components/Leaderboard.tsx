import ResourceList from './ResourceList'

// API Endpoint: https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard

interface LeaderboardProps {
  apiBaseUrl: string
}

export default function Leaderboard({ apiBaseUrl }: LeaderboardProps) {
  return (
    <ResourceList
      apiBaseUrl={apiBaseUrl}
      resource="leaderboard"
      title="Leaderboard"
      renderItem={(entry) => (
        <article key={entry._id ?? entry.id} className="resource-card">
          <h3>Rank {entry.rank ?? 'N/A'}</h3>
          <p>Score: {entry.score ?? 'N/A'}</p>
          <p>User: {entry.userId?.name ?? entry.userId ?? 'Unknown'}</p>
        </article>
      )}
    />
  )
}
