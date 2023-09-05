import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCartItems, getLoggedInUser, getOrders } from "../helpers/storage";

function Checkout() {
  const [message, setMessage] = useState();
  const navigate = useNavigate();

  useEffect(() => { 
    if (getLoggedInUser() === null) {
      navigate("/");
    }
  }, [navigate]);

  const handleCheckout = (e) => {
    e.preventDefault();

    const items = getCartItems();

    const order = {
      fullname: e.target.elements[0].value,
      email: e.target.elements[1].value, 
      address: e.target.elements[2].value,
      items: items,
    };

    const orders = [...getOrders(), order];

    localStorage.setItem("orders", JSON.stringify(orders));
    localStorage.removeItem("cart");

    navigate("/orders");
  };

  return (
    <section className="py-5">
      <div className="container d-flex justify-content-center">
        <div className="card w-50">
          <div className="card-body">
            <h5 className="card-title mb-4">Checkout</h5>
            {message != null && <div className="mb-4">{message}</div>}
            <form onSubmit={handleCheckout}>
              <div className="mb-3">
                <label htmlFor="fullname" className="form-label">
                  Fullname
                </label>
                <input
                  type="text"
                  className="form-control"
                  required
                  id="fullname"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  required
                  id="email"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="address" className="form-label">
                  Address
                </label>
                <textarea
                  className="form-control"
                  required
                  id="address"
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">
                Checkout
              </button>
              <Link to="/cart" className="btn btn-link ms-3">
                Back to cart
              </Link>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Checkout;
