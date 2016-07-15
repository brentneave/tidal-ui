const Session = require('../model/Session'),
      View = require('./View'),
      Broadcaster = require('../events/Broadcaster'),
      TidalCredentials = require('../TidalCredentials');

// constructor ---------------------------------------------------------------//

const LoginForm = function(parentNode, build) {

  View.prototype.constructor.call(this, parentNode);

  // private vars

  var _session;

  // privileged methods

  Object.defineProperty(this, 'viewDidBuild', {
    value: function() {
      var form          = this.node,
          usernameField = this.node.querySelector('.' + LoginForm.classNames.usernameField),
          passwordField = this.node.querySelector('.' + LoginForm.classNames.passwordField),
          submitButton  = this.node.querySelector('.' + LoginForm.classNames.submitButton);

      usernameField.value = TidalCredentials.username;
      passwordField.value = TidalCredentials.password;

      form.addEventListener('submit', function(e) {
        e.preventDefault();
        _session.login(usernameField.value, passwordField.value)
      });
    }
  });

  // privileged properties

  Object.defineProperty(this, 'onSubmit', {
    get: function() {
      return _onSubmit;
    }
  });

  Object.defineProperty(this, 'session', {
    get: function() {
      return _session;
    },
    set: function(o) {
      if(o === Session) { // session is a singleton, we can probably remove this getter/setter?
        _session = o
      } else {
        throw new Error();
      }
    }
  });
}

LoginForm.prototype = new View();

// static properties ---------------------------------------------------------//

Object.defineProperty(LoginForm,'classNames', {
  get: function() {
    return {
      view: 'login-form',
      usernameField: 'login-form__username',
      passwordField: 'login-form__password',
      submitButton: 'login-form__submit'
    }
  }
})

// public getter/setters -----------------------------------------------------//

Object.defineProperty(LoginForm.prototype, 'structure', {
  get: function() {
    return {
      tag: 'form',
      className: LoginForm.classNames.view,
      attributes: {
        method: 'post'
      },
      children: [{
          tag: 'input',
          className: LoginForm.classNames.usernameField,
          attributes: {
            type: 'email',
            name: 'username',
            placeholder: 'Email'
          }
        },{
          tag: 'input',
          className: LoginForm.classNames.passwordField,
          attributes: {
            type: 'password',
            name: 'password',
            placeholder: 'Password'
          }
        },{
          tag: 'button',
          className: 'login-form__submit',
          text: 'Log in',
          attributes: {
            type: 'submit'
          }
        }
      ]
    }
  }
});

module.exports = LoginForm;
