const mongoose = require("mongoose");
const restaurantSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  place: {
    required: true,
    type: String,
  },
  number: {
    required: true,
    type: Number,
  },
  cuisines: {
    required: true,
    type: Array,
  },
  veg: {
    required: true,
    type: Boolean,
  },
  owner: {
    required: true,
    type: String,
  },
  owneremail: {
    required: true,
    type: String,
    unique: true,
  },
});
const restaurant = mongoose.model("restaurant", restaurantSchema);
module.exports = restaurant;
