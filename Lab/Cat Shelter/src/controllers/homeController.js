const router = require("express").Router();
const catService = require("../services/catService.js");

router.get("/", async (req, res) => {
  const cats = await catService.getAll();
  res.render("index", { cats });
});

module.exports = router;
