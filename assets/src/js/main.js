const ViewDispatcher = require('./view/ViewDispatcher'),
      ModelActionHandler = require('./model/ModelReceiver'),
      APIActionHandler = require('./api/APIReceiver'),
      AppView = require('./view/types/AppView');

const appView = new AppView(document.body).render();

// const //FLAC = require('flac.js'),
      //AV = require('av'),
      // TidalCredentials = require('./TidalCredentials'),
      // API = require('./api/API'),
      // APIDispatcher = require('./api/APIDispatcher');//,
      // Session = require('./model/Session'),
      // LoginForm = require('./view/LoginForm'),
      // Favorites = require('./model/Favorites');



// const sessionListener = {
//   onLoginSuccess : function(e) {
//     console.log('Logged in: ' + e);
//     console.log('\t' + e.session.id);
//     console.log('\t' + e.session.user.id);
//     console.log('\t' + e.session.countryCode);
//     console.log('\t' + e.session.isLoggedIn);
//     Favorites.loadAlbums();
//   }
// }
// Session.onLoginSuccess.addListener(sessionListener, sessionListener.onLoginSuccess);
//
// const formListener = {
//   onSubmit : function(e) {
//     console.log('username = ' + e.username);
//     console.log('password = ' + e.password);
//     Session.login(e.username, e.password);
//   }
// }
//
// const loginForm = new LoginForm()
// loginForm.build(document.body);
// loginForm.onSubmit.addListener(formListener, formListener.onSubmit);
