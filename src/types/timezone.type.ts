import moment, { Moment } from 'moment-timezone'

const pad = (num: number, size: number) => {
  let numS = num.toString()
  while (numS.length < size) numS = '0' + numS

  return numS
}

export class TimeZone {
  label: string
  value: string
  offset: string

  constructor(tz: string) {
    const utcOffset = moment().tz(tz).utcOffset()
    const sign = utcOffset > 0 ? '+' : '-'
    const h = pad(Math.abs(utcOffset / 60), 2)
    const m = pad(utcOffset % 60, 2)
    const offset = `${sign}${h}:${m}`

    this.label = tz.split('/').pop()?.replaceAll('_', ' ') || ''
    this.value = tz
    this.offset = offset
  }

  isEqual = (otherTZ: TimeZone): boolean => {
    return this.label == otherTZ.label && this.value == otherTZ.value
  }
}

export type TimeZonesContext = {
  utcTime: Moment
  setUtcTime: (_time: Moment) => void
  timeZones: TimeZone[]
  addTimeZone: (_timeZone: TimeZone) => void
  changeTimeZone: (_oldTimeZone: TimeZone, _timeZone: TimeZone) => void
  deleteTimeZone: (_timeZone: TimeZone) => void
}
