import { RotateCcw, Check, Pencil, Plus } from 'lucide-react'

interface HeaderProps {
  locationCount: number
  isLive: boolean
  isManageMode: boolean
  onReset: () => void
  onToggleManage: () => void
  onAdd: () => void
}

export function Header({
  locationCount,
  isLive,
  isManageMode,
  onReset,
  onToggleManage,
  onAdd,
}: HeaderProps) {
  return (
    <header className='px-6 pt-12 pb-6 md:pb-10 flex flex-col md:flex-row md:items-end justify-between gap-4'>
      <div>
        <h1 className='text-4xl md:text-5xl font-normal tracking-tight'>World Clock</h1>
        <p className='text-[#CAC4D0] text-sm md:text-base mt-1 md:mt-2 font-medium tracking-wide opacity-80'>
          {locationCount} active location{locationCount !== 1 && 's'}
        </p>
      </div>

      <div className='flex items-center gap-3'>
        {!isLive && (
          <button
            onClick={onReset}
            className='bg-[#D0BCFF] text-[#381E72] px-3 py-2 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg hover:brightness-110 transition-all active:scale-95'>
            <RotateCcw size={16} strokeWidth={2.5} />
            <span className='hidden sm:inline'>Reset</span>
          </button>
        )}

        <button
          onClick={onToggleManage}
          className={`p-2 md:px-4 md:py-2 rounded-xl transition-all active:scale-95 flex items-center gap-2 ${isManageMode ? 'bg-[#381E72] text-[#D0BCFF]' : 'bg-[#332D41] text-[#E3E2E6]'}`}
          aria-label='Toggle Edit Mode'>
          {isManageMode ? <Check size={20} strokeWidth={2.5} /> : <Pencil size={20} />}
          <span className='hidden md:inline font-bold text-sm'>
            {isManageMode ? 'Done' : 'Edit'}
          </span>
        </button>

        <button
          onClick={onAdd}
          className='hidden md:flex bg-[#D0BCFF] text-[#381E72] px-4 py-2 rounded-xl text-sm font-bold items-center gap-2 shadow-lg hover:brightness-110 transition-all active:scale-95'>
          <Plus size={18} strokeWidth={2.5} />
          Add City
        </button>
      </div>
    </header>
  )
}
