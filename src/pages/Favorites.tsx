import React, { FC, useContext } from "react";
import { CardInfo } from "../models";
import { Card } from "../components/Card/Card";

import { AppContext } from "../context/AppContext";
import { FavoritesProps } from "../models";

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
            key={item.id}
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
