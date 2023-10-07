const router = require("express").Router();
const catService = require("../services/catService.js");

router.get("/add", (req, res) => {
  res.render("cat/addCat");
});

router.post("/add", async (req, res) => {
  const { name, description, imageUrl, breed } = req.body;

  await catService.add({ name, imageUrl, description, breed });
  res.redirect("/");
});

router.get("/breed", (req, res) => {
  res.render("cat/addBreed");
});

router.post("/breed", (req, res) => {
  const { breed } = req.body;
});

module.exports = router;
