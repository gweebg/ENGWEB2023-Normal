const express = require('express');
const Plantas = require('../controllers/Plantas');

const router = express.Router();


router.get('/', function(req, res, next) {

  /* GET /plantas: devolve uma lista com todos os registos. */
  if (Object.keys(req.query).length === 0) {

    Plantas
        .listAll()
        .then(plantList => res.jsonp(plantList))
        .catch(error => res.jsonp({error: error, message: "Error fetching plant list."}));

  }

  /* GET /plantas?especie=EEEE: devolve a lista dos registos correspondentes à espécie EEEE. */
  else if (req.query.especie) {

    let species = req.query.especie;

    Plantas
        .listPlantsBySpecies(species)
        .then(plants => res.jsonp(plants))
        .catch(error => res.jsonp({error: error, message: "Error fetching plants of species " + req.query.especie + "."}));

  }

  /* GET /plantas?implant=AAA: devolve a lista dos registos com implantação AAA; */
  else if (req.query.implant) {

    let implant = req.query.implant;

    Plantas
        .listPlantsByImplantation(implant)
        .then(plants => res.jsonp(plants))
        .catch(error => res.jsonp({error: error, message: "Error fetching plants of implant " + req.query.implant + "."}));

  }

});

/* GET /plantas/freguesias: devolve a lista de freguesias ordenada alfabeticamente e sem repetições. */
router.get('/freguesias', function(req, res, next) {

  Plantas
      .listFreguesias()
      .then(freguesias => res.jsonp(freguesias))
      .catch(error => res.jsonp({error: error, message: "Error listing 'Freguesias'."}));

});

/* GET /plantas/especies: devolve a lista das espécies vegetais ordenada alfabeticamente e sem repetições;*/
router.get('/especies', function(req, res, next) {

  Plantas
      .listSpecies()
      .then(species => res.jsonp(species))
      .catch(error => res.jsonp({error: error, message: "Error listing 'Espécies'."}));

});

/* GET /plantas/:id: devolve o registo com identificador id */
router.get('/:id', function(req, res, next) {

  Plantas
      .listPlantById(req.params.id)
      .then(plant => res.jsonp(plant))
      .catch(error => res.jsonp({error: error, message: "Error fetching plant of id " + req.params.id + "."}));

});

/* POST /plantas: acrescenta um registo novo à BD. */
router.post('/', function(req, res) {

  Plantas
      .addPlant(req.body)
      .then(species => res.jsonp(species))
      .catch(error => res.jsonp({error: error, message: "Error while inserting new plant."}));

});


/* DELETE /plantas/:id: elimina da BD o registo com o identificador id. */
router.delete('/:id', function(req, res, next) {

  Plantas
      .deletePlant(req.params.id)
      .then(species => res.jsonp(species))
      .catch(error => res.jsonp({error: error, message: "Error while deleting plant of id: " + req.params.id + "."}));

});

module.exports = router;
