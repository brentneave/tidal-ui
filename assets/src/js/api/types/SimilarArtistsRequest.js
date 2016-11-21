const
    APIConfig = require('../APIConfig'),
    APIActions = require('../APIActions'),
    APIRequest = require('../APIRequest');

const SimilarArtistsRequest = function(session, artist)
{
    APIRequest.prototype.constructor.call(this);
    this.url = APIConfig.URLs.similarArtists(artist.id);
    this.header = APIConfig.sessionHeader(session.id);
    this.method = APIRequest.method.get;
    this.responseAction = APIActions.RESPONSE_SIMILAR_ARTISTS;
    this.errorAction = APIActions.ERROR_SIMILAR_ARTISTS;
    this.form =
    {
        countryCode: session.countryCode,
        limit: 99
    };
}

SimilarArtistsRequest.prototype = new APIRequest();

module.exports = SimilarArtistsRequest;
