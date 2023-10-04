const express = require("express");
const expressConfig = require("./config/expressConfig.js");
const handlebars = require("express-handlebars");
const handlebarsConfig = require("./config/handlebarsConfig.js");
const routes = require("./router.js");
const dbConnect = require("./config/dbConfig.js");

// ?Local variables
const PORT = 3000;
const app = express();

//  !!! Configs  !!!  //
expressConfig(app);
handlebarsConfig(app);

//  !!! Connecting to the database  !!!  //
dbConnect()
  .then(() => console.log("Successfully connected to the Database!"))
  .catch((err) => console.log(`Error connecting the Database: ${err}`));

//  !!! Routing  !!!  //
app.use(routes);

//  !!!  SERVER  !!!  //
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
