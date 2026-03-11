import { useState } from 'react'
import { Plus, Globe } from 'lucide-react'
import { useClock, useLocations } from './hooks'
import { Header } from './components/Header'
import { AddLocationModal } from './components/AddLocationModal'
import { LocationCard } from './components/LocationCard'

export default function App() {
  const { currentTime, isLive, scrubTime, resetToNow } = useClock()
  const {
    locations,
    searchQuery,
    setSearchQuery,
    addLocation,
    removeLocation,
    suggestions,
    isSearching,
  } = useLocations()
  const [isAdding, setIsAdding] = useState(false)
  const [isManageMode, setIsManageMode] = useState(false)

  const handleAdd = (city: Parameters<typeof addLocation>[0]) => {
    addLocation(city)
    setIsAdding(false)
    setSearchQuery('')
  }

  return (
    <div className='min-h-screen bg-[#121212] text-[#E3E2E6] font-sans selection:bg-[#D0BCFF] selection:text-[#381E72] overflow-hidden relative'>
      <div className='fixed top-[-20%] left-[-10%] w-[500px] h-[500px] bg-[#4F378B] rounded-full blur-[120px] opacity-20 pointer-events-none' />
      <div className='fixed bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-[#381E72] rounded-full blur-[100px] opacity-20 pointer-events-none' />

      <div className='max-w-7xl mx-auto h-screen flex flex-col relative z-10 md:p-4'>
        <Header
          locationCount={locations.length}
          isLive={isLive}
          isManageMode={isManageMode}
          onReset={resetToNow}
          onToggleManage={() => setIsManageMode((m) => !m)}
          onAdd={() => setIsAdding(true)}
        />

        <main className='flex-1 overflow-y-auto px-4 pb-32 no-scrollbar grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 items-start content-start'>
          {locations.map((loc) => (
            <LocationCard
              key={loc.id}
              data={loc}
              referenceDate={currentTime}
              onTimeChange={scrubTime}
              onRemove={() => removeLocation(loc.id)}
              isManageMode={isManageMode}
            />
          ))}

          {locations.length > 0 && (
            <button
              onClick={() => setIsAdding(true)}
              className='hidden md:flex flex-col items-center justify-center h-full min-h-[220px] rounded-[1.8rem] border-2 border-dashed border-[#49454F] text-[#938F99] hover:bg-[#1E1B26] hover:border-[#D0BCFF] hover:text-[#D0BCFF] transition-all group'>
              <div className='w-12 h-12 rounded-full bg-[#332D41] flex items-center justify-center group-hover:bg-[#381E72] group-hover:scale-110 transition-all mb-3'>
                <Plus size={24} />
              </div>
              <span className='font-medium'>Add New Location</span>
            </button>
          )}

          {locations.length === 0 && (
            <div className='col-span-full flex flex-col items-center justify-center h-64 text-[#938F99] opacity-50'>
              <Globe size={48} className='mb-4' />
              <p>Add a city to get started</p>
            </div>
          )}
        </main>

        <div
          className={`md:hidden absolute bottom-8 right-6 transition-transform duration-300 ${isManageMode ? 'translate-y-24' : 'translate-y-0'}`}>
          <button
            onClick={() => setIsAdding(true)}
            className='w-16 h-16 bg-[#D0BCFF] text-[#381E72] rounded-[1.2rem] shadow-xl flex items-center justify-center hover:scale-105 active:scale-95 active:rounded-2xl transition-all duration-300'>
            <Plus size={28} strokeWidth={2.5} />
          </button>
        </div>

        <AddLocationModal
          isOpen={isAdding}
          searchQuery={searchQuery}
          suggestions={suggestions}
          locations={locations}
          isSearching={isSearching}
          onClose={() => setIsAdding(false)}
          onSearchChange={setSearchQuery}
          onAdd={handleAdd}
        />
      </div>
    </div>
  )
}
