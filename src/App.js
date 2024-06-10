import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Products from "./components/Products";
import SingleProduct from "./components/SingleProduct";
import Cart from "./components/Cart";
import { createContext, useEffect, useState } from "react";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Footer from "./components/Footer";
import Account from "./components/Account";
import ForgotPassword from "./components/ForgotPassword";
import Address from "./components/Address";
import ContactUs from "./components/ContactUs";
import DeliveryAddress  from "./components/DeliveryAddress";
 

export const cartContext = createContext();
export const tokenContext = createContext();

function App() {
  const [cart, setCart] = useState([]);
  const [token, setToken] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(JSON.parse(token));
    }

    const localStorageCart = localStorage.getItem("cart")
    if(localStorageCart){
      setCart(JSON.parse(localStorageCart))
    } 
  }, [token]);

  return (
    <>
      <tokenContext.Provider value={[token, setToken]}>
        <cartContext.Provider value={[cart, setCart]}>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<SingleProduct />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/footer" element={<Footer />} />
              <Route path="/account" element={<Account />} />
              <Route path="/password" element={<ForgotPassword />} />
              <Route path="/address" element={<Address/>} />
              <Route path="/contact" element={<ContactUs/>}/>
              <Route path="/delivery" element={<DeliveryAddress/>}/>

            </Routes>
          </BrowserRouter>
        </cartContext.Provider>
      </tokenContext.Provider>
    </>
  );
}

export default App;
