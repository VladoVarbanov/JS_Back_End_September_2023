const express = require("express");
const expressConfig = require("./config/expressConfig.js");
const handlebars = require("express-handlebars");
const handlebarsConfig = require("./config/handlebarsConfig.js");

// ?Local variables
const PORT = 3000;
const app = express();

//  !!! Configs !!!  //
expressConfig(app);
handlebarsConfig(app);

//  !!!  SERVER  !!!  //
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
