module.exports.validateRegister = (req, res, next) => {
  const { username, password, rePassword } = req.body;
  if (username.length > 0 && username.length <= 8) {
    if (password === rePassword && password.length >= 5) {
      next();
    } else {
      res.json({
        msg: "Somethings went wrong.",
      });
    }
  } else {
    res.json({
      msg: "Username's length fail.",
    });
  }
};
