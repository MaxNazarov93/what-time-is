import { createContext } from 'react'
import { TimeZonesContext as TimeZonesContextType } from '../types/timezone.type'

export const TimeZonesContext = createContext<TimeZonesContextType>({} as TimeZonesContextType)
