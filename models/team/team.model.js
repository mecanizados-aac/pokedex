module.exports = (sequelize, Sequelize) => {
  const Team = sequelize.define("team", {
    player_id: {
      type: Sequelize.NUMBER,
    },
    pokemon_id: {
      type: Sequelize.NUMBER,
    },
    nickname: {
      type: Sequelize.STRING,
    },
  });
  return Team;
};
  