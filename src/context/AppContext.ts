import { createContext } from "react"
import { CardInfo } from "../App";

interface IAppContext {
    items: CardInfo[];
    cartItems: CardInfo[];
    favorites: CardInfo[];
  }

export const AppContext = createContext<IAppContext>({
  items: [],
  cartItems: [],
  favorites: [],
})
