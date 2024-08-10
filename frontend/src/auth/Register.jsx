import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/config";

const Register = ({ setShowLogin  }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name || !email || !password) {
      setError("Please fill all the fields");
      return;
    }

    try {
      const { data } = await axios.post(`${BASE_URL}/auth/register`, {
        name,
        email,
        password,
      });
      setSuccess("User registered successfully!");

      localStorage.setItem("userInfo", JSON.stringify(data));

      // Redirect to login page after successful registration
      window.location.replace("/login");
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="row">
      <div className="col-3"></div>

      <div className="col-6">
        <div className="container mt-3">
          <h2
            className="text-center mb-3"
            style={{
              fontFamily:
                "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif",
            }}
          >
            Welcome!
          </h2>
          <p className="text-center fw-normal" style={{ fontSize: "18px" }}>
            We need a few details to create your account.
          </p>

          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label fw-medium fs-5">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
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
                className="btn btn-success"
                
              >
                Register
              </button>

              

              <div className="text-end">
                <button className="border-0" onClick={() => setShowLogin(true)}>
                  LOG IN INSTEAD
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="col-3"></div>
    </div>
  );
};

export default Register;
