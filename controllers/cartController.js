const Cart = require("../models/Cart");
const {
  sendOrderNotification,
  sendOrderEmail,
} = require("./notificationService");

exports.checkout = async (req, res) => {
  const { user_id, farmer_id, orderDetails } = req.body;

  try {
    // Process the order (add your order logic here)

    // Send SMS to farmer
    await sendOrderNotification(farmer_id, orderDetails);

    // Send Email to farmer
    const farmer = await User.findById(farmer_id);
    await sendOrderEmail(farmer.email, orderDetails);

    res.status(200).json({ message: "Order placed and notifications sent!" });
  } catch (err) {
    res.status(500).json({ error: "Order failed", details: err.message });
  }
};
