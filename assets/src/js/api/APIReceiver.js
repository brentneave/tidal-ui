const APIConfig = require('./APIConfig'),
APIRequest = require('./APIRequest'),
APIActions = require('./APIActions'),
LoginRequest = require('./types/LoginRequest'),
ArtistsRequest = require('./types/ArtistsRequest'),
LatestReleasesRequest = require('./types/LatestReleasesRequest'),
ModelDispatcher = require('../model/ModelDispatcher'),
ModelActions = require('../model/ModelActions');

const APIReceiver = function() {

    const _handleModelActions = function(action)
    {
        console.log('APIReceiver handling ' + action.type);

        switch(action.type)
        {
            case ModelActions.LOGIN:
                new LoginRequest(action.payload.username, action.payload.password).send();
                break;

            case ModelActions.GET_ARTISTS:
                new ArtistsRequest(action.payload.session).send();
                break;

            case ModelActions.GET_LATEST_RELEASES:
                new LatestReleasesRequest(action.payload.artists, action.payload.session);
                break;

            default:
                break;
        }
    }

    ModelDispatcher.actions.addListener(this, _handleModelActions);

}

module.exports = new APIReceiver();
