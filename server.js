let express = require("express");
let app = express();
require("./db");
require("dotenv").config();
const personroute = require("./Routes/PersonRoutes");
const menuroute = require("./Routes/MenuRoutes");
const restaurantroute = require("./Routes/RestaurantRoute");
const bodyparser = require("body-parser");
app.use(bodyparser.json());

const logrequest = (req, res, next) => {
  console.log(
    `[${new Date().toLocaleString()} ] the entered url is ${req.originalUrl}`
  );
  next();
};
app.use(logrequest);
app.get("/", function (req, res) {
  res.send("hello world");
});

app.use("/person", personroute);
app.use("/menu", menuroute);
app.use("/restaurant", restaurantroute);
const port = process.env.PORT || 3000;
app.listen(port, () => console.log("listening on port 3000"));
