import React, { FC, useContext } from "react";

import { Card } from "../components/Card/Card";
import { AppContext } from "../context/AppContext";

import { CardInfo, HomeProps } from "../models";

export const Home: FC<HomeProps> = ({
  items,
  searchValue,
  onChangeSearchInput,
  clearSearchValue,
  onAddToCart,
  onAddToFavorites,
  isLoading,
}) => {
  const renderItems = () => {
    const filteredItems = items && items.filter((item: CardInfo) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase())
    );

    const { getItemsToRender } = useContext(AppContext);

    return getItemsToRender(filteredItems).map((item: CardInfo) => (
      (item && <Card
        key={item.id}
        onPlus={(obj: CardInfo) => onAddToCart(obj)}
        onFavorite={onAddToFavorites}
        favorited={false}
        loading={isLoading}
        {...item}
      />)
    ));
  };

  return (
    <div className="content p-35">
      <div className="title d-flex justify-between align-center">
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
