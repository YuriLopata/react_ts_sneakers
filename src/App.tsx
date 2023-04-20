import React, { useState } from "react";
import { Card } from "./components/Card/Card";
import { Header } from "./components/Header";
import { Drawer } from "./components/Drawer";

import { CardProps } from "./components/Card/Card";

type CardInfo = {
  title: string;
  price: number;
  imageUrl: string;
};

const arr: CardInfo[] = [
  {
    title: "Man's shoes Nike Blazer Mid Suede",
    price: 129.99,
    imageUrl: "./img/sneakers/1.jpg",
  },
  {
    title: "Man's shoes Nike Air Max 270",
    price: 149.99,
    imageUrl: "./img/sneakers/2.jpg",
  },
  {
    title: "Man's shoes Nike Blazer Mid Suede",
    price: 84.99,
    imageUrl: "./img/sneakers/3.jpg",
  },
  {
    title: "Shoes Puma X Aka Boku Future Rider",
    price: 88.99,
    imageUrl: "./img/sneakers/4.jpg",
  },
];

function App() {
  const [cartOpened, setCartOpened] = useState(false);

  return (
    <div className="wrapper clear">
      {cartOpened && <Drawer onClose={() => setCartOpened(false)} />}

      <Header onClickCart={() => setCartOpened(true)} />

      <div className="content p-40">
        <div className="d-flex justify-between align-center mb-40">
          <h1>All sneakers</h1>

          <div className="search-block d-flex align-center">
            <img src="./img/search.svg" alt="Search" width={16} height={16} />

            <input type="text" placeholder="Search" />
          </div>
        </div>

        <div className="d-flex">
          {arr.map((obj: CardInfo, i: number) => (
            <Card
              key={i}
              title={obj.title}
              price={obj.price}
              imageUrl={obj.imageUrl}
              onClickFavorite={() => console.log("Added to favorite")}
              onClickPlus={() => console.log("Added to cart")}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
