const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const application = express();

const db = require("./models/index");

const playerController = require("./controllers/player.controller");
const pokemonController = require("./controllers/pokemon.controller");
const teamController = require("./controllers/team.controller");

const PORT = 3000 || process.env.PORT;


const apiInfo = {
  name: "First Express Api",
  version: "1.0.0",
  author: "Aldo Castillo",
  enterprise: "mecanizados",
  programming_language: "JavaScript",
  contactInfo: {
    email: "aldo.castillo.13@gmail.com",
    wsp: "261-6934658",
  },
  date: "22-04-2020",
};

let corsOptions = {
  origin: "http://localhost:3000",
};

application.use(cors(corsOptions));
application.use(bodyParser.json());
application.use(bodyParser.urlencoded({ extended: true }));

db.sequelizeInstanceDB.sync();

application.get("/", (req, resp) => {
  resp.json({
    message: `Bienvenido a ${apiInfo.name}, de ${apiInfo.author}!`,
  });
});

//Player

application.get("/api/player", (req, resp) => {
  playerController.findAll(req, resp);
});

application.get("/api/player/:id", (req, resp) => {
  playerController.findOne(req, resp);
});

application.post("/api/player/", (req, resp) => {
  playerController.create(req, resp);
});

application.put("/api/player/:id", (req, resp) => {
  playerController.update(req, resp);
});

application.delete("/api/player/:id", (req, resp) => {
  playerController.delete(req, resp);
});


//Pokemon

application.get("/api/pokemon", (req, resp) => {
  pokemonController.findAll(req, resp);
});

application.get("/api/pokemon/:id", (req, resp) => {
  pokemonController.findOne(req, resp);
});

application.post("/api/pokemon/", (req, resp) => {
  pokemonController.create(req, resp);
});

application.delete("/api/pokemon/:id", (req, resp) => {
  pokemonController.delete(req, resp);
});


//Team

application.get("/api/team", (req, resp) => {
  teamController.findAll(req, resp);
});

application.get("/api/team/:id", (req, resp) => {
  teamController.findOne(req, resp);
});

application.post("/api/team/", (req, resp) => {
  teamController.create(req, resp);
});

application.put("/api/team/:id", (req, resp) => {
  teamController.update(req, resp);
});

application.delete("/api/team/:id", (req, resp) => {
  teamController.delete(req, resp);
});


/* application.use('/api/player', require('./routes/player.routes'));
application.use('/api/pokemon', require('./routes/pokemon.routes'));
application.use('/api/team', require('./routes/team.routes')); */


application.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
