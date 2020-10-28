module.exports = (sequelize, Sequelize) => {
  const Pokemon = sequelize.define("pokemon", {
    order: {
      type: Sequelize.NUMBER,
    },
    name: {
      type: Sequelize.STRING,
    },
    type: {
      type: Sequelize.STRING,
    },
    base_experience: {
      type: Sequelize.NUMBER,
    },
    sampleImage: {
      type: Sequelize.STRING,
    },
  });
  return Pokemon;
};