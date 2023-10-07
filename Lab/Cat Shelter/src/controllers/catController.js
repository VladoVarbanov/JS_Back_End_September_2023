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

router.get("/edit", async (req, res) => {
  const { id } = req.query;
  const { name, description, imageUrl, breed } = await catService.getById(id);
  const catBreed = await catService.getAllBreeds();
  const catList = catBreed.filter((cat) => cat.breed !== breed);
  res.render("cat/editCat", {
    name,
    description,
    imageUrl,
    breed,
    breeds: catList,
    id,
  });
});

router.post("/edit", async (req, res) => {
  const { id, name, description, imageUrl, breed } = req.body;
  const filter = { _id: id };
  await catService.put(filter, { name, description, imageUrl, breed });
  res.redirect("/");
});

router.get("/shelter", async (req, res) => {
  const id = req.query.id;
  const { name, description, imageUrl, breed } = await catService.getById(id);
  res.render("cat/catShelter", { name, description, imageUrl, breed, id });
});

router.post("/shelter", async (req, res) => {
  const { id, name, description, imageUrl, breed } = req.body;
  const filter = { _id: id };
  await catService.delete(filter);
  res.redirect("/");
});

module.exports = router;
