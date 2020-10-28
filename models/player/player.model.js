module.exports = (sequelize, Sequelize) => {
  const Player = sequelize.define("player", {
    name: {
      type: Sequelize.STRING,
    },
    surname: {
      type: Sequelize.STRING,
    },
    imageProfile: {
      type: Sequelize.STRING,
    },
  });
  return Player;
};
  