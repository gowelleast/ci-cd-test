import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [displayMode, setDisplayMode] = useState('time')
  const [userInput, setUserInput] = useState('')
  const [evalResult, setEvalResult] = useState('')

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

  const handleModeChange = (mode) => {
    setDisplayMode(mode)
  }

  const handleCalculate = () => {
    try {
      const sanitized = userInput.replace(/[^0-9+\-*/().\s]/g, '')
      if (sanitized !== userInput) {
        setEvalResult('오류: 숫자와 연산자만 입력 가능합니다')
        return
      }
      const result = Function('"use strict"; return (' + sanitized + ')')()
      setEvalResult(String(result))
    } catch (e) {
      setEvalResult('오류: ' + e.message)
    }
  }

  const getFormattedDisplay = () => {
    if (displayMode === 'time') {
      return formatTime(currentTime)
    } else if (displayMode === 'date') {
      return currentTime.toLocaleDateString('ko-KR')
    } else {
      return currentTime.toString()
    }
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
          placeholder="계산할 수식 입력 (예: 1+2*3)"
        />
        <button onClick={handleCalculate}>계산</button>
        {evalResult && <p>결과: {evalResult}</p>}
      </div>
    </div>
  )
}

export default App
