const mongoose = require("mongoose");
const citySchema = new mongoose.Schema({
  name: { type: String, required: true },
  photo: { type: String, required: true },
  country: { type: String, required: true },
  description: { type: String, required: true },
  recommendation: { type: String },
  money: { type: String },
  language: { type: String },
  theBest: { type: String },
});
const City = mongoose.model("city", citySchema);
module.exports = City;
