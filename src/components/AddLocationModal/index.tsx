import { Search, X } from 'lucide-react'
import type { City, Location } from '../../types'
import { getTimezoneOffset } from '../../utils'

interface AddLocationModalProps {
  isOpen: boolean
  searchQuery: string
  suggestions: City[]
  locations: Location[]
  isSearching: boolean
  onClose: () => void
  onSearchChange: (query: string) => void
  onAdd: (city: City) => void
}

export function AddLocationModal({
  isOpen,
  searchQuery,
  suggestions,
  isSearching,
  onClose,
  onSearchChange,
  onAdd,
}: AddLocationModalProps) {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-end sm:items-center justify-center pointer-events-none transition-all duration-500 ${isOpen ? 'bg-black/60 backdrop-blur-sm' : ''}`}>
      <div
        className={`w-full max-w-md bg-[#1E1B26] rounded-t-[2rem] sm:rounded-[2rem] p-6 pb-10 sm:pb-6 shadow-2xl pointer-events-auto transform transition-all duration-500 ease-[cubic-bezier(0.2,0.0,0,1.0)] ${isOpen ? 'translate-y-0 sm:scale-100 sm:opacity-100' : 'translate-y-full sm:translate-y-0 sm:scale-95 sm:opacity-0'}`}>
        <div className='w-12 h-1 bg-[#49454F] rounded-full mx-auto mb-6 opacity-50 sm:hidden' />

        <div className='flex items-center justify-between mb-6'>
          <h2 className='text-2xl font-normal'>Add City</h2>
          <button
            onClick={onClose}
            className='p-2 bg-[#332D41] rounded-full hover:bg-[#4A4458] transition-colors'>
            <X size={20} />
          </button>
        </div>

        <div className='relative mb-6 group'>
          <Search
            className='absolute left-4 top-1/2 -translate-y-1/2 text-[#CAC4D0] group-focus-within:text-[#D0BCFF] transition-colors'
            size={20}
          />
          <input
            type='text'
            autoFocus={isOpen}
            placeholder='Search city...'
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className='w-full bg-[#141218] border border-[#49454F] rounded-[1rem] py-4 pl-12 pr-4 text-lg text-white focus:outline-none focus:border-[#D0BCFF] focus:ring-1 focus:ring-[#D0BCFF] transition-all placeholder:text-[#49454F]'
          />
        </div>

        <div className='max-h-60 overflow-y-auto space-y-1 pr-1 custom-scrollbar'>
          {isSearching && <p className='text-center text-[#938F99] py-4'>Searching...</p>}

          {!isSearching &&
            suggestions.map((city) => (
              <button
                key={city.id}
                onClick={() => onAdd(city)}
                className='w-full flex items-center justify-between p-4 rounded-xl hover:bg-[#332D41] transition-colors text-left group'>
                <span className='text-lg'>
                  {city.label}
                  {city.country && (
                    <span className='ml-2 text-sm text-[#938F99]'>{city.country}</span>
                  )}
                </span>
                <span className='text-sm text-[#938F99] font-mono bg-[#141218] px-2 py-1 rounded-md group-hover:bg-[#1E1B26] transition-colors'>
                  {getTimezoneOffset(city.timezone)}
                </span>
              </button>
            ))}

          {!isSearching && searchQuery && suggestions.length === 0 && (
            <p className='text-center text-[#938F99] py-4'>No cities found.</p>
          )}

          {!searchQuery && (
            <p className='text-center text-[#938F99] py-4'>Type a city name to search.</p>
          )}
        </div>
      </div>
    </div>
  )
}
