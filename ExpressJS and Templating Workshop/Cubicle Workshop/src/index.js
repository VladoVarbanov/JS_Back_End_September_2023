// Imports
const express = require("express");
const handlebarsConfig = require("./config/handlebarsConfig.js");
const expressConfig = require("./config/expressConfig.js");
const { PORT } = require("./constants.js");

// Local variables
const app = express();

// Configs
expressConfig(app);
handlebarsConfig(app);

// Routing
app.get("/", (req, res) => {
  res.render("index");
});

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}...`));
