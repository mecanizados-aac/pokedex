module.exports = (app) => {
  const subjectController = require("../controllers/subject.controller");
  let router = require("express").Router();
  const URL_SUBJECT = "/subject";

  router.get(URL_SUBJECT, subjectController.findAll);
  router.post(URL_SUBJECT, subjectController.create);
  router.get(URL_SUBJECT + ":id", subjectController.findOne);
  router.put(URL_SUBJECT + ":id", subjectController.update);
  //router.delete(URL_SUBJECT + ":id", subjectController.delete);

  app.use("/api" + URL_SUBJECT, router);
};
