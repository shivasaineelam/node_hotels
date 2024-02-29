const express = require("express");
const router = express.Router();
const Person = require("../models/person");
const passport = require("passport");
const local = require("passport-local").Strategy;
passport.use(
  new local(async (username, password, done) => {
    try {
      const user = await Person.findOne({ username: username });
      if (!user) return done(null, false, { message: "wrong username" });
      const ismatch = await user.checkpassword(password);
      if (ismatch == false) done(null, false, { message: "wrong password" });
      done(null, true, { user });
    } catch (err) {
      done(err);
    }
  })
);
router.use(passport.initialize());
const passportauth = passport.authenticate("local", { session: false });

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
    res.status(200).send("data is saved");
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/:type", passportauth, async (req, res) => {
  try {
    const workType = req.params.type;
    if (
      workType !== "manager" &&
      workType !== "chef" &&
      workType !== "owner" &&
      workType !== "waiter"
    ) {
      res.status(304).send("invalid work type");
    } else {
      const data = await Person.find({ work: workType });
      res.send(data).status(200);
    }
  } catch (err) {
    res.send(err).status(304);
  }
});
router.get("/name/:name", passportauth, async (req, res) => {
  const name = req.params.name;

  try {
    const data = await Person.findOne({ name: name });
    res.send(data).status(200);
  } catch (err) {
    res.send(err).status(500);
  }
});

router.get("/", passportauth, async (req, res) => {
  try {
    const data = await Person.find();
    return res.send(data).status(200);
  } catch (err) {
    return res.send("error occured").status(500);
  }
});

module.exports = router;
