import React, { FC } from "react";
import { Link } from "react-router-dom";
import { IUseCart, useCart } from "../../hooks/useCart";

import styles from "./Header.module.scss"
import { HeaderProps } from "../../models";

export const Header: FC<HeaderProps> = ({ onClickCart }) => {
  const {totalPrice}: IUseCart = useCart();

  return (
    <header className={styles.header}>
      <Link to={"/"}>
        <div className={styles.logo}>
          <img className="mr-15" width={40} height={40} src="img/logo.png" />
  
          <div className={styles.title}>
            <h3 className="text-uppercase">React sneakers</h3>
  
            <p className="opacity-5">The best sneakers store</p>
          </div>
        </div>
      </Link>

      <ul className="d-flex align-center flex-wrap">
        <li
          onClick={onClickCart}
          className={styles.cart}
        >
          <img className="mr-10" width={18} height={18} src="img/cart.svg" />

          <span>{`$${totalPrice}`}</span>
        </li>

        <span className="d-flex align-center">
          <Link to={"/favorites"}>
            <li
              className="d-flex align-center ml-30"
            >
              <img src="./img/favorites.svg" alt="Heart" width={20} height={20} />
            </li>
          </Link>
  
          <Link to={"/orders"}>
            <li className="d-flex align-center ml-30">
              <img width={20} height={20} src="./img/user.svg" />
            </li>
          </Link>
        </span>
      </ul>
    </header>
  );
};
