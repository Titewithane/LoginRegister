const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");

const userRoutes = require("./routes/users");
const productRoutes = require("./routes/products");

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

const sessionConfig = {
  name: "session",
  secret: "secret",
  resave: false,
  saveUninitialized: false,
  cookie: {},
};
app.use(session(sessionConfig));

app.get("/", (req, res) => {
  res.json({
    msg: "hello world",
  });
});

app.use("/auth", userRoutes);
app.use("/product", productRoutes);

app.get("*", (req, res) => {
  res.status(404).json({
    msg: "error",
  });
});

app.listen(5000, () => {
  console.log("server is up and running on port 5000");
});
