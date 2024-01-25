const bcrypt = require("bcrypt");
const saltRounds = 10;
const User = require("../models/users");
const jwt = require("jsonwebtoken");

module.exports.register = async (req, res) => {
  try {
    const { username, password, rePassword } = req.body;
    const isUsed = await User.findOne({ username: `${username}` });
    if (isUsed) {
      res.json({
        msg: "fail",
      });
    } else {
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        const newUser = new User({ username: `${username}`, password: hash });
        await newUser.save();
      });
      req.session.isLogin = true;
      res.json({
        msg: "success",
        isLogin: req.session.isLogin,
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Registration failed" });
  }
};

module.exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: `${username}` }).exec(); // exec() make query return as object
    if (user.username === "" || password === "") {
      res.json({
        msg: "fail",
      });
    } else {
      const result = await bcrypt.compare(password, user.password);
      if (result) {
        const token = jwt.sign(
          { userId: user._id },
          "thisshouldbebetterthatthis",
          { expiresIn: "1h" }
        );
        res.status(200).json({ token, msg: "success" });
      } else {
        res.json({
          msg: "fail",
        });
      }
    }
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
};
