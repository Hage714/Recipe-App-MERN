import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";



const stripePromise = loadStripe("stripe-public-key");

const Contribute = () => {
  return (
    <Elements stripe={stripePromise}>
      <ContributeForm />
    </Elements>
  );
};

const ContributeForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [amount, setAmount] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [contributionType, setContributionType] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleContributionType = (type) => {
    setContributionType(type);
    setAmount(""); // Reset the amount when changing contribution type
    setCustomAmount(""); // Reset the custom amount when changing contribution type
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const finalAmount = customAmount || amount;

    try {
      const response = await fetch("/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: finalAmount * 100, contributionType }), // amount in cents
      });

      const paymentIntent = await response.json();

      const result = await stripe.confirmCardPayment(
        paymentIntent.clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        }
      );

      if (result.error) {
        setError(result.error.message);
      } else {
        setSuccess(true);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const presetAmounts =
    contributionType === "monthly"
      ? [10, 20, 30] // monthly amounts
      : [25, 50, 75]; // one-time amounts

  return (
    <div className="container">
      <div className="row">
        <div className="col-5 mt-5 text-center">
          <h3
            className="mb-4"
            style={{
              fontFamily:
                "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif",
            }}
          >
            We need your help!
          </h3>
          <p>RecipeSage is donation based - every contribution helps!</p>
          <p className="mb-4">
            Unfortunately, ThisRecipe doesn't get many donations since it is a
            fairly small platform. In order to keep things free while paying for
            server costs, we need your help. Please reconsider - your
            contribution is truly appreciated!
          </p>
          <p className="mb-4">
            My goal is to keep ThisRecipe open to anyone, without burdening the
            experience with ads. However, as ThisRecipe grows, hosting costs for
            servers and images begin to add up.
          </p>
          <p>
            <p>
              <strong>Please note:</strong> The donation process is handled by
              Stripe. The amount you provide will be converted to USD and sent
              to our PayPal account for processing.
            </p>
          </p>

          <p className="fst-italic mt-3">
            By continuing, you're agreeing to the ThisRecipe{" "}
            <a href="/terms" className="text-success">
              Terms of Service
            </a>
          </p>
        </div>
        <div className="col-1"></div>

        <div className="col-6">
          <div className="contribute-page mt-4 p-4">
            <h3
              className="mb-4 text-center"
              style={{
                fontFamily:
                  "'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif",
              }}
            >
              Contribute to Our Recipe App
            </h3>
            <div className="contribution-buttons">
              <button
                type="button"
                className={`contribution-button ${
                  contributionType === "one-time" ? "selected" : ""
                }`}
                onClick={() => handleContributionType("one-time")}
              >
                One-Time
              </button>
              <button
                type="button"
                className={`contribution-button ${
                  contributionType === "monthly" ? "selected" : ""
                }`}
                onClick={() => handleContributionType("monthly")}
              >
                Monthly
              </button>
            </div>
            {contributionType && (
              <form onSubmit={handleSubmit}>
                <div>
                  <label className="fw-semibold">Choose an Amount (USD):</label>
                  <div className="preset-amounts">
                    {presetAmounts.map((amt, idx) => (
                      <label key={idx}>
                        <input
                          type="radio"
                          name="amount"
                          className=""
                          value={amt}
                          checked={amount == amt}
                          onChange={() => setAmount(amt)}
                        />
                        <span className="fs-5">${amt}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="mb-4 fw-semibold">
                    Or Enter Custom Amount (USD):
                  </label>
                  <input
                    type="number"
                    placeholder="Custom"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setAmount(""); // Reset preset amount when custom amount is entered
                    }}
                  />
                </div>

                <CardElement />
                {error && <div className="error">{error}</div>}
                {success && <div className="success">Payment Successful!</div>}
                <button type="submit" className="mt-4" disabled={!stripe}>
                  Contribute
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contribute;
