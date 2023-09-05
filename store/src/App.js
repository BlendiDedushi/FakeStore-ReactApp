import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProductsContext } from "./context/ProductsContext";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import NavbarComponent from "./components/NavbarComponent";
import { getProducts } from "./helpers/api";
import FooterComponent from "./components/FooterComponent";
import Products from "./pages/Products";
import Product from "./pages/Product";
import CategoryProducts from "./pages/CategoryProducts";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then((data) => setProducts(data));
  });

  return (
    <>
      <BrowserRouter>
        <NavbarComponent />
        <ProductsContext.Provider value={products}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<Product />} />
            <Route
              path="/products/category/:category"
              element={<CategoryProducts />}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </ProductsContext.Provider>
        <FooterComponent />
      </BrowserRouter>
    </>
  );
}

export default App;
