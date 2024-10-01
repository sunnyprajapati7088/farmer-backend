const express = require("express");
const {
  addCrop,
  getCrops,
  deleteCrop,
  updateCrop,
} = require("../controllers/cropController");
const router = express.Router();

router.post("/add", addCrop);
router.get("/", getCrops);
router.delete("/delete/:id", deleteCrop);
router.put('/update/:cropId', updateCrop);

module.exports = router;
