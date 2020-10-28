let router = require("express").Router();
const playerController = require("./controllers/player.controller");

router.post('/', playerController.create);
router.get('', playerController.findAll);
router.get('/'+ ":id", playerController.findOne);
router.put('/' + ":id", playerController.update);
router.delete('/' + ":id", playerController.delete);

module.exports = router;