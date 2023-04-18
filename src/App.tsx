import React from "react";
import { Card } from "./components/Card";
import { Header } from "./components/Header";
import { Drawer } from "./components/Drawer";

function App() {
  return (
    <div className="wrapper clear">
      <Drawer />

      <Header />

      <div className="content p-40">
        <div className="d-flex justify-between align-center mb-40">
          <h1>All sneakers</h1>

          <div className="search-block d-flex align-center">
            <img src="./img/search.svg" alt="Search" width={16} height={16} />

            <input type="text" placeholder="Search" />
          </div>
        </div>

        <div className="d-flex">
          <Card />
          <Card />
          <Card />
          <Card />

          <div className="card">
            <img width={133} height={112} src="./img/sneakers/2.jpg" alt="" />

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

          <div className="card">
            <img width={133} height={112} src="./img/sneakers/3.jpg" alt="" />

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

          <div className="card">
            <img width={133} height={112} src="./img/sneakers/4.jpg" alt="" />

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
        </div>
      </div>
    </div>
  );
}

export default App;
