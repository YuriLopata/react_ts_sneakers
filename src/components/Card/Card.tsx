import React, { FC, useContext, useState } from "react";
import ContentLoader from "react-content-loader";

import { AppContext } from "../../context/AppContext";

import styles from "./Card.module.scss";

export type CardProps = {
  cardId: number;
  title: string;
  price: number;
  imageUrl: string;
  onPlus: any;
  onFavorite: any;
  favorited: boolean;
  loading: boolean;
};

export const Card: FC<CardProps> = ({
  cardId,
  title,
  price,
  imageUrl,
  onPlus,
  onFavorite,
  favorited = false,
  loading = false,
}) => {
  const { checkAdded } = useContext(AppContext);
  const [isFavorite, setIsFavorite] = useState<boolean>(favorited);

  const handleClickPlus = () => {
    onPlus({ cardId, title, price, imageUrl });
  };

  const handleClickFavorite = () => {
    onFavorite({ cardId, title, imageUrl, price });
    setIsFavorite((prev: boolean) => !prev);
  };
  
  // console.log(loading);
  
  return (
    <div className={styles.card}>
      {loading ? (
        <ContentLoader
          speed={2}
          width={"100%"}
          height={262}
          viewBox="0 0 138 262"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="622" y="215" rx="3" ry="3" width="88" height="6" />
          <rect x="622" y="233" rx="3" ry="3" width="52" height="6" />
          <rect x="430" y="216" rx="3" ry="3" width="380" height="6" />
          <rect x="430" y="232" rx="3" ry="3" width="178" height="6" />
          <circle cx="594" cy="227" r="20" />
          <rect x="504" y="285" rx="10" ry="10" width="150" height="90" />
          <rect x="484" y="333" rx="3" ry="3" width="150" height="15" />
          <rect x="513" y="316" rx="3" ry="3" width="93" height="15" />
          <rect x="509" y="335" rx="3" ry="3" width="80" height="24" />
          <rect x="575" y="314" rx="3" ry="3" width="32" height="32" />
          <rect x="0" y="171" rx="7" ry="7" width="138" height="34" />
          <rect x="106" y="230" rx="7" ry="7" width="32" height="32" />
          <rect x="0" y="0" rx="7" ry="7" width="32" height="32" />
          <rect x="0" y="56" rx="10" ry="10" width="138" height="88" />
          <rect x="0" y="230" rx="7" ry="7" width="57" height="32" />
        </ContentLoader>
      ) : (
        <>
          <div className={styles.favorite}>
            <img
              onClick={handleClickFavorite}
              src={isFavorite ? "./img/liked.svg" : "./img/unliked.svg"}
              alt=" Add to favorite"
            />
          </div>

          <img
            className={styles.sneakersImg}
            width={133}
            height={112}
            src={imageUrl}
            alt="Sneakers"
          />

          <div className="info">
            <h5>{title}</h5>

            <div className="d-flex flex-wrap justify-between align-center">
              <div className="d-flex flex-column">
                <span>Price:</span>

                <b>${price}</b>
              </div>

              <img
                onClick={handleClickPlus}
                className={styles.plus}
                width={32}
                height={32}
                src={checkAdded(cardId) ? "./img/btn-checked.svg" : "./img/btn-plus.svg"}
                alt="Plus"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
