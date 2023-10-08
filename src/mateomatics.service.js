const { formatDate, subDays } = require('./utils');
const { mateomaticsApi, mountQuery, formatData, DEFAULT_RETURN_FORMAT } = require('./mateomatics.utils')

const getPrecipitation = async (lat, long, returnFormat = DEFAULT_RETURN_FORMAT, daysBehind = 2, precipInterval = 5) => {
    const today = new Date();
    const endDateFormatted = formatDate(today);
    const startDate = subDays(today, daysBehind);
    const startDateFormatted = formatDate(startDate);

    const datePart = `${startDateFormatted}--${endDateFormatted}`;
    const precipPart = `:PT${precipInterval}M/precip_${precipInterval}min:mm/`;
    const coordinatesPart = `${lat},${long}/`;

    const combinedParts = datePart + precipPart + coordinatesPart + returnFormat;

    const query = await mountQuery(combinedParts);
    const { data } = await mateomaticsApi.get(query);

    const result = formatData(data, returnFormat, 'Precipitation');

    return result;
}

const getEvaporation = async (lat, long, returnFormat = DEFAULT_RETURN_FORMAT, daysBehind = 2, evaporationInterval = 1) => {
    const today = new Date();
    const endDateFormatted = formatDate(today);

    const datePart = `${endDateFormatted}`;
    const evaporationPart = `P${daysBehind}D:PT${evaporationInterval}H/evaporation_${evaporationInterval}h:mm/`;
    const coordinatesPart = `${lat},${long}/`;

    const combinedParts = datePart + evaporationPart + coordinatesPart + returnFormat;

    const query = await mountQuery(combinedParts);
    const { data } = await mateomaticsApi.get(query);

    const result = formatData(data, returnFormat, 'Evaporation');

    return result;
}

const getClouds = async (lat, long, returnFormat = DEFAULT_RETURN_FORMAT,) => {
    const today = new Date();
    const endDateFormatted = formatDate(today);

    const datePart = `${endDateFormatted}`;
    const evaporationPart = `/effective_cloud_cover:octas/`;
    const coordinatesPart = `${lat},${long}/`;
    const formatPart = FORMAT.HTML;

    const combinedParts = datePart + evaporationPart + coordinatesPart + formatPart;

    const query = await mountQuery(combinedParts);
    const { data } = await mateomaticsApi.get(query);

    const result = formatData(data, returnFormat, 'Clouds');

    return result;
}

const getHumidity = async (lat, long, returnFormat = DEFAULT_RETURN_FORMAT, daysBehind = 2, precipInterval = 1) => {
    const today = new Date();
    const endDateFormatted = formatDate(today);
    const startDate = subDays(today, daysBehind);
    const startDateFormatted = formatDate(startDate);

    const datePart = `${startDateFormatted}--${endDateFormatted}`;
    const precipPart = `:PT${precipInterval}M/`;

    const altitudes = [2, 20, 200, 500, 700];

    const relativeHumidity = altitudes.map(altitude => `relative_humidity_${altitude}m:p`).join(',');

    const coordinatesPart = `/${lat},${long}/`;

    const combinedParts = datePart + precipPart + relativeHumidity + coordinatesPart + returnFormat;

    const query = await mountQuery(combinedParts);
    const { data } = await mateomaticsApi.get(query);

    const result = formatData(data, returnFormat, 'Humidity');

    return result;
}

module.exports = {
    getPrecipitation,
    getEvaporation,
    getClouds,
    getHumidity,
}