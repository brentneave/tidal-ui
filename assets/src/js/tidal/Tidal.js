var SoundQuality = require('./SoundQuality.js'),
    APIRequest = require('./APIRequest');

function Tidal() {
  // private vars

  var _quality


  // getter/setters

  var _setQuality = function(s) {
    if(s != SoundQuality.lossless || SoundQuality.high || SoundQuality.low) {
      throw new Error('Invalid SoundQuality: use ' + SoundQuality.lossless + ', ' + SoundQuality.high + ', ' + SoundQuality.low);
    } else {
      _quality = s;
    }
  }

  var _getQuality = function(s)
  {
    return _quality;
  }

  Object.defineProperty(this, 'quality', {
    set: _setQuality,
    get: _getQuality
  });

}


// public methods

Tidal.prototype.login = function(username, password) {

  var loginRequest = new APIRequest(
    APIRequest.url.login, {  
      username: username,
      password: password
  });

  loginRequest.onError.addListener(this, this.onLoginError);
  loginRequest.onResponse.addListener(this, this.onLoginResponse);

  loginRequest.post();
}


// event handlers

Tidal.prototype.onLoginResponse = function(e) {
  console.log('Logged in:');
  console.log(e);
}

Tidal.prototype.onLoginError = function(e) {
  console.log('Log in error:');
  console.log(e);
}


module.exports = Tidal;
