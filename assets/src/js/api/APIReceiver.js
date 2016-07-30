const ModelDispatcher = require('../model/ModelDispatcher'),
      ModelActions = require('../model/ModelActions'),
      Login = require('./types/Login');

const APIReceiver = function() {

  const _handleActions = function(action) {
    switch(action.type) {
      case ModelActions.LOGIN:
        Login.form = { username: action.payload.username, password: action.payload.password };
        Login.send();
        break;
      default:
        break;
    }
  }

  ModelDispatcher.actions.addListener(this, _handleActions);

}

module.exports = new APIReceiver();
