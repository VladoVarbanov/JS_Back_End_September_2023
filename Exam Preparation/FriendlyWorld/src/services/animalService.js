const Animal = require("../models/Animal.js");

exports.create = (animalData) => Animal.create(animalData);

exports.getAll = () => Animal.find();

exports.getSingleAnimal = (animalId) =>
  Animal.findById(animalId).populate("donations");

exports.update = (animalId, animalData) =>
  Animal.findByIdAndUpdate(animalId, animalData);

exports.delete = (animalId) => Animal.findByIdAndDelete(animalId);

exports.getMyAnimals = (ownerId) =>
  Animal.find({ owner: ownerId }).populate("owner");

exports.addDonationsToAnimal = async (animalId, userId) => {
  const animal = await this.getSingleAnimal(animalId);
  const isExistingInDonations = animal.donations.some(
    (v) => v.toString() === userId
  );

  if (isExistingInDonations) {
    return;
  }
  animal.donations.push(userId);
  return animal.save();
};
