module.exports = (sequelize, Sequelize) => {
  const Team = sequelize.define("team", {
    name_team: {
      type: Sequelize.STRING,
    },
    nickname_player: {
      type: Sequelize.STRING,
    },
    level: {
      type: Sequelize.STRING,
    }
  });
  return Team;
};
  