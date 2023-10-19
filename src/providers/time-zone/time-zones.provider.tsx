import moment, { Moment } from 'moment-timezone'
import { PropsWithChildren, useEffect, useState } from 'react'
import { TimeZonesContext } from '../../contexts/time-zones.context'
import { TimeZone } from '../../types/timezone.type'

const LOCALSTORAGE_FAVOURITES_KEY = 'favourites'

const TimeZonesProvider = ({ children }: PropsWithChildren) => {
  const [timeZones, setTimeZones] = useState<TimeZone[]>([])
  const [utcTime, setUtcTime] = useState<Moment>(moment().tz('UTC'))

  const addTimeZone = (timeZone: TimeZone) => {
    setTimeZones((previousState: TimeZone[]) => {
      if (
        previousState.find(
          (value) => timeZone.label == value.label && timeZone.value === value.value,
        )
      ) {
        console.log(`${timeZone.label} already in the list`)

        return previousState
      }

      previousState.push(timeZone)
      localStorage.setItem(LOCALSTORAGE_FAVOURITES_KEY, JSON.stringify(previousState))

      return previousState
    })
  }

  const deleteTimeZone = (timeZone: TimeZone) => {
    setTimeZones((previousState: TimeZone[]) => {
      const index = previousState.findIndex(
        (value) => timeZone.label == value.label && timeZone.value == value.value,
      )
      if (index !== -1) {
        previousState = [...previousState.slice(0, index), ...previousState.slice(index + 1)]
      }

      localStorage.setItem(LOCALSTORAGE_FAVOURITES_KEY, JSON.stringify(previousState))

      return previousState
    })
  }

  const changeTimeZone = (oldTimeZone: TimeZone, newTimeZone: TimeZone) => {
    setTimeZones((previousState: TimeZone[]) => {
      const index = previousState.findIndex(
        (value) => oldTimeZone.label == value.label && oldTimeZone.value == value.value,
      )
      if (index !== -1) {
        previousState = [
          ...previousState.slice(0, index),
          newTimeZone,
          ...previousState.slice(index + 1),
        ]
      }

      localStorage.setItem(LOCALSTORAGE_FAVOURITES_KEY, JSON.stringify(previousState))

      return previousState
    })
  }

  useEffect(() => {
    console.log(utcTime)
    const data: string | null = localStorage.getItem(LOCALSTORAGE_FAVOURITES_KEY)
    if (!data) {
      setTimeZones([new TimeZone(moment.tz.guess())])

      return
    }

    setTimeZones((JSON.parse(data) as TimeZone[]) || [new TimeZone(moment.tz.guess())])
  }, [])

  return (
    <TimeZonesContext.Provider
      value={{
        utcTime,
        setUtcTime,
        timeZones,
        addTimeZone,
        changeTimeZone,
        deleteTimeZone,
      }}>
      {children}
    </TimeZonesContext.Provider>
  )
}

export default TimeZonesProvider
