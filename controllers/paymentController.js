const Razorpay = require("razorpay");
const PaymentLog = require("../models/PaymentLog");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

exports.createOrder = async (req, res) => {
  const { amount, currency = "INR", receipt } = req.body;

  try {
    const order = await razorpay.orders.create({ amount, currency, receipt });
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: "Failed to create Razorpay order" });
  }
};
