let router = require("express").Router();
const pokemonController = require("./controllers/pokemon.controller");

router.post('/', pokemonController.create);
router.get('', pokemonController.findAll);
router.get('/'+ ":id", pokemonController.findOne);
router.delete('/' + ":id", pokemonController.delete);

module.exports = router;