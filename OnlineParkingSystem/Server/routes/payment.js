const express = require("express");
const router = express.Router();
const PUBLISHABLE_KEY = "YOUR PUBLIC KEY";
const SECRET_KEY = "YOUR SECRET KEY";
const Stripe = require("stripe");
const stripe = Stripe(SECRET_KEY, { apiVersion: "2020-08-27" });
router.post("/create-payment-intent", async (req, res) => {
  console.log("Start", req.body);
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount, //lowest denomination of particular currency
      currency: "usd",
      payment_method_types: ["card"], //by default
    });
    const clientSecret = paymentIntent.client_secret;
    console.log();
    res.json({
      clientSecret: clientSecret,
    });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
});

module.exports = router;
