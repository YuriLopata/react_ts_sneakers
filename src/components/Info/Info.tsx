import React, { useContext, FC } from "react";

import { AppContext } from "../../context/AppContext";
import { InfoProps } from "../../models";

import styles from "./Info.module.scss";
import { Link } from "react-router-dom";

export const Info: FC<InfoProps> = ({ inCart, img, title, desc }) => {
  const { setCartOpened } = useContext(AppContext);

  return (
    <div className={styles.cartEmpty}>
      <img
        className="mb-20"
        src={img}
        alt="Cart is empty"
        width={120}
        height={120}
      />

      <h2>{title}</h2>

      <p className="opacity-6">{desc}</p>

      {inCart ? (
        <button
          className={styles.greenButton}
          onClick={() => setCartOpened(false)}
        >
          <img className={styles.arrowLeft} src="./img/arrow.svg" alt="Arrow" />
          Go back
        </button>
      ) : (
        <Link to={"/"}>
          <button
            className={styles.greenButton}
            onClick={() => setCartOpened(false)}
          >
            <img
              className={styles.arrowLeft}
              src="./img/arrow.svg"
              alt="Arrow"
            />
            Go home page
          </button>
        </Link>
      )}
    </div>
  );
};
