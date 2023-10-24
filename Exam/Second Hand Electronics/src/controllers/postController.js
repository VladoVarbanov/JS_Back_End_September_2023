const router = require("express").Router();
const electronicService = require("../services/electronicService.js");
const { isAuth } = require("../middlewares/authMiddleware.js");
const { extractErrorMsgs } = require("../utils/errorHandler.js");

router.get("/catalog", async (req, res) => {
  const electronics = await electronicService.getAll().lean();
  res.render("post/catalog", { electronics });
});

router.get("/create", isAuth, (req, res) => {
  res.render("post/create");
});

router.post("/create", async (req, res) => {
  const {
    name,
    type,
    damages,
    image,
    description,
    production,
    exploitation,
    price,
  } = req.body;
  const payload = {
    name,
    type,
    damages,
    image,
    description,
    production,
    exploitation,
    price,
    owner: req.user,
  };
  try {
    await electronicService.create(payload);
    res.redirect("/posts/catalog");
  } catch (error) {
    const errorMessages = extractErrorMsgs(error);
    res.status(404).render("post/create", { errorMessages });
  }
});

router.get("/profile", isAuth, async (req, res) => {
  const { user } = req;

  const myElectronics = await electronicService
    .getMyElectronics(user?._id)
    .lean();

  res.render("post/profile", { myElectronics });
});

router.get("/:electronicId/details", async (req, res) => {
  const { electronicId } = req.params;
  const electronic = await electronicService
    .getSingleElectronic(electronicId)
    .lean();
  const { user } = req;
  const { owner } = electronic;
  const isOwner = user?._id === owner.toString();
  const hasBought = electronic.buyingList?.some(
    (v) => v?._id.toString() === user?._id
  );
  const joinedEmailsOfOwners = electronic.buyingList
    .map((b) => b.email)
    .join(", ");

  res.render("post/details", {
    electronic,
    isOwner,
    hasBought,
    joinedEmailsOfOwners,
  });
});

router.get("/:electronicId/edit", async (req, res) => {
  const { electronicId } = req.params;
  const electronic = await electronicService
    .getSingleElectronic(electronicId)
    .lean();

  res.render("post/edit", { electronic });
});

router.post("/:electronicId/edit", async (req, res) => {
  const { electronicId } = req.params;
  const {
    name,
    type,
    damages,
    image,
    description,
    production,
    exploitation,
    price,
  } = req.body;

  const payload = {
    name,
    type,
    damages,
    image,
    description,
    production,
    exploitation,
    price,
    owner: req.user,
  };
  await electronicService.update(electronicId, payload);

  res.redirect(`/posts/${electronicId}/details`);
});

router.get("/:electronicId/delete", async (req, res) => {
  const { electronicId } = req.params;
  await electronicService.delete(electronicId);
  res.redirect("/posts/catalog");
});

router.get("/:electronicId/buyingList", async (req, res) => {
  const { electronicId } = req.params;
  const { _id } = req.user;
  await electronicService.addBuyingListToElectronic(electronicId, _id);
  res.redirect(`/posts/${electronicId}/details`);
});

router.get("/search", async (req, res) => {
  const electronics = await electronicService.getAll().lean();
  res.render("post/search", { electronics });
});

router.post("/search", async (req, res) => {
  const { name, type } = req.body;
  let result = await electronicService.getAll().lean();
  console.log(result);
  result = result.filter((el) => {
    let all = el.name.toLowerCase().includes(name.toLowerCase());
    if (type) {
      all = el.type.toLowerCase().includes(type.toLowerCase());
    }
    return all;
  });

  const electronics = result;

  res.render("post/search", { electronics });
});
module.exports = router;
