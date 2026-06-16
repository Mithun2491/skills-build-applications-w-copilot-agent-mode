import ResourceList from './ResourceList'

// API Endpoint: https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/users

interface UsersProps {
  apiBaseUrl: string
}

export default function Users({ apiBaseUrl }: UsersProps) {
  return (
    <ResourceList
      apiBaseUrl={apiBaseUrl}
      resource="users"
      title="Users"
      renderItem={(user) => (
        <article key={user._id ?? user.id ?? user.email} className="resource-card">
          <h3>{user.name ?? 'Unknown user'}</h3>
          <p>{user.email}</p>
          <p>Roles: {(user.roles ?? []).join(', ')}</p>
        </article>
      )}
    />
  )
}
