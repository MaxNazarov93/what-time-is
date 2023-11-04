import { TimeZone } from '../types/timezone.type'

const nominatumAPIUrl = 'https://nominatim.openstreetmap.org'
const twitchaxAPIUrl = 'https://tz.twitchax.com/api/v1'

export const searchCity = (search: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    fetch(`${nominatumAPIUrl}/search?q=${search}&format=geojson&addressdetails=1&featureType=city`)
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch((reason) => reject(reason))
  })
}

export const getTimeZone = (name: string, coordinates: number[]): Promise<TimeZone> => {
  return new Promise((resolve, reject) => {
    fetch(`${twitchaxAPIUrl}/osm/tz/${coordinates[0]}/${coordinates[1]}`)
      .then((response) => response.json())
      .then((data: any) => {
        resolve(new TimeZone(data[0].identifier, name))
      })
      .catch((reason) => reject(reason))
  })
}
