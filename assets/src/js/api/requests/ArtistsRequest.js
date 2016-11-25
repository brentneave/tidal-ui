const
    APIConfig = require('../APIConfig'),
    APIRequest = require('../APIRequest');

const ArtistsRequest = function(session, user)
{
    APIRequest.prototype.constructor.call(this);
    this.url = APIConfig.URLs.artists(user.id);
    this.header = APIConfig.sessionHeader(session.id);
    this.method = APIRequest.method.get;
    this.form =
    {
        countryCode: session.countryCode,
        limit: 9999
    };
}

ArtistsRequest.prototype = new APIRequest();

module.exports = ArtistsRequest;
