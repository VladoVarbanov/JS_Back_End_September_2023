const router = require("express").Router();
const catService = require("../services/catService.js");

router.get("/add", async (req, res) => {
  const catBreed = await catService.getAllBreeds();
  res.render("cat/addCat", { breeds: catBreed });
});

router.post("/add", async (req, res) => {
  const { name, description, imageUrl, breed } = req.body;

  await catService.add({ name, imageUrl, description, breed });
  res.redirect("/");
});

router.get("/breed", (req, res) => {
  res.render("cat/addBreed");
});

router.post("/breed", async (req, res) => {
  const { breed } = req.body;

  await catService.addBreed({ breed });
  res.redirect("/");
});

module.exports = router;
