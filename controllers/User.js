const express = require("express");

const route = express.Router();
const UserSchema = require("../schemas/UserSchema");

route.get("/:email", (req, res) => {
  const userEmail = req.params.email;
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

          res.json(data);
        }
      );
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = route;
