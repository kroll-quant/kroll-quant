'use strict';

const Glue = require('glue');
const Config = require('../config.js');
const Manifest = require('./manifest');

process.on('unhandledRejection', (reason, promise) => {
    console.error(`Unhandled Rejection at: ${JSON.stringify(promise)} reason: ${reason}`);
});

process.on('uncaughtException', (err, origin) => {
    console.error(`uncaughtException: ${err} origin: ${origin}`);
});


const main = async function() {
    const options = { relativeTo: __dirname };
    const server = await Glue.compose(Manifest.get('/'), options);

    server.events.on('response', function (request) {
        request.log('request',
            {
                path: request.url.path,
                method:request.method.toUpperCase(),
                query: request.query,
                payload: request.payload,
                remoteAddress: request.info.remoteAddress,
                responseStatus: request.response.statusCode
            }
        );
    });


    await server.start();
    let apiUrl = `http://${Config.get('/server/domainName')}:${Config.get('/server/port')}`;
    let apiDocUrl = `${apiUrl}/documentation`;
    console.log(`monitor-api started, visit: ${apiUrl}`);
    console.log(`monitor-api documentation url: ${apiDocUrl}`);
};

main();
