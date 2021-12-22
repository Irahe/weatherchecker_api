const sha1 = require("sha1");
const weatherbit = require('../services/weatherbit');

module.exports = {
    async getWeather(req, res, knex) {
        const { lat, long } = req.body;

        const weatherInfo = await weatherbit.getWeather(lat, long);
        if (!weatherInfo) {
            throw new Error('Could not collect weather now. Try again later.')
        } else {
            res.send({ status: 'success', data: weatherInfo?.data });
        }

    },
}

