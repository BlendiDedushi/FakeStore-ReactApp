import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../helpers/api";
import { useNavigate } from "react-router-dom";
import { getCartItems, getLoggedInUser } from "../helpers/storage";

function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [qty, setQty] = useState(1);
  const [message, setMessage] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    getProductById(id).then((data) => setProduct(data));
  }, [id]);

  const handleQtyChange = (e) => {
    if (e.target.value >= 1) setQty((qty) => e.target.value);
  };
  const handleAddToCart = (e) => {
    e.preventDefault();

    const c_product = {
      id: product.id,
      title: product.title,
      price: product.price,
      qty: e.target.elements[0].value,
    };

    if (getLoggedInUser() !== null) {
      const cart = getCartItems();

      if (cart.length > 0) {
        const _product = cart.filter((p) => p.id == product.id);

        if (_product.length > 0) {
          const updated_product = {
            ..._product[0],
            qty:
              parseInt(_product[0].qty) + parseInt(e.target.elements[0].value),
          };
          localStorage.setItem(
            "cart",
            JSON.stringify([
              ...cart.filter((p) => p.id != product.id),
              updated_product,
            ])
          );
          setMessage("Product was updated at cart!");
        } else {
          localStorage.setItem("cart", JSON.stringify([...cart, c_product]));
          setMessage("New product added to cart!");
        }
      } else {
        localStorage.setItem("cart", JSON.stringify([c_product]));
        setMessage("New product added to cart!");
      }
    } else {
      setMessage("Login first to add to cart!");
    }
  };

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
                onSubmit={handleAddToCart}
                className="add-to-cart w-50 my-4 p-2 d-flex align-items-center"
              >
                <input
                  type="number"
                  value={qty}
                  onChange={handleQtyChange}
                  className="form-control me-2"
                />
                <button type="submit" className="btn btn-outline-primary">
                  Add to cart
                </button>
              </form>
              <hr className="my-3" />
              <small className="text-body-secondary">{message}</small>
            </div>
          </div>
        </div>
      </section>
    )
  );
}

export default Product;
