const apiRequest = require('../apiRequest'),
    config = require('../config');

const resolve = function(response) {
    return response.body.items;
}

const reject = function(response) {
    return Error('Could not load artist’s albums');
}

module.exports = function(session, artist, limit) {
    console.log('API.loadArtistAlbums:');
    console.log(session);
    console.log(artist);
    console.log(limit);

    limit = limit ? limit : 999;

    return apiRequest({
            method: config.method.get,
            url: config.urls.artistAlbums(artist.id),
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
            resolve, reject
        )
}
