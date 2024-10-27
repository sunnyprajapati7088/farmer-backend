const Order = require("../models/Order.js"); // Import the Order model
const twilio = require("twilio");

// Twilio credentials
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioClient = new twilio(accountSid, authToken);
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER; // Replace with your Twilio phone number

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const {
      farmer_id,
      buyer_id,
      order_quantity,
      amount,
      buyer_state,
      buyer_district,
      farmer_state,
      farmer_district,
      crop_name,
        farmer_name,
      buyer_name,
      buyer_phone, // Buyer phone number from request
      farmer_phone, // Farmer phone number from request
      // Farmer name from request
    } = req.body;
    console.log(req.body)
    const newOrder = new Order({
      farmer_id,
      buyer_id,
      order_quantity,
      amount,
      buyer_state,
      buyer_district,
      farmer_state,
      farmer_district,
      crop_name,
      buyer_name,// Include buyer's name
      farmer_name, // Include farmer's name
      buyer_phone, // Store buyer phone number
      farmer_phone, // Store farmer phone number
    });
console.log(newOrder)
    const savedOrder = await newOrder.save();

    // Send message to the buyer
    // await twilioClient.messages.create({
    //   body: `Your order for ${order_quantity} of ${crop_name} has been placed successfully. Amount: ₹${amount}.`,
    //   from: twilioPhoneNumber,
    //   to: buyer_phone, // Buyer phone number
    // });

    // // Send message to the farmer
    // await twilioClient.messages.create({
    //   body: `New order received! ${order_quantity} of ${crop_name} ordered by ${newOrder.buyer_name}. Amount: ₹${amount}.`,
    //   from: twilioPhoneNumber,
    //   to: farmer_phone, // Farmer phone number
    // });

    return res.status(201).json(savedOrder);
  } catch (error) {
      console.log(error)
    return res
      .status(500)
      .json({ message: "Error creating order", error: error.message });
  }
};

// Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("farmer_id buyer_id"); // Populate farmer and buyer data
    return res.status(200).json(orders);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching orders", error: error.message });
  }
};

// Get a single order by ID
exports.getOrderById = async (req, res) => {
  try {
    console.log("sdd")
    const order = await Order.findById(req.params.id).populate(
      "farmer_id buyer_id"
    );
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    return res.status(200).json(order);
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ message: "Error fetching order", error: error.message });
  }
};

// Update an order's status
exports.updateOrderStatus = async (req, res) => {
   console.log("jjdkh");
  try {
    const { status } = req.body;

   
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true } // Return the updated document
    );
    console.log(order)

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json(order);
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ message: "Error updating order", error: error.message });
  }
};

// Delete an order
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    return res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error deleting order", error: error.message });
  }
};
