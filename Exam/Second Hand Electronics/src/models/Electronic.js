const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const creatureSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 10,
  },
  type: {
    type: String,
    required: true,
    minLength: 2,
  },
  damages: {
    type: String,
    required: true,
    minLength: 10,
  },
  image: {
    type: String,
    required: true,
    match: [/^https?:\/\/.+/, "Provide valid creature image link!"],
  },
  description: {
    type: String,
    required: true,
    minLength: 10,
    maxLength: 200,
  },
  production: {
    type: Number,
    required: true,
    min: 1900,
    max: 2023,
  },
  exploitation: {
    type: Number,
    required: true,
    min: 0,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  buyingList: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  ],
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Electronic = mongoose.model("Electronic", creatureSchema);
module.exports = Electronic;
