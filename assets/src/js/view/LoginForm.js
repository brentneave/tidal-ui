const Session = require('../model/Session'),
      View = require('./View'),
      Broadcaster = require('../events/Broadcaster'),
      TidalCredentials = require('../TidalCredentials');


// constructor ---------------------------------------------------------------//

const LoginForm = function(parentNode, build) {

  View.prototype.constructor.call(this, parentNode);


  // private vars ------------------------------------------------------------//

  var _session;


  // private methods ---------------------------------------------------------//

  const _onLoginError = function(e) {
    const errorMessage = this.node.querySelector('.' + LoginForm.classNames.errorMessage);
    errorMessage.textContent = e.userMessage;
  }

  const _onLoginSuccess = function() {
    this.removeNode();
  }


  // privileged methods ------------------------------------------------------//

  Object.defineProperty(this, 'onRender', {
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


  // privileged properties ---------------------------------------------------//

  Object.defineProperty(this, 'onSubmit', {
    get: function() {
      return _onSubmit;
    }
  });

  Object.defineProperty(this, 'session', {
    // as session is a singleton, we could remove this getter/setter
    get: function() {
      return _session;
    },
    set: function(o) {
      if(o === Session) {
        _session = o;
        _session.onLoginError.addListener(this, _onLoginError);
        _session.onLoginSuccess.addListener(this, _onLoginSuccess);
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
      errorMessage: 'login-form__error-message',
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
