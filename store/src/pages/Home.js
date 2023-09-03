import React, { useContext } from "react";
import SliderComponent from "../components/SliderComponent";
import { images } from "../assets/images";
import CategoriesComponent from "../components/CategoriesComponent";
import BestProductsComponent from "../components/BestProductsComponent";
import { ProductsContext } from "../context/ProductsContext";

function Home() {
  const best_products = useContext(ProductsContext);
  return (
    <div>
      <SliderComponent images={images} />
      <CategoriesComponent />
      <BestProductsComponent best_products={best_products}/>
    </div>
  );
}

export default Home;
