import React from "react";

export const Header = (props: any) => {
  return (
    <header className="d-flex justify-between align-center p-40">
      <div className="d-flex align-center">
        <img width={40} height={40} src="/img/logo.png" />

        <div className="headerInfo">
          <h3 className="text-uppercase">React sneakers</h3>

          <p className="opacity-5">The best sneakers store</p>
        </div>
      </div>

      <ul className="d-flex align-center">
        <li onClick={props.onClickCart} className="d-flex align-center mr-30 cu-p">
          <img width={18} height={18} src="/img/cart.svg" />

          <span>$130.00</span>
        </li>

        <li className="d-flex align-center">
          <img width={18} height={18} src="./img/user.svg" />
        </li>
      </ul>
    </header>
  );
};
