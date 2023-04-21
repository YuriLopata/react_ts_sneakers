import React from "react";

export const Drawer = ({ onClose, items = [] }: any) => {
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

        <div className="items">
          {items.map((obj: any, i: any) => (
            <div key={i} className="cartItem d-flex align-center mr-10">
              <img
                key={i}
                src={obj.imageUrl}
                alt="Sneakers"
                width={70}
                height={70}
              />

              <div>
                <p key={i} className="title">
                  {obj.title}
                </p>

                <b key={i}>{obj.price}</b>
              </div>

              <img
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
      <div className="background" onClick={onClose}></div>
    </div>
  );
};
