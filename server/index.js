const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/LoginRegister");
mongoose.connection.on(
  "error",
  console.error.bind(console, "connection error:")
);
mongoose.connection.once("open", () => console.log("Database connected"));

//? middleware
const corsOptions = {
  origin: ["http://localhost:5173"],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    msg: "hello world",
  });
});

app.post("/register", (req, res) => {
  const { username, password, rePassword } = req.body;
});

app.listen(5000, () => {
  console.log("server is up and running on port 5000");
});
