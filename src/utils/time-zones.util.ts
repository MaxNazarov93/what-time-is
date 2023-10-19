import moment from 'moment-timezone'
import { TimeZone } from './../types/timezone.type'

export const getAvailableTimeZones = (): TimeZone[] => {
  return moment.tz
    .names()
    .map((item: string) => new TimeZone(item))
    .sort((a: TimeZone, b: TimeZone) => (a.label > b.label ? 1 : -1))
}
