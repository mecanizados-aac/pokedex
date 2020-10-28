const db = require("../models/index");
const Player = db.Player;
const Op = db.Sequelize.Op;
const errorHandler = require("../helpers/functions");

exports.create = (req, resp) => {
  // Llegó una petición date - ip.
  if (!req.body.name || !req.body.surname) {
    resp.status(400).send({
      message: "Content cannot be emply",
    });
    return;
  }

  const player = {
    name: req.body.name,
    surname: req.body.surname,
    imageProfile: req.body.imageProfile,
  };

  // Se intenta crear un player.
  Player.create(player)
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
  const name = req.query.name;
  const condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
  Player.findAll({ where: condition })
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

  Player.findByPk(id)
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

  Player.update(req.body, { where: { id: id } })
    .then((num) => {
      if (num == 1) {
        // -1 => Error, 0 => No lo ejecutó, 1 => OK, 2 => Not available.
        resp.send({
          message: "Player was updated successfully",
        });
      } else {
        resp.status(404).send({
          message: `Cannot update Player with id=${id}, probably the entity doesn´t exists.`,
        });
      }
    })
    .catch((err) => {
      errorHandler(resp, "Error updating Player");
    });
};

exports.delete = (req, resp) => {
  const id = req.params.id;

  Player.destroy({ where: { id: id } })
    .then((num) => {
      if (num == 1) {
        // -1 => Error, 0 => No lo ejecutó, 1 => OK, 2 => Not available.
        resp.send({
          message: "Player was deleted successfully",
        });
      } else {
        resp.status(404).send({
          message: `Cannot delete Player with id=${id}, probably the entity doesn´t exists.`,
        });
      }
    })
    .catch((err) => {
      errorHandler(resp, "Error deleting Player");
    });
};