const View = require('./View'),
      Broadcaster = require('../events/Broadcaster');

module.exports = LoginForm;


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

// constructor ---------------------------------------------------------------//

LoginForm.prototype = new View();
function LoginForm() {

  View.prototype.constructor.call(this);

  const that = this,
        _onSubmit = new Broadcaster();

  // privileged methods ------------------------------------------------------//

  this.init = function() {
    var elUsername = this.node.querySelector('.' + LoginForm.classNames.usernameField),
        elPassword = this.node.querySelector('.' + LoginForm.classNames.passwordField),
        elSubmit   = this.node.querySelector('.' + LoginForm.classNames.submitButton);

    elSubmit.addEventListener('click', function() {
      that.onSubmit.broadcast({
        username: elUsername.value,
        password: elPassword.value
      })
    }, false);
  }

  // privileged getter/setters -----------------------------------------------//

  Object.defineProperty(this, 'onSubmit', {
    get: function() {
      return _onSubmit;
    }
  })
}

// public getter/setters -----------------------------------------------------//

Object.defineProperty(LoginForm.prototype, 'structure', {
  get: function() {
    return {
      tag: 'div',
      className: LoginForm.classNames.view,
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
          text: 'Log in'
        }
      ]
    }
  }
});
