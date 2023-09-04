import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getLoggedInUser, getUsers } from "../helpers/storage";

function Login() {
  const navigate = useNavigate();
  const [message, setMessage] = useState();

  useEffect(() => {
    if (getLoggedInUser() !== null) {
      navigate("/products");
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();

    const user = {
      username: e.target.elements[0].value,
      password: e.target.elements[1].value,
    };

    const users = getUsers();
    const userExists = users.find(
      (u) => u.username === user.username && u.password === user.password
    );

    if (userExists) {
      localStorage.setItem("loggedIn", JSON.stringify(user.username));
      navigate("/products");
    } else {
      setMessage("Incorrect username and/or password!");
    }
  };

  return (
    <section style={{ height: "84.5vh" }}>
      <div
        className="modal modal-sheet position-static d-block bg-body-secondary p-4 py-md-5"
        tabIndex="-1"
        role="dialog"
        id="modalSignin"
      >
        <div className="modal-dialog mt-5" role="document">
          <div className="modal-content rounded-4 shadow">
            <div className="modal-header p-5 pb-4 border-bottom-0">
              <h1 className="fw-bold mb-0 fs-2">Login</h1>
              <Link to="/register" className="link-opacity-75-hover">
                Register <i className="bi bi-arrow-right-short"></i>
              </Link>
            </div>

            <div className="modal-body p-5 pt-0">
              <form onSubmit={handleLogin}>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control rounded-3"
                    id="username"
                    placeholder="name@example.com"
                  />
                  <label htmlFor="username">Username</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className="form-control rounded-3"
                    id="password"
                    placeholder="Password"
                  />
                  <label htmlFor="password">Password</label>
                </div>
                <button
                  className="w-100 mb-2 btn btn-lg rounded-3 btn-outline-secondary"
                  type="submit"
                >
                  Sign in
                </button>
                <hr className="my-3" />
                <small className="text-body-secondary">{message}</small>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
