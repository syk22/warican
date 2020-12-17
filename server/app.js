const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const knex = require("./knex");
const stripe = require("stripe")(`${process.env.STRIPE_SECRET_KEY}`);
require("dotenv").config();
app.use(express.static((__dirname + "/build")));

///////////// APP USE ////////////////
// app.use(express.static(path.resolve(__dirname, "..", "build")));
app.use(cors());
///////////// APP USE END ////////////////

///////////// APP POST //////////////
app.post("/create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "jpy",
          product_data: {
            name: "Fried Rice",
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "http://localhost:3000/successhi.html",
    cancel_url: "https://example.com/cancel",
  });
  res.json({ id: session.id });
});
/////////// APP POST END ////////////

/////////// APP GET /////////////////
// get members
// CAUTION -> now, only we can get group_id = 1
app.get("/api/members", async (req, res) => {
  try {
    let members = await knex
      .select("customer.customer_id", "user_name")
      .from("customer")
      .join(
        "group_member",
        "customer.customer_id",
        "=",
        "group_member.customer_id"
      )
      .where("group_id", 1);
    res.json(members);
  } catch (err) {
    console.error("Error loading members!");
    console.error(err);
    res.sendStatus(500);
  }
});

// get receipt
// query-> ?id=(num)
// CAUTION -> now, only we can get group_id = 1
app.get("/api/receipts", async (req, res) => {
  try {
    let receipts = await knex.select().from("receipt").where("group_id", 1);
    if (req.query.id) {
      receipts = receipts.find(
        (element) => element.receipt_id === Number(req.query.id)
      );
    }
    res.json(receipts);
  } catch (err) {
    console.error("Error loading receipts!");
    console.error(err);
    res.sendStatus(500);
  }
});

// app.get("/", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "..", "build", "index.html"));
// });

app.get("/config", async (req, res) => {
  const price = await stripe.prices.retrieve(process.env.PRICE);

  res.send({
    publicKey: process.env.STRIPE_PUBLISHABLE_KEY,
    unitAmount: price.unit_amount,
    currency: price.currency,
  });
});
//////////// APP GET END /////////////

module.exports = app;

