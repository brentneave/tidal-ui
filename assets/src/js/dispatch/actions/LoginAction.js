var Session = require('../../store/Session'),
    Action = require('../Action');

function LoginAction(session) {

  Action.prototype.constructor.call(this);

  if(!(session instanceof Session)) {
    throw new Error();
  }

  var _session = session;

  Object.defineProperty(this, 'session', {
    get: function() {
      return _session;
    }
  });
}

LoginAction.prototype = new Action();

module.exports = LoginAction;