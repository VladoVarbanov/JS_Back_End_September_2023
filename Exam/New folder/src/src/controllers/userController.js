const router = require("express").Router();
const userService = require('../services/userService');
const { isAuth } = require("../middlewares/authMiddleware");
const { extractErrorMsgs } = require("../utils/errorHandler.js");

router.get("/register", (req, res) => {
    res.render("user/register");
});
router.post("/register", async (req, res) => {
    const { username, email, password, repass } = req.body
    try {
        const token=await userService.register({ username, email, password, repass })
        res.cookie("token", token, { httpOnly: true });
        res.redirect('/')
    } catch (error) {
        const errorMessages = extractErrorMsgs(error)
        res.status(404).render('user/register',{errorMessages})
        
    }
});


router.get("/login", (req, res) => {
    res.render("user/login");
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body
    try {
        const token = await userService.login(email, password)
        res.cookie("token", token, { httpOnly: true });
        res.redirect('/')
    } catch (error) {
        const errorMessages = extractErrorMsgs(error)
        res.status(404).render('user/login',{errorMessages})

    }

})

router.get("/logout",isAuth, (req, res) => {
    res.clearCookie("token");
    res.redirect("/");
});
module.exports = router;