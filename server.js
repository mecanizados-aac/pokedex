const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const application = express();

const db = require("./models/index");

const PORT = 3000 || process.env.PORT;

let corsOptions = {
  origin: "http://localhost:4200",
};

application.use(cors(corsOptions));
//analizar solicitudes de tipo de contenido - application / json
application.use(bodyParser.json());
//analizar solicitudes de tipo de contenido - application / x-www-form-urlencoded
application.use(bodyParser.urlencoded({ extended: true }));

db.sequelizeInstanceDB.sync();


application.use('/api/team', require('./routes/team.routes')); 
application.use('/api/pokemon', require('./routes/pokemon.routes'));
application.use('/api/team-pokemon', require('./routes/team_pokemon.routes'));


application.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});