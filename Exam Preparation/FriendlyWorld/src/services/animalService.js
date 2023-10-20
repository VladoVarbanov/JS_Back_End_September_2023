const Animal = require("../models/Animal.js");

exports.create = (animalData) => Animal.create(animalData);

exports.getAll = () => Animal.find();

exports.getSingleAnimal = (animalId) =>
  Animal.findById(animalId).populate("votes");

exports.update = (animalId, animalData) =>
  Animal.findByIdAndUpdate(animalId, animalData);

exports.delete = (animalId) => Animal.findByIdAndDelete(animalId);

exports.getMyAnimals = (ownerId) =>
  Animal.find({ owner: ownerId }).populate("owner");

exports.addVotesToAnimal = async (animalId, userId) => {
  const animal = await this.getSingleAnimal(animalId);
  const isExistingInVotes = animal.votes.some((v) => v.toString() === userId);

  if (isExistingInVotes) {
    return;
  }
  animal.votes.push(userId);
  return animal.save();
};
