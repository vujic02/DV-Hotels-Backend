const express = require("express");
const mongoose = require("mongoose");
const userSchema = require("../schemas/UserSchema");
const bcrypt = require("bcrypt");

// router
const route = express.Router();

route.post("/", async (req, res) => {
  const { name, email, password } = req.body;

  if (name && email && password) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new userSchema({
        name,
        email,
        password: hashedPassword,
      });

      const result = await user.save();
      res.json(result);
    } catch (err) {
      console.log(err);

      // error handling each scenario
      if (err.keyPattern.email) {
        return res.status(400).send("User with that email already exits");
      } else if (err.errors.name.message) {
        return res.status(400).send(err.errors.name.message);
      }
    }
  } else {
    res.status(400).json("Please provide the required fields");
  }
});

module.exports = route;
