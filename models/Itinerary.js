const mongoose = require("mongoose");
const itinerarySchema = new mongoose.Schema({
  name: { type: String, required: true },
  author: { type: Object, required: true },
  photos: { type: Array, required: true },
  includes: { type: Array, required: true },
  description: { type: String, required: true },
  hashtag: { type: Array, required: true },
  likes: [String],
  price: { type: Number, required: true },
  duration: { type: Number, required: true },
  comments: [{comment:{type:Object, required:true},userId:{type:mongoose.Types.ObjectId, required:true, ref:'user'},name:{type:String}, 
    lastname:{type:String},url:{type:String}, }],
  cityId: { type: mongoose.Types.ObjectId, ref: "city" },
});
const Itinerary = mongoose.model("itinerary", itinerarySchema);
module.exports = Itinerary;
