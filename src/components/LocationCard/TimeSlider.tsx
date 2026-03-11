import { useState } from 'react'
import type { DayPhase } from '../../types'

interface TimeSliderProps {
  totalMinutes: number
  dayPhase: DayPhase
  timezone: string
  onTimeChange: (minutes: number, timezone: string) => void
}

export function TimeSlider({ totalMinutes, dayPhase, timezone, onTimeChange }: TimeSliderProps) {
  const [isSliding, setIsSliding] = useState(false)
  const PhaseIcon = dayPhase.icon
  const progress = (totalMinutes / 1439) * 100

  return (
    <div className='pt-2'>
      <div className='relative h-12 flex items-center'>
        {/* Floating phase label */}
        <div
          className={`absolute -top-6 transform -translate-x-1/2 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-widest text-[#121212] bg-[#E3E2E6] transition-all duration-300 ease-out z-30 pointer-events-none ${isSliding ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
          style={{ left: `${progress}%` }}>
          {dayPhase.label}
        </div>

        {/* Invisible range input on top */}
        <input
          type='range'
          min='0'
          max='1439'
          value={totalMinutes}
          step='15'
          onChange={(e) => onTimeChange(Number(e.target.value), timezone)}
          onMouseDown={() => setIsSliding(true)}
          onMouseUp={() => setIsSliding(false)}
          onTouchStart={() => setIsSliding(true)}
          onTouchEnd={() => setIsSliding(false)}
          className='w-full h-12 opacity-0 absolute z-20 cursor-pointer'
        />

        {/* Visual track */}
        <div className='w-full h-12 bg-[#141218] rounded-[1rem] relative overflow-hidden flex items-center px-2 shadow-inner'>
          <div
            className='absolute inset-0 transition-opacity duration-700 ease-in-out opacity-20'
            style={{ background: dayPhase.gradient }}
          />
          <div
            className='absolute left-0 top-0 bottom-0 transition-all duration-100 ease-out opacity-40 mix-blend-overlay'
            style={{ width: `${progress}%`, background: 'white' }}
          />
          <div className='absolute inset-0 flex justify-between px-4 items-center pointer-events-none opacity-20'>
            {[0, 6, 12, 18, 24].map((h) => (
              <div key={h} className='h-2 w-[1px] bg-white' />
            ))}
          </div>
          <div
            className={`absolute h-8 w-8 bg-[#D0BCFF] rounded-full flex items-center justify-center text-[#381E72] transition-all duration-100 ease-out pointer-events-none z-10 ${dayPhase.shadow}`}
            style={{ left: `calc(${progress}% - 16px)` }}>
            <PhaseIcon size={16} strokeWidth={3} />
          </div>
        </div>
      </div>
    </div>
  )
}
