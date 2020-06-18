const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const application = express();
const db = require("./models/index");
const subjectController = require("./controllers/subject.controller");
const studentController = require("./controllers/student.controller");
const PORT = 3000 || process.env.PORT;

const apiInfo = {
  name: "First Express Api",
  version: "1.0.0",
  author: "Aldo Castillo",
  enterprise: "mecanizados",
  programming_language: "JavaScript",
  contactInfo: {
    email: "aldo.castillo.13@gmail.com",
    wsp: "261-6934658",
  },
  date: "22-04-2020",
};

let corsOptions = {
  origin: "http://localhost:3000",
};

application.use(cors(corsOptions));
application.use(bodyParser.json());
application.use(bodyParser.urlencoded({ extended: true }));

db.sequelizeInstanceDB.sync();

application.get("/", (req, resp) => {
  resp.json({
    message: `Bienvenido a ${apiInfo.name}, de ${apiInfo.author}!`,
  });
});

application.get("/api/subject", (req, resp) => {
  subjectController.findAll(req, resp);
});

application.get("/api/subject/:id", (req, resp) => {
  subjectController.findOne(req, resp);
});

application.post("/api/subject/", (req, resp) => {
  subjectController.create(req, resp);
});

application.put("/api/subject/:id", (req, resp) => {
  subjectController.update(req, resp);
});

application.delete("/api/subject/:id", (req, resp) => {
  subjectController.delete(req, resp);
});

//require("./routes/subject.routes")(application);

application.get("/api/student", (req, resp) => {
  studentController.findAll(req, resp);
});

application.get("/api/student/:id", (req, resp) => {
  studentController.findOne(req, resp);
});

application.post("/api/student/", (req, resp) => {
  studentController.create(req, resp);
});

application.put("/api/student/:id", (req, resp) => {
  studentController.update(req, resp);
});

application.delete("/api/student/:id", (req, resp) => {
  studentController.delete(req, resp);
});

application.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
