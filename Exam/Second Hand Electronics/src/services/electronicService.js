const Electronic = require("../models/Electronic.js");

exports.create = (createData) => Electronic.create(createData);

exports.getAll = () => Electronic.find();

exports.getSingleElectronic = (electronicId) =>
  Electronic.findById(electronicId).populate("buyingList");

exports.getElectronicByName = (name) => Electronic.find(name);

exports.update = (electronicId, electronicData) =>
  Electronic.findByIdAndUpdate(electronicId, electronicData);

exports.delete = (electronicId) => Electronic.findByIdAndDelete(electronicId);

exports.getMyElectronics = (ownerId) =>
  Electronic.find({ owner: ownerId }).populate("owner");

exports.addBuyingListToElectronic = async (electronicId, userId) => {
  const electronic = await this.getSingleElectronic(electronicId);
  const isExistingInElectronics = electronic.buyingList.some(
    (b) => b.toString() === userId
  );

  if (isExistingInElectronics) {
    return;
  }
  electronic.buyingList.push(userId);
  return electronic.save();
};
