const jwt = require("../lib/jwt.js");
const { SECRET } = require("../constants.js");

exports.auth = async (req, res, next) => {
  const token = req.cookies["auth"];
  console.log({ token });
  if (token) {
    try {
      const decodedToken = await jwt.verify(token, SECRET);
      req.user = decodedToken;
      next();
    } catch (error) {
      console.log({ error });
      res.cookieClear("auth");
      res.redirect("/users/login");
    }
  } else {
    next();
  }
};
