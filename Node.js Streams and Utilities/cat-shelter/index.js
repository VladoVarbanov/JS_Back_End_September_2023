const http = require("http");
const fs = require("fs/promises");

const PORT = 3000;

let cats = [
  {
    imageUrl:
      "https://th-thumbnailer.cdn-si-edu.com/wVkY4ktA-0JvRsuh8EASm6NoSNs=/1000x750/filters:no_upscale():focal(978x630:979x631)/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/db/82/db8234fc-f167-4285-82bd-123d035e32ad/cats.jpg",
    name: "Tsunami",
    breed: "Norwegian Forest Cat",
    description: "Very cute cat1!",
  },
  {
    imageUrl:
      "https://th-thumbnailer.cdn-si-edu.com/bZAar59Bdm95b057iESytYmmAjI=/1400x1050/filters:focal(594x274:595x275)/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/95/db/95db799b-fddf-4fde-91f3-77024442b92d/egypt_kitty_social.jpg",
    name: "Pesho",
    breed: "British Shorthair",
    description: "Very cute cat2!",
  },
  {
    imageUrl:
      "https://static.scientificamerican.com/sciam/cache/file/890CFFA8-CDDD-41FA-97E42BDF9422F97E_source.jpg",
    name: "Dancho",
    breed: "Bengal",
    description: "Very cute cat3!",
  },
  {
    imageUrl:
      "https://m.media-amazon.com/images/M/MV5BOTA3NmU1NDMtYzcxMC00ZjI5LTllZWItYWI3MmZkNTE1ZTg0XkEyXkFqcGdeQW1hcmNtYW5u._V1_.jpg",
    name: "Mariika",
    breed: "Siamese",
    description: "Very cute cat4!",
  },
];

const server = http.createServer(async (req, res) => {
  const { method, url } = req;
  //   console.log(url);

  if (url === "/") {
    const imageUrlPattern = /{{imageUrl}}/g;
    const namePattern = /{{name}}/g;
    const breedPattern = /{{breed}}/g;
    const descriptionPattern = /{{description}}/g;

    const catTemplate = await fs.readFile(
      "./views/home/catTemplate.html",
      "utf-8"
    );
    const homeHtml = await fs.readFile("./views/home/index.html", "utf-8");

    const catHtml = cats
      .map((cat) =>
        catTemplate
          .replace(imageUrlPattern, cat.imageUrl)
          .replace(namePattern, cat.name)
          .replace(breedPattern, cat.breed)
          .replace(descriptionPattern, cat.description)
      )
      .join("");
    const homeHtmlTemplate = homeHtml.replace("{{cats}}", catHtml);
    res.writeHead(200, {
      "Content-Type": "text/html",
    });

    res.write(homeHtmlTemplate);
  } else if (url === "/content/styles/site.css") {
    const siteCss = await fs.readFile("./content/styles/site.css", "utf-8");
    res.writeHead(200, {
      "Content-Type": "text/css",
    });

    res.write(siteCss);
  } else if (url === "/cats/add-breed") {
    const addBreedHtml = await fs.readFile("./views/addBreed.html", "utf-8");
    res.writeHead(200, "OK", {
      "Content-Type": "text/html",
    });

    res.write(addBreedHtml);
  } else if (url === "/cats/add-cat") {
    const addCatHtml = await fs.readFile("./views/addCat.html", "utf-8");
    res.writeHead(200, "OK", {
      "Content-Type": "text/html",
    });
    res.write(addCatHtml);
  }
  console.log(url);
  res.end();
});

server.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
