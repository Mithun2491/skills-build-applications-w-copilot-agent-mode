import ResourceList from './ResourceList'

// API Endpoint: https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities

interface ActivitiesProps {
  apiBaseUrl: string
}

export default function Activities({ apiBaseUrl }: ActivitiesProps) {
  return (
    <ResourceList
      apiBaseUrl={apiBaseUrl}
      resource="activities"
      title="Activities"
      renderItem={(activity) => (
        <article key={activity._id ?? activity.id} className="resource-card">
          <h3>{activity.type ?? 'Activity'}</h3>
          <p>Duration: {activity.durationMinutes ?? 'N/A'} minutes</p>
          <p>Calories: {activity.caloriesBurned ?? 'N/A'}</p>
          <p>User: {activity.userId?.name ?? activity.userId ?? 'Unknown'}</p>
          <p>Date: {new Date(activity.date ?? Date.now()).toLocaleString()}</p>
        </article>
      )}
    />
  )
}
