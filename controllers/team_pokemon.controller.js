const db = require("../models/index");
const TeamPokemon = db.TeamPokemon;
const Op = db.Sequelize.Op;
const errorHandler = require("../helpers/functions");

exports.create = (req, resp) => {
  // Llegó una petición date - ip.
  if (!req.body.TeamId, !req.body.PokemonId) {
    resp.status(400).send({
      message: "Content cannot be emply",
    });
    return;
  }

  const teamPokemon = {
    TeamId:  req.body.TeamId, 
    PokemonId: req.body.PokemonId
  };

  // Se intenta crear un teamPokemon.
  TeamPokemon.create(teamPokemon)
    .then((data) => {
      // Cuándo se resuelva satisfactoriamente.
      resp.send(data);
    })
    .catch((error) => {
      // Cuándo no se resuelva y tengamos un error.
      // Lanzó un error de tipo xxxxxxx.
      errorHandler(
        resp,
        error.message || "Something went wrong with the service"
      );
    });
};

exports.findAll = (req, resp) => {
    const teamId = req.params.teamId;
    TeamPokemon.findAll({ where: { TeamId: teamId } })
      .then((data) => {
        resp.send(data);  
      })
      .catch((error) => {
        errorHandler(
          resp,
          error.message || "Something went wrong with the service"
        );
      });
};