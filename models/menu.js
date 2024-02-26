const mongoose = require("mongoose");
const menuSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  price: {
    required: true,
    type: Number,
  },
  taste: {
    required: true,
    type: String,
  },
  quantity: {
    required: true,
    type: Number,
  },
  isDrink: {
    required: true,
    type: Boolean,
  },
  type: {
    required: true,
    type: String,
  },
  itemsLeft: {
    required: true,
    type: Number,
  },
});

const menu = mongoose.model("menuitem", menuSchema);
module.exports = menu;
