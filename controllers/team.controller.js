const db = require("../models/index");
const Team = db.Team;
const Op = db.Sequelize.Op;
const errorHandler = require("../helpers/functions");

exports.create = (req, resp) => {
  // Llegó una petición date - ip.
  if (!req.body.name_team || !req.body.nickname_player /* || !req.body.pokemon_holder 
      || !req.body.pokemon_substitute */) {
    resp.status(400).send({
      message: "Content cannot be emply",
    });
    return;
  }

  const team = {
    name_team: req.body.name_team,
    nickname_player: req.body.nickname_player,
    level: req.body.level/* ,
    pokemon_holder: req.body.pokemon_holder,
    pokemon_substitute: req.body.pokemon_substitute */
  };

  // Se intenta crear un team.
  Team.create(team)
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
  const name_team = req.query.name_team;
  const condition = name_team ? { name_team: { [Op.name_team]: `%${name_team}%` } } : null;
  Team.findAll({ where: condition })
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

exports.findOne = (req, resp) => {
  const id = req.params.id;

  Team.findByPk(id)
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

exports.update = (req, resp) => {
  const id = req.params.id;

  Team.update(req.body, { where: { id: id } })
    .then((num) => {
      if (num == 1) {
        // -1 => Error, 0 => No lo ejecutó, 1 => OK, 2 => Not available.
        resp.send({
          message: "Team was updated successfully",
        });
      } else {
        resp.status(404).send({
          message: `Cannot update Team with id=${id}, probably the entity doesn´t exists.`,
        });
      }
    })
    .catch((error) => {
      errorHandler(resp, "Error updating Team");
    });
};


exports.delete = (req, resp) => {
  const id = req.params.id;

  Team.destroy({ where: { id: id } })
    .then((num) => {
      if (num == 1) {
        // -1 => Error, 0 => No lo ejecutó, 1 => OK, 2 => Not available.
        resp.send({
          message: "Team was deleted successfully",
        });
      } else {
        resp.status(404).send({
          message: `Cannot delete Team with id=${id}, probably the entity doesn´t exists.`,
        });
      }
    })
    .catch((error) => {
      errorHandler(resp, "Error deleting Team");
    });
};