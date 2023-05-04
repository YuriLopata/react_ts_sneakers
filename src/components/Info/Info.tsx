import React, { useContext, FC } from "react";
import { AppContext } from "../../context/AppContext";

import styles from "./Info.module.scss"

type InfoProps = {
  img: string;
  title: string;
  desc: string;
};

export const Info: FC<InfoProps> = ({img, title, desc}) => {
  const {setCartOpened} = useContext(AppContext)

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

      <p className="opacity-6">
        {desc}
      </p>

      <button onClick={() => setCartOpened(false)} className={styles.greenButton}>
        <img className={styles.arrowLeft} src="./img/arrow.svg" alt="Arrow" />
        Go back
      </button>
    </div>
  );
};
