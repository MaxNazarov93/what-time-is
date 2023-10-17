import { createContext } from 'react'
import { FavouriteContext as FavouriteContextType } from '../types/favourite.type'

export const FavouriteContext = createContext<FavouriteContextType>({} as FavouriteContextType)
