import { useEffect, useRef, useState } from 'react'

interface Props {
  durationMinutes: number
}

function formatTime(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

export function Timer({ durationMinutes }: Props) {
  const totalSeconds = durationMinutes * 60
  const [remaining, setRemaining] = useState(totalSeconds)
  const [running, setRunning] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (running && remaining > 0) {
      intervalRef.current = setInterval(() => {
        setRemaining((r) => Math.max(0, r - 1))
      }, 1000)
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [running, remaining])

  useEffect(() => {
    if (remaining === 0) setRunning(false)
  }, [remaining])

  return (
    <div className="timer">
      <span className="timer-display">{formatTime(remaining)}</span>
      <div className="timer-buttons">
        {!running && remaining > 0 && (
          <button type="button" onClick={() => setRunning(true)}>
            Starten
          </button>
        )}
        {running && (
          <button type="button" onClick={() => setRunning(false)}>
            Pauzeren
          </button>
        )}
        <button
          type="button"
          onClick={() => {
            setRunning(false)
            setRemaining(totalSeconds)
          }}
        >
          Stoppen
        </button>
        <button
          type="button"
          onClick={() => {
            setRemaining(totalSeconds)
            setRunning(true)
          }}
        >
          Opnieuw starten
        </button>
      </div>
    </div>
  )
}
