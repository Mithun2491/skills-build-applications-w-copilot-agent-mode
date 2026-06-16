import ResourceList from './ResourceList'

// API Endpoint: https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts

interface WorkoutsProps {
  apiBaseUrl: string
}

export default function Workouts({ apiBaseUrl }: WorkoutsProps) {
  return (
    <ResourceList
      apiBaseUrl={apiBaseUrl}
      resource="workouts"
      title="Workouts"
      renderItem={(workout) => (
        <article key={workout._id ?? workout.id} className="resource-card">
          <h3>{workout.name ?? 'Workout'}</h3>
          <p>{workout.description ?? 'No description provided.'}</p>
          <p>Difficulty: {workout.difficulty ?? 'Unknown'}</p>
          <p>Duration: {workout.durationMinutes ?? 'N/A'} minutes</p>
          <p>Tags: {(workout.tags ?? []).join(', ')}</p>
        </article>
      )}
    />
  )
}
