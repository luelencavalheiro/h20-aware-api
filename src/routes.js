const express = require('express');

const { getPrecipitation, getEvaporation, getClouds, getHumidity } = require('./mateomatics.service');

const routes = express();

routes.get('/precipitation/lat/:lat/long/:long', async (req, res) => {
    // #swagger.summary = Gives a two-day forecast oaf the expected precipitation accumulation with five minute resolution.
    // #swagger.description = More information: https://www.meteomatics.com/en/api/available-parameters/weather-parameter/precipitation/

    const { lat, long } = req.params;
    const { format } = req.query;

    const result = await getPrecipitation(lat, long, format);

    return res.status(200).send(result)
});

routes.get('/evaporation/lat/:lat/long/:long', async (req, res) => {
    // #swagger.summary = Gives a two day evaporation forecast with a resolution of one hour.
    // #swagger.description = More information: https://www.meteomatics.com/en/api/available-parameters/weather-parameter/evaporation/

    const { lat, long } = req.params;
    const { format } = req.query;

    const result = await getEvaporation(lat, long, format);

    return res.status(200).send(result)
});

routes.get('/clouds/lat/:lat/long/:long', async (req, res) => {
    // #swagger.summary = Gives the amount of cloud cover in octas for every grid point of the specified area.
    // #swagger.description = More information: https://www.meteomatics.com/en/api/available-parameters/weather-parameter/precipitation/

    const { lat, long } = req.params;
    const { format } = req.query;

    const result = await getClouds(lat, long, format);

    return res.status(200).send(result)
});

routes.get('/humidity/lat/:lat/long/:long', async (req, res) => {
    // #swagger.summary = Gives a Create a time series of relative humidity in % at different altitudes.
    // #swagger.description = More information: https://www.meteomatics.com/en/api/available-parameters/weather-parameter/humidity/

    const { lat, long } = req.params;
    const { format } = req.query;

    const result = await getHumidity(lat, long, format);

    return res.status(200).send(result)
})

module.exports = routes;