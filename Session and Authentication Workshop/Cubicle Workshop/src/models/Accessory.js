const mongoose = require("mongoose");
const { schema } = require("./Cube.js");

const accessorySchema = new mongoose.Schema({
  name: String,
  imageUrl: String,
  description: String,
});

const Accessory = mongoose.model("Accessory", accessorySchema);

module.exports = Accessory;
