import type { Location } from '../types'

export const DEFAULT_LOCATION: Location = {
  id: 'current',
  label: 'Current Location',
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  isCurrentLocation: true,
}

export const SWIPE_THRESHOLD = 150
export const STORAGE_KEY = 'worldClockLocations'
