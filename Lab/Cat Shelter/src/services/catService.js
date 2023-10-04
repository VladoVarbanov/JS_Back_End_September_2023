const Cat = require("../models/Cat.js");

exports.getAll = async () => {
  return await Cat.find().lean();
};

exports.add = async (catData) => {
  const cat = await Cat.create(catData);
  return cat;
};
