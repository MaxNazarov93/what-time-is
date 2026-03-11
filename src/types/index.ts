import type { LucideIcon } from 'lucide-react'

export interface City {
  id: string
  label: string
  timezone: string
  country?: string
}

export interface Location extends City {
  isCurrentLocation?: boolean
}

export interface DayPhase {
  label: 'Morning' | 'Day' | 'Evening' | 'Night'
  icon: LucideIcon
  gradient: string
  shadow: string
}
