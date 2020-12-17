import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import "../styles/Payment.css";
import { Typography, makeStyles, Box, Paper, createMuiTheme } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

require("dotenv").config();

//const individualPayment = (合計金額どこからくるのですか？/numberOfPeople)
const stripePromise = loadStripe(`${process.env.REACT_APP_PUBLISHABLE_KEY}`);

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function Payment(props){
    const [payment, setPayment] = useState(0);
    const [total, setTotal] = useState(0);

    const classes = useStyles();

    const handleClick = async (event) => {
      // Get Stripe.js instance
      const stripe = await stripePromise;
  
      // Call your backend to create the Checkout Session
      const response = await fetch("/create-checkout-session", {
        method: "POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({unit_amount:payment})
      });
      
        // console.log(JSON.stringify({unit_amount:payment}))
  
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
        <div id="payment" className={classes.root}>
        <div><img src="/static/images/warican_flower.png" alt="warican-flowerer" className="logo"/></div>
        <Button
        type="button"
        className="back"
        variant="contained"
        color="secondary"
        onClick={()=>{
            props.setView("GroupList");
        }}>Back</Button><br></br>
        <input type="text" className="receipt" placeholder="input receipt id" onChange={(e)=>{
            console.log(e.target.value);
            if(e.target.value === ""){
                setTotal(0);
                setPayment(0);
            } else if(e.target.value <= 5 && e.target.value > 0) {
                let sum = props.receipts[e.target.value - 1].balance;
                setPayment(Math.floor(sum / props.member));
                setTotal(sum);
            } else {
                window.alert("伝票番号を入れてください");
            }
        }}></input>
        <div>{`一人あたま${payment}円です`}</div>
        <Button
        variant="contained"
        color="secondary"
        type="button"
        className="payment"
        onClick={() => {
          handleClick();
        }}>Payment</Button>
        <div>{`お会計は${total}円になります`}</div>
        <div>{`Group member: ${props.member}`}</div>
        </div>
    );
}