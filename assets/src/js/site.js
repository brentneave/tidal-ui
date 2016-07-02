const FLAC = require('flac.js'),
      AV = require('av'),
      TidalCredentials = require('./TidalCredentials'),
      Session = require('./model/Session');

// var tidal = new TidalAPI();
// console.log('ready');

// var listener = {
//   onLogin : function(action) {
//     console.log('Logged in: ' + action);
//     console.log('\t' + action.session.id);
//     console.log('\t' + action.session.user.id);
//     console.log('\t' + action.session.countryCode);
//
//     tidal.getUserDetails(tidal.session.user);
//   }
// }
//
//
// StoreDispatcher.login.addListener(listener, listener.onLogin);
//
// tidal.login(TidalCredentials.username, TidalCredentials.password);

const listener = {
  onLoginSuccess : function(e) {
    console.log('Logged in: ' + e);
    console.log('\t' + e.session.id);
    console.log('\t' + e.session.user.id);
    console.log('\t' + e.session.countryCode);
    console.log('\t' + e.session.isLoggedIn);
  }
}
const session = new Session();
session.onLoginSuccess.addListener(listener, listener.onLoginSuccess);
session.login(TidalCredentials.username, TidalCredentials.password);
