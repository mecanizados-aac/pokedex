const db = require("../models/index");
const Team = db.Team;
const Op = db.Sequelize.Op;
const errorHandler = require("../helpers/functions");

exports.create = (req, resp) => {
  // Llegó una petición date - ip.
  if (!req.body.player_id || !req.body.pokemon_id || !req.body.nickname) {
    resp.status(400).send({
      message: "Content cannot be emply",
    });
    return;
  }

  const team = {
    player_id: req.body.player_id,
    pokemon_id: req.body.pokemon_id,
    nickname: req.body.nickname,
  };

  // Se intenta crear un team.
  Team.create(team)
    .then((data) => {
      // Cuándo se resuelva satisfactoriamente.
      resp.send(data);
    })
    .catch((err) => {
      // Cuándo no se resuelva y tengamos un error.
      // Lanzó un error de tipo xxxxxxx.
      errorHandler(
        resp,
        err.message || "Something went wrong with the service"
      );
    });
};

exports.findAll = (req, resp) => {
  const nickname = req.query.nickname;
  const condition = nickname ? { nickname: { [Op.nickname]: `%${nickname}%` } } : null;
  Team.findAll({ where: condition })
    .then((data) => {
      resp.send(data);
    })
    .catch((err) => {
      errorHandler(
        resp,
        err.message || "Something went wrong with the service"
      );
    });
};

exports.findOne = (req, resp) => {
  const id = req.params.id;

  Team.findByPk(id)
    .then((data) => {
      resp.send(data);
    })
    .catch((err) => {
      errorHandler(
        resp,
        err.message || "Something went wrong with the service"
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
    .catch((err) => {
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
    .catch((err) => {
      errorHandler(resp, "Error deleting Team");
    });
};