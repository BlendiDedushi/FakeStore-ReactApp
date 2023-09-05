import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCartItems, getLoggedInUser } from "../helpers/storage";

function NavbarComponent() {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);
  const [cart, setCart] = useState(0);

  useEffect(() => {
    setUser(getLoggedInUser());
    setCart(getCartItems().length);
  });

  const handleLogOut = (e) => {
    localStorage.removeItem("loggedIn");
    navigate("/");
  };
  return (
    <>
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary"
        data-bs-theme="dark"
      >
        <div className="container">
          <Link className="navbar-brand" to="/">
            FakeStore
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              {user !== null && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/cart">
                      Cart {`{${cart}}`}
                    </Link>
                  </li>
                </>
              )}

              <li className="nav-item">
                <Link className="nav-link" to="/products">
                  Products
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {user === null ? "Guest" : user}
                </Link>
                <ul className="dropdown-menu">
                  {user === null ? (
                    <>
                      <li>
                        <Link className="dropdown-item" to="/login">
                          Login
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/register">
                          Register
                        </Link>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <Link className="dropdown-item" to="/orders">
                          Orders
                        </Link>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={handleLogOut}
                        >
                          Logout
                        </button>
                      </li>
                    </>
                  )}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavbarComponent;
