import React, { FC, useContext } from "react";
import { CardInfo } from "../App";
import { Card } from "../components/Card/Card";
import {AppContext} from "../App";

type FavoritesProps = {
  onAddToCart: any;
  onAddToFavorite: any;
};


export const Favorites: FC<FavoritesProps> = ({onAddToCart, onAddToFavorite}) => {
  const state = useContext(AppContext)

  console.log(state);

  return (
    <div className="content p-35">
      <div className="head d-flex justify-between align-center">
        <h1>My favorites</h1>
      </div>

      <div className="cards">
        {[]
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
