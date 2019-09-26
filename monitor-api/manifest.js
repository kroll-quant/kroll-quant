'use strict';
const Confidence = require('confidence');
const Config = require('../config.js');
const Package = require('../package.json');
const path = require('path');

const manifest = {
    server: {
        debug: {
            request: ['error']
        },
        routes: {
            cors: {
                origin: ['*'],
                credentials: true
            },
            security: true,
            files: {
                relativeTo: path.join(__dirname, 'public')
            }
        },
        port: Config.get('/server/port'),
        // tls: {
        //     key: fs.readFileSync(path.join(__dirname, 'ssl/2273283_api.wenqu.group.key'), 'utf8'),
        //     cert: fs.readFileSync(path.join(__dirname, 'ssl/2273283_api.wenqu.group.pem'), 'utf8')
        // }
    },
    register: {
        plugins: [
            {
                plugin: 'good',
                options: {
                    reporters: {
                        myReporter: [
                            {
                                module: 'good-squeeze', // safely transform payload into a string
                                name: 'SafeJson',
                                args: [{
                                    error: '*',
                                    log: '*',
                                    request: '*',
                                    response:'*'
                                }]
                            },
                        ],
                    }
                }
            },
            {
                plugin: 'hapi-remote-address'
            },
            {
                plugin: 'inert'
            },
            {
                plugin: 'vision'
            },
            //认证
            {
                plugin: 'hapi-auth-jwt2'
            },
            {
                plugin: './src/auth/auth.js'
            },
            //授权
            {
                plugin: '@sesame/hapi-authorization',
                options: {
                    roles: ['ADMIN', 'USER'],
                    hierarchy: true,
                    roleHierarchy: ['ADMIN', 'USER'],
                }
            },
            //swagger文档
            {
                plugin:'hapi-swagger',
                options: {
                    info: {
                        title: 'wenqu api',
                        version: Package.version
                    },
                    host: `${Config.get('/server/domainName')}:${Config.get('/server/port')}`,
                    securityDefinitions: {
                        jwt: {
                            type: 'apiKey',
                            name: 'Authorization',
                            in: 'header'
                        }
                    },
                    grouping: 'tags',
                    sortTags: 'name'
                }
            },
            {
                plugin: './src/api/sts/getOssReadonlyAccessToken.js'
            },
        ]
    }
};

const criteria = {
    env: process.env.NODE_ENV
};

const store = new Confidence.Store(manifest);

exports.get = function (key) {
    return store.get(key, criteria);
};

exports.meta = function (key) {
    return store.meta(key, criteria);
};
