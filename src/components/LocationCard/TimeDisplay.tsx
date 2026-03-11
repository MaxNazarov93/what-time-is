import { useRef, useState } from 'react'

interface TimeDisplayProps {
  displayTime: string
  timezone: string
  isSliding: boolean
  onCommit: (totalMinutes: number, timezone: string) => void
}

export function TimeDisplay({ displayTime, timezone, isSliding, onCommit }: TimeDisplayProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [manualInput, setManualInput] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleEditClick = () => {
    setManualInput(displayTime)
    setIsEditing(true)
    setTimeout(() => inputRef.current?.focus(), 50)
  }

  const handleSubmit = () => {
    setIsEditing(false)
    const [hStr, mStr] = manualInput.split(':')
    const h = parseInt(hStr, 10)
    const m = parseInt(mStr, 10)
    if (!isNaN(h) && !isNaN(m)) {
      onCommit(Math.max(0, Math.min(23, h)) * 60 + Math.max(0, Math.min(59, m)), timezone)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSubmit()
    if (e.key === 'Escape') setIsEditing(false)
  }

  if (isEditing) {
    return (
      <div className='flex items-center justify-end'>
        <input
          ref={inputRef}
          type='text'
          value={manualInput}
          onChange={(e) => setManualInput(e.target.value)}
          onBlur={handleSubmit}
          onKeyDown={handleKeyDown}
          className='text-5xl font-light bg-[#141218] text-[#D0BCFF] w-36 text-center rounded-lg border-b-2 border-[#D0BCFF] focus:outline-none'
          placeholder='HH:MM'
        />
      </div>
    )
  }

  return (
    <div
      onClick={handleEditClick}
      className={`text-5xl font-light tracking-tighter tabular-nums transition-colors duration-300 cursor-pointer hover:bg-white/5 rounded-lg px-1 -mr-1 ${isSliding ? 'text-[#D0BCFF]' : 'text-white'}`}
      title='Click to edit time manually'>
      {displayTime}
    </div>
  )
}
