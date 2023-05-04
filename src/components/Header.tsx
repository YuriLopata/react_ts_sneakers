import React, { FC } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";

type HeaderProps = {
  onClickCart: any;
};

export const Header: FC<HeaderProps> = ({ onClickCart }) => {
  const {totalPrice} = useCart();

  return (
    <header className="d-flex flex-wrap justify-between align-center p-35">
      <Link to={"/"}>
        <div className="d-flex align-center">
          <img className="mr-15" width={40} height={40} src="/img/logo.png" />
  
          <div className="headerInfo">
            <h3 className="text-uppercase">React sneakers</h3>
  
            <p className="opacity-5">The best sneakers store</p>
          </div>
        </div>
      </Link>

      <ul className="d-flex align-center">
        <li
          onClick={onClickCart}
          className="d-flex align-center mr-30 cu-p"
        >
          <img className="mr-10" width={18} height={18} src="/img/cart.svg" />

          <span>{`$${totalPrice}`}</span>
        </li>

        <Link to={"/favorites"}>
          <li
            className="d-flex align-center mr-30 cu-p"
          >
            <img src="./img/favorites.svg" alt="Heart" width={20} height={20} />
          </li>
        </Link>

        <Link to={"/orders"}>
          <li className="d-flex align-center">
            <img width={20} height={20} src="./img/user.svg" />
          </li>
        </Link>
      </ul>
    </header>
  );
};
