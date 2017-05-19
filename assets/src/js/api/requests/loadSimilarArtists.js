// const
//     config = require('../config'),
//     APIRequest = require('../APIRequest');
//
// const SimilarArtistsRequest = function(session, artist)
// {
//     APIRequest.prototype.constructor.call(this);
//     this.url = config.URLs.similarArtists(artist.id);
//     this.header = config.sessionHeader(session.id);
//     this.method = APIRequest.method.get;
//     this.form =
//     {
//         countryCode: session.countryCode,
//         limit: 99
//     };
// }
//
// SimilarArtistsRequest.prototype = new APIRequest();
//
// module.exports = SimilarArtistsRequest;

const apiRequest = require('../apiRequest'),
    config = require('../config');

const resolve = function(response) {
    console.log('API.loadSimilarArtists.resolve');
    console.log(response);
    return response.body.items ? response.body.items : [];
}

const reject = function(response) {
    console.log('API.loadSimilarArtists.response (fail silently because Tidal API throws a 404 when there are no similiar artists)');
    console.log(response);
    return { body: { items: [] } }
}

module.exports = function(session, artist, limit) {
    limit = limit ? limit : 99;

    console.log('API.loadSimilarArtists:');
    console.log(session);
    console.log(artist);
    console.log(limit);

    return apiRequest({
            method: config.method.get,
            url: config.URLs.similarArtists(artist.id),
            header: config.sessionHeader(session.id),
            parameters: {
                countryCode: session.countryCode,
                limit: limit
            }
        })
        .catch(
            reject
        )
        .then(
            resolve,
            reject
        );
}
