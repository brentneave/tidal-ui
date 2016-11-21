const APIConfig = require('./APIConfig'),
APIRequest = require('./APIRequest'),
APIActions = require('./APIActions'),
LoginRequest = require('./types/LoginRequest'),
ArtistsRequest = require('./types/ArtistsRequest'),
LatestReleasesRequest = require('./types/LatestReleasesRequest'),
RecommendedArtistsRequest = require('./types/RecommendedArtistsRequest'),
ModelDispatcher = require('../model/ModelDispatcher'),
ModelActions = require('../model/ModelActions');

const APIReceiver = function() {

    const _handleModelRequests = function(action)
    {
        console.log('APIReceiver._handleModelRequests: ' + action.type);
        
        switch(action.type)
        {
            case ModelActions.requests.GET_LOGIN:
                new LoginRequest(action.payload.username, action.payload.password).send();
                break;

            case ModelActions.requests.GET_ARTISTS:
                new ArtistsRequest(action.payload.session, action.payload.user).send();
                break;

            case ModelActions.requests.GET_LATEST_RELEASES:
                new LatestReleasesRequest(action.payload.session, action.payload.artists);
                break;

            case ModelActions.requests.GET_RECOMMENDED_ARTISTS:
                new RecommendedArtistsRequest(action.payload.session, action.payload.artists);
                break;

            default:
                break;
        }
    }

    ModelDispatcher.requests.addListener(this, _handleModelRequests);

}

module.exports = new APIReceiver();
