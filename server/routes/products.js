const express = require("express");
const router = express.Router();
// const products = require("../controllers/products");
const { verifyToken } = require("../utils/middleware");

router.get("/", verifyToken, (req, res, next) => {
  res.status(400).json({ msg: "success" });
});

module.exports = router;
