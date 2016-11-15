const View = require('../View'),
      LoginForm = require('./LoginForm'),
      UserProfile = require('./UserProfile'),
      ModelState = require('../../model/ModelState');


const AppView = function(parentNode) {
  View.prototype.constructor.call(this, parentNode);
}

AppView.prototype = new View();

Object.defineProperty(AppView.prototype, 'structure', {
  value: {
    tag: 'div',
    className: 'app',
    children: [{
      viewClass: LoginForm,
      properties: {
        model: ModelState.session
      }
    }]
  }
});

module.exports = AppView;
