const Broadcaster = require('../events/Broadcaster'),
      APIConfig = require('../api/APIConfig'),
      APIRequest = require('../api/APIRequest'),
      User = require('./User');

function Session() {

  // private vars -----------------------------------------------//

  var _id = null,
      _user = null,
      _countryCode = null,
      _isLoggedIn = false;

  // events -----------------------------------------------------//

  const _onLoginError   = new Broadcaster(),
        _onLoginSuccess = new Broadcaster();

  // private event handlers -------------------------------------//

  const _handleLoginError = function(e) {
      _onLoginError.broadcast(this);
  }

  const _handleLoginResponse = function(e) {
      _id          = e.body.sessionId;
      _user        = new User(e.body.userId);
      _countryCode = e.body.countryCode;
      _isLoggedIn  = true;
      _onLoginSuccess.broadcast({ session : this});
  }

  // privileged methods -----------------------------------------//

  this.login = function(username, password) {
    var request = new APIRequest(
      APIConfig.URLs.login,
      APIConfig.tokenHeader,
      { username: username,
        password: password },
      APIRequest.method.post
    );
    request.onError.addListener(this, _handleLoginError);
    request.onResponse.addListener(this, _handleLoginResponse);
    request.send();
  }

  // getter/setters ---------------------------------------------//

  Object.defineProperty(this, 'id', {
    get: function() { return _id; }
  });

  Object.defineProperty(this, 'user', {
    get: function() { return _user; }
  });

  Object.defineProperty(this, 'countryCode', {
    get: function() { return _countryCode; }
  });

  Object.defineProperty(this, 'onLoginError', {
    get: function() { return _onLoginError; }
  });

  Object.defineProperty(this, 'onLoginSuccess', {
    get: function() { return _onLoginSuccess; }
  });

  Object.defineProperty(this, 'isLoggedIn', {
    get: function() { return _isLoggedIn; }
  });
}

module.exports = Session;
