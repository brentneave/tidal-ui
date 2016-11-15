const View = require('./View'),
      Broadcaster = require('../events/Broadcaster');

const ViewDispatcher = function() {
  Object.defineProperty(this, 'actions', { value: new Broadcaster() });

  const _dispatchAction = function(action) {
    this.actions.broadcast(action);
  }

  View.instances.onAddInstance.addListener(this, function(instance) {
    instance.actions.addListener(this, _dispatchAction);
  });
}

module.exports = new ViewDispatcher();
