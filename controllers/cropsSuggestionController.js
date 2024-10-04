const CropSuggesion = require("../models/cropsuggestion");

// Create a new crop
exports.createCrop = async (req, res) => {
  const { name, suitable_months, diseases, pesticides } = req.body;

  try {
    const newCrop = new CropSuggesion({
      name,
      suitable_months,
      diseases,
      pesticides,
    });
    await newCrop.save();
    res
      .status(201)
      .json({ message: "Crop created successfully", cropId: newCrop._id });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to create crop", details: err.message });
  }
};

// Read all crops
exports.getAllCrops = async (req, res) => {
  try {
    const crops = await CropSuggesion.find();
    return res.status(200).send(crops);
    
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch crops", details: err.message });
  }
};

// Read a single crop by ID
exports.getCropById = async (req, res) => {
  try {
    const crop = await CropSuggesion.findById(req.params.id);
    if (!crop) {
      return res.status(404).json({ message: "Crop not found" });
    }
    res.status(200).json(crop);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch crop", details: err.message });
  }
};

// Update a crop
exports.updateCrop = async (req, res) => {
  try {
    const crop = await CropSuggesion.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!crop) {
      return res.status(404).json({ message: "Crop not found" });
    }
    res.status(200).json(crop);
  } catch (err) {
    res
      .status(400)
      .json({ error: "Failed to update crop", details: err.message });
  }
};

// Delete a crop
exports.deleteCrop = async (req, res) => {
  try {
    const crop = await CropSuggesion.findByIdAndDelete(req.params.id);
    if (!crop) {
      return res.status(404).json({ message: "Crop not found" });
    }
    res.status(200).json({ message: "Crop deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to delete crop", details: err.message });
  }
};
