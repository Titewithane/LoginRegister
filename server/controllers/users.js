const bcrypt = require("bcrypt");
const saltRounds = 10;
const User = require("../models/user");

module.exports.register = async (req, res) => {
  const { username, password, rePassword } = req.body;
  console.log(username, password);
  const isUsed = await User.findOne({ username: `${username}` });
  if (isUsed) {
    res.json({
      msg: "Username is already used.",
    });
  } else {
    bcrypt.hash(password, saltRounds, async (err, hash) => {
      const newUser = new User({ username: `${username}`, password: hash });
      await newUser.save();
      console.log(newUser);
    });
    res.json({
      msg: "User's account has been created.",
    });
  }
};
