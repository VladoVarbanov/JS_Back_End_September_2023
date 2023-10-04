const router = require("express").Router();
const catService = require("../services/catService.js");

router.get("/add", (req, res) => {
  res.render("cat/addCat");
});

router.post("/add", async (req, res) => {
  const { name, description, imageUrl, breed } = req.body;

  await catService.add({ name, imageUrl, description, breed });
  console.log(req.body);
  res.redirect("/");
});

module.exports = router;
