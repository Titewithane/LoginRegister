const express = require("express");
const router = express.Router();
// const products = require("../controllers/products");
const { verifyToken } = require("../utils/middleware");

router.get("/", verifyToken, (req, res, next) => {
  const token = req.decoded;
  console.log(`token: ${token.exp} time stamp: ${Date.now() / 1000}`);
  token.exp < Date.now() / 1000
    ? console.log("expire")
    : console.log("isn't expire");
  res.status(200).json({ msg: "success" });
});

module.exports = router;
