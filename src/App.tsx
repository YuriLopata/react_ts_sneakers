import React, { useState, useEffect } from "react";
import { Card, CardProps } from "./components/Card/Card";
import { Header } from "./components/Header";
import { Drawer } from "./components/Drawer";

type CardInfo = {
  title: string;
  price: number;
  imageUrl: string;
};

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState<any>([]);
  const [cartOpened, setCartOpened] = useState(false);

  useEffect(() => {
    fetch("https://a31a20b3-b768-432c-8530-0c38622203cd.mock.pstmn.io/sneakers")
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        setItems(json);
      });
  }, []);

  const onAddToCart = (obj: any) => {
    setCartItems((prev: any) => [...prev, obj])
  };

  return (
    <div className="wrapper clear">
      {cartOpened && (
        <Drawer items={cartItems} onClose={() => setCartOpened(false)} />
      )}

      <Header onClickCart={() => setCartOpened(true)} />

      <div className="content p-20">
        <div className="head d-flex justify-between align-center">
          <h1>All sneakers</h1>

          <div className="search-block d-flex align-center">
            <img src="./img/search.svg" alt="Search" width={16} height={16} />

            <input type="text" placeholder="Search" />
          </div>
        </div>

        <div className="cards">
          {items.map((item: CardInfo, i: number) => (
            <Card
              key={i}
              title={item.title}
              price={item.price}
              imageUrl={item.imageUrl}
              onClickFavorite={() => console.log("Added to favorite")}
              onClickPlus={() => onAddToCart(item)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
