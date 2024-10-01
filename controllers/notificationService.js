const twilio = require("twilio");
const User = require("../models/User");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(accountSid, authToken);

exports.sendOrderNotification = async (farmerId, orderDetails) => {
  try {
    const farmer = await User.findById(farmerId);

    await client.messages.create({
      body: `New order received! Order details: ${orderDetails}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: farmer.phone_number,
    });

    console.log("Order notification sent to farmer");
  } catch (err) {
    console.error("Failed to send SMS:", err.message);
  }
};
