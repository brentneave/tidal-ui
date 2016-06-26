var SoundQuality = require('./SoundQuality.js'),
    APIRequest = require('./APIRequest');


Object.defineProperty(TidalAPI, 'baseURL', {
  get: function() { return 'https://api.tidalhifi.com/v1'; }
});

Object.defineProperty(TidalAPI, 'URL', {
  get: function() {
    return {
      login: TidalAPI.baseURL + '/login/username'
    };
  }
});

Object.defineProperty(TidalAPI, 'token', {
  get: function() { return '_KM2HixcUBZtmktH'; }
});

Object.defineProperty(TidalAPI, 'header', {
  get: function() { return { 'X-Tidal-Token': TidalAPI.token }; }
});


function TidalAPI() {

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

  request.onError.addListener(this, this.onLoginError);
  request.onResponse.addListener(this, this.onLoginResponse);

  request.post();
}

TidalAPI.prototype.onLoginResponse = function(e) {
  console.log('Logged in:');
  console.log(e);
}

TidalAPI.prototype.onLoginError = function(e) {
  console.log('Log in error:');
  console.log(e);
}

// album -----------------------------------------------------------//

module.exports = TidalAPI;
