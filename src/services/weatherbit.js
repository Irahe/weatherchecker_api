
const axios = require('axios');

module.exports = {
    async getWeather(lat, long) {
        const response = await axios.get(`https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${long}&key=${process.env.WEATHERBIT_API_KEY}`);
        return response?.data || false;
    }
}