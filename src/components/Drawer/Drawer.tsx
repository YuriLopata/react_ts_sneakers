import React, { FC, useState } from "react";
import axios from "axios";

import { Info } from "../Info/Info";

import { CardInfo, DrawerProps } from "../../models";
import { IUseCart, useCart } from "../../hooks/useCart";
import styles from "./Drawer.module.scss";

const calcTax = (num: number): number => {
  return Number((num * 0.05).toFixed(2));
};

const delay = (ms: number): Promise<number> =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const Drawer: FC<DrawerProps> = ({
  items = [],
  onClose,
  onRemoveItem,
  opened,
}) => {
  const { cartItems, setCartItems, totalPrice }: IUseCart = useCart();
  const [isOrderCompleted, setIsOrderCompleted] = useState<boolean>(false);
  const [orderId, setOrderId] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onClickOrder = async (): Promise<void> => {
    try {
      setIsLoading(true);
      // commented because it's impossible to create orders mock collection, but it works!
      // const { data } = await axios.post(
      //   "https://644155ed792fe886a8a4dd76.mockapi.io/orders",
      //   { items: cartItems }
      // );
      // setOrderId(data.id);
      setOrderId((prev: number) => prev + 1);
      setIsOrderCompleted(true);
      setCartItems([]);

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        console.log(item.parentId);
        await axios.delete(
          "https://644155ed792fe886a8a4dd76.mockapi.io/cart/" + item.id
        );
        await delay(500);
      }
    } catch (error) {
      alert("Failed to place an order :(");
    }
    setIsLoading(false);
  };

  return (
    <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ""}`}>
      <div className={styles.drawer}>
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
            <div className={styles.items}>
              {items.map((obj: CardInfo) => (
                <div key={obj.parentId} className={styles.cartItem}>
                  <img
                    src={obj.imageUrl}
                    alt="Sneakers"
                    width={70}
                    height={70}
                  />

                  <div>
                    <p className={styles.title}>{obj.title}</p>

                    <b>${obj.price}</b>
                  </div>

                  <img
                    onClick={() => onRemoveItem(obj.id)}
                    className={styles.btnRemove}
                    src="./img/btn-remove.svg"
                    alt="Remove"
                  />
                </div>
              ))}
            </div>

            <div className={styles.cartTotal}>
              <ul>
                <li>
                  <span>Total:</span>

                  <div></div>

                  <b>{`$${totalPrice}`}</b>
                </li>

                <li>
                  <span>Tax 5%:</span>

                  <div></div>

                  <b>{`$${calcTax(totalPrice)}`}</b>
                </li>
              </ul>

              <button
                onClick={onClickOrder}
                disabled={isLoading}
                className={styles.greenButton}
              >
                Make an order
                <img
                  className={styles.arrowRight}
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
            inCart
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

      <div className={styles.background} onClick={onClose}></div>
    </div>
  );
};
