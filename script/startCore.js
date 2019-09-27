const CtpMarket = require('../core/market/CtpMarket');
const KLine = require('../core/market/KLine');
const StrategyManager = require('../core/strategy/StrategyManager');
const CtpTrade = require('../core/trade/CtpTrade');
const config = require('../config.js');

const ctpMarket = new CtpMarket();
const strategyManager = new StrategyManager();
const ctpTrade = new CtpTrade();


//get all contracts used by strategy
let strategies = config.strategies;
let contracts = new Set();
for(let strategy of strategies){
    for(let contract of strategy.contracts){
        contracts.add(contract);
    }
}

//subscribe contracts
ctpMarket.subscribeContracts(contracts);




//
strategyManager.on();



