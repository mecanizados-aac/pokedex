let router = require("express").Router();
const pokemonController = require('../controllers/pokemon.controller');

router.post('/', pokemonController.create);
router.get('', pokemonController.findAll);
router.get('/' + ":id_pokemon", pokemonController.findOne);
router.get('/browse/' + ":name", pokemonController.browse);
router.delete('/' + ":id_pokemon", pokemonController.delete);

module.exports = router;