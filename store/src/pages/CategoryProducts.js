import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductsByCategory } from "../helpers/api";
import ProductComponent from "../components/ProductComponent";

function CategoryProducts() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProductsByCategory(category).then((data) => setProducts(data));
  }, [category]);

  return (
    <div style={{ minHeight: "84.5vh" }}>
      <div className="container py-4">
        <div className="row">
          {products !== null &&
            products.map((product) => (
              <div className="col-3 mb-3" key={product.id}>
                <ProductComponent product={product} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default CategoryProducts;
