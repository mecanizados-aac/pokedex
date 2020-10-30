module.exports = (sequelize, Sequelize) => {
  const Team = sequelize.define("team", {
    player_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      references: {
        model: 'players',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      allowNull: false
    },
    pokemon_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      references: {
        model: 'pokemons',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      allowNull: false
    },
    nickname: {
      type: Sequelize.STRING,
    },
  });
  Team.removeAttribute('id');
  return Team;
};
  