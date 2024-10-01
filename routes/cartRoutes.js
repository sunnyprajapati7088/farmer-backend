const express = require("express");
const { checkout } = require("../controllers/cartController");
const router = express.Router();

router.post("/checkout", checkout);

module.exports = router;
