const User = require("../models/User.js");
const bcrypt = require("bcrypt");
const jwt = require("../lib/jwt.js");
const { SECRET } = require("../constants.js");

exports.register = (userData) => {
  User.create(userData);
};

exports.login = async (username, password) => {
  const user = await User.findOne({ username });
  // Validate username.
  if (!user) {
    throw new Error("Invalid username or password!");
  }

  // Validate password.
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw new Error("Invalid username or password!");
  }

  const payload = {
    _id: user._id,
    username: user.username,
  };
  const token = await jwt.sign(payload, SECRET, { expiresIn: "3d" });

  return token;
};
