import React, { FC, useContext, useEffect, useState } from "react";
import { CardInfo } from "../models";
import { Card } from "../components/Card/Card";

import { AppContext } from "../context/AppContext";
import { OrdersProps } from "../models";
import { Info } from "../components/Info/Info";
// import axios from "axios";

export const Orders: FC<OrdersProps> = ({ onAddToFavorites }) => {
  //   const { favorites, getItemsToRender } = useContext(AppContext);
  const { getItemsToRender } = useContext(AppContext);
  const [orders, setOrders] = useState<[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      try {
        // const { data } = await axios.get(
        //   "https://644155ed792fe886a8a4dd76.mockapi.io/orders"
        // );
        // setOrders(data.reduce((prev: [], obj: []) => [...prev, ...obj], []));
        // setIsLoading(false);
      } catch (error) {
        alert("Failed to get orders!");
        console.error(error);
      }
    }

    fetchData();
  }, []);

  // console.log(favorites);

  return orders.length > 0 ? (
    <div className="content p-35">
      <div className="title d-flex justify-between align-center">
        <h1>My orders</h1>
      </div>

      <div className="cards">
        {getItemsToRender(orders).map(
          (item: CardInfo) =>
            item && (
              <Card
                key={Number(item.id)}
                onFavorite={onAddToFavorites}
                favorited={false}
                loading={isLoading}
                {...item}
              />
            )
        )}
      </div>
    </div>
  ) : (
    <Info
      inCart={false}
      img={"./img/empty-cart.jpg"}
      title={"You haven't made any orders yet"}
      desc={"Click to choose your sneakers!"}
    />
  );
};
