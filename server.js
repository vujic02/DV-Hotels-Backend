const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 3001;

const { Login, Signup } = require("./controllers/index");

//parsers
app.use(express.json());
app.use(cors());

// mongoose
mongoose
  .connect("mongodb://localhost/DvHotels", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
  })
  .then(() => {
    console.log("Connected To the MongoDb database");
  })
  .catch((err) => {
    console.log("Couldn't connect to the db", err);
  });

// controllers
app.get("/", (req, res) => {
  res.json("Connected to the server");
});

app.use("/api/signup", Signup);
app.use("/api/login", Login);

//listen
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
