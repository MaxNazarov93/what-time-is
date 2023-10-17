import { Favourite } from '../types/favourite.type'

const LOCALSTORAGE_FAVOURITES_KEY = 'favourites'

export const getList = (): Favourite[] => {
  const data: string | null = localStorage.getItem(LOCALSTORAGE_FAVOURITES_KEY)
  if (!data) {
    return []
  }

  return JSON.parse(data) as Favourite[]
}

export const saveFavourite = (favourite: Favourite) => {
  const encodedFavourites: string | null = localStorage.getItem(LOCALSTORAGE_FAVOURITES_KEY)
  if (!encodedFavourites) {
    localStorage.setItem(LOCALSTORAGE_FAVOURITES_KEY, JSON.stringify([favourite]))

    return
  }

  let data: Favourite[] = []
  try {
    data = JSON.parse(encodedFavourites)
  } catch (error) {
    console.error(`Cannot parse favourites list: ${encodedFavourites}`)

    return
  }

  if (data.find((value) => favourite.tz == value.tz)) {
    console.log(`${favourite.tz} already in the list`)

    return
  }

  data.push(favourite)
  localStorage.setItem(LOCALSTORAGE_FAVOURITES_KEY, JSON.stringify(data))
}

export const deleteFavourite = (favourite: Favourite) => {
  const encodedFavourites: string | null = localStorage.getItem(LOCALSTORAGE_FAVOURITES_KEY)
  if (!encodedFavourites) {
    return
  }

  let data: Favourite[] = []
  try {
    data = JSON.parse(encodedFavourites)
  } catch (error) {
    console.error(`Cannot parse favourites list: ${encodedFavourites}`)

    return
  }

  const index = data.findIndex(
    (value) => favourite.tz.label == value.tz.label && favourite.tz.value == value.tz.value,
  )
  if (index !== -1) {
    localStorage.setItem(
      LOCALSTORAGE_FAVOURITES_KEY,
      JSON.stringify([...data.slice(0, index), ...data.slice(index + 1)]),
    )
  }
}
