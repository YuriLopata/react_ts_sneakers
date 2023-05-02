import React, { FC, useContext } from "react";
import { CardInfo } from "../App";
import { Card } from "../components/Card/Card";
import { AppContext } from "../context/AppContext";

type FavoritesProps = {
  onAddToCart: any;
  onAddToFavorites: any;
  isLoading: boolean;
};

export const Favorites: FC<FavoritesProps> = ({
  onAddToCart,
  onAddToFavorites,
  isLoading,
}) => {
  const { favorites } = useContext(AppContext);
  const { getItemsToRender } = useContext(AppContext);

  // console.log(favorites);

  return (
    <div className="content p-35">
      <div className="head d-flex justify-between align-center">
        <h1>My favorites</h1>
      </div>

      <div className="cards">
        {getItemsToRender(favorites).map((item: CardInfo) => (
          <Card
            key={item.cardId}
            onPlus={(obj: CardInfo) => onAddToCart(obj)}
            onFavorite={onAddToFavorites}
            favorited
            loading={isLoading}
            {...item}
          />
        ))}
      </div>
    </div>
  );
};
