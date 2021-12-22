const errorController = require("../controller/errorController");
const loginController = require('../controller/loginController');



module.exports = ({ knex, server, jwt }) => {
    server.post('/login/', async function (req, res) {
        try {
            await loginController.login(req, res, knex);
        } catch (error) {
            errorController.returnInternalServerError(error, res);
        }
    });

}