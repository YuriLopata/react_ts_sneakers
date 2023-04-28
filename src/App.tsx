import React, { useState, useEffect, FC, createContext } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";

import { Home } from "./pages/Home";
import { Favorites } from "./pages/Favorites";
import { Header } from "./components/Header";
import { Drawer } from "./components/Drawer";

export type CardInfo = {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
};

export const AppContext = createContext({})

// type GetCardResponse = {
//   data: CardInfo[];
// }

const App: FC = () => {
  const [items, setItems] = useState<[]>([]);
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
        "https://run.mocky.io/v3/0004d04a-ea7c-4c16-9c3d-9eadcef469a7"
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
          (cartItem: CardInfo) => Number(cartItem.id) === Number(obj.id)
        )
      ) {
        console.log("delete", obj);

        axios.delete(
          `https://644155ed792fe886a8a4dd76.mockapi.io/cart/${obj.id}` // cart items
        );
        setCartItems((prev: CardInfo[]) =>
          prev.filter((item) => Number(item.id) !== Number(obj.id))
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

  const onAddToFavorite = async (obj: CardInfo) => {
    console.log(obj);

    try {
      if (favorites.find((favObj) => favObj.id === obj.id)) {
        axios.delete(
          `https://644155ed792fe886a8a4dd76.mockapi.io/items/${obj.id}` // favorite items
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

  const onRemoveCartItem = (id: number) => {
    axios.delete(`https://644155ed792fe886a8a4dd76.mockapi.io/cart/${id}`); // cart items
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const clearSearchValue = () => {
    setSearchValue("");
  };

  return (
    <AppContext.Provider value={{ items, cartItems, favorites }}>
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
                cartItems={cartItems}
                searchValue={searchValue}
                onChangeSearchInput={onChangeSearchInput}
                clearSearchValue={clearSearchValue}
                onAddToCart={onAddToCart}
                onAddToFavorite={onAddToFavorite}
                isLoading={isLoading}
              />
            }
          ></Route>
  
          <Route
            path="/favorites"
            element={
              <Favorites
                onAddToCart={onAddToCart}
                onAddToFavorite={onAddToFavorite}
              />
            }
          ></Route>
        </Routes>
      </div>
    </AppContext.Provider>
  );
};

export default App;
