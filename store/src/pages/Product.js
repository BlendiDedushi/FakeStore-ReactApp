import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../helpers/api";

function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState();

  useEffect(() => {
    getProductById(id).then((data) => setProduct(data));
  }, [id]);

  return (
    product && (
      <section className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-5">
              <img
                src={product.image}
                className="img-fluid"
                style={{ height: "71.2vh" }}
                alt={product.title}
              />
            </div>
            <div className="col-6 offset-1">
              <h3 className="mb-4 card-title">{product.title}</h3>
              <div className="my-4 p-2">{product.description}</div>
              <div className="my-4 p-2">Category: {product.category} </div>
              <div className="w-25 d-flex justify-content-between my-4 p-2">
                <div>
                  <span>{product.rating.rate} </span>
                  <i className="bi bi-star"></i>
                </div>
                <div>
                  <span>{product.price}</span>
                  <i className="bi bi-currency-euro"></i>
                </div>
              </div>
              <form
                // onSubmit={handleAddToCart}
                className="add-to-cart w-50 my-4 p-2 d-flex align-items-center"
              >
                <input
                  type="number"
                  //   value={qty}
                  //   onChange={handleQtyChange}
                  className="form-control me-2"
                />
                <button type="submit" className="btn btn-outline-primary">
                  Add to cart
                </button>
              </form>
              {/* {message != null && <div className="mt-2">{message}</div>} */}
            </div>
          </div>
        </div>
      </section>
    )
  );
}

export default Product;
