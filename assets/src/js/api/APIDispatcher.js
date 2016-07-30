const APIRequest = require('./APIRequest'),
      Broadcaster = require('../events/Broadcaster');

const APIDispatcher = function() {
  Object.defineProperty(this, 'actions', { value: new Broadcaster() });
  APIRequest.instances.onAddInstance.addListener(this, function(instance) {
    instance.actions.addListener(this.actions, this.actions.broadcast);
  });
}

module.exports = new APIDispatcher();
