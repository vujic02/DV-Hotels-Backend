const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// router
const route = express.Router();

// schemas
const UserSchema = require("../schemas/UserSchema");

// request
route.post("/", (req, res) => {
  const userEmail = req.body.email;
  const userPassword = req.body.password;

  try {
    if (userEmail) {
      UserSchema.findOne(
        {
          email: userEmail,
        },
        (err, data) => {
          if (err) {
            res.status(400).json(err);
          }

          if (data) {
            const isValid = bcrypt.compareSync(userPassword, data.password);

            if (isValid) {
              res.json(data);
            } else {
              res.status(400).json("Wrong Credentials");
            }
          } else {
            res.status(400).json("Wrong Credentials");
          }
        }
      );
    } else {
      res.status(400).json("Wrong Credentials");
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = route;
