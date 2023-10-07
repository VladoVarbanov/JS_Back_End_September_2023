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

exports.getById = async (id) => {
  return await Cat.findById(id).lean();
};

exports.put = async (id, catData) => {
  return await Cat.updateOne(id, catData)
    .then((result) => {
      if (result.matchedCount === 1 && result.modifiedCount === 1) {
        console.log("Document updated successfully");
      } else if (result.matchedCount === 0) {
        console.log("Document not found");
      } else {
        console.log("Document found, but no changes made");
      }
    })
    .catch((error) => {
      console.error("Error updating document:", error);
    });
};
