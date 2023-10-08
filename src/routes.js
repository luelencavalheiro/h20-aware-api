const express = require('express');

const { getPrecipitation } = require('./mateomatics.service');

const routes = express();

routes.get('/precipitation/lat/:lat/long/:long', async (req, res) => {
    // #swagger.description = Gives a two-day forecast oaf the expected precipitation accumulation with five minute resolution. More information: https://www.meteomatics.com/en/api/available-parameters/weather-parameter/precipitation/

    const { lat, long } = req.params;
    const { format } = req.query;

    const result = await getPrecipitation(lat, long, format);

    return res.status(200).send(result)
})

module.exports = routes;