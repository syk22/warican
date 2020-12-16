const express = require("express");
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