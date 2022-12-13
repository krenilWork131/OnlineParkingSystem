const express = require("express");
const router = express.Router();
const PUBLISHABLE_KEY =
  "pk_test_51MDtzOBsZ5DeknzbtSoKvfAOpgY0HUmm5ZVCmaIFZgcjE0Qbkz5Zum7j3TEfbq8RO49VCBF7z7tmU3l5pKiklDTf00idaiIlS0";
const SECRET_KEY =
  "sk_test_51MDtzOBsZ5Deknzb8LN152zrBpi4lnoSksuzdy6ak2RW20VWkzhh4NjVuH96LQjsWJGbFwKU5VR5LMUHFjloD2YN00j5WbeAgF";
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
