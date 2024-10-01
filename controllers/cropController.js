const Crop = require("../models/Crop");

exports.addCrop = async (req, res) => {
  const { name, description, price, farmer_id,image } = req.body;
   // Assuming using multer for image upload

  try {
    const newCrop = new Crop({ name, description, price, image, farmer_id });
    await newCrop.save();
    res
      .status(201)
      .json({ message: "Crop added successfully", cropId: newCrop._id });
  } catch (err) {
    res.status(500).json({ error: "Failed to add crop", details: err.message });
  }
};

exports.getCrops = async (req, res) => {
  try {
    const crops = await Crop.find().populate("farmer_id", "name");
    res.status(200).json(crops);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch crops", details: err.message });
  }
};



// Delete Crop Controller
exports.deleteCrop = async (req, res) => {
  try {
    const cropId = req.params.id; // Get the crop ID from the request parameters

    // Check if the crop exists
    const crop = await Crop.findById(cropId);
    if (!crop) {
      return res.status(404).json({ message: "Crop not found" });
    }

    // Delete the crop
    await Crop.findByIdAndDelete(cropId);

    res.status(200).json({ message: "Crop deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to delete crop", details: err.message });
  }
};


exports.updateCrop = async (req, res) => {
  const { cropId } = req.params;
  const { name, description, price } = req.body;

  try {
    const updatedCrop = await Crop.findByIdAndUpdate(
      cropId,
      { name, description, price },
      { new: true }
    );
    res.status(200).json(updatedCrop);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to update crop", details: err.message });
  }
};
