const
    APIConfig = require('../APIConfig'),
    APIActions = require('../APIActions'),
    APIRequest = require('../APIRequest');

const ArtistsRequest = function(session)
{
    APIRequest.prototype.constructor.call(this);
    this.url = APIConfig.URLs.artists(session);
    this.header = APIConfig.sessionHeader(session);
    this.method = APIRequest.method.get;
    this.responseAction = APIActions.RESPONSE_ARTISTS;
    this.errorAction = APIActions.ERROR_ARTISTS;
    this.form =
    {
        countryCode: session.countryCode,
        limit: 9999
    };
}

ArtistsRequest.prototype = new APIRequest();

module.exports = ArtistsRequest;
