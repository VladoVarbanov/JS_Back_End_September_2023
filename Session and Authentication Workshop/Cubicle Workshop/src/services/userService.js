const User = require("../models/User.js");
exports.register = (userData) => {
  User.create(userData);
};
