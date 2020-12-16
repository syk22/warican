import React from "react";
import { loadStripe } from "@stripe/stripe-js";
require("dotenv").config();

//const individualPayment = (合計金額どこからくるのですか？/numberOfPeople)
const stripePromise = loadStripe(`${process.env.REACT_APP_PUBLISHABLE_KEY}`);

export default function Payment(props){
    let total= props.receipts[1].balance;

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
        <button type="button" className="back" onClick={()=>{
            props.setView("GroupList");
        }}>Back</button>
        <input type="text" className="receipt" placeholder="input receipt id" ></input>
        <div>{`一人あたま${Math.floor(total / props.member)}です`}</div>
        <button type="button" className="payment" onClick={() => {
          handleClick();
        }}>Payment</button>
        <div>{`お会計は${total}円になります`}</div>
        <div>{`Group member: ${props.member}`}</div>
        </>
    );
}