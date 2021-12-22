const errorController = require("../controller/errorController");
const loginController = require("../controller/loginController");
const serviceController = require('../controller/serviceController');


module.exports = ({ knex, server, jwt }) => {
    server.post('/weather/', async function (req, res) {
        try {
            let user = await loginController.verifyToken(req, jwt, 'User', knex);
            if (user) {
                await serviceController.getWeather(req, res, knex);
            } else {
                throw new Error('Invalid Token');
            }
        } catch (error) {
            errorController.returnInternalServerError(error, res);
        }
    });
}