// const loginRoutes = require('./routes/loginRoutes.js');
const userRoutes = require('./routes/userRoutes.js');

module.exports = (server_params) => {
    // loginRoutes(server_params);
    userRoutes(server_params);
}