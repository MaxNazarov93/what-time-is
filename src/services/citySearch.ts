import { TimeZone } from '../types/timezone.type'

const nominatumAPIUrl = 'https://nominatim.openstreetmap.org'
const twitchaxAPIUrl = 'https://tz.twitchax.com/api/v1'

const locale = navigator.language || 'en'

interface GeoJSONFeatureCollection {
  features: GeoJSONFeature[]
}

export interface GeoJSONFeature {
  geometry: { coordinates: number[] }
  properties: {
    osm_type: string
    osm_id: number
    place_id: number
    display_name: string
    address: { country: string }
  }
}

interface TzResponse {
  identifier: string
}

export const searchCity = (search: string): Promise<GeoJSONFeatureCollection> => {
  return fetch(
    `${nominatumAPIUrl}/search?q=${search}&format=geojson&addressdetails=1&featureType=city&accept-language=${locale}`,
  ).then((response) => response.json())
}

export const getTimeZone = (name: string, coordinates: number[]): Promise<TimeZone> => {
  return fetch(`${twitchaxAPIUrl}/osm/tz/${coordinates[0]}/${coordinates[1]}`)
    .then((response) => response.json())
    .then((data: TzResponse[]) => new TimeZone(data[0].identifier, name))
}
