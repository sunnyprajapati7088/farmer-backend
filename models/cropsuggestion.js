const mongoose = require("mongoose");
const DiseaseSchema = new mongoose.Schema({
  name: String,
  symptoms: String,
  management: String,
});

const PesticideSchema = new mongoose.Schema({
  name: String,
  recommended_for: String,
  application_method: String,
  safety_precautions: String,
});

const StateSpecificSchema = new mongoose.Schema({
  state: String, // e.g., "Maharashtra", "Punjab"
  suitable_months: [String], // e.g., ["June", "July", "August"]
});

const CropsSuggestionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  states: [StateSpecificSchema], // Array of states with suitable months
  diseases: [DiseaseSchema],
  pesticides: [PesticideSchema],
});

module.exports = mongoose.model("CropSuggesion", CropsSuggestionSchema);
