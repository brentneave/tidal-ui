const
    apiRequest = require('../apiRequest'),
    config = require('../config');



const resolve = function(response) {
    console.log('api.loadAlbumDetails.resolve', response);
    return response.body;
}



const reject = function(response) {
    console.error('api.loadAlbumDetails.reject', response);
    return Error();
}



module.exports = function(session, album) {

    console.log('API.loadAlbumDetails', session, album.id);

    return apiRequest({
            method: config.method.get,
            url: config.urls.album(album.id),
            header: config.sessionHeader(session.id),
            parameters: {
                countryCode: session.countryCode
            }
        })
        .then(
            resolve,
            reject
        );
};
