const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
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
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
PersonSchema.pre("save", async function (next) {
  const person = this;
  if (!person.isModified("password")) next();
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(person.password, salt);
    person.password = hashedpassword;
    next();
  } catch (error) {
    next(error);
  }
});
PersonSchema.methods.checkpassword = async function (givenpassword) {
  try {
    const ismatch = await bcrypt.compare(givenpassword, this.password);
    return ismatch;
  } catch (error) {
    return error;
  }
};

const Person = mongoose.model("Person", PersonSchema);
module.exports = Person;
