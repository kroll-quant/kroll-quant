const CtpMarket = require('../core/market/CtpMarket');
const KLine = require('../core/market/KLine');
const StrategyManager = require('../core/strategy/StrategyManager');
const CtpTrade = require('../core/trade/CtpTrade');
const config = require('../config.js');

const ctpMarket = new CtpMarket();
const strategyManager = new StrategyManager();
const ctpTrade = new CtpTrade();


let strategies = config.strategies;


ctpMarket.


