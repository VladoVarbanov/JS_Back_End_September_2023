const express = require("express");
const handlebars = require("express-handlebars");
const app = express();
const path = require("path");
const PORT = 3000;

const { getKittens, addKitten } = require("./kittens.js");

// VIEW ENGINE
app.engine("hbs", handlebars.engine({ extname: "hbs" }));
app.set("view engine", "hbs");

// #region MIDDLEWARE
// third-party middleware.
const bodyParser = express.urlencoded({ extended: false });
app.use(bodyParser);

const staticFile = express.static("public");
app.use(staticFile);

// global middleware.
app.use((req, res, next) => {
  console.log(`HTTP Request: ${req.method}, Request Path: ${req.path}`);
  next();
});

//partial routing middleware.
app.use("/kittens", (req, res, next) => {
  console.log("Kittens Middleware has been invoked!");
  next();
});

// concrete routing middleware.
const specificMiddleware = (req, res, next) => {
  console.log("This is the specific routes MIDDLEWARE");
  next();
};

// #endregion MIDDLEWARE

// #region ROUTING
app.get("/", (req, res) => {
  // res.send("Welcome, this is the homepage!");
  res.render("home");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/specific", specificMiddleware, (req, res) => {
  res.send("This is specific route! :)");
});

app.get("/kittens", (req, res) => {
  const kittens = getKittens();
  console.log({ kittens });
  res.render("kittens", { kittens });
});

app.get("/kittens/:kittenId", (req, res) => {
  const kittenId = Number(req.params.kittenId);
  console.log(req.params);

  if (!kittenId) {
    res.status(404).send("Bad kitten id: " + req.params.kittenId);
    return;
  }

  res.send({ id: kittenId, name: "Kircho" + kittenId });
});

app.post("/kittens", (req, res) => {
  console.log(req.body);
  const name = req.body.name;
  const age = Number(req.body.age);
  addKitten(name, age);
  res.send("Kitten has been created!");
});

app.get("*", (req, res) => {
  res.status(404);
  res.send("Sorry page is not found: 404");
});
// #endregion

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
