module.exports = (sequelize, Sequelize) => {
  const Pokemon = sequelize.define("pokemon", {
    order: {
      type: Sequelize.INTEGER,
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
  return Pokemon;
};