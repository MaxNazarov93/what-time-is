import { PropsWithChildren, useEffect, useState } from 'react'
import { FavouriteContext } from '../../contexts/favourite.context'
import { Favourite } from '../../types/favourite.type'
import { getList } from '../../utils/favourites.util'

const Favourites = ({ children }: PropsWithChildren) => {
  const [favourites, setFavourites] = useState<Favourite[]>([])

  const addFavourite = (favourites: Favourite) => {
    setFavourites((previousState: Favourite[]) => {
      return []
    })
  }

  const deleteFavourite = (favourites: Favourite) => {
    setFavourites((previousState: Favourite[]) => {
      return []
    })
  }

  useEffect(() => {
    setFavourites(getList())
  }, [])

  return (
    <FavouriteContext.Provider
      value={{
        favourites,
        addFavourite,
        deleteFavourite,
      }}>
      {children}
    </FavouriteContext.Provider>
  )
}

export default Favourites
