import React, { FC } from "react";
import { CardInfo } from "../App";
import { Card } from "../components/Card/Card";

type FavoritesProps = {
  items: any;
  onAddToCart: any;
  onAddToFavorite: any;
};

export const Favorites: FC<FavoritesProps> = ({items, onAddToCart, onAddToFavorite}) => {
  return (
    <div className="content p-35">
      <div className="head d-flex justify-between align-center">
        <h1>My favorites</h1>
      </div>

      <div className="cards">
        {items
          .map((item: CardInfo) => (
            <Card
              key={item.id}
              onPlus={() => onAddToCart(item)}
              onFavorite={onAddToFavorite}
              favorited
              added={false}
              loading={false}
              {...item}
            />
          ))}
      </div>
    </div>
  );
};
