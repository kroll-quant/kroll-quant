const events = require('events');
const ctp = require('node-ctp');
const KLINECYCLE = require('./KLINECYCLE');

class KLineGenerator extends events.EventEmitter {
    constructor(kLineCycle){//k线周期
        super()
        this.kLineCycle = kLineCycle;
    }

    onTick(tick){
        //TODO: generate kline
        let kLine = null;

        this.emit('KLINE', kLine);
    }


}

module.exports = KLineGenerator;