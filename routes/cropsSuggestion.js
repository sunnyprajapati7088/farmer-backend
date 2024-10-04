const express = require("express");
const {
  createCrop,
  getAllCrops,
  getCropById,
  updateCrop,
  deleteCrop,
} = require("../controllers/cropsSuggestionController");
const router = express.Router();

// Define routes for crop management
router.post("/crops",createCrop); // Create a crop
router.get("/crops", getAllCrops); // Read all crops
router.get("/crops/:id",getCropById); // Read a single crop
router.put("/cropsupdate/:id",updateCrop); // Update a crop
router.delete("/cropsdelete/:id",deleteCrop); // Delete a crop

module.exports = router;
