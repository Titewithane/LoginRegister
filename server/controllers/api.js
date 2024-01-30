const bcrypt = require("bcrypt");
const saltRounds = 10;
const User = require("../models/users");
const jwt = require("jsonwebtoken");

module.exports.refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    const decoded = jwt.verify(refreshToken, "9yoahvofNNfovhaoy9");
    const user = await User.findOne({ _id: decoded.userId });
    const accessToken = jwt.sign({ userId: user._id }, "9yoahvofN", {
      expiresIn: "20m",
    });
    res.status(200).json({ accessToken });
  } catch (err) {
    res.status(500).json({ msg: err });
  }
};
