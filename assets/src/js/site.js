var FLAC = require('flac.js'),
    AV = require('av'),
    TidalCredentials = require('./TidalCredentials')
    SoundQuality = require('./store/SoundQuality'),
    TidalAPI = require('./store/TidalAPI');

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

tidal.login(TidalCredentials.username, TidalCredentials.password);