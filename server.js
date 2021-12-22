const dotenv = require('dotenv');
dotenv.config();


const port = process.env.SV_PORT;

const corsMiddleware = require('restify-cors-middleware');

const cors = corsMiddleware({
    preflightMaxAge: 5, //Optional
    origins: ['*'],
    allowHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"],
    exposeHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"]
})

const jwt = require('jsonwebtoken');

const restify = require('restify');

//DB Config
const knex = require('knex')({
    client: 'mysql2',
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        port: process.env.DB_PORT
    },
    pool: { min: Number(process.env.DB_POOL_MIN), max: Number(process.env.DB_POOL_MAX) }
});

//configure server name and version
const server = restify.createServer({
    name: 'weatherchecker-api',
    version: '1.00.00'
});

//configure cors
server.pre(cors.preflight);
server.use(cors.actual);
server.use(restify.plugins.gzipResponse());

//configura o restify
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

//inicia o server
server.listen(port, function () {
    console.log('\033[2J'); //limpa o bagui
    console.log(`Servidor iniciado com sucesso na porta: ${port}`);
});


require('./src/routes.js')({ knex, server, jwt });