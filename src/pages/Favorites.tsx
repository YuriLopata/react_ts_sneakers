import React, { FC, useContext } from "react";
import { CardInfo } from "../App";
import { Card } from "../components/Card/Card";
import { AppContext } from "../context/AppContext";

type FavoritesProps = {
  onAddToCart: any;
  onAddToFavorite: any;
};

export const Favorites: FC<FavoritesProps> = ({
  onAddToCart,
  onAddToFavorite,
}) => {
  const { favorites } = useContext(AppContext);

  console.log(favorites);

  return (
    <div className="content p-35">
      <div className="head d-flex justify-between align-center">
        <h1>My favorites</h1>
      </div>

      <div className="cards">
        {favorites.map((item: CardInfo) => (
          <Card
            key={item.cardId}
            onPlus={() => onAddToCart(item)}
            onFavorite={onAddToFavorite}
            favorited
            loading={false}
            {...item}
          />
        ))}
      </div>
    </div>
  );
};
