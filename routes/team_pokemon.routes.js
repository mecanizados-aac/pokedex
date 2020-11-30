let router = require("express").Router();
const teamPokemonController = require('../controllers/team_pokemon.controller');

router.post('/', teamPokemonController.create);
router.get('/pokemons/:teamId', teamPokemonController.findAll);

module.exports = router;