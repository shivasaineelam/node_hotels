const express = require("express");
const router = express.Router();
const Person = require("../models/person");

router.put("/:id", async (req, res) => {
  const data = req.body;
  const personid = req.params.id;
  const response = await Person.findByIdAndUpdate(personid, data, {
    runValidators: true,
    new: true,
  });
  res.send(response).status(200);
});

router.delete("/:id", async (req, res) => {
  const personid = req.params.id;
  try {
    const response = await Person.findByIdAndDelete(personid);
    console.log(response);
    if (!response) {
      res.status(404).send("person not found");
    } else res.status(200).send("persons data is deleted");
  } catch (error) {
    res.status(404).send("person not found");
  }
});

router.post("/", async (req, res) => {
  const data = req.body;
  const newPerson = new Person(data);
  try {
    await newPerson.save();
    console.log("data is send");
    res.status(200).send("data is saved");
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.get("/:type", async (req, res) => {
  try {
    const workType = req.params.type;
    if (
      workType != "manager" &&
      workType != "chef" &&
      workType != "owner" &&
      workType != "waiter"
    ) {
      res.status(404).send("invalid work type");
    } else {
      const data = await Person.find({ work: workType });
      res.send(data).status(200);
    }
  } catch (err) {
    res.send(err).status(500);
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    res.send(data).status(200);
  } catch (err) {
    res.send("error occured").status(500);
  }
});

module.exports = router;
