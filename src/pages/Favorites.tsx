import React, { FC, useContext } from "react";
import { CardInfo } from "../models";
import { Card } from "../components/Card/Card";

import { AppContext, IAppContext } from "../context/AppContext";
import { FavoritesProps } from "../models";

export const Favorites: FC<FavoritesProps> = ({
  onAddToCart,
  onAddToFavorites,
  isLoading,
}) => {
  const { favorites, getItemsToRender }: IAppContext = useContext(AppContext);

  return (
    <div className="content">
      <div className="head">
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
