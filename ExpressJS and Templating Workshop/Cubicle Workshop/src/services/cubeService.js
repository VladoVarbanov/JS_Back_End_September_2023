const uniqid = require("uniqid");

const cubes = [
  {
    id: "bs64dqglmwa7lgg",
    name: "Gan356 Air SM",
    description: "Easy difficulty level",
    imageUrl:
      "https://thingsidesire.com/wp-content/uploads/2018/06/Eco-Dark-Rubik%E2%80%99s-Cube2.jpg",
    difficultyLevel: 2,
  },
  {
    id: "bs64dqglmwa885s",
    name: "Pyraminx",
    description: "Medium difficulty level",
    imageUrl:
      "https://images-na.ssl-images-amazon.com/images/I/61izOzq%2BBAL._SY355_.jpg",
    difficultyLevel: 3,
  },
  {
    id: "bs64dqglmwab1hb",
    name: "Megaminx",
    description: "Hardcore difficulty level",
    imageUrl:
      "https://images.hindustantimes.com/img/2021/06/24/1600x900/World%E2%80%99s_biggest_Rubik%E2%80%99s_Cube_1624503610253_1624503618190.jpg",
    difficultyLevel: 6,
  },
];

exports.create = (cubeData) => {
  const newCube = {
    id: uniqid(),
    ...cubeData,
  };
  cubes.push(newCube);

  return newCube;
};

exports.getAll = () => {
  return [...cubes];
};
