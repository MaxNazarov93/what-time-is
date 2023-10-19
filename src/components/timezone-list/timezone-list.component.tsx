import { TimeZone } from '../../types/timezone.type'
import TimeInputComponent from '../time-input/time-input.component'
import useTimeZonesContext from '../../hooks/useTimeZonesContext'

const TimeZoneList = () => {
  const { timeZones } = useTimeZonesContext()

  return (
    <>
      {timeZones?.map((timeZone: TimeZone, i: number) => {
        return <TimeInputComponent key={i} tz={timeZone} />
      })}
    </>
  )
}

export default TimeZoneList
