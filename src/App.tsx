import React, { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";

import { Card } from "./components/Card/Card";
import { Header } from "./components/Header";
import { Drawer } from "./components/Drawer";

export type CardInfo = {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
};

// type GetCardResponse = {
//   data: CardInfo[];
// }

function App() {
  const [items, setItems] = useState<[]>([]);
  const [cartItems, setCartItems] = useState<CardInfo[]>([]);
  const [favorites, setFavorites] = useState<CardInfo[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [cartOpened, setCartOpened] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get<any>(
        "https://644155ed792fe886a8a4dd76.mockapi.io/items"
        // https://run.mocky.io/v3/f9ef4bf1-4480-4e1c-ab5d-4d617b956ea0
      )
      .then((res) => {
        setItems(res.data);
      });
    axios
      .get<any>("https://644155ed792fe886a8a4dd76.mockapi.io/cart")
      .then((res) => {
        setCartItems(res.data);
      });
  }, []);

  const onAddToCart = (obj: CardInfo) => {
    axios.post<any>("https://644155ed792fe886a8a4dd76.mockapi.io/cart", obj);
    setCartItems((prev: CardInfo[]) => [...prev, obj]);
  };

  const onAddToFavorite = (obj: CardInfo) => {
    axios.post<any>(
      "https://644155ed792fe886a8a4dd76.mockapi.io/favorites",
      obj
    );
    setFavorites((prev: CardInfo[]) => [...prev, obj]);
  };

  const onRemoveCartItem = (id: number) => {
    axios.delete(`https://644155ed792fe886a8a4dd76.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const clearSearchValue = () => {
    setSearchValue("");
  };

  return (
    <div className="wrapper clear">
      {cartOpened && (
        <Drawer
          items={cartItems}
          onRemoveItem={onRemoveCartItem}
          onClose={() => setCartOpened(false)}
        />
      )}

      <Header onClickCart={() => setCartOpened(true)} />

      <Routes>
        <Route
          path="/"
          element={
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

              <div className="cards">
                {items
                  .filter((item: CardInfo) =>
                    item.title.toLowerCase().includes(searchValue.toLowerCase())
                  )
                  .map((item: CardInfo) => (
                    <Card
                      key={item.id}
                      title={item.title}
                      price={item.price}
                      imageUrl={item.imageUrl}
                      onClickPlus={() => onAddToCart(item)}
                    />
                  ))}
              </div>
            </div>
          }
        ></Route>

        <Route path="/favorites" element={"Test!"}></Route>
      </Routes>
    </div>
  );
}

export default App;
