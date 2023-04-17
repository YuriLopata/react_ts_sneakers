import React from "react";

function App() {
  return (
    <div className="wrapper clear">
      <header className="d-flex justify-between align-center p-40">
        <div className="d-flex align-center">
          <img width={40} height={40} src="/img/logo.png" />

          <div className="headerInfo">
            <h3 className="text-uppercase">React sneakers</h3>

            <p className="opacity-5">The best sneakers store</p>
          </div>
        </div>

        <ul className="d-flex align-center">
          <li className="d-flex align-center mr-30">
            <img width={18} height={18} src="/img/cart.svg" />

            <span>13$</span>
          </li>

          <li className="d-flex align-center">
            <img width={18} height={18} src="./img/user.svg" />
          </li>
        </ul>
      </header>

      <div className="content p-40">
        <h1 className="mb-40">All sneakers</h1>

        <div className="d-flex">
          <div className="card">
            <img width={133} height={112} src="./img/sneakers/1.jpg" alt="" />
  
            <h5>Men's Shoes Nike Blazer Mid Suede</h5>
  
            <div className="d-flex justify-between align-center">
              <div className="d-flex flex-column">
                <span>Price:</span>
  
                <b>13$</b>
              </div>
  
              <button className="button">
                <img width={11} height={11} src="./img/add.svg" alt="" />
              </button>
            </div>
          </div>
  
          <div className="card">
            <img width={133} height={112} src="./img/sneakers/2.jpg" alt="" />
  
            <h5>Men's Shoes Nike Blazer Mid Suede</h5>
  
            <div className="d-flex justify-between align-center">
              <div className="d-flex flex-column">
                <span>Price:</span>
  
                <b>13$</b>
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
  
                <b>13$</b>
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
  
                <b>13$</b>
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
