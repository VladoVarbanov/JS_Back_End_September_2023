const mongodb = require("mongodb");
const connectionString = "mongodb://localhost:27017"; // mongodb://127.0.0.1:27017,mongodb://localhost:27017
const client = new mongodb.MongoClient(connectionString);

async function connectDb() {
  client.connect();

  const db = client.db("StudentsDB");
  const dogs = db.collection("students");
  const result = await dogs.find().toArray();
  console.log(StudentsDB);
}

connectDb();
