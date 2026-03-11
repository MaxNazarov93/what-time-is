import { useState, useEffect } from 'react'

export function useClock() {
  const [currentTime, setCurrentTime] = useState<Date>(new Date())
  const [isLive, setIsLive] = useState<boolean>(true)

  useEffect(() => {
    if (!isLive) return
    const interval = setInterval(() => setCurrentTime(new Date()), 1000)

    return () => clearInterval(interval)
  }, [isLive])

  const scrubTime = (newMinutes: number, timezoneOfCard: string): void => {
    setIsLive(false)

    const now = new Date()
    const dateInTargetZone = new Date(now.toLocaleString('en-US', { timeZone: timezoneOfCard }))

    dateInTargetZone.setHours(Math.floor(newMinutes / 60))
    dateInTargetZone.setMinutes(newMinutes % 60)
    dateInTargetZone.setSeconds(0)

    const targetTimestamp = dateInTargetZone.getTime()
    let estimatedDate = new Date(targetTimestamp)

    // Refinement loop to reverse timezone offset
    for (let i = 0; i < 2; i++) {
      const checkStr = estimatedDate.toLocaleString('en-US', { timeZone: timezoneOfCard })
      const checkDate = new Date(checkStr)
      const diff = targetTimestamp - checkDate.getTime()
      estimatedDate = new Date(estimatedDate.getTime() + diff)
    }

    setCurrentTime(estimatedDate)
  }

  const resetToNow = (): void => {
    setIsLive(true)
    setCurrentTime(new Date())
  }

  return { currentTime, isLive, scrubTime, resetToNow }
}
