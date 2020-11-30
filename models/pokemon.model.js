module.exports = (sequelize, Sequelize) => {
  const Pokemon = sequelize.define("pokemon", {
    id_pokemon: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING,
    },
    type: {
      type: Sequelize.STRING,
    },
    base_experience: {
      type: Sequelize.INTEGER,
    },
    sampleImage: {
      type: Sequelize.STRING,
    },
  });
  Pokemon.removeAttribute('id');
  return Pokemon;
};