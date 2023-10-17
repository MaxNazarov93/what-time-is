import { TimeZone } from './timezone.type'

export interface Favourite {
  tz: TimeZone
}

export type FavouriteContext = {
  favourites: Favourite[] | null
  addFavourite: (_favourite: Favourite) => void
  deleteFavourite: (_favourite: Favourite) => void
}
