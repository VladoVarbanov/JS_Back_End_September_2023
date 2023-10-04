const router = require("express").Router();
const homeController = require("./controllers/homeController.js");
const catController = require("./controllers/catController.js");

router.use(homeController);
router.use("/cats", catController);

module.exports = router;
