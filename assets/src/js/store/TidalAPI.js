var SoundQuality = require('./SoundQuality'),
    APIRequest = require('../api/APIRequest'),
    User = require('./User'),
    Session = require('./Session'),
    Broadcaster = require('../events/Broadcaster'),
    LoginAction = require('../dispatch/actions/LoginAction');


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

Object.defineProperty(TidalAPI, 'tokenHeader', {
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

    StoreDispatcher.login.dispatchAction(new LoginAction(_session));
    // _onLogin.broadcast({tidalAPI: this, session: this.session});
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

  Object.defineProperty(this, 'sessionHeader', {
    get: function() { 
      return this.session 
        ? { 'X-Tidal-SessionId': this.session.id }
        : null;
    }
  });

}

/**
 * PUBLIC METHODS
 */


// login -----------------------------------------------------------//

TidalAPI.prototype.login = function(username, password) {

  var request = new APIRequest(
    TidalAPI.URL.login,
    TidalAPI.tokenHeader, {
      username: username,
      password: password
    }, APIRequest.method.post);

  request.onError.addListener(this, this.handleLoginError);
  request.onResponse.addListener(this, this.handleLoginResponse);

  request.send();
}

// user ------------------------------------------------------------//

TidalAPI.prototype.getUserDetails = function(user) {

  if(!(user instanceof User)) {
    throw new Error();
  }

  var request = new APIRequest(
    TidalAPI.URL.user + '/' + user.id,
    this.sessionHeader, {
      countryCode: this.session.countryCode
    }, APIRequest.method.get);

  var requestHandler = {
    onError: function(e) {
      throw new Error('Could not load user details');
    },
    onResponse: function(e) {
      var body = e.body;
      user.username     = body.username;
      user.firstName    = body.firstName;
      user.lastName     = body.lastName;
      user.email        = body.email;
      user.created      = body.created;
      user.picture      = body.picture;
      user.newsletter   = body.newsletter;
      user.gender       = body.gender;
      user.dateOfBirth  = body.dateOfBirth;
      user.facebookUid  = body.facebookUid;
      console.log(user);
    }
  }

  request.onError.addListener(requestHandler, requestHandler.onError);
  request.onResponse.addListener(requestHandler, requestHandler.onResponse);

  request.send();
}

module.exports = TidalAPI;
