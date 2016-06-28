const Action = require ('./Action.js'),
      Broadcaster = require ('../events/Broadcaster.js');

function Dispatcher(source) {

  Broadcaster.prototype.constructor.call(this, source);

  this.dispatchAction = function(action) {
    if(!(action instanceof Action)) {
      throw new Error();
    }
    this.broadcast(action);
  }
}

Dispatcher.prototype = new Broadcaster();

module.exports = Dispatcher;