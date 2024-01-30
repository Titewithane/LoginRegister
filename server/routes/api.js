const express = require("express");
const router = express.Router();
const { refreshToken } = require("../controllers/api");

router.post("/refreshToken", refreshToken);
