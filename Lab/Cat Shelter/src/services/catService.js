const Cat = require("../models/Cat.js");

exports.getAll = async () => {
  return await Cat.find().lean();
};
