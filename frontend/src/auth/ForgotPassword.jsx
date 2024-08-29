import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/config";

const ForgotPassword = ({ setShowForgotPassword }) => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!email) {
            setError("Please enter your email address");
            return;
        }

        try {
            await axios.post(`${BASE_URL}/forgot-password`, {
                email,
            });
            setSuccess("Password reset link sent! Please check your email.");
        } catch (err) {
            setError(err.response?.data?.error || "Something went wrong");
        }
    };

    return (
        <div className="row">
            <div className="col-3"></div>
            <div className="col-6">
                <div className="container mt-5">
                    <h2
                        className="text-center mt-5"
                        style={{
                            fontFamily:
                                "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif",
                        }}
                    >
                        Forgot Password
                    </h2>
                    <p
                        className="text-center mb-3 fw-normal"
                        style={{ fontSize: "18px" }}
                    >
                        Enter your email address to receive a password reset link.
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
                        <div className="text-center mt-3">
                            <button type="submit" className="btn btn-success mb-4 mt-3">
                                Send Reset Link
                            </button>
                            <div className="text-end">
                                <button
                                    className="border-0 mt-4"
                                    onClick={() => setShowForgotPassword(false)}
                                >
                                    Back to Login
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

export default ForgotPassword;
