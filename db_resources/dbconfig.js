module.exports = {
  HOTS: "localhost",
  USER: "root",
  PASSWORD: "",
  DB: "pokeapi_db",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
