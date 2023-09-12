export interface Option {
  label: string
  value: string
}

export const getTimeZoneOption = (tz: string): Option => { return {
  label: tz.split('/').pop()?.replaceAll('_', ' ') || '',
  value: tz,
} }