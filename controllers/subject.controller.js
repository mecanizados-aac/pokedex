const db = require("../models/index");
const Subject = db.Subject;
const Op = db.Sequelize.Op;
const errorHandler = require("../helpers/functions/errorHandler");

exports.create = (req, resp) => {
  // Llegó una petición date - ip.
  if (!req.body.title || !req.body.cohort) {
    resp.status(400).send({
      message: "Content cannot be emply",
    });
    return;
  }

  const subject = {
    title: req.body.title,
    description: req.body.description,
    cohort: req.body.cohort,
  };

  // Se intenta crear una materia.
  Subject.create(subject)
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
  const title = req.query.title;
  const condition = title ? { title: { [Op.like]: "%${title}%" } } : null;
  Subject.findAll({ where: condition })
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

  Subject.findByPk(id)
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

  Subject.update(req.body, { where: { id: id } })
    .then((num) => {
      if (num === 1) {
        // -1 => Error, 0 => No lo ejecutó, 1 => OK, 2 => Not available.
        resp.send({
          message: "Subject was updated successfully",
        });
      } else {
        resp.status(404).send({
          message: `Cannot update Subject with ${id}, probably the entity doesn´t exists.`,
        });
      }
    })
    .catch((err) => {
      errorHandler(resp, "Error updating Subject");
    });
};

exports.delete = (req, resp) => {
  const id = req.params.id;

  Subject.destroy(req.body, { where: { id: id } })
    .then((num) => {
      if (num === 1) {
        // -1 => Error, 0 => No lo ejecutó, 1 => OK, 2 => Not available.
        resp.send({
          message: "Subject was deleted successfully",
        });
      } else {
        resp.status(404).send({
          message: `Cannot delete Subject with ${id}, probably the entity doesn´t exists.`,
        });
      }
    })
    .catch((err) => {
      errorHandler(resp, "Error deleting Subject");
    });
};
