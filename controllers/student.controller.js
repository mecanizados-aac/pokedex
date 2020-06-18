const db = require("../models/index");
const Student = db.Student;
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

  const student = {
    name: req.body.name,
    surname: req.body.surname,
    birthdate: req.body.birthdate,
  };

  // Se intenta crear una materia.
  Student.create(student)
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
  const surname = req.query.surname;
  const condition = surname ? { surname: { [Op.like]: `%${surname}%` } } : null;
  Student.findAll({ where: condition })
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

  Student.findByPk(id)
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

  Student.update(req.body, { where: { id: id } })
    .then((num) => {
      if (num == 1) {
        // -1 => Error, 0 => No lo ejecutó, 1 => OK, 2 => Not available.
        resp.send({
          message: "Student was updated successfully",
        });
      } else {
        resp.status(404).send({
          message: `Cannot update Student with id=${id}, probably the entity doesn´t exists.`,
        });
      }
    })
    .catch((err) => {
      errorHandler(resp, "Error updating Student");
    });
};

exports.delete = (req, resp) => {
  const id = req.params.id;

  Student.destroy({ where: { id: id } })
    .then((num) => {
      if (num == 1) {
        // -1 => Error, 0 => No lo ejecutó, 1 => OK, 2 => Not available.
        resp.send({
          message: "Student was deleted successfully",
        });
      } else {
        resp.status(404).send({
          message: `Cannot delete Student with id=${id}, probably the entity doesn´t exists.`,
        });
      }
    })
    .catch((err) => {
      errorHandler(resp, "Error deleting Student");
    });
};
