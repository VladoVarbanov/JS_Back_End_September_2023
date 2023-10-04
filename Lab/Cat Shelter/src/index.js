const express = require("express");
const expressConfig = require("./config/expressConfig.js");
const handlebars = require("express-handlebars");
const handlebarsConfig = require("./config/handlebarsConfig.js");
const routes = require("./router.js");

// ?Local variables
const PORT = 3000;
const app = express();

//  !!! Configs  !!!  //
expressConfig(app);
handlebarsConfig(app);

//  !!! Routing  !!!  //
app.use(routes);

//  !!!  SERVER  !!!  //
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
