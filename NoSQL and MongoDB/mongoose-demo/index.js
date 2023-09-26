const mongoose = require("mongoose");
const Dog = require("./models/Dog.js");
const CONNECTION_STR = "mongodb://localhost:27017";
const DATABASE_NAME = "DogsDB";

async function connectDb() {
  await mongoose.connect(`${CONNECTION_STR}/${DATABASE_NAME}`);

  console.log(`Connected to database: ${DATABASE_NAME}...`);

  //   const dogs = await Dog.find();
  //   dogs.forEach((dog) => {
  //     dog.bark();
  //   });

  //   dogs.forEach((dog) => console.log(dog.description));
  //   const d = await Dog.getDogsCollection();
  //   console.log(d);

  // CREATE
  //   const newDog = new Dog({ name: "Li", age: 4, color: "orange" });
  //   newDog.save();

  //   const newDog = await Dog.create({ name: "Sharo", age: 3, color: "purple" });
  //   console.log(newDog);

  // READ
  const dogs = await Dog.find();
  //   const dogs = await Dog.find({ age: 5 });

  // UPDATE
  // Variant 1
  //   await Dog.updateOne({ name: "Roshko" }, { $set: { age: 12 } });

  // Variant 2
  //   const DOG_ID = "6513200346861f4c42f9116f";
  //   const dog = await Dog.findById(DOG_ID);
  //   dog.age = -3;
  //   dog.color = "transparent";
  //   dog.save();

  // Variant 3
  //   await Dog.findByIdAndUpdate(DOG_ID, { name: "Po" });

  // DELETE
  //   const DOG_ID = "65131f867b766b8c77d5ecfa";
  //   await Dog.findByIdAndDelete(DOG_ID);
  console.log(dogs);
}

connectDb();
