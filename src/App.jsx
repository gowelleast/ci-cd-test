import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const refreshInterval = 1000 // lint 이슈: no-unused-vars (시연용)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (date) => {
    return date.toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
  }

  return (
    <div className="app">
      <h1>CI/CD Test</h1>
      <p>이 프로젝트는 GitHub Actions CI/CD 파이프라인을 테스트하기 위한 페이지입니다.</p>
      <p>🚀 자동 배포 테스트 - main에 push하면 바로 배포됩니다!</p>
      <p>🕐 현재 시각: {formatTime(currentTime)}</p>
    </div>
  )
}

export default App
