const User = require("../models/User.js");
const bcrypt = require("bcrypt");
const jwt = require("../lib/jwt.js");
const { SECRET } = require("../constants.js");

async function validatePassword(password, userPassword) {
  // validate password
  const isValid = await bcrypt.compare(password, userPassword);

  if (!isValid) {
    throw new Error("Invalid email or password!");
  }
}

async function geToken(user) {
  const payload = { _id: user._id, email: user.email };
  const token = await jwt.sign(payload, SECRET, { expiresIn: "3d" });

  return token;
}

exports.register = async (userData) => {
  const { password } = userData;
  const user = await User.create(userData);

  await validatePassword(password, user.password);

  const token = await geToken(user);
  return token;
};

exports.login = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Invalid email or password!");
  }

  await validatePassword(password, user.password);

  const token = await geToken(user);
  return token;
};
