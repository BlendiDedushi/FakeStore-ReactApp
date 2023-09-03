import React from "react";
import ProductComponent from "./ProductComponent";

function BestProductsComponent({ best_products }) {
  return (
    <section className="py-5">
      <div className="container">
        <h2 className="mb-5 text-center">Best Products</h2>
        <div className="scrolll">
          <div className="scroll-inner">
            {best_products !== null &&
              best_products
                .slice()
                .sort((a, b) => b.rating.rate - a.rating.rate)
                .splice(0, 8)
                .map((product) => (
                  <ProductComponent key={product.id} product={product} />
                ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default BestProductsComponent;
