import React, { FC } from "react";

import { Card } from "../components/Card/Card";

import { CardInfo } from "../App";

type HomeProps = {
  items: CardInfo[];
  searchValue: any;
  onChangeSearchInput: any;
  clearSearchValue: any;
  onAddToCart: any;
  onAddToFavorite: any;
  isLoading: boolean;
};


export const Home: FC<HomeProps> = ({
  items,
  searchValue,
  onChangeSearchInput,
  clearSearchValue,
  onAddToCart,
  onAddToFavorite,
  isLoading,
}) => {
  const renderItems = () => {
    const filteredItems = items && items.filter((item: CardInfo) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase())
    );

    const dummy = [
      {
      cardId: 1,
      title: "Man's shoes Nike Blazer Mid Suede",
      price: 0,
      imageUrl: "./img/sneakers/1.jpg"
      },
      {
      cardId: 2,
      title: "Man's shoes Nike Blazer Mid Suede",
      price: 0,
      imageUrl: "./img/sneakers/1.jpg"
      },
      {
      cardId: 3,
      title: "Man's shoes Nike Blazer Mid Suede",
      price: 0,
      imageUrl: "./img/sneakers/1.jpg"
      },
      {
      cardId: 4,
      title: "Man's shoes Nike Blazer Mid Suede",
      price: 0,
      imageUrl: "./img/sneakers/1.jpg"
      },
    ]
    
    // console.log(isLoading);

    const getItemsToRender = () => {
      if (isLoading) return dummy;
      return filteredItems;
    };

    return getItemsToRender().map((item: CardInfo) => (
      (item && <Card
        key={item.cardId}
        onPlus={(obj: CardInfo) => onAddToCart(obj)}
        onFavorite={onAddToFavorite}
        favorited={false} // check
        loading={isLoading}
        {...item}
      />)
    ));
  };

  return (
    <div className="content p-35">
      <div className="head d-flex justify-between align-center">
        <h1>
          {searchValue
            ? `Search results for the "${searchValue}"`
            : "All sneakers"}
        </h1>

        <div className="search-block d-flex align-center">
          <img
            className="mr-10"
            src="./img/search.svg"
            alt="Search"
            width={16}
            height={16}
          />

          <input
            onChange={onChangeSearchInput}
            value={searchValue}
            placeholder="Search"
          />

          {searchValue && (
            <img
              onClick={clearSearchValue}
              className="btn-clear"
              src="./img/btn-remove.svg"
              alt="Clear"
              width={20}
              height={20}
            />
          )}
        </div>
      </div>

      <div className="cards">{renderItems()}</div>
    </div>
  );
};
