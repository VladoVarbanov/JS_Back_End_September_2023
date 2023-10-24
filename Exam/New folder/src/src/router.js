const router = require("express").Router();
const homeController = require('./controllers/homeController')
const userController = require('./controllers/userController')
const offersController = require('./controllers/offersController')

router.use(homeController)
router.use('/users',userController)
router.use('/offers',offersController)


router.get("*", (req, res) => {
    res.redirect("/404");
  });
  
module.exports = router;