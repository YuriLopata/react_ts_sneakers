import { createContext } from "react";
import { CardInfo } from "../models";

interface IAppContext {
  items: CardInfo[];
  cartItems: CardInfo[];
  favorites: CardInfo[];
  checkAdded: any;
  getItemsToRender: any;
  setCartOpened: any;
  setCartItems: any;
}

export const AppContext = createContext<IAppContext>({
  items: [],
  cartItems: [],
  favorites: [],
  checkAdded: () => [],
  getItemsToRender: () => [],
  setCartOpened: () => [],
  setCartItems: () => [],
});
