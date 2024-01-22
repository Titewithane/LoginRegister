const express = require("express");
const router = express.Router();
const users = require("../controllers/users");
const { validateRegister } = require("../utils/middleware");

router.post("/register", validateRegister, users.register);

router.post("/login", users.login);

module.exports = router;
