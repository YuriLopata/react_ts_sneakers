import React, { FC, useContext, useState } from "react";

import { Info } from "./Info";
import { AppContext } from "../context/AppContext";

import { CardInfo } from "../App";
import axios from "axios";

type DrawerProps = {
  items: CardInfo[];
  onClose: any;
  onRemoveItem: any;
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const Drawer: FC<DrawerProps> = ({
  items = [],
  onClose,
  onRemoveItem,
}) => {
  const [isOrderCompleted, setIsOrderCompleted] = useState(false);
  const [orderId, setOrderId] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const { cartItems, setCartItems } = useContext(AppContext);

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      // const { data } = await axios.post(
      //   "https://644155ed792fe886a8a4dd76.mockapi.io/orders",
      //   { items: cartItems }
      // );
      // setOrderId(data.id);
      setOrderId((prev: number) => prev + 1);
      setIsOrderCompleted(true);

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete(
          "https://644155ed792fe886a8a4dd76.mockapi.io/cart/" + item.cardId
        );
        await delay(1000)
      }
    } catch (error) {
      alert("Failed to place an order :(");
    }
    setIsLoading(false);
  };

  return (
    <div className="overlay">
      <div className="drawer">
        <h2 className="d-flex justify-between mb-20">
          Cart
          <img
            onClick={onClose}
            className="btn-remove cu-p"
            src="./img/btn-remove.svg"
            alt="Close"
            width={32}
            height={32}
          />
        </h2>

        {items.length > 0 ? (
          <>
            <div className="items">
              {items.map((obj: CardInfo) => (
                <div key={obj.cardId} className="cartItem d-flex align-center">
                  <img
                    src={obj.imageUrl}
                    alt="Sneakers"
                    width={70}
                    height={70}
                  />

                  <div>
                    <p className="title">{obj.title}</p>

                    <b>${obj.price}</b>
                  </div>

                  <img
                    onClick={() => onRemoveItem(obj.cardId)}
                    className="btn-remove"
                    src="./img/btn-remove.svg"
                    alt="Remove"
                  />
                </div>
              ))}
            </div>

            <div className="cartTotal">
              <ul>
                <li>
                  <span>Total:</span>

                  <div></div>

                  <b>$260.00</b>
                </li>

                <li>
                  <span>Tax 5%:</span>

                  <div></div>

                  <b>$13.00</b>
                </li>
              </ul>

              <button
                onClick={onClickOrder}
                disabled={isLoading}
                className="greenButton"
              >
                Make an order
                <img
                  className="arrowRight"
                  src="./img/arrow.svg"
                  alt="Arrow"
                  width={16}
                  height={14}
                />
              </button>
            </div>
          </>
        ) : (
          <Info
            img={
              isOrderCompleted
                ? "./img/complete-order.jpg"
                : "./img/empty-cart.jpg"
            }
            title={
              isOrderCompleted ? "The order has been placed" : "Cart is empty"
            }
            desc={
              isOrderCompleted
                ? `Your order ${orderId} will be delivered to courier delivery soon`
                : "Add at least one pair of sneakers to make an order"
            }
          />
        )}
      </div>
      <div className="background" onClick={onClose}></div>
    </div>
  );
};
