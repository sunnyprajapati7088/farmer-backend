const mongoose = require("mongoose");

const CropSchema = new mongoose.Schema(
  {
    cropName: { type: String, required: true }, // Changed from 'name' to 'cropName'
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true }, // URL of the image
    quantity: { type: Number, required: true }, // Added quantity field
     // Added location field
    farmer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Crop", CropSchema);


