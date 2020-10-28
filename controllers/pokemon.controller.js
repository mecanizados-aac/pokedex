const db = require("../models/index");
const Pokemon = db.Pokemon;
const errorHandler = require("../helpers/functions");

exports.create = (req, resp) => {
  // Llegó una petición date - ip.
  if (!req.body.order || !req.body.name || !req.body.type || !req.body.base_experience) {
    resp.status(400).send({
      message: "Content cannot be emply",
    });
    return;
  }

  const pokemon = {
    order: req.body.order,
    name: req.body.name,
    type: req.body.type,
    base_experience: req.body.base_experience,
    sampleImage: req.body.sampleImage,
  };

  // Se intenta crear un pokemon.
  Pokemon.create(pokemon)
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
  Pokemon.findAll({ where: condition })
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

  Pokemon.findByPk(id)
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

exports.delete = (req, resp) => {
  const id = req.params.id;

  Pokemon.destroy({ where: { id: id } })
    .then((num) => {
      if (num == 1) {
        // -1 => Error, 0 => No lo ejecutó, 1 => OK, 2 => Not available.
        resp.send({
          message: "Pokemon was deleted successfully",
        });
      } else {
        resp.status(404).send({
          message: `Cannot delete Pokemon with id=${id}, probably the entity doesn´t exists.`,
        });
      }
    })
    .catch((err) => {
      errorHandler(resp, "Error deleting Pokemon");
    });
};