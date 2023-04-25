import React from "react";
import { Link } from "react-router-dom";

export const Header = (props: any) => {
  return (
    <header className="d-flex justify-between align-center p-35">
      <div className="d-flex align-center">
        <img width={40} height={40} src="/img/logo.png" />

        <div className="headerInfo">
          <h3 className="text-uppercase">React sneakers</h3>

          <p className="opacity-5">The best sneakers store</p>
        </div>
      </div>

      <ul className="d-flex align-center">
        <li
          onClick={props.onClickCart}
          className="d-flex align-center mr-30 cu-p"
        >
          <img className="mr-10" width={18} height={18} src="/img/cart.svg" />

          <span>$130.00</span>
        </li>

        <Link to={"/favorites"}>
          <li
            onClick={props.onClickFavorites}
            className="d-flex align-center mr-30 cu-p"
          >
            <img src="./img/favorites.svg" alt="Heart" width={20} height={20} />
          </li>
        </Link>

        <li className="d-flex align-center">
          <img width={20} height={20} src="./img/user.svg" />
        </li>
      </ul>
    </header>
  );
};
