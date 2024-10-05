const express = require("express");
const {
  signup,
  login,
  sendOtp,
  verifyOtpAndResetPassword,
  findUserById,
} = require("../controllers/authController");
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/send-otp", sendOtp); // New route for sending OTP
router.post("/verify-otp", verifyOtpAndResetPassword); // New route for OTP verification and password reset
// Adjust the path as necessary

// Route to get user by ID
router.get("/users/:id", findUserById); 
module.exports = router;
