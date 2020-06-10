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
db.Subject = require("./subject.model")(sequelizeInstanceDB, Sequelize);

module.exports = db;
