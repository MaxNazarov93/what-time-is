import { useState, useEffect } from 'react'
import type { City, Location } from '../types'
import { DEFAULT_LOCATION, STORAGE_KEY } from '../constants'
import { searchCity, getTimeZone } from '../services/citySearch'
import type { GeoJSONFeature } from '../services/citySearch'

export function useLocations() {
  const [locations, setLocations] = useState<Location[]>([])
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [suggestions, setSuggestions] = useState<City[]>([])
  const [isSearching, setIsSearching] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    setLocations(saved ? JSON.parse(saved) : [DEFAULT_LOCATION])
  }, [])

  useEffect(() => {
    if (locations.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(locations))
    }
  }, [locations])

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSuggestions([])

      return
    }

    const timer = setTimeout(async () => {
      setIsSearching(true)
      try {
        const geoData = await searchCity(searchQuery)
        const features: GeoJSONFeature[] = geoData.features ?? []

        const results = await Promise.all(
          features.slice(0, 5).map(async (feature: GeoJSONFeature) => {
            const osmType = (feature.properties?.osm_type as string)?.[0]?.toUpperCase() ?? 'N'
            const id = `${osmType}${feature.properties?.osm_id}`
            const name = feature.properties?.display_name?.split(',')[0] ?? 'Unknown'
            const country: string = feature.properties?.address?.country ?? ''
            const coords: number[] = feature.geometry?.coordinates ?? [0, 0]
            const tz = await getTimeZone(name, coords)

            return { id, tz, country }
          }),
        )

        const cities: City[] = results.map(({ id, tz, country }) => ({
          id,
          label: tz.name,
          timezone: tz.identifier,
          country,
        }))

        setSuggestions(cities.filter((c) => !locations.find((l) => l.id === c.id)))
      } catch {
        setSuggestions([])
      } finally {
        setIsSearching(false)
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [searchQuery, locations])

  const addLocation = (city: City): void => {
    if (locations.find((l) => l.id === city.id)) return
    setLocations((prev) => [...prev, city])
  }

  const removeLocation = (id: string): void => {
    setLocations((prev) => prev.filter((l) => l.id !== id))
  }

  return {
    locations,
    searchQuery,
    setSearchQuery,
    addLocation,
    removeLocation,
    suggestions,
    isSearching,
  }
}
