import ResourceList from './ResourceList'

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
