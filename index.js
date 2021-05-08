'use strict';

const Hapi = require('@hapi/hapi');
const {JsonReform} = require('./services/reform-json')

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {

            return 'Hello World!';
        }
    });


    server.route({
        method: 'POST',
        path: '/reform-json',
        handler: (request, h) => {

            return JsonReform(request);
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();