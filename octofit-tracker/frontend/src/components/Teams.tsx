import ResourceList from './ResourceList'

// API Endpoint: https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams

interface TeamsProps {
  apiBaseUrl: string
}

export default function Teams({ apiBaseUrl }: TeamsProps) {
  return (
    <ResourceList
      apiBaseUrl={apiBaseUrl}
      resource="teams"
      title="Teams"
      renderItem={(team) => (
        <article key={team._id ?? team.id} className="resource-card">
          <h3>{team.name ?? 'Team'}</h3>
          <p>{team.description ?? 'No description provided.'}</p>
          <p>Members: {(team.members ?? []).map((member: any) => member.name ?? member).join(', ')}</p>
        </article>
      )}
    />
  )
}
