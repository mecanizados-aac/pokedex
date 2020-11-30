const db = require("../models/index");
const Pokemon = db.Pokemon;
const errorHandler = require("../helpers/functions");
const axios = require('axios');

exports.create = (req, resp) => {
  // Llegó una petición date - ip.
  if (!req.body.id_pokemon || !req.body.name || !req.body.type || !req.body.base_experience) {
    resp.status(400).send({
      message: "Content cannot be emply",
    });
    return;
  }

  const pokemon = {
    id_pokemon: req.body.id_pokemon,
    name: req.body.name,
    type: req.body.type,
    base_experience: req.body.base_experience,
    sampleImage: req.body.sampleImage
  };

  // Se intenta crear un pokemon.
  Pokemon.create(pokemon)
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
  const name = req.query.name;
  const condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
  Pokemon.findAll({ where: condition })
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
  const id = req.params.id_pokemon;

  Pokemon.findByPk(id)
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

exports.browse = async (req, resp) => {
  const name = req.params.name.toLowerCase().trim('');

  const pokemon = {
    id_pokemon: 0,
    name: '',
    type: '',
    base_experience: 0,
    sampleImage: 0
  };

  await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`).then((rawData) => {
         
    pokemon.id_pokemon = rawData.data.id;
    pokemon.name = rawData.data.name;
    pokemon.type = rawData.data.types[0].type.name;
    pokemon.base_experience = rawData.data.base_experience;
    pokemon.sampleImage = rawData.data.sprites.other['official-artwork'].front_default;

    resp.send(pokemon);
  
  }).catch((error) => {
    resp.status(404).send({
      message: `Cannot browse Pokemon with code=${name}, probably the entity doesn´t exists.`,
    });
  });    
};

exports.delete = (req, resp) => {
  const id = req.params.id_pokemon;

  Pokemon.destroy({ where: { id_pokemon: id } })
    .then((num) => {
      if (num == 1) {
        // -1 => Error, 0 => No lo ejecutó, 1 => OK, 2 => Not available.
        resp.send({
          message: "Pokemon was deleted successfully",
        });
      } else {
        resp.status(404).send({
          message: `Cannot delete Pokemon with id_pokemon=${id}, probably the entity doesn´t exists.`,
        });
      }
    })
    .catch((error) => {
      errorHandler(resp, "Error deleting Pokemon");
    });
};