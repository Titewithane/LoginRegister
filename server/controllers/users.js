const bcrypt = require("bcrypt");
const saltRounds = 10;
const User = require("../models/users");
const jwt = require("jsonwebtoken");

module.exports.register = async (req, res) => {
  try {
    const { username, password, rePassword } = req.body;
    const isUsed = await User.findOne({ username: `${username}` });
    if (isUsed) {
      res.status(409).json({
        msg: "fail",
      });
    } else {
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        const newUser = new User({ username: `${username}`, password: hash });
        await newUser.save();
      });
      res.status(200).json({
        msg: "success",
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Registration failed" });
  }
};

module.exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: `${username}` }); // exec() make query return as object
    if (user.username === "" || password === "") {
      res.status(401).json({
        msg: "fail",
      });
    } else {
      const result = await bcrypt.compare(password, user.password);
      if (result) {
        const accessToken = jwt.sign({ userId: user._id }, "9yoahvofN", {
          expiresIn: "20m",
        });
        const refreshToken = jwt.sign(
          { userId: user._id },
          "9yoahvofNNfovhaoy9",
          { expiresIn: "1d" }
        );

        res.status(200).json({ accessToken, refreshToken });
      } else {
        res.status(401).json({
          msg: "Unauthorized",
        });
      }
    }
  } catch (error) {
    res.status(400).json({ error: "Login failed" });
  }
};
