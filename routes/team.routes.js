let router = require("express").Router();
const teamController = require("./controllers/team.controller");

router.post('/', teamController.create);
router.get('', teamController.findAll);
router.get('/'+ ":id", teamController.findOne);
router.put('/' + ":id", teamController.update);
router.delete('/' + ":id", teamController.delete);

module.exports = router;