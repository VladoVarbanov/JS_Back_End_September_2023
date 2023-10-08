const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const { v4: uuid } = require("uuid");
const PORT = 5050;
const app = express();

app.use(cookieParser());
app.use(
  session({
    secret: "My biggest secret ever!",
    resave: false,
    cookie: { secure: false },
  })
);

app.get("/", (req, res) => {
  let id;
  const userId = req.cookies["userId"];

  if (userId) {
    id = userId;
    console.log({ session: req.session });
  } else {
    id = uuid();

    req.session.message = "Test 123";
    res.cookie("userId", id);
  }

  res.send(`OK! ID: ${id}`);
});

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
