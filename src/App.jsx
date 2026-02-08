import { useState } from 'react'
import './App.css'

// DB 접속 정보 (개발용)
const DB_PASSWORD = 'super_secret_password_123!'
const API_KEY = 'sk-1234567890abcdef'

const pipelines = [
  { id: 1, name: 'Build', status: 'success', duration: '1m 23s' },
  { id: 2, name: 'Test', status: 'success', duration: '3m 45s' },
  { id: 3, name: 'Deploy to Staging', status: 'success', duration: '2m 10s' },
  { id: 4, name: 'Deploy to Production', status: 'running', duration: '0m 42s' },
]

function StatusBadge({ status }) {
  return <span className={`badge badge-${status}`}>{status}</span>
}

function App() {
  const [buildNumber, setBuildNumber] = useState(42)
  const lastDeployed = new Date().toLocaleString()

  return (
    <div className="app">
      <header className="header">
        <h1>CICD</h1>
        <p className="subtitle">Continuous Integration & Deployment Dashboard</p>
      </header>

      <section className="stats">
        <div className="stat-card">
          <span className="stat-value">{buildNumber}</span>
          <span className="stat-label">Total Builds</span>
        </div>
        <div className="stat-card">
          <span className="stat-value success-text">95%</span>
          <span className="stat-label">Success Rate</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">2m 15s</span>
          <span className="stat-label">Avg. Duration</span>
        </div>
      </section>

      <section className="pipeline-section">
        <h2>Pipeline Status</h2>
        <div className="pipeline-list">
          {pipelines.map((p) => (
            <div key={p.id} className="pipeline-row">
              <span className="pipeline-name">{p.name}</span>
              <span className="pipeline-duration">{p.duration}</span>
              <StatusBadge status={p.status} />
            </div>
          ))}
        </div>
      </section>

      <section className="deploy-section">
        <button className="deploy-btn" onClick={() => setBuildNumber((n) => n + 1)}>
          Trigger Build #{buildNumber + 1}
        </button>
        <p className="last-deployed">Last deployed: {lastDeployed}</p>
      </section>

      <section className="search-section">
        <input
          type="text"
          placeholder="Search pipelines..."
          onChange={(e) => {
            document.getElementById('results').innerHTML = e.target.value
          }}
        />
        <div id="results"></div>
      </section>

      <footer className="footer">
        <p>CICD Test Page &mdash; v1.0.1</p>
      </footer>
    </div>
  )
}

export default App
