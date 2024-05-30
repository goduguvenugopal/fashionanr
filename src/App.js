import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Products from "./components/Products";
import SingleProduct from "./components/SingleProduct";
import Cart from "./components/Cart";
import { createContext, useState } from "react";
import Signup from "./components/Signup";
import Login from "./components/Login";

export const cartContext = createContext();

function App() {
  const [cart, setCart] = useState([]);

  return (
    <>
      <cartContext.Provider value={[cart, setCart]}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<SingleProduct />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/signup" element={<Signup/>} />
            <Route path="/login" element={<Login/>} />
          </Routes>
        </BrowserRouter>
      </cartContext.Provider>
    </>
  );
}

export default App;
