import { useContext } from "react"

import { AppContext } from "../context/AppContext"
// import { CardInfo } from "../App";

// interface IUseCart {
//   cartItems: CardInfo;
//   setCartItems: any;
//   totalPrice: number;
// }

export const useCart: any = () => {
    const {cartItems, setCartItems} = useContext(AppContext)
    const totalPrice = Number(cartItems.reduce((sum, obj) => sum + obj.price, 0).toFixed(2))

    return { cartItems, setCartItems, totalPrice }
}
