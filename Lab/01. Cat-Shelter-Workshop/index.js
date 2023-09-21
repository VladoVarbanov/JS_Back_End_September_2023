const http = require("http");
const { homeTemplate, catTemplate } = require("./views/home/index.js");
const siteCss = require("./content/styles/site.js");
const addBreedHtml = require("./views/addBreed");
const addCat = require("./views/addCat.js");

const cats = [
  {
    id: 1,
    name: "Navcho",
    breed: "Persian",
    description: "Very cute cat",
  },
  {
    id: 2,
    name: "Mishi",
    breed: "Angora",
    description: "Fluffy cat",
  },
  {
    id: 3,
    name: "Garry",
    breed: "Balinese",
    description: "Fat cat",
  },
];

const server = http
  .createServer(async (req, res) => {
    const url = req.url;
    console.log(
      "request: +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
    );
    console.log(req.method);

    if (url === "/") {
      const catHtml = cats.map((cat) =>
        catTemplate
          .replace("{{catName}}", cat.name)
          .replace("{{breed}}", cat.breed)
          .replace("{{description}}", cat.description)
      );
      const homeHtml = homeTemplate.replace("{{cats}}", catHtml);

      res.writeHead(200, {
        "Content-Type": "text/html",
      });
      res.write(homeHtml);
    } else if (url === "/styles/site.css") {
      res.writeHead(200, {
        "Content-Type": "text/css",
      });
      res.write(siteCss);
    } else if (url === "/cats/add-breed") {
      res.writeHead(200, {
        "Content-Type": "text/html",
      });
      res.write(addBreedHtml);
    } else if (url === "/cats/add-cat") {
      res.writeHead(200, {
        "Content-Type": "text/html",
      });
      res.write(addCat);
    }

    res.end();
  })
  .listen(5000, () => console.log("This server is Running on port: 5000..."));
