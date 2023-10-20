const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const animalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
  },
  kind: {
    type: String,
    required: true,
    minLength: 3,
  },
  years: {
    type: Number,
    required: true,
    // min: 1,
    // max: 100,
  },
  need: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 20,
  },
  image: {
    type: String,
    required: true,
    match: [/^https?:\/\/.+/, "Provide valid animal image link!"],
  },
  description: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 50,
  },
  location: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 15,
  },
  // name: { type: String, required: true, minLength: 2 },
  // kind: { type: String, required: true, minLength: 3 },
  // years: { type: String, required: true, min: 1, max: 100 },
  // need: { type: String, required: true },
  // image: { type: String, required: true },
  // description: { type: String, required: true },
  // location: { type: String, required: true },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Animal = mongoose.model("Animal", animalSchema);
module.exports = Animal;
