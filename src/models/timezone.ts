import moment from 'moment-timezone';

function pad(num: number, size: number) {
  let numS = num.toString();
  while (numS.length < size) numS = "0" + numS;
  return numS;
}

export class TimeZone {
  label: string
  value: string
  offset: string

  constructor(tz: string) {
    let utcOffset = moment().tz(tz).utcOffset()
    let sign = utcOffset > 0 ? '+' : '-'
    let h = pad(Math.abs(utcOffset / 60), 2)
    let m = pad(utcOffset % 60, 2)
    let offset = `${sign}${h}:${m}`

    this.label = tz.split('/').pop()?.replaceAll('_', ' ') || ''
    this.value = tz
    this.offset = offset
  }
}
