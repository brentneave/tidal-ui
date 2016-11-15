const View = require('../View'),
      ViewActions = require('../ViewActions'),
      Broadcaster = require('../../events/Broadcaster'),
      TidalCredentials = require('../../TidalCredentials'),
      Action = require('../../events/Action');

// constructor ---------------------------------------------------------------//

const LoginForm = function(parentNode) {

  View.prototype.constructor.call(this, parentNode);

  Object.defineProperty(this, 'onRender', {
    value: function() {
      var form          = this.node,
          usernameField = this.node.querySelector('.' + LoginForm.classNames.usernameField),
          passwordField = this.node.querySelector('.' + LoginForm.classNames.passwordField),
          submitButton  = this.node.querySelector('.' + LoginForm.classNames.submitButton);

      usernameField.value = TidalCredentials.username;
      passwordField.value = TidalCredentials.password;

      const username = usernameField.value,
            password = passwordField.value,
            that = this;

      form.addEventListener('submit', function(e) {
        e.preventDefault();
        that.actions.broadcast(new Action(
          ViewActions.LOGIN,
          { username: username,
            password: password }
        ));
      });
    }
  });

  this.onModelChange = function() {
    if(this.model.isLoggedIn) {
      this.destroy();
    }
  }
}

LoginForm.prototype = new View();

// static properties ---------------------------------------------------------//

Object.defineProperty(LoginForm,'classNames', {
  get: function() {
    return {
      view: 'login-form',
      errorMessage: 'login-form__error-message',
      usernameField: 'login-form__username',
      passwordField: 'login-form__password',
      submitButton: 'login-form__submit'
    }
  }
});

Object.defineProperty(LoginForm,'messages', {
  get: function() {
    return {
      loginError: 'Incorrect username or password.'
    }
  }
});


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
          tag: 'p',
          className: LoginForm.classNames.errorMessage
        },{
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
