const express = require("express");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const PORT = 5050;
const app = express();

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

const users = {};

app.get("/", (req, res) => {
  // let id;
  // const userId = req.cookies["userId"];

  // if (userId) {
  //   id = userId;
  //   console.log({ session: req.session });
  // } else {
  //   id = uuid();

  //   req.session.message = "Test 123";
  //   res.cookie("userId", id);
  // }

  res.send(`OK! ID: ${id}`);
});

app.get("/login", (req, res) => {
  res.send(`
  <h3>Login</h3>
  <form method="post">
    <label for="username">Username</label>
    <input type="text" name="username" />
    <label for="password">Password</label>
    <input type="password" name="password" />
    <input type="submit" value="Submit" />
  </form>`);
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const preservedHash = users[username]?.password;

  const isValid = await bcrypt.compare(password, preservedHash);

  if (isValid) {
    res.send("Successfully Authenticated!");
  } else {
    res.status(401).send("Unauthorized! :(");
  }
});

app.get("/register", (req, res) => {
  res.send(`
  <h3>Register</h3>
  <form method="post">
    <label for="username">Username</label>
    <input type="text" name="username" />
    <label for="password">Password</label>
    <input type="password" name="password" />
    <input type="submit" value="Submit" />
  </form>`);
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  // const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, 10);
  users[username] = { password: hash };

  res.redirect("/login");
});

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
