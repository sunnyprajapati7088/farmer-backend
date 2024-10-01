const nodemailer = require("nodemailer");

exports.sendOrderEmail = async (farmerEmail, orderDetails) => {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    let mailOptions = {
      from: process.env.EMAIL_USER,
      to: farmerEmail,
      subject: "New Order Received",
      text: `You have a new order. Order details: ${orderDetails}`,
    };

    await transporter.sendMail(mailOptions);
    console.log("Order email sent to farmer");
  } catch (err) {
    console.error("Failed to send email:", err.message);
  }
};
