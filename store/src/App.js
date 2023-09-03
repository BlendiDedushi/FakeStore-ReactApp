import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProductsContext } from "./context/ProductsContext";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import NavbarComponent from "./components/NavbarComponent";
import { getProducts } from "./helpers/api";
import FooterComponent from "./components/FooterComponent";

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
          </Routes>
        </ProductsContext.Provider>
        <FooterComponent />
      </BrowserRouter>
    </>
  );
}

export default App;
