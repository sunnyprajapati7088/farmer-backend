const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");
const otpGenerator = require("otp-generator");
const twilio = require("twilio");


const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(accountSid, authToken);
exports.signup = async (req, res) => {
  const { name, email, password, role, phone_number, district, state } =
    req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      phone_number,
      district,
      state,
    });
  

    if (phone_number.length == 10) {
      await newUser.save();
      res
        .status(201)
        .json({ message: "User created successfully", userId: newUser._id });
    }
    else {
       res.status(201).json({ message: "incorrect phone  number" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to create user", details: err.message });
  }
};


// exports.login = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (user && (await bcrypt.compare(password, user.password))) {
//       const token = jwt.sign(
//         { userId: user._id, role: user.role },
//         process.env.JWT_SECRET,
//         { expiresIn: "1d" }
//       );
//       res.status(200).json({ token, userId: user._id });
//     } else {
//       res.status(401).json({ message: "Invalid credentials" });
//     }
//   } catch (err) {
//     res.status(500).json({ error: "Login failed" });
//   }
// };

exports.login = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    // Find user by email and role
    const user = await User.findOne({ email, role });
    if (user && (await bcrypt.compare(password, user.password))) {
      // Generate JWT with user ID and role
      const token = jwt.sign(
        { userId: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
      res.status(200).json({ token, userId: user._id, role: user.role });
    } else {
      res.status(401).json({ message: "Invalid credentials or role" });
    }
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
};


// Send OTP for password reset
exports.sendOtp = async (req, res) => {
  const { phone_number } = req.body;

  try {
    const user = await User.findOne({ phone_number });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate OTP
    currentOTP = otpGenerator.generate(6, { upperCase: false, specialChars: false }); // 6-digit OTP
    otpExpirationTime = Date.now() + 300000; // OTP valid for 5 minutes

 // Send OTP via SMS using Twilio
    await client.messages.create({
      body: `Your OTP for password reset is ${currentOTP}. It is valid for 5 minutes.`,
      from: process.env.TWILIO_PHONE_NUMBER, // Your Twilio phone number
      to: phone_number, // User's phone number
    });

    res.status(200).json({ message: 'OTP sent to your phone number' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to send OTP', details: err.message });
  }
};

// Verify OTP and reset password
exports.verifyOtpAndResetPassword = async (req, res) => {
  const { phone_number, otp, newPassword } = req.body;

  try {
    if (Date.now() > otpExpirationTime) {
      return res.status(400).json({ message: 'OTP expired' });
    }

    if (otp !== currentOTP) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // Reset password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.findOneAndUpdate({ phone_number }, { password: hashedPassword });

    // Clear OTP after successful password reset
    currentOTP = null;
    otpExpirationTime = null;

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to reset password', details: err.message });
  }
};

// Adjust the path as necessary

// Find user by ID
exports.findUserById = async (req, res) => {
  const userId = req.params.id; // Get the user ID from the request parameters
  try {
    const user = await User.findById(userId); // Use Mongoose to find the user by ID
    if (!user) {
      return res.status(404).json({ message: "User not found" }); // If no user found, return 404
    }
    res.status(200).json(user); // Return the user data if found
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message }); // Handle server error
  }
};


