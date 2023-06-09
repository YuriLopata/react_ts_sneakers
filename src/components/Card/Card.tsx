import React, { FC, useContext } from "react";
import ContentLoader from "react-content-loader";

import { AppContext, IAppContext } from "../../context/AppContext";
import { CardInfo, CardProps } from "../../models";

import styles from "./Card.module.scss";

export const Card: FC<CardProps> = ({
  id,
  parentId,
  title,
  price,
  imageUrl,
  onPlus,
  onFavorite,
  loading = false,
}) => {
  const { cartItems, favorites, checkAdded }: IAppContext = useContext(AppContext);
  const itemObj: CardInfo = { id, parentId, title, price, imageUrl };

  const toggleLikeImg = checkAdded(itemObj.parentId, favorites)
  ? "./img/liked.svg"
  : "./img/unliked.svg"

  const toggleAddedImg = checkAdded(itemObj.parentId, cartItems)
  ? "./img/btn-checked.svg"
  : "./img/btn-plus.svg"

  return (
    <div className={styles.card}>
      {loading ? (
        <ContentLoader
          speed={2}
          width={"100%"}
          height={"100%"}
          viewBox="0 0 168 262"
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
          <rect x="0" y="170" rx="7" ry="7" width="100%" height="16" />
          <rect x="136" y="230" rx="7" ry="7" width="32" height="32" />
          <rect x="0" y="0" rx="7" ry="7" width="32" height="32" />
          <rect x="0" y="230" rx="7" ry="7" width="57" height="32" />
          <rect x="0" y="58" rx="10" ry="10" width="100%" height="80" />
          <rect x="0" y="190" rx="7" ry="7" width="100%" height="16" />
        </ContentLoader>
      ) : (
        <>
          {onFavorite && (
            <div className={styles.favorite}>
              <img
                onClick={() => onFavorite(itemObj)}
                src={toggleLikeImg}
                alt="Add to favorite"
              />
            </div>
          )}

          <img
            className={styles.sneakersImg}
            width={133}
            height={112}
            src={imageUrl}
            alt="Sneakers"
          />

          <div className={styles.info}>
            <h5>{title}</h5>

            <div className="d-flex flex-wrap justify-between align-center">
              <div className="d-flex flex-column">
                <span className="price">Price:</span>

                <b>${price}</b>
              </div>

              {onPlus && (
                <img
                  onClick={() => onPlus(itemObj)}
                  className={styles.plus}
                  width={32}
                  height={32}
                  src={toggleAddedImg}
                  alt="Plus"
                />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
