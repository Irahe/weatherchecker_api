const errorController = require("../controller/errorController");
const loginController = require("../controller/loginController");
const userController = require('../controller/userController');


module.exports = ({ knex, server, jwt }) => {
    server.get('/user/', async function (req, res) {
        try {
            await userController.getAll(req, res, knex);
        } catch (error) {
            errorController.returnInternalServerError(error, res);
        }
    });
    //protected route
    server.post('/user/', async function (req, res) {
        try {
            let user = await loginController.verifyToken(req, jwt, 'Admin', knex);
            if (user) {
                await userController.create(req, res, knex);
            } else {
                throw new Error('Token inválido');
            }
        } catch (error) {
            errorController.returnInternalServerError(error, res);
        }
    });
    server.put('/user/', async function (req, res) {
        try {
            await userController.update(req, res, knex);
        } catch (error) {
            errorController.returnInternalServerError(error, res);
        }
    });
    server.del('/user/', async function (req, res) {
        try {
            await userController.delete(req, res, knex);
        } catch (error) {
            errorController.returnInternalServerError(error, res);
        }
    });
}