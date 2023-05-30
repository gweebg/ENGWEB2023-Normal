const express = require('express');
const axios = require("axios");

const router = express.Router();

/* GET Index page with table of all plants. */
router.get('/', function(req, res, next) {

  axios
      .get("http://localhost:15030/plantas")
      .then(plantList => {
        res.render('index', {plants: plantList.data})
      })
      .catch(error => res.render('error', {error: error, message: "Não foi possível listar as plantas." + error}))

});

router.get('/especies/:id', function(req, res, next) {

  axios
      .get(`http://localhost:15030/plantas?especie=${req.params.id}`)
      .then(plants => {

        let speciesName = req.params.id;
        let cientificName = plants.data[0]["Nome Científico"];

        res.render('species', {speciesName: speciesName, cientificName: cientificName, plants: plants.data})
      })
      .catch(error => res.render('error', {error: error, message: "Não foi possível obter a especie." + error}))

});

router.get('/:id', function(req, res, next) {

  axios
      .get(`http://localhost:15030/plantas/${req.params.id}`)
      .then(plant => {
        res.render('plant', {plant: plant.data})
      })
      .catch(error => res.render('error', {error: error, message: "Não foi possível obter a planta." + error}))

});

module.exports = router;
