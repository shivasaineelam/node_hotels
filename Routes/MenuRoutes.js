const Menu = require("../models/menu");
const express = require("express");
const router = express.Router();
router.get("/", async (req, res) => {
  try {
    const data = await Menu.find();

    res.send(data).status(200);
  } catch (err) {
    res.send("error occured").status(500);
  }
});

router.get("/:type", async (req, res) => {
  try {
    
    const menutype = req.params.type;

    const data = await Menu.find({ type: menutype });
    res.send(data).status(200);
  } catch {}
});
router.post("/", async (req, res) => {
  const data = req.body;
  const newMenu = new Menu(data);
  try {
    await newMenu.save();
    res.status(200).send("data is saved");
  } catch (err) {
    res.status(500).send(err);
  }
});
module.exports = router;
