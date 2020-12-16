import React from "react";
import { loadStripe } from "@stripe/stripe-js";
require("dotenv").config();

//const individualPayment = (合計金額どこからくるのですか？/numberOfPeople)
const stripePromise = loadStripe(`${process.env.REACT_APP_PUBLISHABLE_KEY}`);

export default function Payment(props) {
  const handleClick = async (event) => {
    // Get Stripe.js instance
    const stripe = await stripePromise;

    // Call your backend to create the Checkout Session
    const response = await fetch("/create-checkout-session", {
      method: "POST",
    });

    const session = await response.json();

    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
    }
  };

  return (
    <>
      <button
        type="button"
        className="back"
        onClick={() => {
          props.setView("GroupList");
        }}
      >
        Back
      </button>
      <div>{`一人あたま${1 + 2}です`}</div>
      <button
        type="button"
        className="payment"
        onClick={() => {
          handleClick();
        }}
      >
        Payment
      </button>
      <div>{`お会計は${10000}円になります`}</div>
      <div>{`Group member: ${6}`}</div>
    </>
  );
}
