import React, { useState, useEffect, FC, useCallback } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";

import { Home } from "./pages/Home";
import { Favorites } from "./pages/Favorites";
import { Header } from "./components/Header/Header";
import { Drawer } from "./components/Drawer/Drawer";

import { AppContext } from "./context/AppContext";
import { CardInfo } from "./models";
import { Orders } from "./pages/Orders";

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
      try {
        const [cartResponse, favoritesResponse, itemsResponse] =
          await Promise.all([
            axios.get<any>("https://644155ed792fe886a8a4dd76.mockapi.io/cart"),
            axios.get<any>("https://644155ed792fe886a8a4dd76.mockapi.io/items"),
            axios.get<any>(
              "https://run.mocky.io/v3/97087f60-9158-436c-87e6-0b64191e453c"
            ),
          ]);

        setIsLoading(false);

        setCartItems(cartResponse.data);
        setFavorites(favoritesResponse.data);
        setItems(itemsResponse.data);
      } catch (error) {
        alert("Failed to request data");
        console.error(error);
      }
    }

    fetchData();
  }, []);

  const onRemoveCartItem = (id: number) => {
    try {
      axios.delete(`https://644155ed792fe886a8a4dd76.mockapi.io/cart/${id}`);

      setCartItems((prev: CardInfo[]) =>
        prev.filter((item) => Number(item.id) !== Number(id))
      );
    } catch (error) {
      alert("Failed to remove from cart");
      console.error(error);
    }
  };

  const onAddToCart = async (obj: CardInfo) => {
    const findItem = cartItems.find(
      (cartItem: CardInfo) => Number(cartItem.parentId) === Number(obj.id)
    );
    try {
      if (findItem) {
        // console.log("delete: ", obj.id);

        setCartItems((prev: any) =>
          prev.filter((item: any) => Number(item.parentId) !== Number(obj.id))
        );
        await axios.delete(
          `https://644155ed792fe886a8a4dd76.mockapi.io/cart/${findItem.id}`
        );
      } else {
        // console.log("post", obj);

        setCartItems((prev: CardInfo[]) => [...prev, obj]);
        const { data } = await axios.post<any>(
          "https://644155ed792fe886a8a4dd76.mockapi.io/cart",
          obj
        );
        setCartItems((prev: any) =>
          prev.map((item: any) => {
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

  const onAddToFavorites = async (obj: CardInfo) => {
    try {
      if (
        favorites.find(
          (favObj: CardInfo) => Number(favObj.id) === Number(obj.id)
        )
      ) {
        await axios.delete(
          `https://644155ed792fe886a8a4dd76.mockapi.io/items/${Number(obj.id)}` // favorites
        );
        setFavorites(
          (
            prev: CardInfo[] // FIX! maybe create state is favorites page and save fav.items in it
          ) => prev.filter((item) => Number(item.id) !== Number(obj.id))
        );
        return;
      }
      const { data } = await axios.post<any>(
        "https://644155ed792fe886a8a4dd76.mockapi.io/items", // favorites
        obj
      );
      setFavorites((prev: CardInfo[]) => [...prev, data]);
    } catch (error) {
      alert("Failed to remove/add to favorites");
      console.error(error);
    }
  };

  const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const clearSearchValue = () => {
    setSearchValue("");
  };

  // const checkAdded = (id: number) => {
  //   return cartItems.some((obj) => Number(obj.parentId) === Number(id));
  // };

  const checkAdded = useCallback(
    (id: number) => {
      return cartItems.some(
        (obj: CardInfo) => Number(obj.parentId) === Number(id)
      );
    },
    [cartItems]
  );

  const fakeArr = [
    {
      id: 1,
      title: "",
      price: 0,
      imageUrl: "",
    },
    {
      id: 2,
      title: "",
      price: 0,
      imageUrl: "",
    },
    {
      id: 3,
      title: "",
      price: 0,
      imageUrl: "",
    },
    {
      id: 4,
      title: "",
      price: 0,
      imageUrl: "",
    },
  ];

  const getItemsToRender = (arr: []) => {
    if (isLoading) return fakeArr;
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
        <Drawer
          items={cartItems}
          onRemoveItem={onRemoveCartItem}
          onClose={() => setCartOpened(false)}
          opened={cartOpened}
        />

        <Header onClickCart={() => setCartOpened(true)} />

        <Routes>
          <Route
            path=""
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
            path="favorites"
            element={
              <Favorites
                onAddToCart={onAddToCart}
                onAddToFavorites={onAddToFavorites}
                isLoading={isLoading}
              />
            }
          ></Route>

          <Route
            path="orders"
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
