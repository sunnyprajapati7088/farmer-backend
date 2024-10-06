const express = require("express");
const {
  createOrder,
  getAllOrders,
  deleteOrder,
} = require("../controllers/OrderController"); // Adjust the path as needed

const router = express.Router();

// Route to create a new order
router.post("/add", createOrder);

// Route to get all orders (optional)
router.get("/", getAllOrders); // You can implement this function in your controller if needed

// Route to delete an order by ID (optional)
router.delete("/delete/:id", deleteOrder); // You can implement this function in your controller if needed

module.exports = router;
