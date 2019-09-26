'use strict';
const confidence = require('confidence');

const dotenv = require('dotenv');
dotenv.config();

const config = {
    market: {
        ctp: {
            frontAddress: {
                $filter: 'env',
                development: process.env.MARKET_CTP_FRONT_ADDRESS_DEV,
                production: process.env.MARKET_CTP_FRONT_ADDRESS_PRODUCTION
            },
        },
    },
    trade: {
        ctp: {
            frontAddress: {
                $filter: 'env',
                development: process.env.TRADE_CTP_FRONT_ADDRESS_DEV,
                production: process.env.TRADE_CTP_FRONT_ADDRESS_PRODUCTION
            },
            userId: {
                $filter: 'env',
                development: process.env.TRADE_CTP_USER_ID_DEV,
                production: process.env.TRADE_CTP_USER_ID_PRODUCTION
            },
            password: {
                $filter: 'env',
                development: process.env.TRADE_CTP_PASSWORD_DEV,
                production: process.env.TRADE_CTP_PASSWORD_PRODUCTION
            }
        }
    }
};

const store = new confidence.Store(config);

const criteria = {
    env: process.env.NODE_ENV
};

exports.get = function(key) {
    return store.get(key, criteria);
};

exports.meta = function(key) {
    return store.meta(key, criteria);
};
