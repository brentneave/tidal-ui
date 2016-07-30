const View = require('../View'),
      LoginForm = require('./LoginForm'),
      ModelState = require('../../model/ModelState');

const AppView = function(parentNode) {
  View.prototype.constructor.call(this, parentNode);
}

AppView.prototype = new View();


// public getter/setters -----------------------------------------------------//

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
