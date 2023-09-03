import React from "react";
import { Link } from "react-router-dom";

function ProductComponent({ product }) {
  return (
    <div className="card">
      <img
        src={product.image}
        className="card-img-top p-3"
        style={{ height: "30vh" }}
        alt={product.title}
      />
      <div
        className="card-body border d-flex flex-column justify-content-between"
        style={{ height: "25vh" }}
      >
        <h5 className="card-title">{product.title}</h5>
        <div className="card-text">
          <div className="d-flex justify-content-between">
            <div>
              <span>{product.rating.rate} </span>
              <i className="bi bi-star"></i>
            </div>
            <div>
              <span>{product.price}</span>
              <i className="bi bi-currency-euro"></i>
            </div>
            <Link
              to={`/products/${product.id}`}
              className="btn btn-sm btn-outline-dark"
            >
              <i className="bi bi-eye"></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductComponent;
