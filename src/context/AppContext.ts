import { Dispatch, SetStateAction, createContext } from "react";
import { CardInfo } from "../models";

export interface IAppContext {
  items: CardInfo[];
  cartItems: CardInfo[];
  favorites: CardInfo[];
  checkAdded: (id?: number, arr?: CardInfo[]) => boolean;
  getItemsToRender: (arr: CardInfo[]) => CardInfo[];
  setCartOpened: Dispatch<SetStateAction<boolean>>;
  setCartItems: Dispatch<SetStateAction<CardInfo[]>>;
}

const cardExample: CardInfo = {
  id: 0,
  parentId: 0,
  title: "string",
  price: 0,
  imageUrl: "string",
}

export const AppContext = createContext<IAppContext>({
  items: [cardExample],
  cartItems: [cardExample],
  favorites: [cardExample],
  checkAdded: () => false,
  getItemsToRender: () => [cardExample],
  setCartOpened: () => false,
  setCartItems: () => [cardExample],
});
