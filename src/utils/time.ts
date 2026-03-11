import { Sunrise, Sun, Sunset, Moon } from 'lucide-react'
import type { DayPhase } from '../types'

export function formatTime(date: Date, timezone: string): string {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: false,
    timeZone: timezone,
  }).format(date)
}

export function formatDay(date: Date, timezone: string): string {
  const formatter = new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    timeZone: timezone,
  })

  const today = new Date()
  const dateStr = formatter.format(date)

  const d1 = new Date(date.toLocaleString('en-US', { timeZone: timezone }))
  const d2 = new Date(today.toLocaleString('en-US', { timeZone: timezone }))

  const diffTime = d1.setHours(0, 0, 0, 0) - d2.setHours(0, 0, 0, 0)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Next Day'
  if (diffDays === -1) return 'Previous Day'

  return dateStr
}

export function getTimezoneOffset(timezone: string): string {
  const now = new Date()
  const iso = now.toLocaleString('en-US', { timeZone: timezone, timeZoneName: 'shortOffset' })
  const offset = iso.split(' ').pop() ?? 'UTC'

  return offset.replace('GMT', 'UTC')
}

export function getDayPhaseParams(hours: number): DayPhase {
  if (hours >= 5 && hours < 11)
    return {
      label: 'Morning',
      icon: Sunrise,
      gradient: 'linear-gradient(90deg, #4b6cb7 0%, #FDC830 100%)',
      shadow: 'shadow-orange-500/50',
    }
  if (hours >= 11 && hours < 16)
    return {
      label: 'Day',
      icon: Sun,
      gradient: 'linear-gradient(90deg, #2980B9 0%, #6DD5FA 100%)',
      shadow: 'shadow-blue-500/50',
    }
  if (hours >= 16 && hours < 20)
    return {
      label: 'Evening',
      icon: Sunset,
      gradient: 'linear-gradient(90deg, #ff9966 0%, #ff5e62 100%)',
      shadow: 'shadow-red-500/50',
    }

  return {
    label: 'Night',
    icon: Moon,
    gradient: 'linear-gradient(90deg, #232526 0%, #414345 100%)',
    shadow: 'shadow-purple-900/50',
  }
}
