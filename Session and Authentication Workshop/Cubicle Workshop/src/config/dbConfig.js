const mongoose = require("mongoose");
const { URL } = require("../constants.js");

async function dbConnect() {
  await mongoose.connect(URL);
}

module.exports = dbConnect;
