const dbConfig = require("../db_resources/dbconfig");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USERS,
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
db.sequelize = sequelize;
db.Subject = require("./subject.model.js")(sequelize, Sequelize);

module.exports = db;
