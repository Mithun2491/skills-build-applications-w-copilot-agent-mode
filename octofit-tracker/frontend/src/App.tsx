import { NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'
import './App.css'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const apiHost = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'
const apiBaseUrl = `${apiHost}/api`

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <h1>OctoFit Tracker</h1>
          <p>
            Multi-tier React frontend with Codespaces-aware backend routing.
          </p>
        </div>
        <nav className="app-nav">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/users">Users</NavLink>
          <NavLink to="/activities">Activities</NavLink>
          <NavLink to="/workouts">Workouts</NavLink>
          <NavLink to="/teams">Teams</NavLink>
          <NavLink to="/leaderboard">Leaderboard</NavLink>
        </nav>
      </header>

      <section className="app-notice">
        <p>
          Your frontend uses <code>VITE_CODESPACE_NAME</code> to build backend URLs.
          Define it in <code>.env.local</code> when running in Codespaces.
        </p>
        <p>
          Example: <code>VITE_CODESPACE_NAME=your-codespace-name</code>
        </p>
        <p>
          Current API base: <code>{apiBaseUrl}</code>
        </p>
      </section>

      <main className="app-main">
        <Routes>
          <Route
            path="/"
            element={
              <div className="home-page">
                <h2>Welcome to OctoFit Tracker</h2>
                <p>
                  Choose one of the top-level sections to browse sample backend
                  data.
                </p>
                <ul>
                  <li>
                    <NavLink to="/users">Users</NavLink>
                  </li>
                  <li>
                    <NavLink to="/activities">Activities</NavLink>
                  </li>
                  <li>
                    <NavLink to="/workouts">Workouts</NavLink>
                  </li>
                  <li>
                    <NavLink to="/teams">Teams</NavLink>
                  </li>
                  <li>
                    <NavLink to="/leaderboard">Leaderboard</NavLink>
                  </li>
                </ul>
              </div>
            }
          />
          <Route path="/users" element={<Users apiBaseUrl={apiBaseUrl} />} />
          <Route path="/activities" element={<Activities apiBaseUrl={apiBaseUrl} />} />
          <Route path="/workouts" element={<Workouts apiBaseUrl={apiBaseUrl} />} />
          <Route path="/teams" element={<Teams apiBaseUrl={apiBaseUrl} />} />
          <Route path="/leaderboard" element={<Leaderboard apiBaseUrl={apiBaseUrl} />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
