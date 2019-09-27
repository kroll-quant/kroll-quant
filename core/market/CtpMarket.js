const events = require('events');
const ctp = require('node-ctp');

class CtpMarket extends events.EventEmitter {
    constructor(){
        super()
    }

    subscribeContracts(contracts){

    }

    unsubscribeContracts(contracts){

    }

    onTick(tick){
        this.emit('TICK', tick);
    }
}

module.exports = CtpMarket;