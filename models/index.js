const dbConfig = require("../db_resources/dbconfig");
const Sequelize = require("sequelize");

const sequelizeInstanceDB = new Sequelize(
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
db.sequelize = sequelizeInstanceDB;
db.Subject = require("./subject.model.js")(sequelizeInstanceDB, Sequelize);

module.exports = db;
