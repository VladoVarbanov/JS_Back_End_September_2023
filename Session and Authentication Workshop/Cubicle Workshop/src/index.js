// Imports
const express = require("express");

const handlebarsConfig = require("./config/handlebarsConfig.js");
const expressConfig = require("./config/expressConfig.js");
const dbConnect = require("./config/dbConfig.js");

const { PORT } = require("./constants.js");
const routes = require("./router.js");

// Local variables
const app = express();

// Configs
expressConfig(app);
handlebarsConfig(app);

// Connecting to the database.
dbConnect()
  .then(() => console.log("Successfully connected to the DB!"))
  .catch((err) => console.log(`Error while connecting in DB: ${err}`));

// Routing
app.use(routes);

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}...`));
