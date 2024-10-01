const mongoose = require("mongoose");

const PaymentLogSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    farmer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    payment_id: { type: String, required: true },
    order_id: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ["success", "failed"], required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PaymentLog", PaymentLogSchema);
