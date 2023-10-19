import { useContext } from 'react'
import { TimeZonesContext } from '../contexts/time-zones.context'

const useTimeZonesContext = () => useContext(TimeZonesContext)

export default useTimeZonesContext
