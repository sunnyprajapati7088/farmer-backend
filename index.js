const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const connectDB = require("./config/db");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const cropRoutes = require("./routes/cropRoutes");
const cartRoutes = require("./routes/cartRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const cropsSuggestion = require("./routes/cropsSuggestion");
const orderRoutes = require("./routes/orderRoutes.js");
const nodemailer = require("nodemailer");
const app = express();
app.use(bodyParser.json());
app.use(cors());
// Connect to MongoDB
connectDB();

// Routes
app.use("/auth", authRoutes);
app.use("/crops", cropRoutes);
app.use("/cart", cartRoutes);
app.use("/payment", paymentRoutes);
app.use("/suggested", cropsSuggestion);
app.use("/order", orderRoutes);




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
