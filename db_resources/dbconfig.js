module.exports = {
  HOTS: "localhost",
  USER: "root",
  PASSWORD: "",
  DB: "db_api_ef_belgrano2020",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
