import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/config";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email || !password) {
      setError("Please fill all the fields");
      return;
    }

    try {
      const { data: token } = await axios.post(`${BASE_URL}/auth/login`, {
        email,
        password,
      });
      setSuccess("Login successful!");
      Cookies.set("token", token); // Save the token to cookies

      const decodedToken = jwtDecode(token);
      console.log("Decoded Token:", decodedToken);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    handleSubmit(e);
  };

  return (
    <div className="row">
      <div className="col-3"></div>
      <div className="col-6">
        <div className="container mt-5 ">
          <h2
            className="text-center mt-5"
            style={{
              fontFamily:
                "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif",
            }}
          >
            Welcome back!
          </h2>
          <p
            className="text-center mb-3 fw-normal"
            style={{ fontSize: "18px" }}
          >
            Please login with your account details below.
          </p>
          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-medium fs-5">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label fw-medium fs-5">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="text-center mt-3">
              <button
                type="submit"
                className="btn btn-success mb-4 mt-3"
                onClick={handleClick}
              >
                Login
              </button>

              <p className="mt-4 fw-bold fs-5">
                <a href="/register" className="text-success">CREATE AN ACCOUNT INSTEAD</a>
              </p>
            </div>
          </form>
        </div>
      </div>
      <div className="col-3"></div>
    </div>
  );
};

export default Login;
