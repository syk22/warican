const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const knex = require("./knex");
const bodyParser = require("body-parser");
const stripe = require("stripe")(`${process.env.STRIPE_SECRET_KEY}`);
require("dotenv").config();
app.use(express.static(path.join(__dirname, "..", "build")));

// utility for stripe to log fulfilled order
const fulfillOrder = (session) => {
  // TODO: fill me in
  console.log("Fulfilling order", session);
};

// Find your endpoint's secret in your Dashboard's webhook settings
const endpointSecret = "whsec_bhEntVL7sQvCfMjdGFmvbibAP98YfJVF";

///////////// APP USE ////////////////
// app.use(express.static(path.resolve(__dirname, "..", "build")));
app.use(cors());
app.use(express.json());
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
          unit_amount: req.body.unit_amount,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    //Eliot-Ok for now, but will need to be dynamic when hosted on Heroku
    success_url: "https://warican-new.herokuapp.com/success",
    cancel_url: "https://warican-new.herokuapp.com/cancel",
  });
  res.json({ id: session.id });
});

app.post(
  "/webhook",
  bodyParser.raw({ type: "application/json" }),
  (request, response) => {
    const payload = request.body; // everything
    const sig = request.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (err) {
      return response.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the checkout.session.completed event
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      // Fulfill the purchase...
      fulfillOrder(session);
    }

    response.status(200);
  }
);

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
//   res.sendFile(path.join(__dirname, "..", "build", "index.html"));
// });

//////////// APP GET END /////////////

module.exports = app;
