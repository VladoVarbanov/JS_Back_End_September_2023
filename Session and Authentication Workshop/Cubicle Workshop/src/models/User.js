const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

// TODO: if user already exists, throw error.
userSchema.virtual("repeatPassword").set(function (value) {
  if (value !== this.password) {
    throw new mongoose.MongooseError("Password mismatch!");
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
