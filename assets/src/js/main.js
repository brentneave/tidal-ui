const Action = require('./events/Action'),
      View = require('./view/View'),
      ViewDispatcher = require('./view/ViewDispatcher'),
      ViewReceiver = require('./view/ViewReceiver'),
      ViewActions = require('./view/ViewActions'),
      ModelDispatcher = require('./model/ModelDispatcher'),
      ModelReceiver = require('./model/ModelReceiver'),
      ModelActions = require('./model/ModelActions'),
      APIDispatcher = require('./api/APIDispatcher'),
      APIReceiver = require('./api/APIReceiver'),
      APIActions = require('./api/APIActions');

View.root = document.getElementById('app');
ModelDispatcher.notifications.broadcast(new Action(ModelActions.notifications.INITIALISE));
