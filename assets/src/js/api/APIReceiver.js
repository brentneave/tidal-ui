const APIConfig = require('./APIConfig'),
APIRequest = require('./APIRequest'),
APIActions = require('./APIActions'),
ModelDispatcher = require('../model/ModelDispatcher'),
ModelActions = require('../model/ModelActions');

const APIReceiver = function() {

    const _handleModelActions = function(action)
    {
        console.log('APIReceiver handling ' + action.type);

        switch(action.type)
        {
            case ModelActions.LOGIN:
                var request = new APIRequest();
                request.url = APIConfig.URLs.login;
                request.header = APIConfig.tokenHeader;
                request.method = APIRequest.method.post;
                request.responseAction = APIActions.RESPONSE_LOGIN;
                request.errorAction = APIActions.ERROR_LOGIN;
                request.form =
                {
                    username: action.payload.username, password: action.payload.password
                };
                request.send();
                break;

            case ModelActions.GET_ARTISTS:
                const session = action.payload.session;
                var request = new APIRequest();
                request.url = APIConfig.URLs.artists(session);
                request.header = APIConfig.sessionHeader(session);
                request.method = APIRequest.method.get;
                request.responseAction = APIActions.RESPONSE_ARTISTS;
                request.errorAction = APIActions.ERROR_ARTISTS;
                request.form =
                {
                    countryCode: session.countryCode,
                    limit: 9999
                };
                request.send();
                break;

            default:
                break;
        }
    }

    ModelDispatcher.actions.addListener(this, _handleModelActions);

}

module.exports = new APIReceiver();
