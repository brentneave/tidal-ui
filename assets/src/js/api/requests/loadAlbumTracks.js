const
    apiRequest = require('../apiRequest'),
    config = require('../config');



const resolve = function(response) {
    console.log('api.loadAlbumTracks.resolve', response);
    return response.body.items;
}



const reject = function(response) {
    console.error('api.loadAlbumTracks.reject', response);
    return Error();
}



module.exports = function(session, album, limit) {

    console.log('API.loadAlbumTracks', session, album.id);

    limit = limit || 999;

    return apiRequest({
            method: config.method.get,
            url: config.urls.albumTracks(album.id),
            header: config.sessionHeader(session.id),
            parameters: {
                countryCode: session.countryCode,
                limit: session.limit
            }
        })
        .then(
            resolve,
            reject
        );
};
