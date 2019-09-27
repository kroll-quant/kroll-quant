const events = require('events');
const ctp = require('node-ctp');

class CtpTrade extends events.EventEmitter {
    constructor(){
        super()
    }

    onTrade(tick){
        this.emit('TRADE', tick);
    }
}

module.exports = CtpMarket;