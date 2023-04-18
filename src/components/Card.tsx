import React from "react";

export const Card = () => {
  return (
    <div className="card">
      <div className="favorite">
        <img src="./img/heart-unliked.svg" alt="Unliked" />
      </div>

      <img width={133} height={112} src="./img/sneakers/1.jpg" alt="" />

      <h5>Men's Shoes Nike Blazer Mid Suede</h5>

      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
          <span>Price:</span>

          <b>$130.00</b>
        </div>

        <button className="button">
          <img width={11} height={11} src="./img/add.svg" alt="" />
        </button>
      </div>
    </div>
  );
};
