import React, { useState } from "react";

import styles from "./Card.module.scss";

export type CardProps = {
  title: string;
  price: number;
  imageUrl: string;
  onClickFavorite: any;
  onClickPlus: any;
};

export const Card = ({ title, price, imageUrl, onClickFavorite, onClickPlus }: CardProps) => {
  const [isAdded, setIsAdded] = useState(false)

  const handleClickPlus = () => {
    onClickPlus()
    setIsAdded(prev => !prev)
  }
  
  return (
    <div className={styles.card}>
      <div className={styles.favorite} onClick={onClickFavorite}>
        <img src="./img/heart-unliked.svg" alt="Unliked" />
      </div>

      <img width={133} height={112} src={imageUrl} alt="" />

      <div className="info">
        <h5>{title}</h5>

        <div className="d-flex justify-between align-center">
          <div className="d-flex flex-column">
            <span>Price:</span>

            <b>${price}</b>
          </div>

          <img
            onClick={handleClickPlus}
            className={styles.plus}
            width={32}
            height={32}
            src={isAdded ? "./img/btn-checked.svg" : "./img/btn-plus.svg"}
            alt="Plus"
          />
        </div>
      </div>
    </div>
  );
};
