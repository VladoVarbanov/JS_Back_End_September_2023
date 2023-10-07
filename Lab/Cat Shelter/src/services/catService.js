const Cat = require("../models/Cat.js");
const Breed = require("../models/Breed.js");

exports.getAll = async () => {
  return await Cat.find().lean();
};

exports.add = async (catData) => {
  const cat = await Cat.create(catData);
  return cat;
};

exports.addBreed = async (breedData) => {
  const breed = await Breed.create(breedData);
  return breed;
};

exports.getAllBreeds = async () => {
  return await Breed.find().lean();
};
