const Planta = require('../models/Planta')

/* GET /plantas: devolve uma lista com todos os registos */
module.exports.listAll = () => {

    return Planta
        .find()
        .then(response => {return response})
        .catch(error => {return error});

}

/* GET /plantas/:id: devolve o registo com identificador id */
module.exports.listPlantById = (plantId) => {

    return Planta
        .findOne({_id: plantId})
        .then(response => {return response})
        .catch(error => {return error});

}

/* GET /plantas?especie=EEEE: devolve a lista dos registos correspondentes à espécie EEEE */
module.exports.listPlantsBySpecies = (plantSpecies) => {

    return Planta
        .find({"Espécie": plantSpecies})
        .then(response => {return response})
        .catch(error => {return error});

}

/* GET /plantas?implant=AAA: devolve a lista dos registos com implantação AAA */
module.exports.listPlantsByImplantation = (plantImplantation) => {

    return Planta
        .find({"Implantação": plantImplantation})
        .then(response => {return response})
        .catch(error => {return error});

}

/* GET /plantas/freguesias: devolve a lista de freguesias ordenada alfabeticamente e sem repetições. */
module.exports.listFreguesias = () => {

    return Planta
        .distinct("Freguesia")
        .sort()
        .then(response => {return response})
        .catch(error => {return error});

}

/* GET /plantas/especies: devolve a lista das espécies vegetais ordenada alfabeticamente e sem repetições. */
module.exports.listSpecies = () => {

    return Planta
        .distinct("Espécie")
        .sort()
        .then(response => {return response})
        .catch(error => {return error});

}

/* POST /plantas: acrescenta um registo novo à BD. */
module.exports.addPlant = (plant) => {

    return Planta.create(plant)
        .then(response => {return response})
        .catch(error => {return error});

}

/* DELETE /plantas/:id: elimina da BD o registo com o identificador id. */
module.exports.deletePlant = (plantId) => {
    return Planta.deleteOne({_id: plantId})
        .then(response => {return response})
        .catch(error => {return error});
}