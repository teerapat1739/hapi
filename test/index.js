'use strict';

const Hapi = require('@hapi/hapi');

const {JsonReform} = require('../services/reform-json')
const { Github} = require('../services/github')
const dotenv = require('dotenv');
dotenv.config();


const server = Hapi.server({
    port: 3000,
    host: 'localhost'
});


server.route({
    method: 'POST',
    path: '/reform-json',
    handler: (request, h) => {

        return JsonReform(request.payload)

    }
});

server.route({
    method: 'GET',
    path: '/github',
    handler: (request, h) => {

        return Github(request.query.q || 'google',request.query.page || 1);

    }
});

exports.init = async () => {

    await server.initialize();
    return server;
};

exports.start = async () => {

    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
    return server;
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});