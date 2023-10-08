const axios = require('axios');

const { convertToBase64, formatDate, subDays, removeCSVPartFromHTML } = require('./utils');

const mateomaticsApi = axios.create({ baseURL: process.env.MATEOMATICS_API_URL_BASE });

const FORMAT = {
    HTML: 'html',
    HTML_MAP: 'html_map',
    PNG: 'png',
    CSV: 'csv',
    XML: 'xml',
    JSON: 'json',
}

const DEFAULT_RETURN_FORMAT = FORMAT.HTML;

/**
 * Get token from Mateomatics API
 * 
 * @returns string
 */
const getToken = async () => {
    const usernamePassword = process.env.MATEOMATICS_API_USER + ':' + process.env.MATEOMATICS_API_PASSWORD;
    const usernamePasswordBase64 = convertToBase64(usernamePassword);

    const { data } = await axios.get(process.env.MATEOMATICS_LOGIN_URL, {
        headers: {
            'Authorization': 'Basic ' + usernamePasswordBase64
        }
    })

    return data.access_token;
}


const mountQuery = async (query) => {
    const accessToken = await getToken();

    return query + '?access_token=' + accessToken;
}

const formatData = (data, returnFormat, title) => {
    return returnFormat === FORMAT.HTML
        ? removeCSVPartFromHTML(data, title)
        : data;
}

module.exports = {}