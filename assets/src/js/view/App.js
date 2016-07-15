const View = require('./View'),
      Session = require('../model/Session'),
      LoginForm = require('./LoginForm');


const App = function(parentNode, build) {
  View.prototype.constructor.call(this, parentNode);
}
App.prototype = new View();


// public getter/setters -----------------------------------------------------//

Object.defineProperty(App.prototype, 'structure', {
  value: {
    tag: 'div',
    className: 'app',
    children:
    [
      {
        viewClass: LoginForm,
        properties:
        {
          session: Session
        }
      }
    ]
  }
});

module.exports = App;
