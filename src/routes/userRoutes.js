const errorController = require("../controller/errorController");
const userController = require('../controller/userController');


module.exports = ({ knex, server, jwt }) => {
    server.get('/user/', async function (req, res) {
        try {
            await userController.getAll(req, res, knex);
        } catch (error) {
            errorController.returnInternalServerError(error, res);
        }
    });
    server.post('/user/', async function (req, res) {
        try {
            await userController.create(req, res, knex);
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