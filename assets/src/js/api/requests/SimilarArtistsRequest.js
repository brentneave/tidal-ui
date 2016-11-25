const
    APIConfig = require('../APIConfig'),
    APIRequest = require('../APIRequest');

const SimilarArtistsRequest = function(session, artist)
{
    APIRequest.prototype.constructor.call(this);
    this.url = APIConfig.URLs.similarArtists(artist.id);
    this.header = APIConfig.sessionHeader(session.id);
    this.method = APIRequest.method.get;
    this.form =
    {
        countryCode: session.countryCode,
        limit: 99
    };
}

SimilarArtistsRequest.prototype = new APIRequest();

module.exports = SimilarArtistsRequest;
