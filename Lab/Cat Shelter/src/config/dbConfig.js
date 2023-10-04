const mongoose = require("mongoose");
const URL = "mongodb://localhost:27017/CatShelteredDB";

async function dbConnect() {
  await mongoose.connect(URL);
}

module.exports = dbConnect;
