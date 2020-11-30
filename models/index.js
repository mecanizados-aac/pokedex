const dbConfig = require("../db_resources/dbconfig");
const Sequelize = require("sequelize");

const sequelizeInstanceDB = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOTS,
    dialect: dbConfig.dialect,
    operatorAliases: false,
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle,
    },
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelizeInstanceDB = sequelizeInstanceDB;

db.Pokemon = require("./pokemon.model")(sequelizeInstanceDB, Sequelize);
db.Team = require("./team.model")(sequelizeInstanceDB, Sequelize);
db.TeamPokemon = require("./team_pokemon.model")(sequelizeInstanceDB, Sequelize);

module.exports = db;
