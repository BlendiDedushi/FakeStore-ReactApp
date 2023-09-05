import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getCartItems, getLoggedInUser } from "../helpers/storage";

function Cart() {
  const navigate = useNavigate();
  const [items, setItems] = useState();
  let total = 0.0;

  useEffect(() => {
    setItems(getCartItems());
    if (getLoggedInUser() === null) {
      navigate("/");
    }
  }, [navigate]);

  const handleEmptyCart = (e) => {
    localStorage.removeItem("cart");
    navigate("/");
  };

  return (
    <section className="py-5">
      <div className="container">
        {items && items.length > 0 ? (
          <>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="mb-4">{items.length} products</h3>
              <div>
                <Link to="/checkout" className="btn btn-outline-primary">
                  <i className="bi bi-wallet"></i> Checkout
                </Link>
                <button
                  onClick={handleEmptyCart}
                  className="btn btn-outline-danger ms-2"
                >
                  <i className="bi bi-trash3"></i> Empty cart
                </button>
              </div>
            </div>
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => {
                  total += item.qty * parseFloat(item.price);

                  return (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.title}</td>
                      <td className="text-end">{item.qty}</td>
                      <td className="text-end">
                        {item.price.toFixed(2)} &euro;
                      </td>
                      <td className="text-end">
                        {(item.qty * parseFloat(item.price)).toFixed(2)} &euro;
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="4"></td>
                  <td className="text-end table-active">
                    <h4>{total.toFixed(2)} &euro;</h4>
                  </td>
                </tr>
              </tfoot>
            </table>
          </>
        ) : (
          <p>Cart is empty!</p>
        )}
      </div>
    </section>
  );
}

export default Cart;
