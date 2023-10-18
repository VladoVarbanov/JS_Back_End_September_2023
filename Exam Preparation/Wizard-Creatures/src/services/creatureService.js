const Creature = require("../models/Creature.js");

exports.create = (createData) => Creature.create(createData);

exports.getAll = () => Creature.find();

exports.getSingleCreature = (creatureId) =>
  Creature.findById(creatureId).populate("votes");

exports.update = (creatureId, creatureData) =>
  Creature.findByIdAndUpdate(creatureId, creatureData);

exports.delete = (creatureId) => Creature.findByIdAndDelete(creatureId);

exports.getMyCreatures = (ownerId) =>
  Creature.find({ owner: ownerId }).populate("owner");

exports.addVotesToCreature = async (creatureId, userId) => {
  const creature = await this.getSingleCreature(creatureId);
  const isExistingInVotes = creature.votes.some((v) => v.toString() === userId);

  if (isExistingInVotes) {
    return;
  }
  creature.votes.push(userId);
  return creature.save();
};
