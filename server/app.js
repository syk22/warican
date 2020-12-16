const express = require("express");
const app = express();
const { resolve } = require("path");
// Copy the .env.example in the root into a .env file in this folder
require("dotenv").config();

// Ensure environment variables are set.
checkEnv();

const stripe = require("stripe")(`${process.env.STRIPE_SECRET_KEY}`);

app.use(express.static("./build"));

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'jpy',
          product_data: {
            name: 'Big Banana',
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: 'https://example.com/success',
    cancel_url: 'https://example.com/cancel',
  })
  res.json({ id: session.id });
})

app.get("/", (req, res) => {
  const path = resolve("./build" + "/index.html");
  res.sendFile(path);
});

app.get("/config", async (req, res) => {
  const price = await stripe.prices.retrieve(process.env.PRICE);

  res.send({
    publicKey: process.env.STRIPE_PUBLISHABLE_KEY,
    unitAmount: price.unit_amount,
    currency: price.currency,
  });
});

// Fetch the Checkout Session to display the JSON result on the success page
app.get("/checkout-session", async (req, res) => {
  const { sessionId } = req.query;
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  res.send(session);
});

app.post("/create-checkout-session", async (req, res) => {
  const domainURL = process.env.DOMAIN;

  const { quantity, locale } = req.body;
  // Create new Checkout Session for the order
  // Other optional params include:
  // [billing_address_collection] - to display billing address details on the page
  // [customer] - if you have an existing Stripe Customer ID
  // [customer_email] - lets you prefill the email input in the Checkout page
  // For full details see https://stripe.com/docs/api/checkout/sessions/create
  const session = await stripe.checkout.sessions.create({
    payment_method_types: process.env.PAYMENT_METHODS.split(", "),
    mode: "payment",
    locale: locale,
    line_items: [
      {
        price: process.env.PRICE,
        quantity: quantity,
      },
    ],
    // ?session_id={CHECKOUT_SESSION_ID} means the redirect will have the session ID set as a query param
    success_url: `${domainURL}/success.html?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${domainURL}/canceled.html`,
  });

  res.send({
    sessionId: session.id,
  });
});

// app.listen(4242, () => console.log(`Node server listening on port ${4242}!`));

function checkEnv() {
  const price = process.env.PRICE;
  if (price === "price_12345" || !price) {
    console.log(
      "You must set a Price ID in the environment variables. Please see the README."
    );
    process.exit(0);
  }
}

module.exports = app;
const morgan = require("morgan");
const cors = require("cors");
// const Stripe = require("stripe");
const path = require("path");
const knex = require("./knex");

// TEST API KEY
// const stripe = Stripe('pk_test_51HypyCK0ZQBlJQ9OBxfKChir8dKmX5fz0kxuji2hZkzyq7B2GLNd7pxxZimWQJ6uFPavwMcxn5BFnRiBoNTTmmBe00hZzWUcJB');
// const elements = stripe.elements();

const app = express();
app.use(cors());

// Setup logger
app.use(
  morgan(
    ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'
  )
);

// Serve static assets
app.use(express.static(path.resolve(__dirname, "..", "build")));

// get members
// CAUTION -> now, only we can get group_id = 1
app.use("/api/members", async (req, res) => {
    try {
        let members = await knex
            .select("customer.customer_id", "user_name")
            .from("customer")
            .join("group_member", "customer.customer_id", "=", "group_member.customer_id")
            .where("group_id", 1);
        res.json(members);
    } catch (err) {
        console.error("Error loading members!");
        console.error(err);
        res.sendStatus(500);
    }
});

// get recipt
// query-> ?id=(num)
// CAUTION -> now, only we can get group_id = 1
app.use("/api/receipts", async (req, res) => {
    try {
        let receipts = await knex
            .select()
            .from("receipt")
            .where("group_id", 1);
        if (req.query.id) {
            receipts = receipts.find(element => element.receipt_id === Number(req.query.id));
        }
        res.json(receipts);
    } catch (err) {
        console.error("Error loading receipts!");
        console.error(err);
        res.sendStatus(500);
    }
});

module.exports = app;
