const mongoose = require("mongoose");
require("dotenv").config();

// const mongourl = "mongodb://127.0.0.1:27017/hotel";
const mongourl = process.env.MONGOATLASURL;
mongoose.connect(mongourl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("connected", () => {
  console.log("mongodb is connected");
});
db.on("disconnected", () => {
  console.log("datebase is disconnected");
});

module.exports = db;
