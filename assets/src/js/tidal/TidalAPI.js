var SoundQuality = require('./SoundQuality.js'),
    APIRequest = require('./APIRequest'),
    User = require('./User'),
    Session = require('./session'),
    Broadcaster = require('../events/Broadcaster');


/**
 * STATIC PROPERTIES
 */


Object.defineProperty(TidalAPI, 'baseURL', {
  get: function() { return 'https://api.tidalhifi.com/v1'; }
});

Object.defineProperty(TidalAPI, 'URL', {
  get: function() {
    return {
      login: TidalAPI.baseURL + '/login/username',
      user:  TidalAPI.baseURL + '/users',
    };
  }
});

Object.defineProperty(TidalAPI, 'token', {
  get: function() { return '_KM2HixcUBZtmktH'; }
});

Object.defineProperty(TidalAPI, 'header', {
  get: function() { return { 'X-Tidal-Token': TidalAPI.token }; }
});


/**
 * CONSTRUCTOR
 */


function TidalAPI() {
  var _session = null,
      _onLogin = new Broadcaster(this),
      _onLoginError = new Broadcaster(this);

  // privileged event handlers

  this.handleLoginResponse = function(e) {
    _session = new Session(
      e.body.sessionId,
      new User(e.body.userId),
      e.body.countryCode
    );
    _onLogin.broadcast({tidalAPI: this, session: this.session});
  }

  this.handleLoginError = function(e) {
    _onLoginError.broadcast({tidalAPI: this});
  }

  // privileged getter/setters

  Object.defineProperty(this, 'session', {
    get: function() { return _session; }
  });

  Object.defineProperty(this, 'onLogin', {
    get: function() { return _onLogin; }
  });

  Object.defineProperty(this, 'onLoginError', {
    get: function() { return _onLoginError; }
  });

  Object.defineProperty(this, 'loggedIn', {
    get: function() { return _session != null; }
  });

}

/**
 * PUBLIC METHODS
 */


// login -----------------------------------------------------------//

TidalAPI.prototype.login = function(username, password) {

  var request = new APIRequest(
    TidalAPI.URL.login,
    TidalAPI.header, {
      username: username,
      password: password
  });

  request.onError.addListener(this, this.handleLoginError);
  request.onResponse.addListener(this, this.handleLoginResponse);

  request.post();
}


module.exports = TidalAPI;
