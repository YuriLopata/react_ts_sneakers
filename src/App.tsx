import React, { useState, useEffect, FC } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";

import { Home } from "./pages/Home";
import { Favorites } from "./pages/Favorites";
import { Header } from "./components/Header/Header";
import { Drawer } from "./components/Drawer/Drawer";

import { AppContext } from "./context/AppContext";
import {
  CardInfo,
  CreateCardResponse,
  DeleteCardResponse,
  GetCardResponse,
} from "./models";
import { Orders } from "./pages/Orders";

const App: FC = () => {
  const [items, setItems] = useState<CardInfo[]>([]);
  const [cartItems, setCartItems] = useState<CardInfo[]>([]);
  const [favorites, setFavorites] = useState<CardInfo[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [cartOpened, setCartOpened] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData(): Promise<void> {
      try {
        const [
          cartResponse,
          favoritesResponse,
          itemsResponse,
        ]: GetCardResponse[] = await Promise.all<GetCardResponse>([
          axios.get("https://644155ed792fe886a8a4dd76.mockapi.io/cart"),
          axios.get("https://644155ed792fe886a8a4dd76.mockapi.io/items"),
          axios.get(
            "https://run.mocky.io/v3/b25bbb75-b5d1-4d76-83b6-a2b0e2a95420"
          ),
        ]);

        setIsLoading(false);

        setFavorites(favoritesResponse.data);
        setCartItems(cartResponse.data);
        setItems(itemsResponse.data);
      } catch (error) {
        alert("Failed to request data");
        console.error(error);
      }
    }

    fetchData();
  }, []);

  const onRemoveCartItem = (id: number): void => {
    try {
      axios.delete<DeleteCardResponse>(
        `https://644155ed792fe886a8a4dd76.mockapi.io/cart/${id}`
      );

      setCartItems((prev: CardInfo[]) =>
        prev.filter((item: CardInfo) => Number(item.id) !== Number(id))
      );
    } catch (error) {
      alert("Failed to remove from cart");
      console.error(error);
    }
  };

  const onAddToCart = async (obj: CardInfo): Promise<void> => {
    const findItem: CardInfo | undefined = cartItems.find(
      (cartItem: CardInfo) => Number(cartItem.parentId) === Number(obj.id)
    );

    try {
      if (findItem) {
        await axios.delete(
          `https://644155ed792fe886a8a4dd76.mockapi.io/cart/${findItem.id}`
        );

        setCartItems((prev: CardInfo[]) =>
          prev.filter(
            (item: CardInfo) => Number(item.parentId) !== Number(obj.id)
          )
        );
      } else {
        setCartItems((prev: CardInfo[]) => [...prev, obj]);
        const { data } = await axios.post<CreateCardResponse>(
          "https://644155ed792fe886a8a4dd76.mockapi.io/cart",
          obj
        );
        setCartItems((prev: CardInfo[]) =>
          prev.map((item: CardInfo) => {
            if (item.parentId === data.parentId) {
              return { ...item, id: data.id };
            }
            return item;
          })
        );
      }
    } catch (error) {
      alert("Failed to remove/add to cart");
      console.error(error);
    }
  };

  const onAddToFavorites = async (obj: CardInfo): Promise<void> => {
    const findItem: CardInfo | undefined = favorites.find(
      (favItem: CardInfo) => Number(favItem.parentId) === Number(obj.id)
    );

    try {
      if (findItem) {
        await axios.delete<DeleteCardResponse>(
          `https://644155ed792fe886a8a4dd76.mockapi.io/items/${findItem.id}` // favorites
        );
        setFavorites((prev: CardInfo[]) =>
          prev.filter(
            (item: CardInfo) => Number(item.parentId) !== Number(obj.id)
          )
        );
      } else {
        const { data } = await axios.post<CreateCardResponse>(
          "https://644155ed792fe886a8a4dd76.mockapi.io/items", // favorites
          obj
        );
        setFavorites((prev: CardInfo[]) => [...prev, data]);
      }
    } catch (error) {
      alert("Failed to remove/add to favorites");
      console.error(error);
    }
  };

  const onChangeSearchInput = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSearchValue(e.target.value);
  };

  const clearSearchValue = (): void => {
    setSearchValue("");
  };

  const checkAdded = (id?: number, arr?: CardInfo[]): boolean => {
    return !!arr?.some((obj: CardInfo) => Number(obj.parentId) === Number(id));
  };

  const fakeArr: CardInfo[] = [
    { id: 1, title: "", price: 0, imageUrl: "" },
    { id: 2, title: "", price: 0, imageUrl: "" },
    { id: 3, title: "", price: 0, imageUrl: "" },
    { id: 4, title: "", price: 0, imageUrl: "" },
  ];

  const getItemsToRender = (arr: CardInfo[]): CardInfo[] => {
    if (isLoading) return fakeArr;
    return arr;
  };

  const hideScrollbar = (): void => {
    document.body.classList.toggle("hideScrollbar");
  };

  const onClickCart = (condition: boolean): void => {
    setCartOpened(condition);
    hideScrollbar();
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
        <Drawer
          items={cartItems}
          onRemoveItem={onRemoveCartItem}
          onClose={() => onClickCart(false)}
          opened={cartOpened}
        />

        <Header onClickCart={() => onClickCart(true)} />

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

          <Route
            path="/orders"
            element={
              <Orders
                onAddToCart={onAddToCart}
                onAddToFavorites={onAddToFavorites}
              />
            }
          ></Route>
        </Routes>
      </div>
    </AppContext.Provider>
  );
};

export default App;
