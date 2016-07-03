const FLAC = require('flac.js'),
      AV = require('av'),
      TidalCredentials = require('./TidalCredentials'),
      Session = require('./model/Session'),
      LoginForm = require('./view/LoginForm');

const sessionListener = {
  onLoginSuccess : function(e) {
    console.log('Logged in: ' + e);
    console.log('\t' + e.session.id);
    console.log('\t' + e.session.user.id);
    console.log('\t' + e.session.countryCode);
    console.log('\t' + e.session.isLoggedIn);
  }
}
const session = new Session();
session.onLoginSuccess.addListener(sessionListener, sessionListener.onLoginSuccess);

const formListener = {
  onSubmit : function(e) {
    console.log('username = ' + e.username);
    console.log('password = ' + e.password);
    session.login(e.username, e.password);
  }
}

const loginForm = new LoginForm()
loginForm.build(document.body);
loginForm.onSubmit.addListener(formListener, formListener.onSubmit);
