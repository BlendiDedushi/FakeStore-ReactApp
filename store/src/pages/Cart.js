import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getCartItems, getLoggedInUser } from "../helpers/storage";
import Button from "react-bootstrap/Button";

function Cart() {
  const navigate = useNavigate();
  const [items, setItems] = useState();
  let total = 0.0;
  const [editableItems, setEditableItems] = useState({});

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

  const handleDeleteItem = (itemId) => {
    const updatedItems = items.filter((item) => item.id !== itemId);
    setItems(updatedItems);
    localStorage.setItem("cart", JSON.stringify(updatedItems));
  };

  const handleToggleEdit = (itemId) => {
    setEditableItems((prevEditableItems) => ({
      ...prevEditableItems,
      [itemId]: !prevEditableItems[itemId],
    }));
  };
  return (
    <section className="py-5" style={{ height: "84.5vh" }}>
      <div className="container">
        {items && items.length > 0 ? (
          <>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="mb-4">
                {items.length == 1 ? `1 product` : `${items.length} products`} -{" "}
                <i className="bi bi-cart-plus-fill"></i>
              </h3>
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
            <table className="table table-bordered">
              <thead>
                <tr className="table-dark">
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
                      <td className="d-flex justify-content-center">
                        {editableItems[item.id] ? (
                          <input
                            type="number"
                            min="1"
                            value={item.qty}
                            onChange={(e) => {
                              const newQty = Math.max(
                                1,
                                parseInt(e.target.value)
                              );
                              const updatedItems = items.map((i) =>
                                i.id === item.id ? { ...i, qty: newQty } : i
                              );
                              setItems(updatedItems);
                              localStorage.setItem(
                                "cart",
                                JSON.stringify(updatedItems)
                              );
                            }}
                            style={{maxWidth:"100px"}}
                          />
                        ) : (
                          item.qty
                        )}
                      </td>
                      <td className="text-end">
                        {item.price.toFixed(2)} &euro;
                      </td>
                      <td className="d-flex justify-content-between">
                        <b>
                          {(item.qty * parseFloat(item.price)).toFixed(2)}{" "}
                          &euro;
                        </b>
                        <div>
                          <Button
                            variant="outline-primary"
                            size="sm"
                            className="bi bi-pencil-square"
                            onClick={() => handleToggleEdit(item.id)}
                          ></Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            className="bi bi-trash3 mx-2"
                            onClick={() => handleDeleteItem(item.id)}
                          ></Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="4"></td>
                  <td className="text-end table-dark">
                    <h4>{total.toFixed(2)} &euro;</h4>
                  </td>
                </tr>
              </tfoot>
            </table>
          </>
        ) : (
          <>
            <h1>Cart is empty!</h1>
          </>
        )}
      </div>
    </section>
  );
}

export default Cart;
