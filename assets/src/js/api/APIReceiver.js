const APIConfig = require('./APIConfig'),
      ModelDispatcher = require('../model/ModelDispatcher'),
      ModelActions = require('../model/ModelActions'),
      Login = require('./types/Login'),
      Artists = require('./types/Artists');

const APIReceiver = function() {

    const _handleModelActions = function(action) {
        console.log('APIReceiver handling ' + action.type);

        switch(action.type) {
            case ModelActions.LOGIN:
                Login.form = { username: action.payload.username, password: action.payload.password };
                Login.send();
                break;

            case ModelActions.GET_ARTISTS:
                const session = action.payload.session;
                Artists.header = APIConfig.sessionHeader(session);
                Artists.url = APIConfig.URLs.artists(session);
                Artists.form = {
                    countryCode: session.countryCode,
                    limit: 9999
                };
                Artists.send();
                break;

            default:
                break;
        }
    }

    ModelDispatcher.actions.addListener(this, _handleModelActions);

}

module.exports = new APIReceiver();
