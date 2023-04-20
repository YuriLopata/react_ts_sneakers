import React from "react";

export const Drawer = (props: any) => {
  return (
    <div className="overlay">
      <div className="drawer">
        <h2 className="d-flex justify-between mb-20">
          Cart
          <img
            onClick={props.onClose}
            className="btn-remove cu-p"
            src="./img/btn-remove.svg"
            alt="Close"
            width={32}
            height={32}
          />
        </h2>

        <div className="items">
          <div className="cartItem d-flex align-center">
            <img
              src="./img/sneakers/1.jpg"
              alt="Sneakers"
              width={70}
              height={70}
            />

            <div>
              <p className="title">Man&apos;s shoes Nike Air Max 270</p>

              <b>$130.00</b>
            </div>

            <img className="btn-remove" src="./img/btn-remove.svg" alt="" />
          </div>

          <div className="cartItem d-flex align-center">
            <img
              src="./img/sneakers/1.jpg"
              alt="Sneakers"
              width={70}
              height={70}
            />

            <div>
              <p className="title">Man&apos;s shoes Nike Air Max 270</p>

              <b>$130.00</b>
            </div>

            <img
              className="btn-remove"
              src="./img/btn-remove.svg"
              alt=""
              width={32}
              height={32}
            />
          </div>
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
            Place an order
            <img
              className="arrow"
              src="./img/arrow.svg"
              alt="Arrow"
              width={16}
              height={14}
            />
          </button>
        </div>
      </div>
    </div>
  );
};
