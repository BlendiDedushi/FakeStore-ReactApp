import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUsers, getLoggedInUser } from "../helpers/storage";

function Register() {
  const navigate = useNavigate();
  const [message, setMessage] = useState(
    "By clicking Sign up, you agree to the terms of use."
  );

  useEffect(() => {
    if (getLoggedInUser() !== null) {
      navigate("/products");
    }
  }, [navigate]);

  const handleRegister = (e) => {
    e.preventDefault();
    const user = {
      username: e.target.elements[0].value,
      email: e.target.elements[1].value,
      password: e.target.elements[2].value,
    };

    const users = getUsers();

    if (users.length > 0) {
      const userExists = users.find((u) => u.email === user.email);
      if (userExists) {
        setMessage("Email is not valid!");
      } else {
        localStorage.setItem("users", JSON.stringify([...users, user]));
        navigate("/login");
      }
    } else {
      localStorage.setItem("users", JSON.stringify([user]));
      navigate("/login");
    }
  };
  return (
    <section style={{ height: "84.5vh" }}>
      <div
        className="modal modal-sheet position-static d-block bg-body-secondary p-4 py-md-3"
        tabIndex="-1"
        role="dialog"
        id="modalSignin"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content rounded-4 shadow">
            <div className="modal-header p-5 pb-4 border-bottom-0">
              <h1 className="fw-bold mb-0 fs-2">Register</h1>
              <Link to="/login" className="link-opacity-75-hover">
                Login <i className="bi bi-arrow-right-short"></i>
              </Link>
            </div>

            <div className="modal-body p-5 pt-0">
              <form onSubmit={handleRegister}>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control rounded-3"
                    id="username"
                    placeholder="username"
                  />
                  <label htmlFor="username">Username</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control rounded-3"
                    id="email"
                    placeholder="name@example.com"
                  />
                  <label htmlFor="email">Email address</label>
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
                  className="w-100 mb-3 btn btn-lg rounded-3 btn-outline-primary"
                  type="submit"
                >
                  Sign up
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

export default Register;
