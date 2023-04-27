import React, { FC } from "react";

import { CardInfo } from "../App";

type DrawerProps = {
  onClose: any;
  items: CardInfo[];
  onRemoveItem: any;
};

export const Drawer: FC<DrawerProps> = ({ onClose, items = [], onRemoveItem }) => {
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
                <div
                  key={obj.id}
                  className="cartItem d-flex align-center mr-10"
                >
                  <img
                    src={obj.imageUrl}
                    alt="Sneakers"
                    width={70}
                    height={70}
                  />

                  <div>
                    <p className="title">
                      {obj.title}
                    </p>

                    <b>${obj.price}</b>
                  </div>

                  <img
                    onClick={() => onRemoveItem(obj.id)}
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

              <button className="greenButton">
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
          <div className="cartEmpty d-flex align-center justify-center flex-column flex">
            <img
              className="mb-20"
              src="./img/empty-cart.jpg"
              alt="Cart is empty"
              width={120}
              height={120}
            />

            <h2>Cart is empty</h2>

            <p className="opacity-6">
              Add at least one pair of sneakers to make an order.
            </p>

            <button onClick={onClose} className="greenButton">
              <img className="arrowLeft" src="./img/arrow.svg" alt="Arrow" />
              Go back
            </button>
          </div>
        )}
      </div>
      <div className="background" onClick={onClose}></div>
    </div>
  );
};
