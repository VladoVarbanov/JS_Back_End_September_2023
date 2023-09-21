const express = require("express");
const app = express();
const PORT = 3000;

// #region Routing
app.get("/", (req, res) => {
  res.send("Welcome, this is the homepage!");
});

app.get("/kittens", (req, res) => {
  res.send("Hello, kitty!");
});

app.post("/kittens", (req, res) => {
  res.send("Kitten has been created!");
});

app.get("*", (req, res) => {
  res.status(404);
  res.send("Sorry page is not found: 404");
});
// #endregion

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
