import { Dispatch, SetStateAction, useContext } from "react";

import { AppContext } from "../context/AppContext";
import { CardInfo } from "../models";

export interface IUseCart {
  cartItems: CardInfo[];
  setCartItems: Dispatch<SetStateAction<CardInfo[]>>;
  totalPrice: number;
}

export const useCart = (): IUseCart => {
  const { cartItems, setCartItems } = useContext(AppContext);
  const totalPrice = Number(
    cartItems.reduce((sum, obj) => sum + obj.price, 0).toFixed(2)
  );

  return { cartItems, setCartItems, totalPrice };
};
