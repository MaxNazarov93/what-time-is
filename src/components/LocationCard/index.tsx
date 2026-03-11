import { useRef, useState } from 'react'
import { MapPin, Trash2 } from 'lucide-react'
import type { Location } from '../../types'
import { formatTime, formatDay, getTimezoneOffset, getDayPhaseParams } from '../../utils'
import { SWIPE_THRESHOLD } from '../../constants'
import { TimeDisplay } from './TimeDisplay'
import { TimeSlider } from './TimeSlider'

interface LocationCardProps {
  data: Location
  referenceDate: Date
  onTimeChange: (minutes: number, timezone: string) => void
  onRemove: () => void
  isManageMode: boolean
}

export function LocationCard({
  data,
  referenceDate,
  onTimeChange,
  onRemove,
  isManageMode,
}: LocationCardProps) {
  const [swipeOffset, setSwipeOffset] = useState(0)
  const [isSwiping, setIsSwiping] = useState(false)
  const touchStartX = useRef<number | null>(null)

  const dateStr = referenceDate.toLocaleString('en-US', { timeZone: data.timezone, hour12: false })
  const localDate = new Date(dateStr)
  const hours = localDate.getHours()
  const minutes = localDate.getMinutes()
  const totalMinutes = hours * 60 + minutes

  const displayTime = formatTime(referenceDate, data.timezone)
  const displayDay = formatDay(referenceDate, data.timezone)
  const displayOffset = getTimezoneOffset(data.timezone)
  const dayPhase = getDayPhaseParams(hours)
  const cardBg = hours >= 6 && hours < 18 ? 'bg-[#353041]' : 'bg-[#1E1B26]'

  const handleTouchStart = (e: React.TouchEvent) => {
    if (data.isCurrentLocation || isManageMode) return
    if ((e.target as HTMLElement).tagName === 'INPUT') return
    touchStartX.current = e.touches[0].clientX
    setIsSwiping(true)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartX.current) return
    const diff = e.touches[0].clientX - touchStartX.current
    if (diff < 0) setSwipeOffset(diff)
  }

  const handleTouchEnd = () => {
    if (!touchStartX.current) return
    if (swipeOffset < -SWIPE_THRESHOLD) {
      setSwipeOffset(-500)
      setTimeout(onRemove, 200)
    } else {
      setSwipeOffset(0)
    }
    touchStartX.current = null
    setIsSwiping(false)
  }

  return (
    <div className='relative overflow-hidden rounded-[1.8rem] shadow-md select-none h-full'>
      {!data.isCurrentLocation && (
        <div className='absolute inset-0 bg-red-900/80 flex items-center justify-end pr-8'>
          <Trash2 className='text-white' size={28} />
        </div>
      )}

      <div
        className={`relative group transition-colors duration-300 ${cardBg} rounded-[1.8rem] overflow-hidden border border-white/5 ${isSwiping ? '' : 'transition-transform duration-300 ease-out'}`}
        style={{ transform: `translateX(${swipeOffset}px)` }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}>
        <div className='p-5 pr-10 flex flex-col gap-4'>
          <div className='flex justify-between items-start'>
            <div>
              <div className='flex items-center gap-2 mb-1'>
                {data.isCurrentLocation && <MapPin size={12} className='text-[#D0BCFF]' />}
                <h3 className='text-xl font-medium tracking-wide text-[#E6E1E5]'>{data.label}</h3>
              </div>
              <div className='flex items-center gap-3 text-sm font-medium text-[#CAC4D0] opacity-80'>
                <span>{displayDay}</span>
                <span className='w-1 h-1 bg-white/30 rounded-full' />
                <span>{displayOffset}</span>
              </div>
            </div>

            <div className='text-right'>
              <TimeDisplay
                displayTime={displayTime}
                timezone={data.timezone}
                isSliding={false}
                onCommit={onTimeChange}
              />
            </div>
          </div>

          <TimeSlider
            totalMinutes={totalMinutes}
            dayPhase={dayPhase}
            timezone={data.timezone}
            onTimeChange={onTimeChange}
          />
        </div>

        {!data.isCurrentLocation && (
          <button
            onClick={onRemove}
            className={`absolute top-4 right-4 p-2 rounded-full transition-all duration-300 ${isManageMode ? 'opacity-100 translate-x-0 bg-[#332D41] text-[#F2B8B5]' : 'opacity-0 translate-x-4 pointer-events-none'}`}>
            <Trash2 size={18} />
          </button>
        )}
      </div>
    </div>
  )
}
