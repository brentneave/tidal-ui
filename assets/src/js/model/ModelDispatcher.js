const Model = require('./Model'),
      Broadcaster = require('../events/Broadcaster');

const ModelDispatcher = function() {
    Object.defineProperty(this, 'actions', { value: new Broadcaster() });
    Model.instances.onAddInstance.addListener(this, function(instance) {
        instance.actions.addListener(this.actions, this.actions.broadcast);
    });
}

module.exports = new ModelDispatcher();
