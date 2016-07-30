const APIDispatcher = require('../api/APIDispatcher'),
      APIActions = require('../api/APIActions'),
      ViewDispatcher = require('../view/ViewDispatcher'),
      ViewActions = require('../view/ViewActions'),
      ModelDispatcher = require('./ModelDispatcher'),
      ModelActions = require('./ModelActions'),
      ModelState = require('./ModelState'),
      Action = require('../events/Action'),
      User = require('./types/User');

const ModelReceiver = function() {

  // const _handleViewActions = function(action) {
  //   ModelViewReducer.reduce(action, ModelState)
  // }

  const _handleAPIActions = function(action) {
    switch(action.type) {
      case APIActions.RESPONSE_LOGIN:
        ModelState.session.user = new User(action.payload.body.countryCode);
        ModelState.session.countryCode = new User(action.payload.body.countryCode);
        ModelState.session.id = action.payload.body.sessionId;
        break;
      default:
        break;
    }
  }

  const _handleViewActions = function(action) {
    switch(action.type) {
      case ViewActions.LOGIN:
        ModelDispatcher.actions.broadcast(new Action(ModelActions.LOGIN, action.payload));
        break;
      default:
        break;
    }
  }

  ViewDispatcher.actions.addListener(this, _handleViewActions);
  APIDispatcher.actions.addListener(this, _handleAPIActions);

}

module.exports = new ModelReceiver();
