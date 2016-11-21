const Model = require('./Model'),
      Broadcaster = require('../events/Broadcaster');

const ModelDispatcher = function() {
    Object.defineProperty(this, 'requests', { value: new Broadcaster() });
    Object.defineProperty(this, 'notifications', { value: new Broadcaster() });
}

module.exports = new ModelDispatcher();
