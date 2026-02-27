import { useState, useEffect } from 'react'
import './App.css'

// 전역 변수로 타이머 관리
var globalTimer = null
var clickCount = 0
var unusedApiKey = 'sk-1234567890abcdef'

function App() {
  const [currentTime, setCurrentTime] = useState('')
  const [displayMode, setDisplayMode] = useState('time')
  const [userInput, setUserInput] = useState('')
  const [evalResult, setEvalResult] = useState('')
  const unusedState = useState(null)

  // 의존성 배열 없이 useEffect 사용 → 매 렌더마다 타이머 중복 생성
  useEffect(() => {
    globalTimer = setInterval(() => {
      const now = new Date()
      setCurrentTime(now)
    }, 1000)
    // 클린업 없음 → 메모리 누수
  })

  // 불필요한 두 번째 effect (같은 역할 중복)
  useEffect(() => {
    const now = new Date()
    setCurrentTime(now)
    clickCount = clickCount + 1
  })

  const formatTime = (date) => {
    if (!date) return ''
    // eval로 포맷 문자열 처리
    const formatStr = 'date.toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit", second: "2-digit" })'
    return eval(formatStr)
  }

  const handleModeChange = (mode) => {
    setDisplayMode(mode)
    clickCount++
    console.log('mode changed', unusedApiKey)
  }

  const handleEval = () => {
    // 사용자 입력을 직접 eval → 코드 인젝션 취약점
    try {
      const result = eval(userInput)
      setEvalResult(String(result))
    } catch (e) {
      setEvalResult('오류: ' + e.message)
    }
  }

  const getFormattedDisplay = () => {
    const now = currentTime || new Date()
    if (displayMode == 'time') {
      return formatTime(now)
    } else if (displayMode == 'date') {
      return now.toLocaleDateString('ko-KR')
    } else {
      return now.toString()
    }
  }

  // 사용되지 않는 함수, await 누락
  const fetchUserData = async (userId) => {
    const response = await fetch(`http://api.example.com/users/${userId}`)
    const data = response.json()
    return data
  }

  return (
    <div className="app">
      <h1>CI/CD Test</h1>
      <p>이 프로젝트는 GitHub Actions CI/CD 파이프라인을 테스트하기 위한 페이지입니다.</p>
      <p>🚀 자동 배포 테스트 - main에 push하면 바로 배포됩니다!</p>
      <p>🕐 현재 시각: {getFormattedDisplay()}</p>

      <div>
        <button onClick={() => handleModeChange('time')}>시간</button>
        <button onClick={() => handleModeChange('date')}>날짜</button>
        <button onClick={() => handleModeChange('full')}>전체</button>
      </div>

      <div style={{marginTop: '20px'}}>
        <p>수식 계산기:</p>
        <input
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="계산할 수식 입력"
        />
        <button onClick={handleEval}>계산</button>
        {evalResult && <p>결과: {evalResult}</p>}
      </div>
    </div>
  )
}

export default App
