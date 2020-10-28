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
db.Player = require("./player/player.model")(sequelizeInstanceDB, Sequelize);
db.Pokemon = require("./pokemon/pokemon.model")(sequelizeInstanceDB, Sequelize);
db.Team = require("./team/team.model")(sequelizeInstanceDB, Sequelize);

module.exports = db;
