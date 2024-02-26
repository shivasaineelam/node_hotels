const mongoose = require("mongoose");
const PersonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  work: {
    type: String,
    enum: ["chef", "waiter", "owner", "manager"],
  },
  mobile: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    requrired: true,
  },
  salary: {
    type: Number,
  },
});
const Person = mongoose.model("Person", PersonSchema);
module.exports = Person;
