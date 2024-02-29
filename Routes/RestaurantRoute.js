const restaurant = require("./../models/restaurants");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await restaurant.find();
    res.send(data).status(200);
  } catch (err) {
    res.send(err).status(500);
  }
});
router.post("/", async (req, res) => {
  const data = req.body;
  const newrestaurant = new restaurant(data);
  try {
    await newrestaurant.save();
    res.send("data is saved").status(200);
  } catch (err) {
    res.send(err).status(500);
  }
});
module.exports = router;
