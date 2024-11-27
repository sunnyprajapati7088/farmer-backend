const Crop = require("../models/Crop");

// Add Crop Controller
exports.addCrop = async (req, res) => {
  const { cropName, description, price, image, quantity, farmer_id } = req.body;

  try {
    const newCrop = new Crop({
      cropName,
      description,
      price,
      image,
      quantity,
      farmer_id,
    });
    await newCrop.save();
    res
      .status(201)
      .json({ message: "Crop added successfully", cropId: newCrop._id });
  } catch (err) {
    res.status(500).json({ error: "Failed to add crop", details: err.message });
  }
};

// Get Crops Controller
exports.getCrops = async (req, res) => {
  try {
    console.log("id")
    const crops = await Crop.find().populate("farmer_id");
   
    res.status(200).json(crops);
  } catch (err) {
    console.log(err)
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

// Update Crop Controller
exports.updateCrop = async (req, res) => {
  const { cropId } = req.params;
  const { cropName, description, price, quantity, image } = req.body;

  try {
    const updatedCrop = await Crop.findByIdAndUpdate(
      cropId,
      {
        cropName,
        description,
        price,
        quantity,
        image,
      },
      { new: true }
    );

    if (!updatedCrop) {
      return res.status(404).json({ message: "Crop not found" });
    }

    res
      .status(200)
      .json({ message: "Crop updated successfully", crop: updatedCrop });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to update crop", details: err.message });
  }
};
