var FLAC = require('flac.js'),
    AV = require('av'),
    SoundQuality = require('./tidal/SoundQuality'),
    TidalAPI = require('./tidal/TidalAPI');

var tidal = new TidalAPI();
console.log('ready');

var listener = {
  onLogin : function() {
    console.log('Logged in:')
    console.log('\t' + tidal.session.id);
    console.log('\t' + tidal.session.user.id);
    console.log('\t' + tidal.session.countryCode);

    tidal.getUserDetails(tidal.session.user);
  }
}

tidal.onLogin.addListener(listener, listener.onLogin);

tidal.login('brent@brentneave.com','losslesslystreamthatshit');