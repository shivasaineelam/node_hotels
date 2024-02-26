let express = require("express");
let app = express();
require("./db");
require("dotenv").config();
const personroute = require("./Routes/PersonRoutes");
const menuroute = require("./Routes/MenuRoutes");
const bodyparser = require("body-parser");
app.use(bodyparser.json());

app.get("/", function (req, res) {
  console.log("/ path is running");

  res.send("hello world");
});
app.use("/person", personroute);
app.use("/menu", menuroute);
const port = process.env.PORT || 3000;
app.listen(port, () => console.log("listening on port 3000"));
