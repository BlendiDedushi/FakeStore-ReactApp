import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProductsContext } from "./context/ProductsContext";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import NavbarComponent from "./components/NavbarComponent";
import { getProducts } from "./helpers/api";
import FooterComponent from "./components/FooterComponent";
import Products from "./pages/Products";
import Product from "./pages/Product";

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
          </Routes>
        </ProductsContext.Provider>
        <FooterComponent />
      </BrowserRouter>
    </>
  );
}

export default App;
