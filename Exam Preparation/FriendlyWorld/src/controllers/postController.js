const router = require("express").Router();
const animalService = require("../services/animalService.js");
const { isAuth } = require("../middlewares/authMiddleware.js");
const { extractErrorMsgs } = require("../utils/errorHandler.js");

router.get("/all", async (req, res) => {
  const animals = await animalService.getAll().lean();
  res.render("post/all-posts", { animals });
});

router.get("/create", isAuth, (req, res) => {
  res.render("post/create");
});

router.post("/create", async (req, res) => {
  const { name, kind, years, need, image, description, location } = req.body;
  const payload = {
    name,
    kind,
    years,
    need,
    image,
    description,
    location,
    owner: req.user,
  };
  // console.log({ payload });
  try {
    await animalService.create(payload);
    res.redirect("/posts/all");
  } catch (error) {
    const errorMessages = extractErrorMsgs(error);
    res.status(404).render("post/create", { errorMessages });
  }
});

router.get("/profile", isAuth, async (req, res) => {
  const { user } = req;

  const myAnimals = await animalService.getMyAnimals(user?._id).lean();

  res.render("post/profile", { myAnimals });
});

router.get("/:animalId/details", async (req, res) => {
  const { animalId } = req.params;
  const animal = await animalService.getSingleAnimal(animalId).lean();
  // const isUsersAnimal = animal
  const { user } = req;
  const { owner } = animal;
  const isOwner = user?._id === owner.toString();
  const hasVoted = animal.votes?.some((v) => v?._id.toString() === user?._id);
  const joinedEmailsOfOwners = animal.votes.map((v) => v.email).join(", ");

  res.render("post/details", {
    animal,
    isOwner,
    hasVoted,
    joinedEmailsOfOwners,
  });
});

router.get("/:animalId/edit", async (req, res) => {
  const { animalId } = req.params;
  const animal = await animalService.getSingleAnimal(animalId).lean();

  res.render("post/edit", { animal });
});

router.post("/:animalId/edit", async (req, res) => {
  const { animalId } = req.params;
  const { name, species, skinColor, eyeColor, image, description } = req.body;

  const payload = {
    name,
    species,
    skinColor,
    eyeColor,
    image,
    description,
    owner: req.user,
  };
  await animalService.update(animalId, payload);

  res.redirect(`/posts/${animalId}/details`);
});

router.get("/:animalId/delete", async (req, res) => {
  const { animalId } = req.params;
  await animalService.delete(animalId);
  res.redirect("/posts/all");
});

router.get("/:animalId/vote", async (req, res) => {
  const { animalId } = req.params;
  const { _id } = req.user;
  await animalService.addVotesToAnimal(animalId, _id);
  res.redirect(`/posts/${animalId}/details`);
});

module.exports = router;
