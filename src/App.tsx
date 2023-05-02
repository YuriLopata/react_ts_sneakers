import React, { useState, useEffect, FC, useCallback } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";

import { Home } from "./pages/Home";
import { Favorites } from "./pages/Favorites";
import { Header } from "./components/Header";
import { Drawer } from "./components/Drawer";

import { AppContext } from "./context/AppContext";

export type CardInfo = {
  cardId: number;
  title: string;
  price: number;
  imageUrl: string;
};

// type GetCardResponse = {
//   data: CardInfo[];
// }

const App: FC = () => {
  const [items, setItems] = useState<CardInfo[]>([]);
  const [cartItems, setCartItems] = useState<CardInfo[]>([]);
  const [favorites, setFavorites] = useState<CardInfo[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [cartOpened, setCartOpened] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      const cartResponse = await axios.get<any>(
        "https://644155ed792fe886a8a4dd76.mockapi.io/cart"
      );
      const favoritesResponse = await axios.get<any>(
        "https://644155ed792fe886a8a4dd76.mockapi.io/items"
      );
      const itemsResponse = await axios.get<any>(
        "https://run.mocky.io/v3/f62c5f38-0006-4fb7-aafe-25ee599d7f58"
      );

      setIsLoading(false);

      setCartItems(cartResponse.data);
      setFavorites(favoritesResponse.data);
      setItems(itemsResponse.data);
    }

    fetchData();
  }, []);

  const onAddToCart = (obj: CardInfo) => {
    try {
      if (
        cartItems.find(
          (cartItem: CardInfo) => Number(cartItem.cardId) === Number(obj.cardId)
        )
      ) {
        console.log("delete find", obj);

        axios.delete(
          `https://644155ed792fe886a8a4dd76.mockapi.io/cart/${Number(obj.cardId)}` // cart items
        );
        setCartItems((prev: CardInfo[]) =>
          prev.filter((item) => Number(item.cardId) !== Number(obj.cardId))
        );
      } else {
        console.log("post", obj);

        axios.post<any>(
          "https://644155ed792fe886a8a4dd76.mockapi.io/cart", // cart items
          obj
        );
        setCartItems((prev: CardInfo[]) => [...prev, obj]);
      }
    } catch (error) {
      alert("Failed to add to cart");
    }
  };

  const onAddToFavorites = async (obj: CardInfo) => {
    try {
      if (
        favorites.find(
          (favObj: CardInfo) => Number(favObj.cardId) === Number(obj.cardId)
        )
      ) {
        axios.delete(
          `https://644155ed792fe886a8a4dd76.mockapi.io/items/${Number(obj.cardId)}` // favorite items
        );
        setFavorites(
          (
            prev: CardInfo[] // FIX! maybe create state is favorites page and save fav.items in it
          ) => prev.filter((item) => Number(item.cardId) !== Number(obj.cardId))
        );
        return;
      }
      const { data } = await axios.post<any>(
        "https://644155ed792fe886a8a4dd76.mockapi.io/items", // favorite items
        obj
      );
      setFavorites((prev: CardInfo[]) => [...prev, data]);
    } catch (error) {
      alert("Failed to add to favorites");
    }
  };

  const onRemoveCartItem = (cardId: number) => {
    axios.delete(`https://644155ed792fe886a8a4dd76.mockapi.io/cart/${Number(cardId)}`); // cart items
    setCartItems((prev) => prev.filter((item) => Number(item.cardId) !== Number(cardId)));
  };

  const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const clearSearchValue = () => {
    setSearchValue("");
  };

  // const checkAdded = (cardId: number) => {
  //   return cartItems.some((obj) => Number(obj.cardId) === Number(cardId))
  // }

  const checkAdded = useCallback(
    (itemId: number) => {
      return cartItems.some(
        (obj: CardInfo) => Number(obj.cardId) === Number(itemId)
      );
    },
    [cartItems]
  );

  const dummy = [
    {
      cardId: 1,
      title: "Man's shoes Nike Blazer Mid Suede",
      price: 0,
      imageUrl: "./img/sneakers/1.jpg",
    },
    {
      cardId: 2,
      title: "Man's shoes Nike Blazer Mid Suede",
      price: 0,
      imageUrl: "./img/sneakers/1.jpg",
    },
    {
      cardId: 3,
      title: "Man's shoes Nike Blazer Mid Suede",
      price: 0,
      imageUrl: "./img/sneakers/1.jpg",
    },
    {
      cardId: 4,
      title: "Man's shoes Nike Blazer Mid Suede",
      price: 0,
      imageUrl: "./img/sneakers/1.jpg",
    },
  ];

  const getItemsToRender = (arr: any) => {
    if (isLoading) return dummy;
    return arr;
  };

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favorites,
        checkAdded,
        getItemsToRender,
        setCartOpened,
        setCartItems,
      }}
    >
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
              <Home
                items={items}
                searchValue={searchValue}
                onChangeSearchInput={onChangeSearchInput}
                clearSearchValue={clearSearchValue}
                onAddToCart={onAddToCart}
                onAddToFavorites={onAddToFavorites}
                isLoading={isLoading}
              />
            }
          ></Route>

          <Route
            path="/favorites"
            element={
              <Favorites
                onAddToCart={onAddToCart}
                onAddToFavorites={onAddToFavorites}
                isLoading={isLoading}
              />
            }
          ></Route>
        </Routes>
      </div>
    </AppContext.Provider>
  );
};

export default App;
