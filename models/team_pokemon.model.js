module.exports = (sequelize, Sequelize) => {
    const TeamPokemon = sequelize.define("teamPokemon", {
      TeamId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'teams',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        allowNull: false
      },
      PokemonId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'pokemons',
          key: 'id_pokemon',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        allowNull: false
      }
    });
    TeamPokemon.removeAttribute('id');
    return TeamPokemon;
  };