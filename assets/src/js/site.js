var FLAC = require('flac.js'),
    AV = require('av'),
    TidalCredentials = require('./TidalCredentials')
    SoundQuality = require('./store/SoundQuality'),
    TidalAPI = require('./store/TidalAPI'),
    StoreDispatcher = require('./store/StoreDispatcher');

var tidal = new TidalAPI();
console.log('ready');

var listener = {
  onLogin : function(action) {
    console.log('Logged in: ' + action);
    console.log('\t' + action.session.id);
    console.log('\t' + action.session.user.id);
    console.log('\t' + action.session.countryCode);

    tidal.getUserDetails(tidal.session.user);
  }
}


StoreDispatcher.login.addListener(listener, listener.onLogin);

tidal.login(TidalCredentials.username, TidalCredentials.password);