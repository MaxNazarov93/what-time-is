import { Favourite } from '../models/favourite'

const LOCALSTORAGE_FAVOURITES_KEY = 'favourites'

export const getList = (): Favourite[] => {
  const data = localStorage.getItem(LOCALSTORAGE_FAVOURITES_KEY)
  console.log(data)

  return []
}
