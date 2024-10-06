const mongoose = require("mongoose");

// Define the Order schema
const orderSchema = new mongoose.Schema(
  {
    // Farmer Information
    farmer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Assuming User model stores farmer info
      required: true,
    },
    farmer_name: {
      type: String,
      required: true,
    },
    farmer_phone: {
      type: String,
      required: true,
    },
    farmer_state: {
      type: String,
      required: true,
    },
    farmer_district: {
      type: String,
      required: true,
    },

    // Buyer Information
    buyer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Assuming User model stores buyer info
      required: true,
    },
    buyer_name: {
      type: String,
      required: true,
    },
    buyer_phone: {
      type: String,
      required: true,
    },
    buyer_state: {
      type: String,
      required: true,
    },
    buyer_district: {
      type: String,
      required: true,
    },

    // Order Details
    order_quantity: {
      type: Number,
      required: true,
      min: 1, // Minimum order quantity
    },
    amount: {
      type: Number,
      required: true,
      min: 0, // Minimum amount
    },
    crop_name: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Cancelled"], // Order statuses
      default: "Pending",
    },
  },
  { timestamps: true } // Automatically manage createdAt and updatedAt fields
);

// Create the Order model
const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
