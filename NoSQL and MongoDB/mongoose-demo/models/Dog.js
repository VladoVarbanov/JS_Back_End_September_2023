const mongoose = require("mongoose");

// Schema.
const dogSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
    minLength: 3,
    mxnLength: 30,
  },
  age: Number,
  color: String,
});

// Methods
dogSchema.methods.bark = function () {
  console.log("Barkkkk");
};

// Virtual Properties (Calculated properties)
dogSchema.virtual("description").get(function () {
  return `Dog name: ${this.name}, color: ${this.color}`;
});

// Static method
dogSchema.static("getDogsCollection", function () {
  return this.find();
});

// Model
const Dog = mongoose.model("Dog", dogSchema);
module.exports = Dog;
